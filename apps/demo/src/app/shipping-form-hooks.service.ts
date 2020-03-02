import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormHookUpdateOn, HooksService, Option } from '@incrudable/forms';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { ShippingFormOuput } from './shipping-form';

@Injectable({
  providedIn: 'root'
})
export class ShippingFormHooksService {
  private countryOptions: Observable<Option[]> | undefined;

  constructor(
    private httpClient: HttpClient,
    private hooksService: HooksService
  ) {}

  // any way to do this in the constructor?
  //   ShippingFormHooksService would need to be injected even if manually provided for the constructor to actually kick off.
  // the function bindings also need the appropriate `this`

  // calling this setup function in the component for now.
  setup() {
    this.hooksService.setHook('countryOptions', this.getCountries.bind(this));
    this.hooksService.setHook(
      'stateOptions',
      this.getStates.bind(this),
      FormHookUpdateOn.ControlChanges,
      'country'
    );
  }

  private getCountries(_form: ShippingFormOuput): Observable<Option[]> {
    if (!this.countryOptions) {
      this.countryOptions = this.httpClient
        .get<{ geonames: any[] }>('/geo-names/countryInfoJSON?username=zjkipps')
        .pipe(
          map(res => res.geonames),
          map(countries =>
            countries.map(country => ({
              label: country.countryName,
              propertyName: country.countryCode,
              value: country.countryCode
            }))
          ),
          shareReplay(1)
        );
    }
    return this.countryOptions;
  }

  private getStates(form: ShippingFormOuput): Observable<Option[]> {
    return this.httpClient
      .get<{ geonames: any[] }>(
        `/geo-names/searchJSON?username=zjkipps&country=${form.country}&featureCode=ADM1`
      )
      .pipe(
        map(res => res.geonames),
        map(states =>
          states.map(state => ({
            label: state.name,
            propertyName: state.adminCode1,
            value: state.adminCode1
          }))
        )
      );
  }
}
