import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [{
  path: 'login',
  loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
},
{
  path: 'my-posts',
  component: PostsComponent,
  canActivate: [AuthGuard],
  data: {
    title: 'My Posts',
    showUserPosts: true
  }
},
{
  path: ':postId',
  loadChildren: () => import('./post-page/post-page.module').then(m => m.PostPageModule)
},
{
  path: '',
  component: PostsComponent
},
{
  path: '**', redirectTo: '', pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
