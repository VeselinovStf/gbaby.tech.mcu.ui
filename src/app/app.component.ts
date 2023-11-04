import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { environment } from "src/environments/environment";
import { AuthService } from './services/auth.service';
import { EventBusService } from './services/event-bus.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  eventBusSubscription?: Subscription;

  constructor(
    private eventBusService: EventBusService,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router) { }

  ngOnInit() {
    this.eventBusSubscription = this.eventBusService.on('logout', () => {
      this.logOut();
    });
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }
 
  private logOut() {
    this.authService.logout(this.tokenService.getUserId)
      .subscribe(data => {
        // Print Result if is not production
        if (!environment.production) {
          console.log(data)
        }

        // Cleare all Stored Data - No matter the result of the call
        this.tokenService.removeToken();
        this.router.navigateByUrl("");
      });
  }
}