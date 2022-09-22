import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginCreds} from '../Model/LoginDetails';
import { LoginService } from '../Service/LoginService';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../Service/UserService';
import { detailsbyUserId, detailsbyUserName } from '../Model/UserActions';
import { EnrollmentService } from '../Service/EnrollmentService';
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
idUser:detailsbyUserId={
  id:0
}
courseResponse:any

userdetails:any
  constructor( private router :Router, private siginservice:LoginService,
    private jwtHelper:JwtHelperService,private userServices:UserService,
    private enrollmentService:EnrollmentService) { }

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
      console.log("username")
      console.log(this.detailsbyUserName)
      console.log("name")
      this.userServices.getDetailsbyUserName(this.detailsbyUserName).subscribe(
        response=>{
          console.log("name1")
          this.userdetails=response
          console.log(this.userdetails)
          sessionStorage.setItem('userId',this.userdetails[0].id)
          this.userServices.updateSite.next(true);
          console.log("iddetails")
          console.log(this.userdetails[0].id)
          console.log("userid in login")
          console.log(localStorage.getItem('userId'))
          
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
        this.userServices.updateSite.next(true);
        this.router.navigate(['/admin']);
        
      }
      else if(this.userRole.toLowerCase() == 'teacher')
      {
       
        this.userTag=true;
        localStorage.setItem('teacherTag',this.userTag)
        this.userServices.updateSite.next(true);
        this.router.navigate(['/enrolled']).then(() => {
          window.location.reload();
        });
        console.log("teacher")
      }
      else if(this.userRole.toLowerCase() == 'student')
      { 
          
              this.router.navigate(['/enrolled']).then(() => {
                window.location.reload();
              });
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
    this.userServices.updateSite.next(true);
    
  }

  
}

