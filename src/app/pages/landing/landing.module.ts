import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LandingComponent } from './landing.component';
import { QuoteService } from '../quotes/quote.service';
import { QuoteModule } from '../../templates/quote/quote.module';

@NgModule({
  imports: [
    CommonModule,
    QuoteModule,
    RouterModule.forChild([
      { path: '', component: LandingComponent, pathMatch: 'full' }
    ])
  ],
  declarations: [LandingComponent],
  providers: [QuoteService]
})
export class LandingModule { }
