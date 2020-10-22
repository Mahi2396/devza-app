import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskCrudComponent } from './task-crud/task-crud.component';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  taskList:  MatTableDataSource<Task>;
  public displayedColumns: string[] = [
    'id',
    'message',
    'created_on',
    'assigned_name',
    'priority',
    'due_date',
    'actions',
  ];

  constructor(private _taskService: TaskService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getTaskList();
  }

  /** Retrieve task list */
  private getTaskList() {
    this._taskService.getTaskList().subscribe(
      (taskList) => {
        console.log(taskList);
        this.taskList = new MatTableDataSource(taskList['tasks']);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  /** Fire event on add task button click */
  public addTask(taskData: Task = null) {
    const dialogRef = this.dialog.open(TaskCrudComponent, {
      width: '45%',
      data: taskData,
    });

    dialogRef.componentInstance.onAdd.subscribe((result: any) => {
      if (result) {
        this.getTaskList();
      }
    });
  }

  /** Fire event on delete action
   * task: Selected task object
   */
  public onEdit(task: Task) {
    this.addTask(task);
  }

  /** Fire event on delete action
   * task: Object of selected task
   */
  public onDelete(task) {
    this._taskService.deleteTask(task.id).subscribe(
      (deleted) => {
        this.getTaskList();
      },
      (err) => {}
    );
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.taskList.filter = filterValue.trim().toLowerCase();

  }
}
