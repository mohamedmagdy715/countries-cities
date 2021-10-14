import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  url : string = "https://taskfrontendapi.azurewebsites.net/api/user/login";
  email : string = ""
  password : string = ""

  constructor(private loginService : LoginService,
              private router : Router) { }

  ngOnInit(): void {
  }


  login(){
    fetch(this.url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({Email: this.email, Password: this.password})
    })
    .then(response=> response.json())
    .then(data =>{
      if(data.status >= 400){
        window.alert(data.title + " Check Email and Password")
      }else{
        localStorage.setItem('myToken', data.token)
        this.router.navigate(['countries'])
      }
    }).catch((error)=>{
      console.error(error)
      window.alert(error)
    })
    // token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbG…eOAJfGQnJPM4pxo_9kvaPScDcYlsGuGHogVz-ONb5oZABY12Q'
  }
}
