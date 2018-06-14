import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AppService } from "./shared/services/app.service";
import { UserService } from "./shared/services/custom/user.service";
import { AuthService } from "./shared/services/core/auth.service";
import { Router } from "@angular/router";
import { RealtimeService} from "./shared/services/core/realtime.service";
import { User } from "./shared/models/user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dashboard';

  constructor(
    private realtime: RealtimeService,
    public app: AppService,
    public auth: AuthService,
    private router: Router,
    private userService: UserService) {
      this.realtime.connect();
    }

  signOut() {
    this.userService.logout();
    this.router.navigate(['/access']);
  }

  @ViewChild('sidenav') sidenav: MatSidenav;

  close() {
    this.sidenav.close();
  }

  getUserEmail(user: User) {
    return user.email;
  }

}