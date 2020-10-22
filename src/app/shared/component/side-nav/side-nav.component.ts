import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-side-nav",
  templateUrl: "./side-nav.component.html",
  styleUrls: ["./side-nav.component.scss"],
})
export class SideNavComponent implements OnInit {
  public sideNavItem = [
    {
      label: "Task",
      path: "task",
      icon: "camera_enhance",
    },
    {
      label: "User",
      path: "user",
      icon: "group",
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
