import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'segment',
  template: `<div class="quadrant" >
              <div [class]="attr">
                <ng-template [ngIf]="attr=='bulb'">
                    <i class="bi bi-brightness-high"></i>
                </ng-template>
                </div>
            </div>`,
  styles: [`h1 { font-family: Lato; }`],
})
export class SegmentComponent implements OnInit {
  @Input() withLight_: boolean = false;
  @Input() bulb_: boolean = false;

  attr: string = '';

  constructor() {}

  ngOnInit(): void {
    console.log('holaaa=', this.withLight_, this.bulb_);
    this.attr = this.createAttribute(this.withLight_, this.bulb_);
    //debugger
  }

  createAttribute(_withLight: boolean, _bulb: boolean) {
    console.log('Attribute=', _withLight, _bulb);

    if (_withLight && _bulb) {
      return 'bulb';
    } else if (_withLight && !_bulb) {
      return 'light';
    }

    return 'dark';
  }
}
