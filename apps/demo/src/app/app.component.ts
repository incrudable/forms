import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import {
  FormRendererService,
  ValidatorsService
} from '@incrudable/forms';

import { ShippingFormHooksService } from './address/shipping-form-hooks.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  navLinks = [
    { label: 'Getting Started', link: 'getting-started' },
    { label: 'Simple', link: 'simple' },
    { label: 'Multi', link: 'multi' },
    { label: 'Address', link: 'address' },
    { label: 'Custom layout', link: 'custom-layout' }
  ];
  private _mobileQueryListener: () => void;

  constructor(
    public formService: FormRendererService,
    public validatorService: ValidatorsService,
    shippingFormHooks: ShippingFormHooksService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);

    shippingFormHooks.setup();
    this.validatorService.addValidator(
      'simpleNum',
      'simpleNum',
      this.simpleNum
    );
  }

  simpleNum(num: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = control.value >= num;
      return !valid ? { error: { value: control.value } } : null;
    };
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
