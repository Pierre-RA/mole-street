import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UsersListComponent } from './users-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: UsersListComponent, pathMatch: 'full'}
    ])
  ],
  declarations: [UsersListComponent]
})
export class UsersListModule { }
