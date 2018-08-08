import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { ClusterizeComponent} from './decisions/clusterize/clusterize.component';
import { PrimengComponent } from './decisions/primeng/primeng.component';
import { Ng2tableComponent} from './decisions/ng2table/ng2table.component';
import { SmartTableComponent } from './decisions/smart-table/smart-table.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: 'clusterize', component: ClusterizeComponent },
  { path: 'primeng', component: PrimengComponent },
  { path: 'ng2table', component: Ng2tableComponent },
  { path: 'smart-table', component: SmartTableComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
