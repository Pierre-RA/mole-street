import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UsersItemComponent } from './users-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: UsersItemComponent }
    ])
  ],
  declarations: [UsersItemComponent]
})
export class UsersItemModule { }
