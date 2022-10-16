import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
//For NGXS
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { GeneralComponent } from './general/general.component';
import { AppState } from './state/app.state';
import { DesignutilityService } from './designutility.service';

@NgModule({
  declarations: [
    AppComponent,
    GeneralComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([AppState]), 
    NgxsLoggerPluginModule.forRoot(), 
    NgxsReduxDevtoolsPluginModule.forRoot()
    

  ],
  providers: [DesignutilityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
