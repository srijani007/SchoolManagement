import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminTag:any=localStorage.getItem('adminTag')
  createusertag:any='false'
  createcoursetag:any='false'
  constructor(private router:Router) { }

  ngOnInit(): void {
  
  }

  userPage(){  
    this.createusertag='true'
    this.createcoursetag='false'
    localStorage.setItem('addusertag',this.createusertag)
    localStorage.setItem('addcoursetag',this.createcoursetag)
    this.router.navigate(['/user'])
  }
  coursePage(){
    
    this.createusertag='false'
    this.createcoursetag='true'
    localStorage.setItem('addusertag',this.createusertag)
    localStorage.setItem('addcoursetag',this.createcoursetag)
    this.router.navigate(['/course'])
  }
}
