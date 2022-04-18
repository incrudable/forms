import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { merge, Observable, of, Subject } from 'rxjs';
import { map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { v4 } from 'uuid';

import {
  load,
  LoadFeed,
  LoadStatus,
  mapToError,
  mapToLoading,
  mapToStale,
  waitForResults
} from './rest';

export class IndividualRep<T> {
  constructor(
    entityRep: EntityRep<T>,
    public entityType: string,
    public id: Observable<string>,
    public status: Observable<LoadStatus>,
    public individual: LoadFeed<T>
  ) {
    console.log('entityRep', entityRep);
  }

  // TODO: build out mutation methods
  // directly on an individual
}

export class EntityRep<T> {
  private refreshTrigger = new Subject<void>();
  private staleTrigger = new Subject<LoadFeed<unknown>>();
  private internalTrigger = this.staleTrigger.pipe(switchMap(feed => feed));
  private dataChangeTriggers: LoadFeed<unknown>;

  id: string = v4();
  listLoadFeed: LoadFeed<T[]>;
  status: Observable<LoadStatus>;
  list: Observable<T[]>;
  listLoading: Observable<boolean>;
  listStale: Observable<boolean>;
  listError: Observable<Error>;
  statusSnapshot: LoadStatus | undefined;
  listSnapshot: T[] | undefined;
  listLoadingSnapshot: boolean | undefined;
  listStaleSnapshot: boolean | undefined;
  listErrorSnapshot: Error | undefined;

  constructor(
    public entityType: string,
    public url: string,
    public incomingRelationships: EntityRep<unknown>[] = [],
    private httpClient: HttpClient
  ) {
    // Don't mutate the original array.
    // Not sure if there is a way to prevent mutation of
    // entities. Will keep a look out.
    const relationships = dedupRels([...incomingRelationships]);
    const feeds = relationships.map(rel => rel.listLoadFeed);
    // create an observable that indicates when an entity or list should be updated
    this.dataChangeTriggers = merge(...feeds, this.internalTrigger);
    const initialFetchTrigger = of(undefined);
    const allTriggers: Observable<any>[] = [
      this.dataChangeTriggers,
      this.refreshTrigger
    ];
    if (!feeds.length) {
      allTriggers.push(initialFetchTrigger);
    }
    this.listLoadFeed = load(() => {
      return this.httpClient.get<T[]>(url);
    }, merge(...allTriggers)).pipe(shareReplay(1));
    this.status = this.listLoadFeed.pipe(
      map(update => update.status),
      tap(update => (this.statusSnapshot = update))
    );
    this.list = this.listLoadFeed.pipe(
      waitForResults(),
      tap(update => (this.listSnapshot = update))
    );
    this.listLoading = this.listLoadFeed.pipe(
      mapToLoading(),
      tap(update => (this.listLoadingSnapshot = update))
    );
    this.listStale = this.listLoadFeed.pipe(
      mapToStale(),
      tap(update => (this.listStaleSnapshot = update))
    );
    this.listError = this.listLoadFeed.pipe(
      mapToError(),
      tap(update => (this.listErrorSnapshot = update))
    );
  }

  refresh() {
    this.refreshTrigger.next();
  }

  updateOne(individual: IndividualRep<T>, updatedEntity: Partial<T>) {
    const baseRequest = load(
      id => this.httpClient.put(this.url + '/' + id, updatedEntity),
      individual.id.pipe(take(1))
    ).pipe(shareReplay(1));

    this.staleTrigger.next(baseRequest);
    return baseRequest;
  }

  addOne(newEntity: Partial<T>) {
    const baseRequest = load(() =>
      this.httpClient.post(this.url, newEntity)
    ).pipe(shareReplay(1));
    this.staleTrigger.next(baseRequest);
    return baseRequest;
  }

  deleteOne(individual: IndividualRep<T>) {
    const baseRequest = load(
      id => this.httpClient.delete(this.url + '/' + id),
      individual.id.pipe(take(1))
    ).pipe(shareReplay(1));
    this.staleTrigger.next(baseRequest);
    return baseRequest;
  }

  getOne(id: string | Observable<string>): IndividualRep<T> {
    let obsId: Observable<string>;
    if (typeof id === 'string') {
      obsId = of(id);
    } else {
      obsId = id;
    }

    const individualLoad = load(
      () =>
        obsId.pipe(
          switchMap(indId => this.httpClient.get<T>(this.url + '/' + indId))
        ),
      this.dataChangeTriggers
    );

    const status = individualLoad.pipe(map(loadUpdate => loadUpdate.status));

    return new IndividualRep(
      this,
      this.entityType,
      obsId,
      status,
      individualLoad
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class RestService {
  // TODO entity map
  constructor(private httpClient: HttpClient) {}

  createEntity<T>(
    type: string,
    url: string,
    incomingRelationships: EntityRep<unknown>[] = []
  ): EntityRep<T> {
    return new EntityRep<T>(type, url, incomingRelationships, this.httpClient);
  }
}

/**
 * We don't want Entities causing cascading re-requests as they change. One way that this
 * can occur is if an API consumer lists two entitiy relationships that have common
 * relational ancestry. For example assume c depends on a and b, and that b depends on a.
 * A change in a would trigger an update on b and c. C would update a second time because of
 * the change in b. Instead we can reduce time and resource load by just recodnizing and
 * waiting for b to finish.
 *
 * This should also prevent the formation of cycles
 *
 * This function identifies this kinds of relationships and removes them from the list.
 *
 * @param incomingRelationships list of relationships that have not been deduplicate. This list is usually
 * provided by an API consumer.
 * @returns a deduplicated list. This list should no longer contain entities that appear in
 * the hierarchy of any other relationships
 */
function dedupRels(
  incomingRelationships: EntityRep<unknown>[]
): EntityRep<unknown>[] {
  const indicesToRemove: number[] = [];
  // Scrutinize each relationship
  incomingRelationships.forEach((entityInQuestion, entityIndex) => {
    // ... against each other relationship
    incomingRelationships.forEach((entityForComp, compIndex) => {
      // ... don't check a relationships against itself
      if (entityIndex !== compIndex) {
        if (isInLineage(entityInQuestion, entityForComp)) {
          indicesToRemove.push(entityIndex);
        }
      }
    });
  });
  indicesToRemove.forEach(index => incomingRelationships.splice(index, 1));
  return incomingRelationships;
}

function isInLineage(
  entityInQuestion: EntityRep<unknown>,
  entityForComp: EntityRep<unknown>
): boolean {
  if (entityForComp.incomingRelationships.length === 0) {
    return false;
  }

  if (
    entityForComp.incomingRelationships.find(
      parentRel => parentRel.id === entityInQuestion.id
    )
  ) {
    return true;
  }

  const recurseVals = entityForComp.incomingRelationships.map(parentRel =>
    isInLineage(entityInQuestion, parentRel)
  );
  return recurseVals.reduce((prev, currentValue) => prev || currentValue);
}
