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
  public tittle = 'GrainChain Grid Proyect';
  public dimension: Array<[]> = [];
  public bulbs: number = 0;
  private selectedFile: File;
  public readyUpload: boolean = true;
  tempMatrixs: Array<matrix> = new Array();

  public solved_grid: Array<Array<cellState>> = [];

  public map_grid: Array<Array<0 | 1>> = [];

  constructor(public rest: RestService, private _authToken: AuthService) {}

  ngOnInit(): void {
    console.log('holaaa');
    this.initGrid();
    //this.onLogin();
    //debugger;
  }

  processDataToView(matrix: matrix, showMatrix: allData) {
    showMatrix = { data: new Array() };

    for (let idxRow = 0; idxRow < matrix.cntRow; idxRow++) {
      let row = matrix.positions.filter((pos: positions) => {
        return pos.idxRow == idxRow;
      });
      // row = this.testMatrix.sort(row, ['valueRow', 'valueColumn']);
      // let newrow: Array<cellState> = row.map((pos: positions) => {
      //   let newshowPos: cellState = {
      //     wall: pos.wall,
      //     bulb: pos.bulb,
      //     light: pos.light,
      //   };
      //   return newshowPos;
      // });
      // showMatrix.data.push(newrow);
    }
    this.solved_grid = [...showMatrix.data];
    console.log(this.solved_grid);
  }
  onLogin() {
    this._authToken.authToken().subscribe((resp: any) => {
      console.log(resp);
    });
  }

  ligthGrid(): void {
    this.rest.refactorDataMaptoGrid(true);
    console.log(this.map_grid);
  }

  GetDataGrid(): void {
    this.rest.getDataGrid().subscribe((resp: any) => {
      this.map_grid = resp;
    });
    console.log(this.map_grid);
  }

  initGrid(): void {
    this.solved_grid = this.rest.refactorDataMaptoGrid(false);
    console.log(this.map_grid);
  }
  randomGrid() {
    this.solved_grid = this.rest.refactorDataMaptoGrid(false);
    this.rest.randomDataGrid().subscribe((resp: any) => {
      this.map_grid = resp;
    });
    console.log('randomGrid');
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
