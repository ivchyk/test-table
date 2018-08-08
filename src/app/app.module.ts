import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule  } from './app-routing.module';
import { ClusterizeComponent } from './decisions/clusterize/clusterize.component';
import { MockDataService } from './services/mock-data.service';
import { PrimengComponent } from './decisions/primeng/primeng.component';
import { TableModule } from 'primeng/table';
import { Ng2tableComponent} from './decisions/ng2table/ng2table.component';


@NgModule({
  declarations: [
    AppComponent,
    ClusterizeComponent,
    PrimengComponent,
    Ng2tableComponent
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
