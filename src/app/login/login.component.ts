import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginCreds} from '../Model/LoginDetails';
import { LoginService } from '../Service/LoginService';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../Service/UserService';
import { detailsbyUserName } from '../Model/UserActions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
creds:LoginCreds={
UserName:'',
Password:''
}
errorMessage=''
res:any
isLoginFailed=false
isFailed:boolean=false;
isSignIn:boolean=false;
userRole:any
userTag:any=false;
isLoggedIn= false;
token:any
decodedtoken:any
tokenPayload:any
username:any
log = [];
detailsbyUserName:detailsbyUserName={
  userName:''
}
userdetails:any
  constructor( private router :Router, private siginservice:LoginService,
    private jwtHelper:JwtHelperService,private userServices:UserService) { }

  ngOnInit(): void {
  }
 
 onSubmit(){
  this.siginservice.Validate(this.creds).subscribe(
    response =>{
      this.res=response
      console.log(this.res)
      console.log(this.res.token)
      console.log("Login successful");
      this.GetTokenDecoded()
      console.log(this.userRole)
      console.log(this.username) 
      this.detailsbyUserName.userName=this.username
      console.log(this.detailsbyUserName)
      this.userServices.getDetailsbyUserName(this.detailsbyUserName).subscribe(
        response=>{
          this.userdetails=response
          console.log(this.userdetails)
          localStorage.setItem('userId',this.userdetails[0].id)
        }
      )    
      this.userRole=localStorage.getItem('userrole')     
      this.isLoginFailed = false;
      this.isLoggedIn = true;
      if(this.userRole != ''){       
      if(this.userRole.toLowerCase() == 'admin')
      {
        this.userTag=true;
        localStorage.setItem('adminTag',this.userTag)
        this.router.navigate(['/admin']);
        
      }
      else if(this.userRole.toLowerCase() == 'teacher')
      {
       
        this.userTag=true;
        localStorage.setItem('teacherTag',this.userTag)
        this.router.navigate(['/enrolled'])
        console.log("teacher")
      }
      else
      {           
        this.router.navigate(['/enrolled'])
      }
    }
    else{
      this.isLoginFailed = true;
      this.errorMessage = 'Login Failed'
      console.log("Login Failed")
    }
      
    },error=>{
      this.isLoginFailed = true;
      this.errorMessage = 'User Name or Password is incorrect'
      
    }
  )
 }
  GetTokenDecoded() {
    //console.log(this.jwtHelper.decodeToken(this.token.token))
    this.tokenPayload = this.jwtHelper.decodeToken(this.res.token);
    this.userRole=this.tokenPayload.IdRole 
    this.username=this.tokenPayload.UserName 
    console.log(this.tokenPayload)
    localStorage.setItem('Token',this.res.token)
    localStorage.setItem('userrole',this.userRole)
    localStorage.setItem('username',this.username)
    console.log(localStorage.getItem('userrole'))
    console.log(localStorage.getItem('username'))
  }

}

