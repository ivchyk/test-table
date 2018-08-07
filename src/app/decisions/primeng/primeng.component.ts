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
  public groupCategoryData: any;
  constructor(private mockDataService: MockDataService) {}

  ngOnInit() {
    this.mockDataSubscription = this.mockDataService.getDataV2()
      .subscribe(data => {
        this.mockData = data.cells;
       // console.log(this.mockData);
        // this.groupCategoryData = data.groupCategory;
        // console.log(this.groupCategoryData);
       // this.updateRowGroupMetadata();
       //  console.log(`row group meta data`, this.rowGroupMetadata);
        this.cols = [];
        for (let col = 0; col < data.sizeY; col++) {
          const incCol = col + 1;
          const columnName = `Column ${incCol}`;
          this.cols.push({header: columnName, field: 'value' });
        }
      });
  }
  private  updateRowGroupMetadata() {
    this.rowGroupMetadata = {};
    if (this.groupCategoryData.length > 0 && this.groupCategoryData.length === this.mockData.length ) {
      for (let  i = 0; i < this.mockData.length; i++) {
        const groupCategory = this.groupCategoryData[i];
        if (i === 0) {
          this.rowGroupMetadata[groupCategory] = {index: 0, size: 1};
        } else {
          const previousRowData = this.mockData[i - 1];
          const previousRowGroup = this.groupCategoryData[i - 1];
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
