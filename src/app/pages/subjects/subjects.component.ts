import { Component } from '@angular/core';
import {CrudTableComponent} from "../../components/crud-table/crud-table.component";
import {Subject} from '../../models/subject';
import {SubjectsService} from '../../services/subjects.service';
import {MatDialog} from '@angular/material/dialog';
import {FormDialogComponent} from '../../components/form-dialog/form-dialog.component';

@Component({
  selector: 'app-subjects',
    imports: [
        CrudTableComponent
    ],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
})

export class SubjectsComponent {
  fields = ['name', 'description'];
  subjects: Subject[] = [];

  constructor(private service: SubjectsService, private dialog: MatDialog) {}

  ngOnInit() {
    this.service.getAll().subscribe((data: Subject[]) => {
      this.subjects = data;
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
        type: 'Subject',
        fields: ['name', 'description'],
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
        type: 'Subject',
        fields: ['name', 'description'],
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
