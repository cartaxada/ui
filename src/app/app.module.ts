import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent, SecureAppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { NavBarModule } from './navbar/navbar.module';
import { ConstantModule } from './constant/constant.module';
import { FamilyMemberModule } from './family-member/fm.module';
import { routing, appRoutingProviders } from './app.routing';
import { CognitoService } from './service/cognito.service';
import { DynamoService } from './service/dynamo.service';

@NgModule({
  imports: [
    BrowserModule,
    routing,
    LoginModule,
    NavBarModule,
    ConstantModule,
    FamilyMemberModule
  ],
  declarations: [
    AppComponent,
    SecureAppComponent
  ],
  providers: [
    appRoutingProviders,
    CognitoService,
    DynamoService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
