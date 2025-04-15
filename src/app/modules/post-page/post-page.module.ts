import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PostPageComponent } from './post-page.component';

const routes: Routes = [{
  path: '',
  component: PostPageComponent
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        PostPageComponent
    ]
})
export class PostPageModule { }
