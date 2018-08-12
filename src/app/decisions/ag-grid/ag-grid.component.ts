import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';
import { MockDataService } from '../../services/mock-data.service'

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html'
})
export class AgGridComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridNg2;

  columnDefs = [
    // {headerName: 'Make', field: 'make', rowGroupIndex: 0 },
    // {headerName: 'Price', field: 'price'}
  ];

  autoGroupColumnDef = {
    headerName: 'Name0',
    field: 'Name0',
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      checkbox: true
    }
  };
  rowData: any;

  constructor(private mockDataService: MockDataService) {

  }

  ngOnInit() {
    this.mockDataService.getDataV4()
      .subscribe(data => {
        this.rowData = data.cells;
        this.columnDefs = data.columns.map (col =>  {
          let item = {};
          item['headerName'] =  col.text;
          item['field'] =  col.datafield;
          return item;
        });
        this.columnDefs[0]['rowGroupIndex'] = 0;
      });

  }
}
