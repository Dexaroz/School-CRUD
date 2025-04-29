import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

interface DialogData {
  item?: any;
  type?: string;
  fields?: string[];
  selects?: { name: string; options: { [id: string]: string } }[];
}

@Component({
  selector: 'app-form-dialog',
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './form-dialog.component.html',
  standalone: true,
  styleUrl: './form-dialog.component.css'
})

export class FormDialogComponent implements OnInit {

  formData: any = {};
  isEditMode: boolean = false;
  type: string = '';
  fields: string[] = [];
  selects: { name: string; options: { [id: string]: string } }[] = [];

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    if (this.data?.item) {
      const { id, ...fields } = this.data.item;
      this.formData = { ...fields };
      this.formData.id = id;
      this.isEditMode = true;
    }
    if (this.data?.type) {
      this.type = this.data.type;
    }

    if (this.data?.selects) {
      this.selects = this.data.selects;
    }

    if (this.data?.fields) {
      this.fields = this.data.fields;
    }
  }

  save() {
    if (this.data?.item?.id) {
      this.formData.id = this.data.item.id;
    }
    this.dialogRef.close(this.formData);
  }

  cancel() {
    this.dialogRef.close();
  }

  capitalize(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  selectType(field: string): string {
    switch (field) {
      case 'grade':
        return 'number';
      case 'email':
        return 'email';
      default:
        return 'text';
    }
  }

  clear(){
    this.formData = {};
  }

  getErrorMessage(field: string, errors: any) {
    if (!errors) return '';

    if (errors['required']) return `${this.capitalize(field)} is required`;
    if (errors['pattern']) return `${this.capitalize(field)} has an invalid format`;

    return `${this.capitalize(field)} is invalid`;
  }

  selectPattern(field: string) {

    if (field === 'email') {
      return '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$';
    }

    return '';
  }
}
