import { Component, OnInit } from "@angular/core";
import { LoaderService } from "./loader.service";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"],
})
export class LoaderComponent implements OnInit {
  public isLoaderToBeShown: boolean;
  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.getLoaderStatus();
  }
  private getLoaderStatus() {
    this.loaderService.httpProgress().subscribe((status) => {
      this.isLoaderToBeShown = status;
    });
  }
}
