import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from '../_models/subject';
import { LiteralPrimitive } from '@angular/compiler';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-subjects',
  templateUrl: './list-subjects.component.html',
  styleUrls: ['./list-subjects.component.scss']
})
export class ListSubjectsComponent implements OnInit {
  http: HttpClient
  subjects: Array<Subject>
  snackBarRef: any

  constructor(http: HttpClient, snackBar: MatSnackBar) {
    this.http = http
    this.subjects = []
    this.snackBarRef = this.snackBarRef
  }

  ngOnInit(): void {
    this.http
    .get<Array<Subject>>('https://practiceapi.nikprog.hu/Subject')
    .subscribe(resp => {
      resp.map(x => {
        let s = new Subject()
        s.id = x.id
        s.name = x.name
        s.neptun = x.neptun
        s.credit = x.credit
        s.exam = x.exam
        s.image = x.image
        s.creatorName = x.creatorName
        s.registeredStudents = x.registeredStudents
        this.subjects.push(s)
      })
      console.log(this.subjects);
      
    })
  }

  Alert(id: string) {   
    alert(id)
  }

}