
import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatSidenavModule } from '@angular/material/sidenav';

import { MatSliderModule } from '@angular/material/slider';


@NgModule({
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
    MatSidenavModule

  ],
  exports: [
    MatTableModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatSidenavModule
  ]
})

export class MaterialModule { }