import { Component, OnInit, TemplateRef } from '@angular/core';
import { detailsbyCourseId, detailsbyUserId } from '../Model/UserActions';
import { EnrollmentService } from '../Service/EnrollmentService';
import { Router } from '@angular/router';
import { UserService } from '../Service/UserService';
import { __values } from 'tslib';
import { KeyValuePipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-enrolled',
  templateUrl: './enrolled.component.html',
  styleUrls: ['./enrolled.component.css']
})
export class EnrolledComponent implements OnInit {
idUser:detailsbyUserId={
  id:parseInt(localStorage.getItem('userId') || '0') 
}
roleTag:any=localStorage.getItem('userrole')
courseResponse:any
content:any
showContentField=false
emptyshowContentField=false
onlaunchbtn=false
isenrolled=true
displaydescription:any
displaysubjectarea:any
enrollments:any
isenrolledforteacher:boolean=false
isenrolledforadmin=localStorage.getItem('userrole')
courseid:detailsbyCourseId={
  id:parseInt(localStorage.getItem('userId') || '0')
}
private UnsubcsribeAll = new Subject();
enrolledcourse:any
userid:Number=0

  constructor(private enrollmentService:EnrollmentService,
    private router:Router, private userService:UserService) { 
      this.idUser.id=parseInt(sessionStorage.getItem('userId') || '0') 
    }

  ngOnInit(): void {
 
    this.userService.updateSite.pipe(takeUntil(this.UnsubcsribeAll)).subscribe((r: any) => {
      this.idUser.id=parseInt(sessionStorage.getItem('userId') || '0') 
    });
    
    this.getEnrolledCoursesbyUserId()
    
   if(this.isenrolledforadmin?.toLowerCase() == 'admin')
   { this.getAllEnrollments()}
  }


  getAllEnrollments(){
    this.enrollmentService.getAllEnrollment().subscribe(
      response =>{
        this.isenrolledforadmin='admin'
        this.isenrolledforteacher=false
        this.isenrolled=false
        this.courseResponse=response
        console.log(response)
      }
    )
  }

   getEnrolledCoursesbyUserId(){
    this.idUser.id=parseInt(sessionStorage.getItem('userId') || '0') 
    console.log(this.idUser.id)
    this.enrollmentService.getEnrolledCoursesbyUserId(this.idUser).subscribe(
      response =>{
        this.isenrolledforadmin="!admin"
        this.isenrolledforteacher=false
        this.isenrolled=true
        this.onlaunchbtn=false
        this.courseResponse=response
        this.courseResponse=JSON.parse(this.courseResponse)
      
    })
  }

 

  back(){
    if(this.isenrolledforadmin?.toLowerCase() =='admin')
    {
      localStorage.removeItem('fromenrolledTag')
      this.userService.updateSite.next(true);
      this.router.navigate(['/admin']);
    }else 
    if(this.isenrolledforteacher == true)
    {
     this.isenrolledforteacher=false
     this.getEnrolledCoursesbyUserId()

    }
    else
    {         
   // localStorage.removeItem('userId')		
   // localStorage.removeItem('userRole')	
    //localStorage.removeItem('userName')
    this.router.navigate([''])
    }
  }
  onBack(){
    localStorage.removeItem('coursesubjectarea')
    localStorage.removeItem('coursedescription')
    this.userService.updateSite.next(true);
   // this.isenrolledforadmin=false
    this.isenrolled=true
    this.onlaunchbtn=false
    this.router.navigate(['/enrolled'])
  }

  onlaunch(res:any){   
   // this.isenrolledforadmin=false
   this.isenrolledforadmin="!admin"
    this.isenrolled=false
    this.onlaunchbtn=true
    console.log(res)
    localStorage.setItem('coursesubjectarea',res.SubjectArea)
    localStorage.setItem('coursedescription',res.Description)
    this.userService.updateSite.next(true);
    this.displaysubjectarea=localStorage.getItem('coursesubjectarea')
    this.displaydescription= localStorage.getItem('coursedescription')    
  }
  
  getenrolls(res :any){
    console.log("inside")
  this.courseid.id=res.Id 
  localStorage.removeItem('fromenrolledTag') 
  this.userService.updateSite.next(true);
    this.enrollmentService.getEnrolledCoursesbyCourseId(this.courseid).subscribe( response =>{
     {
      this.isenrolledforadmin="!admin"
      this.isenrolledforteacher=true
      this.isenrolled=false     
        this.onlaunchbtn=false
        this.courseResponse = response
        this.courseResponse = JSON.parse(this.courseResponse)
       
    }
    })
  }
}
