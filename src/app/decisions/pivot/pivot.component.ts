import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MockDataService } from '../../services/mock-data.service'
import { jqxPivotGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxpivotgrid';

@Component({
  selector: 'app-component',
  templateUrl: './pivot.component.html'
})
export class PivotComponent implements OnInit, AfterViewInit {

  @ViewChild('mypivot') mypivot : jqxPivotGridComponent;

  data: any[] = [];
  datafields: any[] = [];
  columns: any[] = [];
  pivotDataSource: null;
  dataAdapter: any;

  constructor(private mockDataService: MockDataService) {}

  ngAfterViewInit() {
  }

  ngOnInit() {

    this.mockDataService.getDataV4()
      .subscribe(pivotData => {
        console.log(pivotData)
        this.datafields = pivotData.datafields;
        this.columns = pivotData.columns;
        this.data = pivotData.cells

        let source =
          {
            localdata: this.data,
            datatype: "array",
            datafields:
              this.datafields
          };

        let dataAdapter = new jqx.dataAdapter(source);
        dataAdapter.dataBind();

        let values: Array<any> = [];
        values.push({ dataField: 'Name10', width: 100, 'function': 'median', text: 'Median', formatSettings: { align: 'right', prefix: '', decimalPlaces: 2 }})
        for (const colIndex in this.columns) {
          if (parseInt(colIndex) > 2)
          values.push({ dataField: this.columns[colIndex].datafield, width: 100, 'function': 'min', text: this.columns[colIndex].text, formatSettings: { align: 'left', prefix: '', decimalPlaces: 2 }})
        }

        this.pivotDataSource = new jqx.pivot(
          dataAdapter,
          {
            customAggregationFunctions: {
              'median': function (values) {
                if (values.length <= 2)
                  return 0;
                let median;
                if (values.length % 2 == 0) {
                  const index1 = Math.floor( (values.length + 3) / 2);
                  const index2 = Math.ceil( (values.length + 3) / 2);
                  median = (values[index1] + values[index2]) / 2;
                } else {
                 const index = (values.length + 3) / 2;
                  median = values[index];
                }

                return median;
              }
            },
            pivotValuesOnRows: false,
            totals: {rows: {subtotals: true, grandtotals: true}, columns: {subtotals: false, grandtotals: false}},
            rows: [{ dataField: 'Name0', height: 30 }, { dataField: 'Name2'}],
            columns: [],
            filters: [
            ],
            values: values
          }
        );


      });
  }

  myCellsRenderer(pivotCell): string {

    let colors = ['rgba(248, 105, 107, 255)', 'rgba(250,170,120,255)', 'rgba(255,230,130,255)', 'rgba(175,215,130,255)', 'rgba(100,190,120,255)'];
    let selectedColors = ['rgba(228, 85, 87, 255)', 'rgba(230,150,100,255)', 'rgba(235,210,110,255)', 'rgba(155,195,110,255)', 'rgba(80,170,100,255)'];

    let val = Math.min(pivotCell.value, 20);
    let backgroundColor = pivotCell.isSelected ? selectedColors[Math.round(val / 5)] : colors[Math.round(val / 5)];

    if (pivotCell.pivotColumn.text != 'Column 4')
      backgroundColor = pivotCell.isSelected  ? 'rgba(225, 225, 225, 255)' : 'rgba(255, 255, 255, 255)';

    if (pivotCell.isSelected)
      backgroundColor

    let cellText = pivotCell.value == 0 ? '' : pivotCell.formattedValue;

    return "<div style='background: " + backgroundColor + "; width: calc(100%-8px); height: 100%; padding: 4px; margin: 0px;'>" + cellText + "</div>";
  }

}
