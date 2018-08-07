import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import Clusterize from 'clusterize.js';
import { MockDataService } from '../../services/mock-data.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-clusterize',
  templateUrl: './clusterize.component.html',
  styleUrls: ['./clusterize.component.css']
})
export class ClusterizeComponent implements OnInit, AfterViewInit, OnDestroy {

  public mockDataArray: Array<any> = [];
  public mockData: BehaviorSubject<any>;
  public mockDataSubscription: Subscription;
  public mockBehaviourSubscription: Subscription;
  public totalRows = 0;

  constructor(private mockDataService: MockDataService) {
    this.mockData = new BehaviorSubject('');
  }

  ngOnInit() {
    this.mockDataSubscription = this.mockDataService.getData()
      .subscribe(data => {
        this.mockDataArray = [];
        for (const rowItem of data.cells) {
             let row = '<tr>';
             for ( const col  of rowItem ) {
               row += `<td style="background-color: ${col.cellColor}; padding: .2em .5em; border: 1px solid #dddddd ">` +
                 + col.value + '</td>';
             }
           row += '</tr>';
          this.mockDataArray.push(row);
        }
        this.mockData.next(this.mockDataArray);
      });
  }

  ngAfterViewInit() {
    // this.mockBehaviourSubscription = this.mockData.subscribe(data => {
    //   if (data !== undefined) {
    //     const clusterize = new Clusterize({
    //       scrollId: 'scrollArea',
    //       contentId: 'contentArea',
    //       rows: data,
    //       rows_in_block: 25,
    //       blocks_in_cluster: 2
    //     });
    //   }
    // });
    this.renderData();
  }
  private renderData() {
    const clusterize = new Clusterize({
      scrollId: 'scrollArea',
      contentId: 'contentArea',
      rows_in_block: 25,
      blocks_in_cluster: 2
    });
    this.mockBehaviourSubscription = this.mockData.subscribe(
      data => {
        console.time('renderData2');
        clusterize.update(data);
        this.totalRows = clusterize.getRowsAmount();
        console.timeEnd('renderData2');
      }
    );

  }

  ngOnDestroy() {
    if (this.mockBehaviourSubscription) {
      this.mockBehaviourSubscription.unsubscribe();
    }
    if (this.mockDataSubscription) {
      this.mockDataSubscription.unsubscribe();
    }
  }
}
