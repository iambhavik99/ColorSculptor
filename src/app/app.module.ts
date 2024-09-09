import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ColorPaletteComponent } from './color-palette/color-palette.component';
import { SvgImageOneComponent } from './svg-image-one/svg-image-one.component';
import { SvgImageTwoComponent } from './svg-image-two/svg-image-two.component';
import { PalettesComponent } from './palettes/palettes.component';

@NgModule({
  declarations: [
    AppComponent,
    ColorPaletteComponent,
    SvgImageOneComponent,
    SvgImageTwoComponent,
    PalettesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
