import { Component, ViewChild, AfterViewInit } from '@angular/core'
import { jqxPivotGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxpivotgrid';

@Component({
  selector: 'app-jgrid',
  templateUrl: './jgrid.component.html'
})
export class JgridComponent implements AfterViewInit {

  @ViewChild('pivotGrid1') pivotGrid1: jqxPivotGridComponent;

	constructor()
	{
    console.time(

    'check time'
    )
    this.pivotDataSource = this.createPivotDataSource();
	}

	ngAfterViewInit(): void {
	  //  this.pivotGrid1.getPivotRows().items[0].expand();
     this.pivotGrid1.refresh();
     console.timeEnd('check time');
    //  this.pivotGrid1.setOptions({'theme': 'dark'});
  }

  pivotDataSource: null;

	createPivotDataSource(): any {
		// prepare sample data
		let data = new Array();

		let firstNames =
		[
			"Andrew", "Nancy", "Shelley", "Regina", "Yoshi", "Antoni", "Mayumi", "Ian", "Peter", "Lars"
		];

		let lastNames =
		[
			"Fuller", "Davolio", "Burke"
		];

		let productNames =
		[
			"Black Tea", "Green Tea", "Caffe Espresso", "Doubleshot Espresso", "Caffe Latte"
    ];

    for (let i = 1; i < 25; i++) {
      productNames.push("Column " + i);
    }

		let priceValues =
		[
			"2.25", "1.5", "3.0", "3.3", "4.5", "3.6", "3.8", "2.5", "5.0", "1.75", "3.25", "4.0"
		];

		for (let i = 0; i < 5000; i++) {
			let row = {};
			let productindex = Math.floor(Math.random() * productNames.length);
			let price = parseFloat(priceValues[productindex]);
			let quantity = 1 + Math.round(Math.random() * 10);

			row["firstname"] = firstNames[Math.floor(Math.random() * firstNames.length)];
			row["lastname"] = lastNames[Math.floor(Math.random() * lastNames.length)] + i;
			row["productname"] = productNames[productindex];
			row["price"] = price;
			row["quantity"] = quantity;
      row["total"] = price * quantity;


			data[i] = row;
		}

		// create a data source and data adapter
		let source =
		{
		   localdata: data,
		   datatype: "array",
		   datafields:
		   [
				{ name: 'firstname', type: 'string' },
				{ name: 'lastname', type: 'string' },
				{ name: 'productname', type: 'string' },
				{ name: 'quantity', type: 'number' },
				{ name: 'price', type: 'number' },
				{ name: 'total', type: 'number' }
		   ]
		};

		let dataAdapter = new jqx.dataAdapter(source);
		dataAdapter.dataBind();

		// create a pivot data source from the dataAdapter
		let pivotDataSource = new jqx.pivot(
		   dataAdapter,
		   {
				pivotValuesOnRows: true,
				rows: [{ dataField: 'firstname' }, { dataField: 'lastname'}],
				columns: [{ dataField: 'productname' }],
				values: [
					{ dataField: 'price', 'function': 'sum', text: 'sum', width: NamedNodeMap, formatSettings: { prefix: '$', decimalPlaces: 2 } },
					{ dataField: 'price', 'function': 'count', text: 'count' },
					{ dataField: 'price', 'function': 'average', text: 'average', height: 50, formatSettings: { prefix: '$', decimalPlaces: 2} }
				]
		   }
		);

		return pivotDataSource;
	}

}
