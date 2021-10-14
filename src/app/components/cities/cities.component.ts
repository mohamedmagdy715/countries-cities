import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { City } from 'src/app/models/city';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  @Input() InputCountryId : number | undefined;
  cities : City[] = []

  // event emmitted from parent countries
  eventsSubscription: Subscription | undefined;
  @Input() events: Observable<void> | undefined;
  
  constructor(private citiesService: CitiesService,
              private router : Router) { }

  ngOnInit(): void {
    if(!localStorage.getItem('myToken')){
      this.router.navigate(['login'])
    }
    this.eventsSubscription = this.events?.subscribe(() => {
      this.getCities();
    });
    this.getCities();
  }

  getCities(){
    if(!this.InputCountryId){
      this.citiesService.getAllCities().then((resp)=>{
        this.cities = resp;
      })
    }else{
      this.citiesService.getCountryCities(this.InputCountryId).then((resp)=>{
        this.cities = resp;
      })
    }
  }

  
  editCityName(id : number, countryId : number){
    let newCityName = window.prompt("Enter new City Name");
    if(newCityName){
      this.citiesService.editCityName(id, newCityName, countryId).then(()=>{
        this.getCities()
      })
    }
    return false
  }

  deleteCity(id : number){
    if(window.confirm("Are You Sure?")){
      this.citiesService.deleteCity(id).then(()=>{
        this.getCities();
      })
    }
    return false
  }

  ngOnDestroy() {
    this.eventsSubscription?.unsubscribe();
  }
  
}
