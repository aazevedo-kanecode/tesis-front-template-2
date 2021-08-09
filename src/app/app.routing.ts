import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Import Containers
import { DefaultLayoutComponent } from "./containers";

import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { LoginComponent } from "./views/login/login.component";
import { RegisterComponent } from "./views/register/register.component";
import { WebcamComponent } from "./webcam/webcam.component";
import { VerficationCodeComponent } from "./views/verification-code/verification-code.component";
import { YourCodeComponent } from "./views/verification-code/your-code.component";
import { RoomComponent } from "./views/room/components/room/room.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "404",
    component: P404Component,
    data: {
      title: "Page 404",
    },
  },
  {
    path: "500",
    component: P500Component,
    data: {
      title: "Page 500",
    },
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Login Page",
    },
  },
  {
    path: "your-code",
    component: YourCodeComponent,
    data: {
      title: "Your verification code",
    },
  },
  {
    path: "verification-code/:secret",
    component: VerficationCodeComponent,
    data: {
      title: "Verification code",
    },
  },
  {
    path: "webcam",
    component: WebcamComponent,
    data: {
      title: "Webcam page",
    },
  },
  {
    path: "register",
    component: RegisterComponent,
    data: {
      title: "Register Page",
    },
  },
  {
    path: ':id',
    component: RoomComponent,
    pathMatch: "full",
  },
  {
    path: "",
    component: DefaultLayoutComponent,
    data: {
      title: "Home",
    },
    children: [
      {
        path: "profile-user",
        loadChildren: () =>
          import("./views/profile-user/profile-user.module").then(
            (m) => m.ProfileUserModule
          ),
      },
      {
        path: "confidence-levels",
        loadChildren: () =>
          import("./views/confidence-levels/confidence-levels.module").then(
            (m) => m.ConfidenceLevelsModule
          ),
      },
      {
        path: "camera",
        loadChildren: () =>
          import("./views/camera/camera.module").then((m) => m.CameraModule),
      },
      /*{
        path: ":id",
        loadChildren: () =>
          import("./views/room/room.module").then((m) => m.RoomModule),
      },*/
      {
        path: "base",
        loadChildren: () =>
          import("./views/base/base.module").then((m) => m.BaseModule),
      },
      {
        path: "buttons",
        loadChildren: () =>
          import("./views/buttons/buttons.module").then((m) => m.ButtonsModule),
      },
      {
        path: "charts",
        loadChildren: () =>
          import("./views/chartjs/chartjs.module").then((m) => m.ChartJSModule),
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./views/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "icons",
        loadChildren: () =>
          import("./views/icons/icons.module").then((m) => m.IconsModule),
      },
      {
        path: "notifications",
        loadChildren: () =>
          import("./views/notifications/notifications.module").then(
            (m) => m.NotificationsModule
          ),
      },
      {
        path: "theme",
        loadChildren: () =>
          import("./views/theme/theme.module").then((m) => m.ThemeModule),
      },
      {
        path: "widgets",
        loadChildren: () =>
          import("./views/widgets/widgets.module").then((m) => m.WidgetsModule),
      },
    ],
  },
  { path: "**", component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
