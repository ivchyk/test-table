import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule  } from './app-routing.module';
import { ClusterizeComponent } from './decisions/clusterize/clusterize.component';
import { MockDataService } from './services/mock-data.service';
import { PrimengComponent } from './decisions/primeng/primeng.component';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { jqxPivotGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxpivotgrid';
import { JgridComponent } from './decisions/jgrid/jgrid.component';

import { TreeGridComponent } from './decisions/tree-grid/tree-grid.component';
import { jqxTreeGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtreegrid';

import { MygridComponent } from './decisions/mygrid/mygrid.component';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { jqxListBoxComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxlistbox';
import { PivotComponent } from './decisions/pivot/pivot.component'

import { AgGridModule } from 'ag-grid-angular';
import { AgGridComponent } from './decisions/ag-grid/ag-grid.component'
import { HttpClientModule } from '@angular/common/http';
import 'ag-grid-enterprise';

@NgModule({
  declarations: [
    AppComponent,
    ClusterizeComponent,
    PrimengComponent,
    jqxPivotGridComponent,
    JgridComponent,
    TreeGridComponent,
    jqxTreeGridComponent,
    MygridComponent,
    jqxGridComponent,
    jqxListBoxComponent,
    PivotComponent,
    AgGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    MockDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
