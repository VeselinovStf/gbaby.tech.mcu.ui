import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { TokenService } from "../services/token.service";

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {
    constructor(
        public authService: AuthService,
        public router: Router,
        private tokenService: TokenService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {//: Observable<boolean> {
        if (!this.tokenService.getToken()) {
            this.router.navigateByUrl('/login')
            return false;
        }

        return true;
    }
}