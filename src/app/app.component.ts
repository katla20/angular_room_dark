import { Component, VERSION } from '@angular/core';
import { cellState, matrix } from './interfaces/data.interface';
import { AuthService } from './services/auth.service';
import { RestService } from './services/rest.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public tittle = 'GrainChain Grid Proyect';
  public dimension: Array<[]> = [];
  public bulbs: number = 0;
  private selectedFile: File;
  public readyUpload: boolean = true;
  tempMatrixs: Array<matrix> = new Array();

  // public map_grid: Array<Array<cellState>> = [
  //   [
  //     { light: false, bulb: false, wall: false },
  //     { light: true, bulb: false, wall: false },
  //     { light: true, bulb: false, wall: false },
  //     { light: true, bulb: false, wall: false },
  //   ],
  //   [
  //     { light: false, bulb: false, wall: true },
  //     { light: true, bulb: true, wall: false },
  //     { light: false, bulb: false, wall: true },
  //     { light: false, bulb: false, wall: true },
  //   ],
  // ];
  public map_grid: Array<Array<cellState>> = [
    [
      { light: false, bulb: false, wall: false },
      { light: false, bulb: false, wall: false },
      { light: false, bulb: false, wall: false },
      { light: false, bulb: false, wall: false },
    ],
    [
      { light: false, bulb: false, wall: true },
      { light: false, bulb: false, wall: false },
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

  readTxt(data: Array<Array<0 | 1>>) {
    this.loadGrid(data);
    // this.testMatrix.testPatterns(this.tempMatrixs);
    // this.showOriginalMatrix()
  }

  private loadGrid(data: Array<Array<0 | 1>>) {
    console.log(data);
    //this.tempMatrixs = new Array();
    // this.tempMatrixs.push(new ModelMatrix([...data], 0));
    // let cntMatrix: number =
    //   this.testMatrix.modelPatterns.manyPatterns.length + 1;
    // for (let index = 0; index < cntMatrix; index++) {
    //   this.tempMatrixs.push(new ModelMatrix([...data], index + 1));
    // }
    // let showMatrix = { ...new ModelMatrix([...data], cntMatrix + 1) };
    // this.tempMatrixs.push(showMatrix);
  }

  onFileSelected(event) {
    let flag = false;
    this.selectedFile = event.target.files[0];
    console.log(event);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      try {
        let data: Array<Array<0 | 1>> = JSON.parse(
          fileReader.result as string
        ) as Array<Array<any>>;
        if (!!data && Array.isArray(data) && !!data.length) {
          data.forEach((col) => {
            console.log(col);
            if (!!col && Array.isArray(col) && !!col.length) {
            } else {
              flag = true;
            }
          });
        } else {
          flag = true;
        }

        if (!flag) {
          alert('Archivo Cargado Correctamente');
          this.readTxt(data);
        } else {
          alert('Archivo o Formato Incorrecto');
        }

        console.log(data);
      } catch (error) {
        alert('Archivo o Formato Incorrecto');
      }
    };

    fileReader.readAsText(this.selectedFile, 'UTF-8');
    console.log('The contents are:');
    console.log(this.selectedFile);
  }
}
