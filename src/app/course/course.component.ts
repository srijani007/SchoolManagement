import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { createCourse, detailsbyCourseId } from '../Model/UserActions';
import { UserService } from '../Service/UserService';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
roleTag=localStorage.getItem('userrole')

courses:createCourse[]=[]
  constructor(private userServices:UserService,private router:Router) { }

  ngOnInit(): void {
    this.getAllCourses()
  }

  getAllCourses(){
    this.userServices.getAllCourses().subscribe(
      response =>{
        this.courses=response
        console.log(response)
      }
    )
  }


  back(){    
    localStorage.removeItem('addusertag')
    localStorage.removeItem('addcoursetag')
    this.userServices.updateSite.next(true);
    console.log(this.roleTag)
    if(this.roleTag== 'Admin' || this.roleTag == 'admin')
      { 
        this.router.navigate(['/admin'])
      }else 
      {
        this.router.navigate([''])
      }
    }


  onUpdate(){
this.router.navigate(['/createcourse'])
      }
  
  onEnroll(course:any){
    localStorage.setItem('courseid',course.id)
localStorage.setItem('courseName',course.title)
this.userServices.updateSite.next(true);
this.router.navigate(['/enroll'])

  }
}
