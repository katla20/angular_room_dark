import { Component, VERSION } from '@angular/core';
import { cellState } from './interfaces/data.interface';
import { AuthService } from './services/auth.service';
import { RestService } from './services/rest.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public tittle = 'GrainChain Grid Proyect';
  public dimension = 'x[5],y[7]';
  public bulbs = '6';
  private selectedFile;
  public readyUpload: boolean = true;
  // cellState
  // bulb (true o false)
  // light (true o false)
  // wall (true o false)
  public map_grid: Array<Array<cellState>> = [
    [
      { light: false, bulb: false, wall: false },
      { light: true, bulb: false, wall: false },
      { light: true, bulb: false, wall: false },
      { light: true, bulb: false, wall: false },
    ],
    [
      { light: false, bulb: false, wall: true },
      { light: true, bulb: true, wall: false },
      { light: false, bulb: false, wall: true },
      { light: false, bulb: false, wall: true },
    ],
  ];

  constructor(public rest: RestService, private _authToken: AuthService) {}

  ngOnInit(): void {
    console.log('holaaa');
    this.onLogin();
    //debugger;
  }

  onLogin() {
    this._authToken.authToken().subscribe((resp: any) => {
      console.log(resp);
    });
  }

  ligthGrid(): Array<Array<cellState>> {
    console.log(this.map_grid);
    return this.map_grid;
  }
  initGrid() {
    this.rest.getDataGrid().subscribe((resp: any) => {
      this.map_grid = resp;
      console.log(this.map_grid);
    });
  }
  randomGrid() {
    this.rest.randomDataGrid().subscribe((resp: any) => {
      this.map_grid = resp;
      console.log(this.map_grid);
    });
  }

  loadTxt(data: Array<Array<0 | 1>>) {
    // this.loadMatrix(data);
    // this.testMatrix.testPatterns(this.tempMatrixs);
    // this.showOriginalMatrix()
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    console.log(event);
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, 'UTF-8');
    fileReader.onload = () => {
      let data: Array<Array<0 | 1>> = JSON.parse(
        fileReader.result as string
      ) as Array<Array<any>>;
      console.log(data);
    };
  }
}
