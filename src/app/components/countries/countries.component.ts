import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';
import { Country } from 'src/app/models/country';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries : Country[] = [];
  addedCountryName : string = "";

  constructor(private countriesService: CountriesService,
              private router : Router) { }

  ngOnInit(): void {
    if(!localStorage.getItem('myToken')){
      this.router.navigate(['login'])
    }
    this.getCountries();
  }
  
  getCountries(){
    this.countriesService.getAllCountries()
    .then((resp)=>{
      this.countries = resp
    })
  }
  getFlag(name : string) {
    return this.countriesService.getFlag(name);
  }

  addCountry(){
    if(this.addedCountryName == ""){
      return
    }
    this.countriesService.addCountry(this.addedCountryName).then(()=>{
      this.getCountries();
    }
    )
    this.addedCountryName = "";
  }

  countryDetails(id : number){
    this.router.navigate(['country/',id])
  }


}
