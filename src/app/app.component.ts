import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SchoolManagement';
  loginDetails = localStorage.getItem('userrole')
 userRole=localStorage.getItem('userrole')
 addUserTag=localStorage.getItem('addusertag')
 addCourseTag=localStorage.getItem('addcoursetag')
userName=localStorage.getItem('userName')

constructor(private route:Router){
  
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
this.route.navigate(['']);
  }

  reloadPage(): void {
    window.location.reload();
  }
}


