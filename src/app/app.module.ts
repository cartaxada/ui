import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent, SecureAppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { NavBarModule } from './navbar/navbar.module';
import { ConstantModule } from './constant/constant.module';
import { routing, appRoutingProviders } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    routing,
    LoginModule,
    NavBarModule,
    ConstantModule
  ],
  declarations: [
    AppComponent,
    SecureAppComponent
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
