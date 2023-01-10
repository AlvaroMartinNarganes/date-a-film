import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {SearchComponent} from './components/search/search.component';
import {LibraryComponent} from './components/library/library.component';
import {LoginComponent} from './components/login/login.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';

const routes: Routes = [{path: 'home', component: HomeComponent},
    {path: 'library', component: LibraryComponent},
    {path: 'search', component: SearchComponent},
    {path: 'user', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signUp', component: SignUpComponent},
    {path: '**', component: SearchComponent}];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
