import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule  } from './app-routing.module';
import { ClusterizeComponent } from './decisions/clusterize/clusterize.component';
import { MockDataService } from './services/mock-data.service';
import { PrimengComponent } from './decisions/primeng/primeng.component';
import { TableModule } from 'primeng/table';
import { Ng2tableComponent} from './decisions/ng2table/ng2table.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { FormsModule } from '@angular/forms';
import { SmartTableComponent } from './decisions/smart-table/smart-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    AppComponent,
    ClusterizeComponent,
    PrimengComponent,
    Ng2tableComponent,
    SmartTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    PaginationModule.forRoot(),
    Ng2TableModule,
    FormsModule,
    Ng2SmartTableModule
  ],
  providers: [
    MockDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
