import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { createEnrollment } from '../Model/Enrollment';
import { EnrollmentService } from '../Service/EnrollmentService';
import { DatePipe } from '@angular/common';
import { UserService } from '../Service/UserService';
@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css']
})
export class EnrollComponent implements OnInit {
  enrollDetails: createEnrollment = {
    idCourse: parseInt(localStorage.getItem('courseid') || "0"),
    idUser: 0,
    roleId: 0,
    startdate: new Date,
    enddate: new Date
  }
  users:any
  todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  isSuccessful = false
  enrollname: any = localStorage.getItem('courseName')
usernames:any[]=[]

  constructor(private enrollmentServices: EnrollmentService, private router: Router, private datePipe: DatePipe
    , private userServices: UserService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }
  onSubmit() {
    this.enrollmentServices.CreateCourse(this.enrollDetails).subscribe(
      response => {
        console.log('idCourse')
        console.log(response)
        this.router.navigate(['/enrolled'])
        localStorage.setItem('fromenrolledTag','true')
      })
  }

  getAllUsers() {
    console.log("Hi");
    this.userServices.getAllUsers()
      .subscribe(
        response => {
          this.users = response
          this.usernames =this.users[0].userName
          console.log(this.users)
        }
      )  
    }


}
