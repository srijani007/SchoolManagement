import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {createEnrollment} from '../Model/Enrollment'
import { detailsbyCourseId, detailsbyUserId } from "../Model/UserActions";
@Injectable({
    providedIn: 'root'
})

export class EnrollmentService{
    enrollmentUrl ='https://localhost:7029/Enrollment/';
   

    
    constructor(private http: HttpClient){}

    CreateCourse(enroll : createEnrollment): Observable<createEnrollment[]>{
        return this.http.post<createEnrollment[]>(this.enrollmentUrl + 'CreateEnrollment',enroll)
     }

     getEnrolledCoursesbyUserId(idUser : detailsbyUserId):Observable<detailsbyUserId[]>{
        return this.http.post<detailsbyUserId[]>(this.enrollmentUrl + 'enrolled',idUser)
     }

     getAllEnrollment(): Observable<createEnrollment[]> {
        return this.http.get<createEnrollment[]>(this.enrollmentUrl + 'GetAllEnrollments');
    }

    getEnrolledCoursesbyCourseId(idCourse : detailsbyCourseId):Observable<detailsbyCourseId[]>{
        return this.http.post<detailsbyCourseId[]>(this.enrollmentUrl + 'enrolleditemsbyCourseId',idCourse)
     }
}