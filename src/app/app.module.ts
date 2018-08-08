import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule  } from './app-routing.module';
import { ClusterizeComponent } from './decisions/clusterize/clusterize.component';
import { MockDataService } from './services/mock-data.service';
import { PrimengComponent } from './decisions/primeng/primeng.component';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    AppComponent,
    ClusterizeComponent,
    PrimengComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule
  ],
  providers: [
    MockDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
