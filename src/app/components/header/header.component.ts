import { Component, OnInit } from '@angular/core';
import {  NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  display : Boolean = true;
  subs : Subscription[] = []


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.subs.push(this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        if(val.url == "/login"){
          this.display = false;
        }
        else{
          this.display = true;
        }
      }
  })
)
  }

  ngOnDestroy() {
    this.subs[0].unsubscribe();
  }
  
}
