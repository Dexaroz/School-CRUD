import {Component, OnInit} from '@angular/core';
import {Student} from '../../models/student';
import {StudentsService} from '../../services/students.service';
import {MatDialog} from '@angular/material/dialog';
import {FormDialogComponent} from '../../components/form-dialog/form-dialog.component';
import {CrudTableComponent} from '../../components/crud-table/crud-table.component';

@Component({
  selector: 'app-students',
  imports: [
    CrudTableComponent
  ],
  templateUrl: './students.component.html',
  standalone: true,
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  fields = ['name', 'email'];
  students: Student[] = [];

  constructor(private service: StudentsService, private dialog: MatDialog) {}

  ngOnInit() {
    this.service.getAll().subscribe((data: Student[]) => {
      this.students = data;
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
        type: 'Student',
        fields: ['name', 'email'],
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
        type: 'Student',
        fields: ['name', 'email'],
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
