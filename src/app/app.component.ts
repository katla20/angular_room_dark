import { Component, VERSION } from '@angular/core';
import {
  allData,
  cellState,
  matrix,
  positions,
} from './interfaces/data.interface';
import { AuthService } from './services/auth.service';
import { RestService } from './services/rest.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public tittle = '';
  public dimension: Array<[]> = [];
  public bulbs: number = 0;
  private selectedFile: File;
  public readyUpload: boolean = true;
  public tempMatrixs: Array<matrix> = new Array();
  public map_grid: Array<Array<cellState>> = [];
  //public map_grid: Array<Array<0 | 1>> = [];

  constructor(public rest: RestService, private _authToken: AuthService) {}

  ngOnInit(): void {
    console.log('init');
    this.initGrid();
    //this.onLogin();
    //debugger;
  }

  onLogin() {
    this._authToken.authToken().subscribe((resp: any) => {
      console.log(resp);
    });
  }

  getDataGrid(): void {
    this.rest.getGrid().subscribe((resp: any) => {
      this.map_grid = resp;
    });
    console.log(this.map_grid);
  }

  initGrid(): void {
    this.map_grid = this.rest.mapGrid(true);
    console.log(this.map_grid);
  }
  randomGrid() {
    this.map_grid = this.rest.mapGrid(false);
    this.rest.randomGrid().subscribe((resp: any) => {
      this.map_grid = resp;
    });
    console.log('randomGrid');
  }

  ligthGrid(): void {
    //solution
    this.rest.randomGrid().subscribe((resp: any) => {
      this.map_grid = resp;
    });
    console.log('ligthGrid');
  }

  sendToProcess(data: Array<Array<0 | 1>>) {
    this.rest.sendDataMatrix(data).subscribe((resp: any) => {
      console.log('grid response', resp);
      this.map_grid = resp;
    });
    console.log(this.map_grid);
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
          this.sendToProcess(data);
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
