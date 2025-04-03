import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostPageComponent } from './post-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: PostPageComponent
}];

@NgModule({
  declarations: [
    PostPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PostPageModule { }
