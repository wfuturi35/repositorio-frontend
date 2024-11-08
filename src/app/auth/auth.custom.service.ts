import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { $enum } from 'ts-enum-util'

import { environment } from '../../environments/environment'
import { transformError } from '../common/common'
import { IUser, User } from '../user/user/user'
import { Role } from './auth.enum'
import {AuthService, defaultAuthStatus, IAuthStatus, IServerAuthResponse} from './auth.service'
import {signOut} from "@angular/fire/auth";

interface IJwtToken {
  fullName: string
  sub: string
  iat: number
  exp: number
  authorities: string[]
}


@Injectable({
  providedIn: 'root',
})
export class CustomAuthService extends AuthService {
  private httpClient: HttpClient = inject(HttpClient)

  protected authProvider( email: string, password: string): Observable<IServerAuthResponse> {
    return this.httpClient.post<IServerAuthResponse>(
      `${environment.baseUrl}/auth/login`,
      {
        email,
        password,
      }
    )

  }

  protected transformJwtToken(token: IJwtToken): IAuthStatus {
    return {
      isAuthenticated: !!token.sub,
      userRole: token.authorities[token.authorities.length - 1] || 'USER',
    } as IAuthStatus;
  }

  protected getCurrentUser(): Observable<User> {
    return this.httpClient
      .get<IUser>(`${environment.baseUrl}/users/me`)
      .pipe(map(User.Build, catchError(transformError)))
  }


}
