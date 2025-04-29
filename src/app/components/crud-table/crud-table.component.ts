import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-crud-table',
  imports: [
    NgForOf
  ],
  templateUrl: './crud-table.component.html',
  styleUrl: './crud-table.component.css'
})
export class CrudTableComponent {

  @Input() items: any[] = [];
  @Input() fields: string[] = [];

  @Input() students: { [id: string]: string } = {};
  @Input() subjects: { [id: string]: string } = {};
  @Input() grades: { [id: string]: string } = {};

  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  handleEdit(item: any) {
    this.onEdit.emit(item);
  }

  handleRemove(item: any) {
    this.onDelete.emit(item);
  }

  capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  displayField(item: any, field: string): string {
    if (field === 'student_id') {
      console.log(this.students[item.student_id]);
      return this.students[item.student_id] || item.student_id;
    }
    if (field === 'subject_id') {
      console.log(this.subjects[item.subject_id]);
      return this.subjects[item.subject_id] || item.subject_id;
    }
    return item[field];
  }
}
