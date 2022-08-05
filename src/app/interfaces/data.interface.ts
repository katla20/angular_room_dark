export interface patterns {
  name: string;
  iterative?: typeSecuential;
  dataRows: Array<patternRow> | patternRow;
  cntMaxRows: number;
  cntMaxColumm: number;
}

export interface patternRow {
  valueColumm?: number;
  valueRow?: number;

  cntColumm: number;
  cntRow?: number;

  numberRow?: number;
  numberColumn?: number;

  sequential?: typeSecuential;
}

export interface typeSecuential {
  column?: direction;
  row?: direction;
}

export interface direction {
  reverse: boolean;
  priority: boolean;
}

export interface matrix {
  positions: Array<positions>;
  cntRow: number;
  cntColumn: number;
  dataOrigin: Array<Array<any>>;
  cntBulbs: number;
}

export interface positions {
  idxColumm: number;
  idxRow: number;
  valueColumn: number;
  valueRow: number;
  wall: boolean | 0 | 1;
  bulb: boolean;
  light: boolean;
  adjacentPos: nexPositionsMatrix;
}

export interface properties {
  state: string;
  positionx: number;
  positiony: number;
}

export interface allData {
  data: Array<Array<properties>>;
}

export interface nexPositionsMatrix {
  up: Array<positions>;
  down: Array<positions>;
  rigth: Array<positions>;
  left: Array<positions>;
}
