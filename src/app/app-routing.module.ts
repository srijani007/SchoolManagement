import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { CourseComponent } from './course/course.component';
import { CreatecourseComponent } from './createcourse/createcourse.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { EnrollComponent } from './createenrollment/enroll.component';
import {LoginComponent} from './login/login.component'
import { UserComponent } from './user/user.component';
import { EnrolledComponent } from './enrolled/enrolled.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{path:'login',component:LoginComponent},
{path:'user',component:UserComponent},
{path:'admin',component:AdminComponent},
{path:'course',component:CourseComponent},
{path:'createuser',component:CreateuserComponent},
{path:'createcourse',component:CreatecourseComponent},
{path:'createcourse/:Id',component:CreatecourseComponent},
{path:'enroll',component:EnrollComponent},
{path:'createuser/:Id',component:CreateuserComponent},
{path:'enrolled',component:EnrolledComponent},
{path:'',component:HomeComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
