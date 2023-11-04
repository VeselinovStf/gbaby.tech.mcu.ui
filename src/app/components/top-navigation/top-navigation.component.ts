import { Component } from '@angular/core';
import { EventBusService } from 'src/app/services/event-bus.service';
import { TokenService } from 'src/app/services/token.service';
import EventData from 'src/app/utility/events/event-data';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.css']
})
export class TopNavigationComponent {

  constructor(
    private eventBusService: EventBusService,
    private tokenService: TokenService) { }

  isAuthenticated() {
    var token = this.tokenService.getToken();

    if (token && this.tokenService.isTokenExpired() == false) {
      return true;
    }

    return false;

  }

  logout() {
    this.eventBusService.emit(new EventData('logout', null));
  }
}
