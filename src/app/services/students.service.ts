import { Injectable } from '@angular/core';
import {FirebaseService} from './firebase.service';
import {Student} from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService extends FirebaseService<Student> {

  constructor() {
    super('students');
  }
}
