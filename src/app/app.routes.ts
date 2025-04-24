import { inject } from '@angular/core';
import { Route, Router, Routes, UrlSegment } from '@angular/router';

import { authGuard } from 'app/services';

export const appRoutes: Routes = [{
  path: 'login',
  loadComponent: () => import('app/modules/login/login.component').then(m => m.LoginComponent),
  title: 'Login'
},
{
  path: 'my-profile',
  loadComponent: () => import('app/modules/user-profile/user-profile.component').then(m => m.UserProfileComponent),
  canActivate: [authGuard()],
  title: 'My Profile'
},
{
  path: 'my-posts',
  loadComponent: () => import('app/modules/posts/posts.component').then(m => m.PostsComponent),
  canActivate: [authGuard()],
  title: 'My Posts',
  data: {
    showUserPosts: true
  }
},
{
  path: ':postId',
  loadComponent: () => import('app/modules/post-page/post-page.component').then(m => m.PostPageComponent),
  title: 'Post',
  canMatch: [(route: Route, segments: UrlSegment[]) => {
    return (route.path?.includes(':postId') && isFinite(parseInt(segments[segments.length - 1].path)))
        || inject(Router).navigate(['']);
  }]
},
{
  path: '',
  loadComponent: () => import('app/modules/posts/posts.component').then(m => m.PostsComponent),
  title: 'Posts'
},
{
  path: '**', redirectTo: '', pathMatch: 'full'
}];
