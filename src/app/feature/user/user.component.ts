import { Component, OnInit } from "@angular/core";
import { TaskService } from "./../task/task.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  public userList=[];
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getUser().subscribe(
      (userList) => {
        console.log(userList);
        this.userList=userList['users'];
      },
      (err) => {
        this.userList=[];
      }
    );
  }
}
