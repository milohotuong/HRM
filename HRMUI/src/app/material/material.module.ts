
import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';

import { MatSliderModule } from '@angular/material/slider';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
	imports: [
		MatTableModule,
		MatSliderModule,
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