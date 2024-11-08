import {inject, Injectable} from '@angular/core';
import {IUser, User} from "./user";
import {Observable, of, throwError} from "rxjs";
import {CacheService} from "../../common/cache.service";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../auth/auth.service";
import {environment} from "../../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {transformError} from "../../common/common";
import {UserRequest} from "../model/user-request.model";
import {UserResponse} from "../model/user-response.model";
import {UiService} from "../../common/ui.service";


export interface IUsers {
  data: IUser[]
  total: number
}

export interface IUserService {
  getUser(id: string): Observable<IUser>

  updateUser(id: number | string, user: IUser): Observable<IUser>
  getUsers(pageSize: number, searchText: string, pagesToSkip: number): Observable<IUsers>
}

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService{

  private readonly cache = inject(CacheService)
  private readonly httpClient = inject(HttpClient)
  private readonly authService = inject(AuthService)
  private uiService = inject(UiService);

  constructor() { }

  getUser(id: string | null): Observable<IUser> {
    if (id === null) {
      return throwError(() => 'User id is not set')
    }

    return this.httpClient.get<IUser>(`${environment.baseUrl}/users/${id}`)
  }

  updateUser(id: number | string, user: IUser): Observable<IUser> {
    if (id === '') {
      return throwError(() => 'User id is not set')
    }

    // cache user data in case of errors
    this.cache.setItem('draft-user', Object.assign(user, { _id: id }))
    const updateResponse$ = this.httpClient
      .put<IUser>(`${environment.baseUrl}/users/${id}`, user)
      .pipe(map(User.Build), catchError(transformError))

    updateResponse$.subscribe({
      next: (res) => {
        this.authService.currentUser$.next(res)
        this.cache.removeItem('draft-user')
      },
      error: (err) => throwError(() => err),
    })

    return updateResponse$
  }

  getUsers(
    pageSize: number,
    searchText = '',
    pagesToSkip = 0,
    sortColumn = '',
    sortDirection: '' | 'asc' | 'desc' = 'asc'
  ): Observable<IUsers> {
    const recordsToSkip = pageSize * pagesToSkip
    if (sortColumn) {
      sortColumn = sortDirection === 'desc' ? `-${sortColumn}` : sortColumn
    }
    return this.httpClient.get<IUsers>(`${environment.baseUrl}/users`, {
      params: {
        filter: searchText,
        skip: recordsToSkip.toString(),
        limit: pageSize.toString(),
        sortKey: sortColumn,
      },
    })
  }


  register(userData: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/auth/register`, userData);
  }

  checkEmail(email: string): Observable<string> {
    return this.httpClient.get(`${environment.baseUrl}/auth/check-email`, {
      params: { email },
      responseType: 'text' // This will treat the response as plain text
    }).pipe(
      map(response => {
        // Handle the string response (e.g., "Email disponible")
        if (response === 'Email disponible') {
          return response; // Forward this to the component
        } else {
          return ''; // If it's anything else, return empty
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle any errors, such as a 409 conflict for existing email
        if (error.status === 409) {
          this.uiService.showToast('El email ya está registrado');
        }
        return of(''); // Return an empty string if there's an error
      })
    );
  }

  actualizarUsuario(userId: number, userRequest: UserRequest): Observable<any> {
    const url = `${environment.baseUrl}/users/${userId}`;
    return this.httpClient.put(url, userRequest, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  // Metodo para obtener los eventos con paginación
  getAllSolicitudRol(): Promise<UserResponse[]> {
    // @ts-ignore
    return this.httpClient.get<UserResponse[]>(`${environment.baseUrl}/users/envio-formulario`).toPromise();
  }

  addRole(userId: number | undefined, roleName: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/users/${userId}/roles`, { roleName });
  }



}
