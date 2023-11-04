import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, tap, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { EventBusService } from "../services/event-bus.service";
import { TokenService } from '../services/token.service';
import EventData from "../utility/events/event-data";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private tokenService: TokenService,
        private eventBusService: EventBusService,
        private authService: AuthService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = this.tokenService.getToken();
        if (idToken) {
            req = this.addToken(req, idToken);
        }

        return next.handle(req).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse &&
                !req.url.includes('api/auth') &&
                error.status === 401) {
                return this.handle401ErrorB(req, next)
            } else {
                return throwError(() => error);
            }
        }))

    }

    private handle401ErrorB(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            var refreshToken = this.tokenService.getRefreshToken();

            return this.authService.refreshToken(refreshToken).pipe(
                switchMap((data: any) => {
                    if (data.success) {
                        this.isRefreshing = false;

                        this.tokenService.setTokens(data.data)

                        const idToken = this.tokenService.getToken();

                        this.refreshTokenSubject.next(idToken);

                        return next.handle(this.addToken(request, idToken));
                    } else {

                        this.emitLogOut();
                        return throwError(() => `REFRESH CALL ERROR: ${data.message}`);
                    }
                }),
                catchError((error) => {
                    this.isRefreshing = false;

                    if (error.status == '403') {
                        this.emitLogOut();
                    }

                    return throwError(() => `REFRESH EXCEPTION: ${error}`);
                }));
        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(t => {
                    return next.handle(this.addToken(request, t));
                })
            )
        }
    }

    private emitLogOut() {
        this.tokenService.removeToken();
        this.eventBusService.emit(new EventData('logout', null));
    }

    private addToken(request: HttpRequest<any>, token: any) {
        return request.clone({
            headers: request.headers.set("Authorization", "Bearer " + token)
        })
    }
}

