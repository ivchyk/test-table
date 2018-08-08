import { Component, OnInit, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.css']
})
export class SmartTableComponent implements OnInit, OnDestroy {
  settings = {
    columns: {
      name: {
        title: 'Name'
      },
      position: {
        title: 'Position'
      },
      office: {
        title: 'Office'
      },
      ext: {
        title: 'Ext'
      },
      startDate: {
        title: 'Start Date'
      },
      salary: {
        title: 'Salary'
      }
    }
  };

  data = [
    {
      'name': 'Victoria Cantrell',
      'position': 'Integer Corporation',
      'office': 'Croatia',
      'ext': `<strong>0839</strong>`,
      'startDate': '2015/08/19',
      'salary': 208.178
    }, {
      'name': 'Pearl Crosby',
      'position': 'In PC',
      'office': 'Cambodia',
      'ext': `<strong>8262</strong>`,
      'startDate': '2014/10/08',
      'salary': 114.367
    }, {
      'name': 'Colette Foley',
      'position': 'Lorem Inc.',
      'office': 'Korea, North',
      'ext': '8968',
      'startDate': '2015/07/19',
      'salary': 721.473
    }
  ];

  constructor() {}
  ngOnInit() {}
  ngOnDestroy() {}
}
