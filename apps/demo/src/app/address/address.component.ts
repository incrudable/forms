import { Component } from '@angular/core';

import { shippingFormControls } from './shipping-form';

@Component({
  selector: 'incrudable-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {
  shippingFormSet = shippingFormControls;
}
