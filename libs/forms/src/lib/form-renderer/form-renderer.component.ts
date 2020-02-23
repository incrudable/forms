import { Component, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridsterConfig } from 'angular-gridster2';
import { v4 } from 'uuid';

import { Control, RuntimeControl } from '../engine.types';

import { FormRendererService } from './form-renderer.service';

@Component({
  selector: 'incrudable-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.css']
})
/**
 * FormRendererComponent
 *
 * Component responsible for attaching the controls to the gridster
 * layout mechanism. It establishes a unique form state instance within
 * the FormRendererService and informs it of changes to consumer
 * supplied controls or formGroup values
 *
 * The FormRendererService is also accessed to obtain the fully processed
 * control list that is suitable to pass to gridster and IncrudableControlPicker
 */
export class FormRendererComponent implements OnDestroy {
  /**
   * The raw form control definition prior to any runtime processing
   * The form controls to render.
   */
  @Input()
  set controls(valueChange: Control[] | undefined) {
    if (valueChange) {
      this.frs.updateControls(this.instanceId, valueChange);
    }
  }

  /**
   * A consumer supplied Angular FormGroup
   * This is used as the FormGroup that will be modified when the
   * control definition list is processed. Though not required,
   * this is helpful when a consumer may want to retain a reference
   * to instance of the formGroup that is used for rendering and user
   * input capturing.
   */
  @Input()
  set form(valueChange: FormGroup | undefined) {
    if (valueChange) {
      this.frs.setFormForInstance(this.instanceId, valueChange);
    }
  }

  /**
   * Unique ID used to associate each componenet instance to a FormState
   */
  private instanceId = v4();

  /**
   * The fully processed controls. The resulting entrys are used by
   * gridster and IncrudableControlPicker. All changes to formGroup
   * references and control definitions are handled internal to the FormState
   */
  gridItems = this.frs.setFormForInstance(this.instanceId);

  /**
   * Configuratino object for Gridster. At the moment this is hard coded
   * But it is likely that we will need these properties to be data driven
   */
  options: GridsterConfig = {
    gridType: 'fixed',
    fixedColWidth: 200,
    fixedRowHeight: 100,
    draggable: {
      enabled: false
    }
  };

  constructor(private frs: FormRendererService) {}

  /**
   * Prevent memory leaks by tearing down this instances FormState
   */
  ngOnDestroy() {
    this.frs.removeForm(this.instanceId);
  }

  /**
   * trackItems is used by the template to establish a trackBy when iterating
   * over the list of Grid Items
   *
   * @param _index array index of array entry being tracked
   * @param item Array entry whose identity is being determined
   */
  trackItems(_index: number, item: { control: RuntimeControl }) {
    return item.control.propertyName;
  }
}
