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
    jqxListBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    FormsModule,
    CommonModule

  ],
  providers: [
    MockDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
