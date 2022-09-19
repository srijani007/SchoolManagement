import { Component, OnInit, TemplateRef } from '@angular/core';
import { detailsbyCourseId, detailsbyUserId } from '../Model/UserActions';
import { EnrollmentService } from '../Service/EnrollmentService';
import { Router } from '@angular/router';
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
  id:0
}

enrolledcourse:any


  constructor(private enrollmentService:EnrollmentService,
    private router:Router) { }

  ngOnInit(): void {
     if(this.idUser != undefined)
     {
    this.getEnrolledCoursesbyUserId()
    }
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
    console.log(this.idUser)
    this.enrollmentService.getEnrolledCoursesbyUserId(this.idUser).subscribe(
      response =>{
        this.isenrolledforteacher=false
        this.isenrolled=true
        this.onlaunchbtn=false
        this.courseResponse=response
         console.log(this.courseResponse)
    })
  }

  back(){
    if(this.isenrolledforadmin?.toLowerCase() =='admin')
    {
      localStorage.removeItem('fromenrolledTag')
      this.router.navigate(['/admin']);
    }else if(this.isenrolledforteacher == true)
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
   // this.isenrolledforadmin=false
    this.isenrolled=true
    this.onlaunchbtn=false
    this.router.navigate(['/enrolled'])
  }

  onlaunch(res:any){   
   // this.isenrolledforadmin=false
    this.isenrolled=false
    this.onlaunchbtn=true
    console.log(res)
    localStorage.setItem('coursesubjectarea',res.SubjectArea)
    localStorage.setItem('coursedescription',res.Description)
    this.displaysubjectarea=localStorage.getItem('coursesubjectarea')
    this.displaydescription= localStorage.getItem('coursedescription')    
  }
  
  getenrolls(res :any){
    console.log("inside")
  this.courseid.id=res.Id  
    this.enrollmentService.getEnrolledCoursesbyCourseId(this.courseid).subscribe( response =>{
     {
      this.isenrolledforteacher=true
      this.isenrolled=false     
        this.onlaunchbtn=false
        this.courseResponse = response
        console.log(this.courseResponse)
    }
    })
  }
}
