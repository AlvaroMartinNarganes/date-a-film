import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CardComponent } from './components/shared/card/card.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import {HttpClientModule} from "@angular/common/http";
import { ModalComponent } from './components/modal/modal.component';
import { SearchComponent } from './components/search/search.component';
import { NoimagePipe } from './pipes/noimage.pipe';
import { LibraryComponent } from './components/library/library.component';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserComponent } from './components/user/user.component';
import { SuggestionsComponent } from './components/suggestions/suggestions.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';




const firebaseConfig = {
  apiKey: "AIzaSyC1C2qWjHvSnGkAdbNfDw5vmjgzsb4U8QQ",
  authDomain: "date-a-film-400a9.firebaseapp.com",
  projectId: "date-a-film-400a9",
  storageBucket: "date-a-film-400a9.appspot.com",
  messagingSenderId: "895197162289",
  appId: "1:895197162289:web:5c33b305a8dbe834f65e10",
  measurementId: "G-6K0Z4D7GKM"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    NavbarComponent,
    ModalComponent,
    SearchComponent,
    NoimagePipe,
    LibraryComponent,
    LoginComponent,
    SignUpComponent,
    UserComponent,
    SuggestionsComponent,
    WelcomePageComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
