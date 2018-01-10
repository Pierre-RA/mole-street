import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', loadChildren: './pages/landing/landing.module#LandingModule', pathMatch: 'full'},
      { path: 'quotes', loadChildren: './pages/quotes/stock-list/stock-list.module#StockListModule', pathMatch: 'full'},
      { path: 'quote/:id', loadChildren: './pages/quotes/stock-item/stock-item.module#StockItemModule'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
