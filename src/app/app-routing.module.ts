import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './components/countries/countries.component';
import { CitiesComponent } from './components/cities/cities.component';
import { CountryDetailsComponent } from './components/country-details/country-details.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: 'countries', component: CountriesComponent},
  {path: 'cities', component: CitiesComponent},
  {path: 'country/:cId', component: CountryDetailsComponent},
  {path: 'login', component: LoginComponent},
    {path: '', redirectTo : 'countries', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
