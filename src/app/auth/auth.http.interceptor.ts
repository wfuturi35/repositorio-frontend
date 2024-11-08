import {HttpErrorResponse, HttpHandlerFn, HttpRequest} from '@angular/common/http'
import { inject } from '@angular/core'
import { Router } from '@angular/router'
import {finalize, throwError} from 'rxjs'
import { catchError } from 'rxjs/operators'

import { UiService } from '../common/ui.service'
import { AuthService } from './auth.service'
import {environment} from "../../environments/environment";
import {NgxUiLoaderService} from "ngx-ui-loader";
// loader
var  _activeRequest = 0;

export function AuthHttpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthService)
  const router = inject(Router)
  const uiService = inject(UiService)
  const _ngxUiLoaderService = inject(NgxUiLoaderService)


  function _stopLoader(){
    _activeRequest--;
    if(_activeRequest === 0){
      _ngxUiLoaderService.stop();
    }
  }

  const jwt = authService.getToken()
  const baseUrl = environment.baseUrl

  if (req.url.startsWith(baseUrl)) {
    const authRequest = req.clone({
      setHeaders: {
        authorization: `Bearer ${jwt}`
      }
    })
    // Logic Loader
    if(_activeRequest === 0){
      _ngxUiLoaderService.start()
    }
    _activeRequest++;

    return next(authRequest).pipe(
      finalize(()=> _stopLoader()),
      catchError((err) => {
        uiService.showToast(err.error.message)

        if (err.status === 401) {
          router.navigate(['/login'], {
            queryParams: { redirectUrl: router.routerState.snapshot.url },
          })
        }
        return throwError(() => err)
      })
    )
  } else {
    return next(req)
  }
}
