import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { createCourse, detailsbyCourseId } from '../Model/UserActions';
import { UserService } from '../Service/UserService';

@Component({
  selector: 'app-createcourse',
  templateUrl: './createcourse.component.html',
  styleUrls: ['./createcourse.component.css']
})
export class CreatecourseComponent implements OnInit {
  courseDetails:createCourse={
    id    : 0, 
    title       : '',
    description : '',
    subject     : '',
    subjectArea : '',
    gradeLevel  : 0
  }
  idCourse:detailsbyCourseId={
    id:0
  }
  isSuccessful=false
  update:boolean=false
  add:boolean=true
  identity:any
  updatebtn:boolean=false
  addbtn:boolean=true
  coursedetail:any
  constructor(private userServices:UserService, private router:Router,private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.identity = this.activatedroute.snapshot.params['Id']
    console.log(this.identity)
    if(this.identity != undefined){
    this.DetailsbyCouserId(this.identity)}
    if(this.identity != undefined){
      this.updatebtn= true
      this.addbtn=false
    }else{
      this.addbtn=true
      this.updatebtn=false
  }
  }
  onSubmit(){
this.userServices.CreateCourse(this.courseDetails).subscribe(
  response =>{
    this.add=true
    this.update=false
    this.addbtn=true
    this.updatebtn=false
    console.log(response)
    this.router.navigate(['/course'])
})
  }

  DetailsbyCouserId(id:any){
    this.idCourse.id=id
    this.userServices.getDetailsbyCouserId(this.idCourse).subscribe(
     response => {
                   this.add=false
                   this.update=true
                   this.coursedetail=response
                   this.courseDetails.id=this.coursedetail[0].id
                   this.courseDetails.title=this.coursedetail[0].title
                   this.courseDetails.description=this.coursedetail[0].description
                   this.courseDetails.subject=this.coursedetail[0].subject
                   this.courseDetails.subjectArea=this.coursedetail[0].subjectArea
                   this.courseDetails.gradeLevel=this.coursedetail[0].gradeLevel
    
    })
      }

    onUpdate(){
      this.addbtn=false
      this.updatebtn=true    
      this.userServices.updateCourseDetails(this.courseDetails).subscribe(
       response => {
        console.log(response)
        this.router.navigate(['/course'])
          }
      )
    }
}
