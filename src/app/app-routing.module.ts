import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostListComponent} from './post-list/post-list.component';
import {PostDetailsComponent} from './post-details/post-details.component';

const routes: Routes = [
  { path: 'post-list', component: PostListComponent },
  { path: 'post-list/post-details/:id', component: PostDetailsComponent },
  { path: '', redirectTo: 'post-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
