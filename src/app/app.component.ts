import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from './Service/UserService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SchoolManagement';
  private UnsubcsribeAll = new Subject();
  loginDetails = ''
 userRole=''
 addUserTag=''
 addCourseTag=''
userName=''
userid=0
constructor(private route:Router, private userService : UserService){
  
}
ngOnInit(){
  this.userService.updateSite.pipe(takeUntil(this.UnsubcsribeAll)).subscribe((r: any) => {
  this.loginDetails = localStorage.getItem('userrole') || ''
  this.userRole=localStorage.getItem('userrole') || ''
  this.addUserTag=localStorage.getItem('addusertag') || ''
  this.addCourseTag=localStorage.getItem('addcoursetag') || ''
 this.userName=localStorage.getItem('userName') || ''
 this.userid=parseInt(sessionStorage.getItem('userId') || '0')
 console.log(this.userid)
  });
}
  Logout(){
localStorage.removeItem('userrole')
localStorage.removeItem('username')
localStorage.removeItem('userName')
localStorage.removeItem('adminTag')
localStorage.removeItem('addusertag')
localStorage.removeItem('addcoursetag')
localStorage.removeItem('teacherTag')
localStorage.removeItem('courseName')
localStorage.removeItem('courseid')
localStorage.removeItem('userId')
localStorage.removeItem('coursedescription')
localStorage.removeItem('coursesubjectarea')
localStorage.removeItem('Token')
this.userService.updateSite.next(true);
this.route.navigate(['']);
  }
}


