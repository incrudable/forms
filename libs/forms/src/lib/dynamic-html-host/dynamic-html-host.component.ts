import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'incrudable-dynamic-html-host',
  template: '<div #host></div>',
  styleUrls: ['./dynamic-html-host.component.scss']
})
export class DynamicHtmlHostComponent implements OnInit {
  @Input() selector = '';
  @Input() propMap: Record<string, any> | undefined;
  @ViewChild('host', { static: true }) host: ElementRef | undefined;

  ngOnInit() {
    const cust = document.createElement(this.selector);
    const propList = (this.propMap && createPropList(this.propMap)) || [];
    if (this.host) {
      this.host.nativeElement.appendChild(cust);
    }
    propList.forEach(prop => {
      (cust as any)[prop.key] = prop.value;
    });
  }
}

function createPropList(propMap: Record<string, any>) {
  const propList: { key: string; value: any }[] = [];
  Object.keys(propMap).forEach(key =>
    propList.push({ key, value: propMap[key] })
  );
  return propList;
}
