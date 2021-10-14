import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  // url : string = "http://localhost:3000/city";
  url : string = "https://taskfrontendapi.azurewebsites.net/api/city";
  token : string | null = localStorage.getItem('myToken');


  constructor() { }

  async getAllCities(){
    let cities :any[] = [];
    await fetch(this.url, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' :  'Bearer ' + this.token ,
      }
    }).then((response) => response.json())
      .then((data) => {
        cities = data;
      })
      .catch((error) => {
        console.log(error.message) //=> String
      })
      return cities;
  }

  async getCountryCities(countryId : number){
    let cities :any[] = [];
    await fetch(`${this.url}/getcities/${countryId}`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' :  'Bearer ' + this.token ,
      }
    }).then((response) => response.json())
      .then((data) => {
        cities = data;
      })
      .catch((error) => {
        console.log(error.message) //=> String
      })
      return cities;
  }

  addCity(name : string, countryId: number){
    return fetch(this.url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' :  'Bearer ' + this.token ,
      },
      body: JSON.stringify({name: name, countryId: countryId})
    })
  }

  deleteCity(id : number){
    return fetch(`${this.url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' :  'Bearer ' + this.token ,
      }
    });
  }

  editCityName(id : number, name : string, countryId : number){
    return fetch(`${this.url}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' :  'Bearer ' + this.token 
      },
      body: JSON.stringify({id : id, name: name, countryId : countryId})
    });
  }

}
