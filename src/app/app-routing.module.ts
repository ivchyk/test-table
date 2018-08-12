import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { ClusterizeComponent} from './decisions/clusterize/clusterize.component';
import { PrimengComponent } from './decisions/primeng/primeng.component';
import { JgridComponent } from './decisions/jgrid/jgrid.component';
import { TreeGridComponent } from './decisions/tree-grid/tree-grid.component';
import { MygridComponent } from './decisions/mygrid/mygrid.component'
import { PivotComponent } from './decisions/pivot/pivot.component'
const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: 'clusterize', component: ClusterizeComponent },
  { path: 'primeng', component: PrimengComponent },
  { path: 'jgrid', component: JgridComponent},
  { path: 'tree-grid', component: TreeGridComponent },
  { path: 'mygrid', component: MygridComponent },
  { path: 'pivot', component: PivotComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
