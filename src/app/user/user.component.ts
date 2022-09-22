import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {createUser} from '../Model/UserActions'
import { UserService } from '../Service/UserService';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  roleTag=localStorage.getItem('userRole');
showGrid: Boolean=true;
users:createUser[]=[]
addbtn:boolean=false
updatebtn:boolean=false

  constructor(private userServices:UserService, private router:Router) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  adminTag=localStorage.getItem('adminTag')

  
   length:number=0
  getAllUsers() {
    console.log("Hi");
    this.userServices.getAllUsers()
    .subscribe(
      response => {
        this.users = response
        this.length=this.users.length
        console.log(this.users)

      }     
    )
    }
    
  onUpdate(){
this.router.navigate(['/createuser'])
  }
  back(){
    
localStorage.removeItem('addusertag')
localStorage.removeItem('addcoursetag')
this.userServices.updateSite.next(true);
    this.router.navigate(['/admin'])
  }
}
