import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', loadChildren: './pages/landing/landing.module#LandingModule', pathMatch: 'full'},
      { path: 'sign-in', loadChildren: './pages/sign-in/sign-in.module#SignInModule', pathMatch: 'full' },
      { path: 'sign-up', loadChildren: './pages/sign-up/sign-up.module#SignUpModule', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardModule', pathMatch: 'full' },
      { path: 'users', loadChildren: './pages/users/users-list/users-list.module#UsersListModule', pathMatch: 'full' },
      { path: 'users/:id', loadChildren: './pages/users/users-item/users-item.module#UsersItemModule', pathMatch: 'full' },
      { path: 'quotes', loadChildren: './pages/quotes/stock-list/stock-list.module#StockListModule', pathMatch: 'full'},
      { path: 'quote/:id', loadChildren: './pages/quotes/stock-item/stock-item.module#StockItemModule'}
    ])
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
