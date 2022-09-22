import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import {createUser,createCourse, detailsbyCourseId, detailsbyUserId, detailsbyUserName} from "../Model/UserActions"
@Injectable({
    providedIn: 'root'
})

export class UserService{
    adminUrl ='https://localhost:7029/Admin/';
    //adminUrl='https://userenrollment20220920194142.azurewebsites.net/Admin/'
      courseUrl='https://localhost:7029/Course/';
   //courseUrl='https://userenrollment20220920194142.azurewebsites.net/Course/'
  // enrollmentUrl='https://localhost:7029/Enrollment/';
   // enrollmentUrl='https://userenrollment20220920194142.azurewebsites.net/Enrollment/'
    public updateSite = new BehaviorSubject<any>(false);
    constructor(private http: HttpClient){}
   
    httpheader = new HttpHeaders(
      {
      'Authorization' : 'Bearer ' + localStorage.getItem("Token"),
      'Content-Type' : 'application/json'
      }
  )
  
 //login call
 getAllUsers(): Observable<createUser[]> {
    return this.http.get<createUser[]>(this.adminUrl + 'GetUsers');
}

getAllCourses(): Observable<createCourse[]> {
    return this.http.get<createCourse[]>(this.courseUrl + 'GetAllCourses');
}

 CreateUsers(users : createUser): Observable<createUser[]>{
    return this.http.post<createUser[]>(this.adminUrl + 'CreateUser',users)//,{headers : this.httpheader});
 }  

 CreateCourse(course : createCourse): Observable<createCourse[]>{
    return this.http.post<createCourse[]>(this.courseUrl + 'CreateCourse',course)
 } 

 getDetailsbyCouserId(courseId : detailsbyCourseId): Observable<detailsbyCourseId[]>{
    return this.http.post<detailsbyCourseId[]>(this.courseUrl + 'GetDetailsbyCourseId',courseId)
 } 

 getDetailsbyUserId(userId : detailsbyUserId): Observable<detailsbyUserId[]>{
    return this.http.post<detailsbyUserId[]>(this.adminUrl + 'GetDetailsbyUserId',userId) } 
 
 updateCourseDetails(course : createCourse): Observable<createCourse[]>{
    return this.http.put<createCourse[]>(this.courseUrl + 'UpdateCoursedetails',course)}

 updateUserDetails(user : createUser): Observable<createUser[]>{
        return this.http.put<createUser[]>(this.adminUrl + 'UpdateUserdetails',user)}

 getDetailsbyUserName(userName : any): Observable<createUser[]>{
      return this.http.post<createUser[]>(this.adminUrl + 'GetDetailsbyUserName',userName) } 
}