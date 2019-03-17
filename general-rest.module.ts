import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { GeneralRestComponent } from './general-rest.component';
import { GeneralRestService } from './general-rest.service';

@NgModule({
  declarations: [
    GeneralRestComponent
  ],
  imports: [
    // Generales
    BrowserModule, FormsModule, HttpClientModule,
    // Animaciones
    BrowserAnimationsModule,
    // Material
    MatButtonModule, MatInputModule, MatSelectModule
  ],
  exports: [
    GeneralRestComponent
  ],
  providers: [
    GeneralRestService
  ],
  bootstrap: [GeneralRestComponent]
})
export class GeneralRestModule { }
