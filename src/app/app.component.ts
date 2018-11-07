import { Component } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { transferArrayItem } from '@angular/cdk/drag-drop';

interface GridData<T> extends GridsterItem {
  data?: T;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  options: GridsterConfig;
  dashboard: GridData<{ displayName: string }>[];

  static itemChange(item, itemComponent) {
    console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    console.info('itemResized', item, itemComponent);
  }

  constructor() {
    this.options = {
      gridType: 'fixed',
      fixedColWidth: 200,
      fixedRowHeight: 200,
      resizable: {
        enabled: true
      },
      draggable: {
        enabled: true
      },
      itemChangeCallback: AppComponent.itemChange,
      itemResizeCallback: AppComponent.itemResize,
      pushItems: true
    };

    this.dashboard = [
      { cols: 2, rows: 1, y: 0, x: 0, dragEnabled: true, data: { displayName: 'Starting Control 1' } },
      { cols: 2, rows: 2, y: 0, x: 2, dragEnabled: true, data: { displayName: 'Starting Control 2' } }
    ];
  }

  changedOptions() {
    this.options.api.optionsChanged();
  }

  dropped(event) {
    console.log('drdopped', event);
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
  }
}
