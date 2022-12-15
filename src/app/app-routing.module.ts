import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {SearchComponent} from './components/search/search.component';
import {LibraryComponent} from './components/library/library.component';

const routes: Routes = [{ path: 'home', component: HomeComponent},
{ path: 'library', component: LibraryComponent},
{ path: 'search', component: SearchComponent},
{ path: 'user', component: HomeComponent},
{ path: '**', component: HomeComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
