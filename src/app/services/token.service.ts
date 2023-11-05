import { Injectable } from '@angular/core';
// import * as moment from 'moment'
// import { Buffer } from 'buffer/';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor() { }

    base64ToString(encoded: string): any {
        return encoded;
        //return Buffer.from(encoded, "base64").toString();
    }

    isTokenExpired(): boolean {
        return false;
        //return !moment().isBefore(this.getTokenExpiration())
    }

    getToken() {
        return localStorage.getItem("id_token");
    }

    getRefreshToken() {
        return localStorage.getItem("refresh_token");
    }

    getUserId() {
        return localStorage.getItem("user_id");
    }

    removeToken() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_id");
    }

    setTokens(authResult: any) {

        let payload = JSON.parse(this.base64ToString(authResult.idToken.split('.')[1]));

       // const expiresIn = moment().add(payload.exp, 'second');

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('refresh_token', authResult.refreshToken);
        localStorage.setItem('user_id', payload.data1);
        localStorage.setItem("expires_at", JSON.stringify(50));
    }

    private getTokenExpiration() {
        const expiration = localStorage.getItem("expires_at");
        if (expiration == null) {
            return new Date()
        }
        const expiresAt = JSON.parse(expiration == null ? new Date().toString() : expiration); // TODO ? DATE

        return new Date();
    }
}
