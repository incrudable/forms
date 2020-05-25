import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';

import {
  FormRendererService,
  RuntimeControl,
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
    { label: 'Custom layout', link: 'custom-layout' },
    { label: 'Rest', link: 'rest' }
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
      'Number must be greater or equal to 3',
      (control: RuntimeControl) => {
        return control.formControl.value >= 3;
      }
    );
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
