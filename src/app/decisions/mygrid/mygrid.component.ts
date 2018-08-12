import { Component, OnInit, ViewChild } from '@angular/core';
import { MockDataService } from '../../services/mock-data.service'
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';

@Component({
  selector: 'app-component',
  templateUrl: './mygrid.component.html'
})
export class MygridComponent implements OnInit {

  @ViewChild('mygrid') mygrid : jqxGridComponent;

  constructor(private  mockDataService: MockDataService) {}

  data: any[] = [];
  datafields: any[] = [];
  columns: any[] = [];
  source: any;
  dataAdapter: any;
  listBoxSource: any = [];
  columngroups: any = [];

  cellClass = (row: number, columnfield: any, value: number): string => {
    if (value < 100) {
      return 'red';
    }
    else if (value >= 100 && value < 500) {
      return 'yellow';
    }
    else return 'green';
  }

  ngOnInit(): void {
    // this.generateData();
    this.mockDataService.getDataV4()
      .subscribe(mock => {
        this.datafields = mock.datafields;
        this.columns = mock.columns;
        for (const colIndex in this.columns) {
          if (this.columns[colIndex].datafield === 'Name3') {
            this.columns[colIndex]['cellclassname'] = this.cellClass;
          }
          this.listBoxSource.push(
            {
              label: this.columns[colIndex].text,
              value: this.columns[colIndex].datafield,
              checked: true
            }
          );
        }
        this.columngroups = mock.colGroups;
        this.data = mock.cells;
        this.source =
          {
            localdata: this.data,
            datatype: 'array',
            datafields: this.datafields
          }

        this.dataAdapter = new jqx.dataAdapter(this.source);
      });
  }


  myListBoxOnCheckChange(event: any): void {
    this.mygrid.beginupdate();
    if (event.args.checked) {
      this.mygrid.showcolumn(event.args.value);
    }
    else {
      this.mygrid.hidecolumn(event.args.value);
    }
    this.mygrid.endupdate();
  };
}
