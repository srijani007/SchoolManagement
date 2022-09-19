import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { CourseComponent } from './course/course.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { CreatecourseComponent } from './createcourse/createcourse.component';
import { EnrollComponent } from './createenrollment/enroll.component';
import { EnrolledComponent } from './enrolled/enrolled.component';
import { DatePipe } from '@angular/common';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HomeComponent } from './home/home.component';
declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
  }
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    AdminComponent,
    CourseComponent,
    CreateuserComponent,
    CreatecourseComponent,
    EnrollComponent,
    EnrolledComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
    
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService,HttpClientModule,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
