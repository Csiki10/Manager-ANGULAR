import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Teacher } from '../_models/teacher';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-teachers',
  templateUrl: './list-teachers.component.html',
  styleUrls: ['./list-teachers.component.scss']
})
export class ListTeachersComponent implements OnInit {
  http: HttpClient
  teachers: Array<Teacher>
  teacherToEdit: Teacher

  snackBar:MatSnackBar

  constructor(http: HttpClient, snackBar:MatSnackBar ) {
    this.http = http
    this.teachers = []
    this.teacherToEdit = new Teacher
    this.snackBar = snackBar
  }
  
  ngOnInit(): void {
    this.http
    .get<Array<Teacher>>('https://practiceapi.nikprog.hu/Teacher')
    .subscribe(resp => {
      resp.map(x => {
        let t = new Teacher()
        t.id = x.id
        t.name = x.name
        t.neptun = x.neptun
        t.birthYear = x.birthYear
        t.image = x.image
        t.creatorName = x.creatorName
        t.createSubjects(x.teachedSubjects)
        this.teachers.push(t)
      })
      console.log(this.teachers)
    })
  }

  sendToUpdate(teacher: Teacher) {
    this.teacherToEdit = new Teacher()

    this.teacherToEdit.id  = teacher.id;
    this.teacherToEdit.name  = teacher.name;
    this.teacherToEdit.neptun  = teacher.neptun;
    this.teacherToEdit.birthYear  = teacher.birthYear;
    this.teacherToEdit.image  = teacher.image;
    this.teacherToEdit.creatorName  = teacher.creatorName;
    this.teacherToEdit.teachedSubjects  = teacher.teachedSubjects;

    var element = document.getElementById("editTeacher");
    element?.classList.remove("switchDisplay");
  }

  hideEditView() {
    var element = document.getElementById("editTeacher");
    element?.classList.add("switchDisplay");
  }

  public updateTeacher() : void {
    this.hideEditView();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('nikprog-practiceapi-token')
    })
    this.http
      .put(
        'https://practiceapi.nikprog.hu/Teacher',
        this.teacherToEdit,
        { headers: headers }
      )
      .subscribe(
        (success) => {
          this.snackBar.open("Update was successful!", "Close", { duration: 5000 })
          location.reload();
        },
        (error) => {
          this.snackBar.open("Error occured, please try again.", "Close", { duration: 5000 })
        }
      )
  }
}
