import { Component, ViewChild } from '@angular/core';
import { jqxTreeGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtreegrid';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-tree-grid',
  templateUrl: './tree-grid.component.html',
  styleUrls: ['./tree-grid.component.css']
})
export class TreeGridComponent {
  @ViewChild('TreeGrid') treeGrid: jqxTreeGridComponent

  constructor(private mockDataService: MockDataService) {}

  data: Array<any> = [];
  source: any;
  dataAdapter: any;
  columns: any[];
  columnGroups: any[];

  ngOnInit() {
    //this.mockDataService.treeGridMockData()
    this.mockDataService.treeGridMockData()
    .subscribe(data => {
      console.log(data);
       this.data = data;
      this.source =
      {
          dataType: 'json',
          dataFields: [
              { name: 'name', type: 'string' },
              { name: 'budget', type: 'number' },
              { name: 'id', type: 'number' },
              { name: 'children', type: 'array' },
              { name: 'location', type: 'string' }
          ],
          hierarchy:
          {
              root: 'children'
          },
          localData: this.data,
          id: 'id'
      };
      this.dataAdapter = new jqx.dataAdapter(this.source);

  this.columns = [
      { text: 'Name', columnGroup: 'JSTCorp', align: 'center', dataField: 'name', width: 300 },
      { text: 'Budget', columnGroup: 'JSTCorp', cellsAlign: 'center', align: 'center', dataField: 'budget', cellsFormat: 'c2', width: 250 },
      { text: 'Location', columnGroup: 'JSTCorp', dataField: 'location', cellsAlign: 'center', align: 'center', width: 250 }
  ];

  this.columnGroups = [{ text: 'JST Corp.', name: 'JSTCorp', align: 'center' }];
    });
  }





  ready(): void {
      this.treeGrid.expandRow(1);
      this.treeGrid.expandRow(2);
  }
}
