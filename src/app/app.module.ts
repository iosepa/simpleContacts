import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule} from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NbThemeModule,  NbListModule, NbUserModule,
  NbButtonModule, NbSidebarModule, NbLayoutModule, NbSidebarService, NbCardModule, NbInputModule, } from '@nebular/theme';
import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly


import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // this will enable the default theme, you can change this by passing `{ name: 'cosmic' }` to enable the dark theme
    NbThemeModule.forRoot({ name: 'cosmic' }),
    RouterModule.forRoot([]), // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    NbLayoutModule,
    NbSidebarModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbListModule,
    NbUserModule,
  ],
  providers: [NbSidebarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
