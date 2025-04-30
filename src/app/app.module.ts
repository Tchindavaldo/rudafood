import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/indx';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,

    IonicModule.forRoot(),
    StoreModule.forRoot(reducers, {}),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    // GooglePlus,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
