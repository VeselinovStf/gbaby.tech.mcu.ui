import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http"
import { catchError, tap } from "rxjs/operators";

import { throwError } from "rxjs";
import { TokenService } from "./token.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
})
export class UserService {

    endpoint: string | undefined = environment.BACKEND_URL;
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient,
        private tokenService: TokenService) { }

    create(password: string, username: string, userPassword: string) {
        return this.http.post<any>(`${this.endpoint}/create-user`, { password, username, userPassword })
            .pipe(catchError(this.handleError));
    }

    setUpAccount(ssid: any, ssidPassword: any, ipAddress: any, subnetmask: any, gateway: any, connectionType: any, username: any, oldPassword: any, newPassword: any) {
        return this.http.post<any>(`${this.endpoint}/setup-account`, { ssid, ssidPassword, ipAddress, subnetmask, gateway, connectionType, username, oldPassword, newPassword })
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