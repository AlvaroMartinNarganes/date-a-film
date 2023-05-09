import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {SearchComponent} from './components/search/search.component';
import {LibraryComponent} from './components/library/library.component';
import {LoginComponent} from './components/login/login.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {UserComponent} from './components/user/user.component';
import {SuggestionsComponent} from "./components/suggestions/suggestions.component";
import {WelcomePageComponent} from "./components/welcome-page/welcome-page.component";

const routes: Routes = [{path: 'home', component: HomeComponent},
    {path: 'library', component: LibraryComponent},
    {path: 'search', component: SearchComponent},
    {path: 'user', component: UserComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signUp', component: SignUpComponent},
    {path: 'suggestions', component: SuggestionsComponent},
    {path: 'welcome', component: WelcomePageComponent},
    {path: '**', component: WelcomePageComponent}];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
