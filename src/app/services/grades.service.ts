import { Injectable } from '@angular/core';
import {FirebaseService} from './firebase.service';
import {Grade} from '../models/grade';

@Injectable({
  providedIn: 'root'
})
export class GradesService extends FirebaseService<Grade> {

  constructor() {
    super('grades');
  }
}
