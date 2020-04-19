import { defer, merge, Observable, of, Subject, timer } from 'rxjs';
import {
  delayWhen,
  filter,
  map,
  retryWhen,
  shareReplay,
  switchMap,
  tap
} from 'rxjs/operators';

export enum LoadStatus {
  IN_PROGRESS = 'In Progress',
  RETRYING = 'Retrying',
  WAITING = 'Waiting to Retry',
  SUCCESS = 'Success',
  ERROR = 'Error',
  STALE = 'STALE'
}

export interface InProgress {
  status: LoadStatus.IN_PROGRESS;
}

export interface Retrying {
  status: LoadStatus.RETRYING;
}

export interface Waiting {
  status: LoadStatus.WAITING;
}

export interface RequestError {
  status: LoadStatus.ERROR;
  error: any;
  willRetry: boolean;
}

export interface Success<T> {
  status: LoadStatus.SUCCESS;
  results: T;
}

export interface Stale<T> {
  status: LoadStatus.STALE;
  results: T;
  // TODO: determine what/if to do something with this
  // The original thought was to find someway of indicating
  // why the previous results are stale other than the
  // obvious fact that the trigger is firing up
  staleSource?: string;
}

export type LoadUpdate<T> =
  | Success<T>
  | RequestError
  | Waiting
  | Retrying
  | Stale<T>
  | InProgress;

export type LoadFeed<T> = Observable<LoadUpdate<T>>;

interface LoadOptions {
  // To retry once after failure, use attempts=2
  attempts: number;
  retryDelayMs: number;
  retryBackoffCoefficient: number;
  retryMaxDelayMs: number;
}

const DEFAULT_OPTIONS: LoadOptions = {
  attempts: 1,
  retryDelayMs: 2000,
  retryBackoffCoefficient: 1.5,
  retryMaxDelayMs: 30000
};

export function load<S, T>(
  request: (triggerInput?: S) => Observable<T>,
  trigger?: Observable<S | LoadUpdate<S>>,
  opts?: LoadOptions
): LoadFeed<T> {
  const options = { ...DEFAULT_OPTIONS, ...opts };
  if (!trigger) {
    trigger = (of(undefined) as any) as Observable<S>;
  }
  const sideChannel = new Subject<LoadUpdate<T>>();
  let mostRecentValue: T | undefined;
  let mostRecentStatus: LoadStatus | undefined;
  return trigger.pipe(
    // TODO: figure out how to better handle the following line
    // Looking for the existence of a magic property name is not great
    // It is also causing type conflicts.

    // Check to see if the input is a LoadFeed
    // If it is, we are able to know when it goes into a fetching state
    // and then put ours
    tap(triggerInput => {
      if (
        triggerInput &&
        'status' in triggerInput &&
        (triggerInput.status === LoadStatus.IN_PROGRESS ||
          triggerInput.status === LoadStatus.STALE)
      ) {
        if (
          mostRecentStatus &&
          mostRecentStatus === LoadStatus.SUCCESS &&
          !!mostRecentValue
        ) {
          sideChannel.next({
            status: LoadStatus.STALE,
            results: mostRecentValue
          } as const);
        }
      }
    }),
    filter<any>(triggerInput => {
      return (
        !triggerInput ||
        !triggerInput.status ||
        triggerInput.status === LoadStatus.SUCCESS
      );
    }),
    map(triggerInput => {
      if (
        triggerInput &&
        'status' in triggerInput &&
        triggerInput.status === LoadStatus.SUCCESS
      ) {
        return triggerInput.results;
      } else {
        return triggerInput;
      }
    }),
    switchMap((triggerInput: S) =>
      buildRequest(sideChannel, triggerInput, request, options)
    ),
    tap(update => {
      if (update.status === LoadStatus.SUCCESS) {
        mostRecentValue = update.results;
      }
      mostRecentStatus = update.status;
    })
  );
}

function buildRequest<S, T>(
  sideChannel: Subject<LoadUpdate<T>>,
  triggerInput: S,
  request: (triggerInput?: S) => Observable<T>,
  options: LoadOptions
): LoadFeed<T> {
  let attempt = 0;
  return merge(
    of({ status: LoadStatus.IN_PROGRESS } as const),
    sideChannel,
    defer(() => {
      attempt++;
      return request(triggerInput);
    }).pipe(
      retryWhenAppropriate(sideChannel, attempt, options),
      map(results => ({ status: LoadStatus.SUCCESS, results } as const))
    )
  );
}

function retryWhenAppropriate<T>(
  sideChannel: Subject<LoadUpdate<T>>,
  attempt: number,
  options: LoadOptions
) {
  return (source: Observable<T>) =>
    source.pipe(
      retryWhen(errors =>
        errors.pipe(
          tap(error =>
            sideChannel.next({
              status: LoadStatus.ERROR,
              error,
              willRetry: attempt < options.attempts
            } as const)
          ),
          filter(_ => attempt < options.attempts),
          tap(_ => sideChannel.next({ status: LoadStatus.WAITING } as const)),
          delayWhen(() => retryDelay(options, attempt)),
          tap(_ => sideChannel.next({ status: LoadStatus.RETRYING } as const))
        )
      )
    );
}

function retryDelay(options: LoadOptions, attempt: number): Observable<number> {
  const jitter = (Math.random() - 0.5) * options.retryDelayMs * 0.5;
  let delay =
    options.retryDelayMs *
      Math.pow(options.retryBackoffCoefficient, attempt - 1) +
    jitter;
  delay = Math.min(delay, options.retryMaxDelayMs);
  return timer(delay);
}

/**
 * This operator may be used to automatically retrieve the 'results'
 * of a successful 'loadWithRetry' operation.
 *
 * However, only use this operator if you do not care about the
 * intermediate state of the LoardResultStatus, as this will filter
 * out everything besides the SUCCESS state;
 * states such as 'IN_PROGRESS' or 'ERROR' will not be available
 * should those be needed for presentation logic.
 */
export function waitForResults() {
  return <T>(source: LoadFeed<T>) =>
    source.pipe(
      filter(res => res.status === LoadStatus.SUCCESS),
      map(res => (res as Success<T>).results),
      shareReplay(1)
    );
}

export function mapToLoading() {
  return (source: LoadFeed<unknown>) =>
    source.pipe(
      map(
        res =>
          res.status === LoadStatus.IN_PROGRESS ||
          res.status === LoadStatus.RETRYING ||
          res.status === LoadStatus.STALE ||
          res.status === LoadStatus.WAITING
      ),
      shareReplay(1)
    );
}

export function mapToStale() {
  return (source: LoadFeed<unknown>) =>
    source.pipe(
      map(res => res.status === LoadStatus.STALE),
      shareReplay(1)
    );
}

export function mapToError() {
  return (source: LoadFeed<unknown>) =>
    source.pipe(
      map(res => (res.status === LoadStatus.ERROR ? res.error : undefined)),
      shareReplay(1)
    );
}

export function isSuccess<T>(
  loadUpdate: LoadUpdate<T>
): loadUpdate is Success<T> {
  return loadUpdate.status === LoadStatus.SUCCESS;
}
