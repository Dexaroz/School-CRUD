import { Injectable } from '@angular/core';
import {FirebaseService} from './firebase.service';
import {Subject} from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService extends FirebaseService<Subject>{

  constructor() {
    super('subjects');
  }
}
