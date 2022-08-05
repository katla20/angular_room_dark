import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'segment',
  template: `<div class="cell-grid" [class]="state_">
                <ng-template [ngIf]="state_=='bulb'">
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
      width: 45px;
      height: 45px;
    }
    .bulb {
      background-color: greenyellow;
    }
    .light{
      background-color: greenyellow;
      border-color:grey;
    }
    .dark{
        background: darkgray;
    }`,
  ],
})
export class SegmentComponent implements OnInit {
  @Input() state_: string = '';

  constructor() {}

  ngOnInit(): void {
    //debugger
  }
}
