import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {APP_BASE_HREF} from '@angular/common';

// import needed PrimeNG modules here
import {ButtonModule} from 'primeng/components/button/button';
import {InputTextModule} from 'primeng/components/inputtext/inputtext';
import {InputTextareaModule} from 'primeng/primeng';
import {DataTableModule} from 'primeng/components/datatable/datatable';
import {DialogModule} from 'primeng/components/dialog/dialog';
import {MessagesModule} from 'primeng/components/messages/messages';
import {InputMaskModule} from 'primeng/components/inputmask/inputmask';
import {AutoCompleteModule} from 'primeng/components/autocomplete/autocomplete';
import {GrowlModule} from 'primeng/components/growl/growl';
import {SelectButtonModule} from 'primeng/components/selectbutton/selectbutton';
import {DropdownModule} from 'primeng/components/dropdown/dropdown';
import {MultiSelectModule} from 'primeng/components/multiselect/multiselect';

import {ContextMenuModule} from 'primeng/components/contextmenu/contextmenu';
import {SliderModule} from 'primeng/components/slider/slider';

import {ConfirmDialogModule} from 'primeng/components/confirmdialog/confirmdialog';
import {ConfirmationService} from 'primeng/components/common/api';
import {CommonModule} from '@angular/common';


import {MockBackend} from '@angular/http/testing';
import {BaseRequestOptions} from '@angular/http';

import {MY_CONFIG_TOKEN, MY_LOGGING_TOKEN} from './shared/token';

import {LOCALE_ID} from '@angular/core';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import {SpicelistService} from './spices/spicelist/services/spicelist.service';
import {SpicemixService} from './spicemix/services/spicemix.service';
import {CoretemperaturelistService} from './coretemperature/coretemperaturelist/services/coretemperaturelist.service';
import {RubService} from './rubs/services/rub.service';
import {ApiService} from './shared/api.service';
import {AuthService} from './shared/auth.service';
import {AuthGuard} from './auth.guard';

import { SpicelistComponent } from './spices/spicelist/spicelist.component';
import { SpicemixlistComponent } from './spicemix/spicemixlist/spicemixlist.component';
import { CoretemperaturelistComponent } from './coretemperature/coretemperaturelist/coretemperaturelist.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { RublistComponent } from './rubs/rublist/rublist.component';
import { RubdetailComponent } from './rubs/rubdetail/rubdetail.component';
import { SpicemixdetailComponent } from './spicemix/spicemixdetail/spicemixdetail.component';
import {DeactivateGuard} from './deactivate.guard';
import {RubResolver} from './rubs/services/rub-resolver.service';


import {RubActions} from './actions/rubs';
import {DevToolsExtension, NgRedux, NgReduxModule} from '@angular-redux/store';
import { reducer } from './reducers/index';
import { IAppState } from './app.state';

@NgModule({
  declarations: [
    AppComponent,
    SpicelistComponent,
    SpicemixlistComponent,
    CoretemperaturelistComponent,
    LoginComponent,
    MenuComponent,
    RublistComponent,
    RubdetailComponent,
    SpicemixdetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgReduxModule,
    ReactiveFormsModule,
    HttpModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    DataTableModule,
    DialogModule,
    MessagesModule,
    InputMaskModule,
    AutoCompleteModule,
    SelectButtonModule,
    GrowlModule,
    DropdownModule,
    MultiSelectModule,
    ContextMenuModule,
    SliderModule,
    AppRoutingModule,
    ConfirmDialogModule,
    CommonModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/iWorld/'},
    {provide: MY_CONFIG_TOKEN, useValue: 'GPL Configuration'},
    {provide: MY_LOGGING_TOKEN, useValue: true},
    {provide: LOCALE_ID, useValue: 'de'},
    SpicelistService,
    SpicemixService,
    CoretemperaturelistService,
    RubService,
    ApiService,
    AuthService,
    ConfirmationService,
    RubResolver,
    AuthGuard,
    DeactivateGuard,
    MockBackend,
    BaseRequestOptions,
    RubActions,
    DevToolsExtension
  ],
  bootstrap: [AppComponent]

})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTools: DevToolsExtension
  ) {

      let enhancers: any[];
      if (devTools.isEnabled()) {
          enhancers = [devTools.enhancer()];
      }

      this.ngRedux.configureStore(
          reducer,
          {} as IAppState,
          [],
          enhancers
      );

  }
}
