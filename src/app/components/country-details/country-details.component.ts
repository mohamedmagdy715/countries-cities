import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { CitiesService } from 'src/app/services/cities.service';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {

  subs : Subscription[] = []
  countryId : number = 0;
  countryName : string = ""
  addedCityName : string = ""

  constructor(private actRoute: ActivatedRoute,
              private countriesService: CountriesService,
              private router : Router,
              private citiesService : CitiesService) { }

  ngOnInit(): void {
    if(!localStorage.getItem('myToken')){
      this.router.navigate(['login'])
    }
    this.subs.push(this.actRoute.paramMap.subscribe((params : ParamMap)=>{
      this.countryId = Number(params.get('cId'));
      this.countriesService.getCountry(this.countryId).then((resp)=>{
        this.countryName = resp.name;
      })
    }))
  }

  getFlag(name : string) {
    return this.countriesService.getFlag(name);
  }

  // emit event to child cities component
  eventsSubject: Subject<void> = new Subject<void>();

  emitEventToChild() {
    this.eventsSubject.next();
  }

  addCity(){
    if (this.addedCityName == ""){
      return
    }
    this.citiesService.addCity(this.addedCityName, this.countryId).then(()=>{
      this.emitEventToChild();
      this.addedCityName = ""
    })
  }

  editCountry(){
    let newCountryName = window.prompt("Enter new Country Name");
    if(newCountryName){
      this.countriesService.editCountry(this.countryId, newCountryName).then(()=>{
        this.countriesService.getCountry(this.countryId).then((resp)=>{
          this.countryName = resp.name;
        })
      })
    }
    return false
  }

  deleteCountry(){
    if(window.confirm("Are You Sure?")){
      this.countriesService.deleteCountry(this.countryId).then(()=>{
        this.router.navigate(['countries'])
      })
      return false
    }else{
      return false
    }
  }

  ngOnDestroy() {
    this.subs[0].unsubscribe();
  }
}
