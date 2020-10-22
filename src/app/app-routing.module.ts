import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "task",
    pathMatch: "full",
  },
  {
    path: "task",
    loadChildren: () =>
      import("./feature/task/task.module").then((m) => m.TaskModule),
  },
  { path: 'user', loadChildren: () => import('./feature/user/user.module').then(m => m.UserModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
