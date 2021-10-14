import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url : string = "https://taskfrontendapi.azurewebsites.net/api/user/login";

  constructor() { }

  async login(email : string, password : string){
    let token = ""
    await fetch(this.url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({Email: email, Password: password})
    })
    .then(response=> {
     return response.json()
    })
    .then(data =>{
      token = data
    }).catch((err)=>{
      console.log(err)
    })
    return token;
  }


}
