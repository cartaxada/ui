import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent, SecureAppComponent, LogOutComponent, NotFoundComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NavBarModule } from './navbar/navbar.module';
import { ConstantModule } from './constant/constant.module';
import { FamilyMemberModule } from './family-member/fm.module';
import { SearchModule } from './search/search.module';
import { PDFModule } from './pdf/pdf.module';
import { routing, appRoutingProviders } from './app.routing';
import { CognitoService } from './service/cognito.service';
import { DynamoService } from './service/dynamo.service';
import { S3Service } from './service/s3.service';

@NgModule({
  imports: [
    BrowserModule,
    routing,
    AuthModule,
    NavBarModule,
    ConstantModule,
    FamilyMemberModule,
    SearchModule,
    PDFModule
  ],
  declarations: [
    AppComponent,
    SecureAppComponent,
    LogOutComponent,
    NotFoundComponent
  ],
  providers: [
    appRoutingProviders,
    CognitoService,
    DynamoService,
    S3Service
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
