import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from './../task.service';

interface Priority {
  value: number;
  label: string;
}
@Component({
  selector: 'app-task-crud',
  templateUrl: './task-crud.component.html',
  styleUrls: ['./task-crud.component.scss'],
})
export class TaskCrudComponent implements OnInit {
  priority: Priority[] = [
    { value: 0, label: 'Low' },
    { value: 1, label: 'Medium' },
    { value: 2, label: 'High' },
  ];
  public taskForm: FormGroup = this.formBuilder.group({
    id: [],
    message: ['', Validators.required],
    due_date: [''],
    priority: [''],
    assigned_to: [''],
  });
  public userList = [];
  public isEdit = false;
  @Output() onAdd = new EventEmitter<any>();
  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    public dialogRef: MatDialogRef<TaskCrudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getUserList();
    if (this.data) {
      this.isEdit = true;
      this.taskForm.patchValue({
        id: this.data.id,
        message: this.data.message,
        priority: Number(this.data.priority),
        due_date: this.data.due_date ? new Date(this.data.due_date) : null,
        assigned_to: this.data.assigned_to,
      });
    }
  }
  private getUserList() {
    this.taskService.getUser().subscribe(
      (userList) => {
        this.userList = userList['users'];
      },
      (err) => {}
    );
  }
  public save() {
    if (this.isEdit) {
      this.taskService.updateTask(this.taskForm.value).subscribe((res) => {
        this.toastMessage('Task Updated successfully!');
        this.onAdd.emit(true);
        this.dialogRef.close();
      });
    } else {
      this.taskService.addTask(this.taskForm.value).subscribe((res) => {
        this.toastMessage('Task Added successfully!');
        this.onAdd.emit(true);
        this.dialogRef.close();
      });
    }
  }

  private toastMessage(msg) {
    this._snackBar.open(msg, '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
