import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Task } from './task.model';

@Injectable()
export class TaskService {
  BASE_URL = "https://devza.com/tests/tasks/";
  constructor(private http: HttpClient) {}

  public getTaskList(): Observable<any> {
    return this.http.get(this.BASE_URL + "list");
  }

  public getUser(): Observable<any> {
    return this.http.get(this.BASE_URL + "listusers");
  }

  public addTask(task:Task): Observable<any> {
    const formData = new FormData();
    formData.append("message", task.message);
    formData.append("due_date", this.dateFormat(task.due_date));
    formData.append("priority", task.priority);
    formData.append("assigned_to", task.assigned_to);

    return this.http.post(this.BASE_URL + "create", formData);
  }
  public updateTask(task:Task): Observable<any> {
    const formData = new FormData();

    formData.append("message", task.message);
    formData.append("due_date", this.dateFormat(task.due_date));
    formData.append("priority", task.priority);
    formData.append("assigned_to", task.assigned_to);
    formData.append("taskid", task.id);
    return this.http.post(this.BASE_URL + "update", formData);
  }

  public deleteTask(taskId): Observable<any> {
    const formData = new FormData();
    formData.append("taskid", taskId);
    return this.http.post(this.BASE_URL + "delete", formData);
  }

  private dateFormat(due_date) {
    let dueDate = null;
    if (due_date) {
      const date = due_date.getDate();
      const month = due_date.getMonth() + 1;
      const year = due_date.getFullYear();
      dueDate = year + "-" + month + "-" + date + " " + "00:00:00";
    }
    return dueDate;
  }
}
