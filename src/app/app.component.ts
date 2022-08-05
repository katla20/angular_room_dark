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
  //public tempMatrixs: Array<matrix> = new Array();
  public mapGrid: Array<Array<cellState>> = new Array();
  public tempMatrix: Array<Array<0 | 1>> = new Array();

  constructor(public rest: RestService, private _authToken: AuthService) {}

  ngOnInit(): void {
    this.getDataGrid();
    console.log(this.mapGrid);
    //this.onLogin();
    const newuniq = [...new Set(this.mapGrid.map((item) => item))];
    //debugger;
  }

  onLogin() {
    this._authToken.authToken().subscribe((resp: any) => {
      console.log(resp);
    });
  }

  getDataGrid(): void {
    this.rest.getGrid().subscribe((resp: any) => {
      this.mapGrid = resp.data.grid;
    });
  }

  randomDataGrid() {
    this.rest.randomGrid().subscribe((resp: any) => {
      this.mapGrid = resp.data.grid;
    });
    console.log('randomGrid');
  }

  ligthGrid(): void {
    //solution
    this.rest.resolveGrid().subscribe((resp: any) => {
      this.mapGrid = resp.data.grid;
    });
    console.log('ligthGrid');
  }

  sendToProcess(data: Array<Array<0 | 1>>) {
    this.rest.sendDataMatrix(data).subscribe((resp: any) => {
      console.log('grid response', resp);
      this.mapGrid = resp;
    });
  }

  onFileSelected(event: any) {
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
