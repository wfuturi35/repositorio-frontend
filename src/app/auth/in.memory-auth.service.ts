import { Injectable } from '@angular/core'
import { sign } from 'fake-jwt-sign'
import { Observable, of, throwError } from 'rxjs'
import { Role } from './auth.enum'
import { AuthService, IAuthStatus, IServerAuthResponse } from './auth.service'
import {User} from "../user/user/user";

@Injectable({
  providedIn: 'root',
})
export class InMemoryAuthService extends AuthService {
  private defaultUser = User.Build({

    id: 25878,
    email:'wfuturi@gmail.com',
    //password:'12345678',
    //dateOfBirth: new Date(1995, 10, 10),
    age:  30,
    fullName: { first: 'Wilfredo', middle: 'Futuri', last: 'Illa' },
    phone: '997114593',
    city: 'Lima',
    gender: 'Masculino',
    photo: 'https://fsadfasdf',
    accountLocked: false,
    accountActive: true,
    role: Role.User,

  })

  constructor() {
    super()
    console.warn(
      "You're using the InMemoryAuthService. Do not use this service in production."
    )
  }

  protected authProvider(
    email: string,
    _password: string
  ): Observable<IServerAuthResponse> {
    email = email.toLowerCase()

    if (!email.endsWith('@test.com')) {
      return throwError(() => 'Failed to login! Email needs to end with @test.com.')
    }

    const authStatus = {
      isAuthenticated: true,
      //userId: this.defaultUser._id,
      userRole: email.includes('user')
        ? Role.User
        : email.includes('manager')
          ? Role.Manager
          : email.includes('admin')
            ? Role.Admin
            : Role.None,
    } as IAuthStatus

    this.defaultUser.role = authStatus.userRole

    const authResponse = {
      accessToken: sign(authStatus, 'secret', {
        expiresIn: '1h',
        algorithm: 'none',
      }),
    } as IServerAuthResponse

    return of(authResponse)
  }

  protected transformJwtToken(token: IAuthStatus): IAuthStatus {
    return token
  }

  protected getCurrentUser(): Observable<User> {
    return of(this.defaultUser)
  }
}

