import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { createUser, detailsbyUserId } from '../Model/UserActions';
import { UserService } from '../Service/UserService';
import { roles } from '../Model/UserActions';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {
  
  userDetails: createUser={
    id       : 0,
    userName     : '',
    password     : '',
    firstName    : '',
    lastName     : '',
    email        : '',
    gradeLevel   :0,
    address      : '',
    stateCode    : '',
    country      : '',
    zipcode      : '',
    phoneNumber  : '',
    idRole       :''  
  }
  idUser:detailsbyUserId={
    id:0
  }
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = ''
  pattern:any="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$"
  submitted:boolean=false
 userdetail:any
  identity:any
  update:boolean=false
  add:boolean=true
  updatebtn:boolean=false
  addbtn:boolean=true
  constructor(private userServices:UserService, private router:Router,private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.identity = this.activatedroute.snapshot.params['Id']
    if(this.identity != undefined){ 
    this.getDetailsbyUserId(this.identity)}
    if(this.identity != undefined){
      this.updatebtn= true
      this.addbtn=false
    }else{
      this.addbtn=true
      this.updatebtn=false
  }
  }
  onSubmit(){
    console.log("hi")
    this.userServices.CreateUsers(this.userDetails).subscribe(
      response =>{
        debugger;
        this.submitted=true
        this.add=true
        this.update=false
        console.log(response)        
      this.router.navigate(['/user'])
      }
    );
 // }
  }
  getDetailsbyUserId(id:any){    
    this.idUser.id=id
    console.log(this.idUser)
    this.userServices.getDetailsbyUserId(this.idUser).subscribe(
      response =>{
         this.add=false
         this.update=true
         console.log(response)
         this.userdetail=response
         this.userDetails.id=this.userdetail[0].id
         this.userDetails.firstName=this.userdetail[0].firstName
         this.userDetails.lastName=this.userdetail[0].lastName
         this.userDetails.address=this.userdetail[0].address
         this.userDetails.gradeLevel=this.userdetail[0].gradeLevel
         this.userDetails.stateCode=this.userdetail[0].stateCode
         this.userDetails.country=this.userdetail[0].country
         this.userDetails.zipcode=this.userdetail[0].zipcode
         this.userDetails.phoneNumber=this.userdetail[0].phoneNumber
         this.userDetails.password=this.userdetail[0].password
         this.userDetails.email=this.userdetail[0].email
         this.userDetails.idRole=this.userdetail[0].idRole
         this.userDetails.userName=this.userdetail[0].userName


    })
  }

  onUpdate(){
    this.addbtn=false
    this.updatebtn=true
    console.log(this.userDetails)
    this.userServices.updateUserDetails(this.userDetails).subscribe(
     response => {
      console.log(this.userDetails)
      console.log(response)
      this.router.navigate(['/user'])
        }
    )
  }
}
