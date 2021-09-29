import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LongPressDirective } from './directives/long-press.directive';
import { ConfigTimeoutComponent } from './components/config-timeout/config-timeout.component';
import { ConfigProgressbarComponent } from './components/config-progressbar/config-progressbar.component';
import { ConfigToastZoneComponent } from './components/config-toast-zone/config-toast-zone.component';
import { ConfigMainComponent } from './components/config-main/config-main.component';
import { ConfigToastComponent } from './components/config-toast/config-toast.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    
    ConfigTimeoutComponent,
  
    LongPressDirective,
       ConfigProgressbarComponent,
       ConfigToastZoneComponent,
       ConfigMainComponent,
       ConfigToastComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
