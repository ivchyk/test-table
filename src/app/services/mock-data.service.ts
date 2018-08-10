import { Injectable } from '@angular/core';
import { interval, Observable, of, Subscription } from 'rxjs';
import { sample, take, map, mergeMap, timestamp } from 'rxjs/operators';
import { TableData } from '../source/table-data';
import { CurrencyIndex } from '../../../node_modules/@angular/common/src/i18n/locale_data';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private cells: Array<Array<any>> = [];
  private cellsData: Array<any> = [];
  private tableHeader: Array<any>;
  private row: number = 15000;
  private col: number = 20;
  private rowDelta: number = 0; // Шанс зміни кількості рядків.
  private cellDelta: number = 0.1; // Шанс зміни значення комірки.
  private groupFactor: Array<any> = [];

  constructor() {}

  private  initData(): void {
    const chanceRowCount = Math.floor(Math.random() * 10) / 10;
    if (chanceRowCount < this.rowDelta) {
      const newRowCount  = Math.floor(Math.random() * 10) + 1;
      if (newRowCount < this.row ) {
        this.cells.slice(newRowCount, this.row - 1);
      }
      this.row = newRowCount;
    }
    const groupFactorQuantity = Math.floor(this.row / 10) ;
    for (let rowIndex = 0; rowIndex < this.row; rowIndex++) {
      // determine row group factor
      const groupIdx =  Math.floor(Math.random() * groupFactorQuantity) + 1;
      this.groupFactor[rowIndex] = `Group category ${groupIdx}`;
      for (let colIndex = 0; colIndex < this.col; colIndex++) {
        const chanceCellValue = Math.floor(Math.random() * 10) / 10;
        if (this.cells[rowIndex] === undefined) {
          this.cells[rowIndex] = Array<any>();
        }
        if (this.cells[rowIndex][colIndex] === undefined
         || chanceCellValue < this.cellDelta
        ) {
          this.cells[rowIndex][colIndex] = {
            'value': Math.floor(Math.random() * 500) + 1,
            'cellColor': '#' + Math.floor(Math.random() * 16777215).toString(16) + '20'
          };
        }
      }
    }
  }

  private initDataV2(): void {
    const chanceRowCount = Math.floor(Math.random() * 10) / 10;
    if (chanceRowCount < this.rowDelta) {
      const newRowCount  = Math.floor(Math.random() * 10) + 1;
      if (newRowCount < this.row ) {
        this.cells.slice(newRowCount, this.row - 1);
      }
      this.row = newRowCount;
    }
    const categories = this.makeCategories(this.row, 0);
    for (let rowIndex = 0; rowIndex < this.row; rowIndex++) {
      // determine row group factor

      if (this.cellsData[rowIndex] === undefined) {
        const columns: Array<number> = [];
        this.cellsData[rowIndex] = {'columns': columns, 'category': '' };
      }

      if (categories[rowIndex] !== undefined) {
        this.cellsData[rowIndex]['category'] = categories[rowIndex];
      }

      for (let colIndex = 0; colIndex < this.col; colIndex++) {
        const chanceCellValue = Math.floor(Math.random() * 10) / 10;
        if (this.cellsData[rowIndex]['columns'][colIndex] === undefined
          || chanceCellValue < this.cellDelta
        ) {
          this.cellsData[rowIndex]['columns'][colIndex] = {
            'value': Math.floor(Math.random() * 500) + 1,
            'cellColor': '#' + Math.floor(Math.random() * 16777215).toString(16) + '20'
          };
        }
      }
    }
  }

  private initDataV3(): void {
    const chanceRowCount = Math.floor(Math.random() * 10) / 10;
    if (chanceRowCount < this.rowDelta) {
      const newRowCount  = Math.floor(Math.random() * 10) + 1;
      if (newRowCount < this.row ) {
        this.cells.slice(newRowCount, this.row - 1);
      }
      this.row = newRowCount;
    }
    for (let rowIndex = 0; rowIndex < this.row; rowIndex++) {
      // determine row group factor

      if (this.cellsData[rowIndex] === undefined) {
        const columns: Array<number> = [];
        this.cellsData[rowIndex] = this.takeRow(rowIndex);
      }
    }
  }

  public  getData() {
    const source = interval(3000);
    return source.pipe(
      map (_ => {
        console.time('init data');
        this.initData();
        console.timeEnd('init data');
        return {cells: this.cells, sizeX: this.row, sizeY: this.col, groupCategory: this.groupFactor};
      }),
     take(5)
    );
  }

  public  getDataV2() {
    const source = interval(3000);
    return source.pipe(
      map (_ => {
        this.initDataV2();
        return {cells: this.cellsData, sizeX: this.row, sizeY: this.col};
      }),
      take(1)
    );
  }

  public  getDataV3() {
    const source = interval(3000);
    return source.pipe(
      map (_ => {
        this.initDataV3();
        return {cells: this.cellsData, sizeX: this.row, sizeY: this.col};
      }),
      take(1)
    );
  }

  private makeCategories(rowsAmount: number, rowIndex: number,  groupSize: number = 20) {
    if (groupSize === 0) {
      return [];
    }
    const categories: Array<string> = [];
    let categoryAmount = 0;
    let rows = rowsAmount;
    while (rows > groupSize) {
       rows = Math.floor(rows / groupSize);
       categoryAmount++;
    }

    if (categoryAmount > 0) {
      let counter = 1;
      let groupCounter = 1;

      for (let  i = 0; i < rowsAmount; i++) {
        categories[i] = 'Category ' + groupCounter;
        if (counter === groupSize) {
          counter = 1;
          groupCounter++;
        } else {
          counter++;
        }
      }
      return categories;
    }

    return [];
  }

  private takeRow(rowIndex) {
    let index = rowIndex;
    if (TableData[rowIndex] === undefined) {
      const tableDataSize = TableData.length;
      const randomIndex = Math.floor(Math.random() * tableDataSize);
      index = randomIndex;
    }
    return TableData[index];
  }

  public treeGridMockData() {
    this.cellsData = [
      {
          'id': '1', 'name': 'Corporate Headquarters', 'budget': '1230000', 'location': 'Las Vegas',
          'children':
          [
            {
              'id': '2', 'name': 'Finance Division', 'budget': '423000', 'location': 'San Antonio',
              'children':
              [
                  { 'id': '3', 'name': 'Accounting Department', 'budget': '113000', 'location': 'San Antonio' },
                  {
                      'id': '4', 'name': 'Investment Department', 'budget': '310000', 'location': 'San Antonio',
                      'children':
                      [
                          { 'id': '5', 'name': 'Banking Office', 'budget': '240000', 'location': 'San Antonio' },
                          { 'id': '6', 'name': 'Bonds Office', 'budget': '70000', 'location': 'San Antonio' },
                      ]
                  }
              ]
          },
          {
              'id': '7', 'name': 'Operations Division', 'budget': '600000', 'location': 'Miami',
              'children':
              [
                  { 'id': '8', 'name': 'Manufacturing Department', 'budget': '300000', 'location': 'Miami' },
                  { 'id': '9', 'name': 'Public Relations Department', 'budget': '200000', 'location': 'Miami' },
                  { 'id': '10', 'name': 'Sales Department', 'budget': '100000', 'location': 'Miami' }
              ]
          },
          { 'id': '11', 'name': 'Research Division', 'budget': '200000', 'location': 'Boston' }
          ]
      },
      {
        'id': '12', 'name': 'Another department', 'budget': '1230000', 'location': 'Las Vegas',
        'children':
        [
          {
            'id': '13', 'name': 'Finance Division', 'budget': '423000', 'location': 'San Antonio',
            'children':
            [
                { 'id': '14', 'name': 'Accounting Department', 'budget': '113000', 'location': 'San Antonio' },
                {
                    'id': '15', 'name': 'Investment Department', 'budget': '310000', 'location': 'San Antonio',
                    'children':
                    [
                        { 'id': '16', 'name': 'Banking Office', 'budget': '240000', 'location': 'San Antonio' },
                        { 'id': '17', 'name': 'Bonds Office', 'budget': '70000', 'location': 'San Antonio' },
                    ]
                }
            ]
        },
        {
            'id': '18', 'name': 'Operations Division', 'budget': '600000', 'location': 'Miami',
            'children':
            [
                { 'id': '19', 'name': 'Manufacturing Department', 'budget': '300000', 'location': 'Miami' },
                { 'id': '20', 'name': 'Public Relations Department', 'budget': '200000', 'location': 'Miami' },
                { 'id': '21', 'name': 'Sales Department', 'budget': '100000', 'location': 'Miami' }
            ]
        },
        { 'id': '22', 'name': 'Research Division', 'budget': '200000', 'location': 'Boston' }
        ]
    }
  ];

  let j = 0;
  while (j < 5000) {
    this.cellsData[1].children[1].children.push({'id': '6', 'name': 'Bonds Office', 'budget': '70000', 'location': 'San Antonio'});
    j++;
  }
  const source = interval(3000);
    return source.pipe(
      map (_ => {
        // this.initDataV3();
        return this.cellsData;
      }),
      take(1)
    );
  }

  private pushRecord(structure: Array<any>, currentIndex: number) {
    structure.push({
      'id': currentIndex, 'name': 'Manufacturing Department', 'budget': '300000', 'location': 'Miami', 'children': []
    });
    return structure;
  }
}
