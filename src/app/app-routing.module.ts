import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { ClusterizeComponent} from './decisions/clusterize/clusterize.component';
import { PrimengComponent } from './decisions/primeng/primeng.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: 'clusterize', component: ClusterizeComponent },
  { path: 'primeng', component: PrimengComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
