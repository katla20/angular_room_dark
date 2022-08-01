import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'segment',
  template: `<div class="cell-grid" [class]="property">
                <ng-template [ngIf]="property=='bulb'">
                  <svg-icon
                      src="/assets/icons/bulb.svg"
                      [svgStyle]="{
                        'width.px': 18,
                        'padding.px': 0,
                        'margin.px': 0
                      }"
                      [stretch]="true"
                    ></svg-icon>
                </ng-template>
            </div>`,
  styles: [
    `.cell-grid {
      padding: 0.5em;
      width: 40px;
      height: 40px;
    }
    .bulb {
      background-color: greenyellow;
    }
    .light{
      background-color: greenyellow;
    }
    .dark{
        background: darkgray;
    }`,
  ],
})
export class SegmentComponent implements OnInit {
  @Input() light_: boolean = false;
  @Input() bulb_: boolean = false;

  property: string = '';

  constructor() {}

  ngOnInit(): void {
    this.property = this.setProperty(this.light_, this.bulb_);
    //debugger
  }

  setProperty(_light: boolean, _bulb: boolean) {
    console.log('property =', _light, _bulb);
    if (!_light && !_bulb) {
      return 'dark';
    }

    if (_bulb) {
      return 'bulb';
    } else {
      return 'light';
    }
  }
}
