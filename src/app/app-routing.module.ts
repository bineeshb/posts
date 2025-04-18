import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'app/services';

const routes: Routes = [{
  path: 'login',
  loadComponent: () => import('app/modules/login/login.component').then(m => m.LoginComponent),
  title: 'Login'
},
{
  path: 'my-profile',
  loadComponent: () => import('app/modules/user-profile/user-profile.component').then(m => m.UserProfileComponent),
  canActivate: [AuthGuard],
  title: 'My Profile'
},
{
  path: 'my-posts',
  loadComponent: () => import('app/modules/posts/posts.component').then(m => m.PostsComponent),
  canActivate: [AuthGuard],
  title: 'My Posts',
  data: {
    showUserPosts: true
  }
},
{
  path: ':postId',
  loadComponent: () => import('app/modules/post-page/post-page.component').then(m => m.PostPageComponent),
  title: 'Post'
},
{
  path: '',
  loadComponent: () => import('app/modules/posts/posts.component').then(m => m.PostsComponent),
  title: 'Posts'
},
{
  path: '**', redirectTo: '', pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
