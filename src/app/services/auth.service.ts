import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http"
import { catchError, tap } from "rxjs/operators";

import { throwError } from "rxjs";
import { TokenService } from "./token.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    endpoint: string | undefined = environment.BACKEND_URL;
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient,
        private tokenService: TokenService) { }

    isAuthenticated(){
        var token = this.tokenService.getToken();

        if (token && this.tokenService.isTokenExpired() == false) {
            return true;
        }

        return false;
    }
    
    login(email: string, password: string) {
        return this.http.post<any>(`${this.endpoint}/auth`, { email, password })
            .pipe(catchError(this.handleError));
    }

    logout(userId: any) {
        return this.http.post<any>(`${this.endpoint}/auth/logout`, { userId })
            .pipe(catchError(this.handleError));
    }

    refreshToken(refreshToken: any) {
        return this.http.post<any>(`${this.endpoint}/refreshtoken`, { refreshToken })
            .pipe(catchError(this.handleError));
    }

    initialPasswordChange(email: string, oldPassword: string, newPassword: string) {
        return this.http.post<any>(`${this.endpoint}/initial`, { email, oldPassword, newPassword })
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        let msg = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            msg = error.error.message;
        } else {
            // server-side error
            msg = `[Error Code] : ${error.status}\n[Message] : ${error.message}`;
        }
        console.log(error)
        return throwError(() => msg);
    }
}