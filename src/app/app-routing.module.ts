import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ListSubjectsComponent } from './list-subjects/list-subjects.component';
import { ListTeachersComponent } from './list-teachers/list-teachers.component';
import { LogoutComponent } from './logout/logout.component';
import { ApiService } from './api.service';
import { CreateTeacherComponent } from './create-teacher/create-teacher.component';

const routes: Routes = [
  { path: 'subjects', component: ListSubjectsComponent },
  { path: 'teachers', component: ListTeachersComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'create-teacher', component: CreateTeacherComponent, canActivate: [ApiService] },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
