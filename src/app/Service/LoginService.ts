import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginCreds } from "../Model/LoginDetails";   

@Injectable({
    providedIn: 'root'
})


export class LoginService{
  baseUrl ='https://localhost:7029/Authentication/SignIn';
   //baseUrl='https://userenrollment20220920194142.azurewebsites.net/Authentication/SignIn'
    
   constructor(private http: HttpClient){}
    httpheader = new HttpHeaders(
        {
        'Authorization' : 'Bearer ' + localStorage.getItem("Token"),
        'Content-Type' : 'application/json'
        }
    )
  
 //login call
 Validate(creds : LoginCreds ):Observable<LoginCreds[]>{
    console.log("inside service")
    console.log(this.httpheader)
     return this.http.post<LoginCreds[]>(this.baseUrl, creds,{headers : this.httpheader});    
   }
}