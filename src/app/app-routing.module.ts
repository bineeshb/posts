import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'app/services';

const routes: Routes = [{
  path: 'login',
  loadChildren: () => import('app/modules/login/login.module').then(m => m.LoginModule),
  data: {
    title: 'Login'
  }
},
{
  path: 'my-profile',
  loadChildren: () => import('app/modules/user-profile/user-profile.module').then(m => m.UserProfileModule),
  canActivate: [AuthGuard],
  data: {
    title: 'My Profile'
  }
},
{
  path: 'my-posts',
  loadChildren: () => import('app/modules/posts/posts.module').then(m => m.PostsModule),
  canActivate: [AuthGuard],
  data: {
    title: 'My Posts',
    showUserPosts: true
  }
},
{
  path: ':postId',
  loadChildren: () => import('app/modules/post-page/post-page.module').then(m => m.PostPageModule),
  data: {
    title: 'Post'
  }
},
{
  path: '',
  loadChildren: () => import('app/modules/posts/posts.module').then(m => m.PostsModule),
  data: {
    title: 'Posts'
  }
},
{
  path: '**', redirectTo: '', pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
