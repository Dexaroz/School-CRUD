import {Component, OnInit} from '@angular/core';
import {Grade} from '../../models/grade';
import {GradesService} from '../../services/grades.service';
import {StudentsService} from '../../services/students.service';
import {SubjectsService} from '../../services/subjects.service';
import {MatDialog} from '@angular/material/dialog';
import {Student} from '../../models/student';
import {Subject} from '../../models/subject';
import {FormDialogComponent} from '../../components/form-dialog/form-dialog.component';
import {CrudTableComponent} from '../../components/crud-table/crud-table.component';

@Component({
  selector: 'app-grades',
  imports: [
    CrudTableComponent
  ],
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.css'
})
export class GradesComponent implements OnInit {
  fields = ['student_id', 'subject_id', 'grade'];
  grades: Grade[] = [];

  subjectsMap: { [id: string]: string } = {};
  studentsMap: { [id: string]: string } = {};

  constructor(private service: GradesService,
              private studentService: StudentsService,
              private subjectsService: SubjectsService,
              private dialog: MatDialog) {}

  ngOnInit() {
    this.service.getAll().subscribe((data: Grade[]) => {
      this.grades = data;
    });

    this.subjectsService.getAll().subscribe((data: Subject[]) => {
      data.forEach(c => this.subjectsMap[c.id!] = c.name);
    });

    this.studentService.getAll().subscribe((data: Student[]) => {
      data.forEach(p => this.studentsMap[p.id!] = p.name);
    });
  }

  add(item: any) {
    this.service.addWithCustomId(item).then(() => {});
  }

  edit(item: any) {
    this.service.update(item).subscribe(() => {});
  }

  remove(item: any) {
    this.service.delete(item.id).subscribe(() => {});
  }

  onAdd(){
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '600px',
      data: {
        type: 'Grade',
        fields: ['grade'],
        selects: [
          { name: 'student_id', options: this.studentsMap },
          { name: 'subject_id', options: this.subjectsMap }
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.add(result);
      }
    });
  }

  onEdit(item: any) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '600px',
      data: {
        type: 'Grade',
        fields: ['grade'],
        selects: [
          { name: 'student_id', options: this.studentsMap },
          { name: 'subject_id', options: this.subjectsMap }
        ],
        item: item
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.edit(result);
      }
    });
  }
}
