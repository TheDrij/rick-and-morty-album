import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeatureEffects } from './state/feature.effect';
import { featureReducer } from './state/feature.reducer';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    DashboardRoutingModule,
    StoreModule.forFeature('feature', featureReducer),
    EffectsModule.forFeature([FeatureEffects]),
  ]
})
export class DashboardModule { }
