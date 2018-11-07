import { Component } from '@angular/core';

@Component({
  selector: 'app-control-list',
  templateUrl: './control-list.component.html',
  styleUrls: ['./control-list.component.css']
})
export class ControlListComponent {

  controlList = [
    { cols: 1, rows: 1, y: 0, x: 0, dragEnabled: true, data: { displayName: 'Control 1' } },
    { cols: 1, rows: 1, y: 0, x: 0, dragEnabled: true, data: { displayName: 'Control 2' } },
    { cols: 1, rows: 1, y: 0, x: 0, dragEnabled: true, data: { displayName: 'Control 3' } },
    { cols: 1, rows: 1, y: 0, x: 0, dragEnabled: true, data: { displayName: 'Control 4' } },
    { cols: 1, rows: 1, y: 0, x: 0, dragEnabled: true, data: { displayName: 'Control 5' } }
  ];

}
