import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { MockDataService } from '../../services/mock-data.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-primeng',
  styleUrls: ['./primeng.component.css'],
  templateUrl: './primeng.component.html'
})
export class PrimengComponent implements OnInit, OnDestroy, AfterViewInit {
  public mockDataSubscription: Subscription;
  public mockData: any;
  public cols: any[];
  public rowGroupMetadata: any;
  constructor(private mockDataService: MockDataService) {}

  ngOnInit() {
    this.mockDataSubscription = this.mockDataService.getDataV2()
      .subscribe(data => {
        console.time('renderData2');
        this.mockData = data.cells;
        this.updateRowGroupMetadata();
        this.cols = [];
        for (let col = 0; col < data.sizeY; col++) {
          const incCol = col + 1;
          const columnName = `Column ${incCol}`;
          this.cols.push({header: columnName, field: 'value' });
          console.timeEnd('renderData2');
        }
      });
  }

  private  updateRowGroupMetadata() {
    this.rowGroupMetadata = {};
    if ( this.mockData.length ) {
      for (let  i = 0; i < this.mockData.length; i++) {
        const rowData = this.mockData[i];
        const groupCategory = rowData.category;
        if (i === 0) {
          this.rowGroupMetadata[groupCategory] = {index: 0, size: 1};
        } else {
          const previousRowData = this.mockData[i - 1];
          const previousRowGroup = previousRowData.category;
          if (groupCategory === previousRowGroup) {
            this.rowGroupMetadata[groupCategory].size++;
          } else {
            this.rowGroupMetadata[groupCategory] = { index: i, size: 1};
          }
        }
      }
    }
  }

  ngOnDestroy() {
    if (this.mockDataSubscription) {
      this.mockDataSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {}
}
