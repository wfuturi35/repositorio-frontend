import { environment } from '../../environments/environment'
import { AuthMode } from './auth.enum'
import {InMemoryAuthService} from "./in.memory-auth.service";
import {FirebaseAuthService} from "./firebase-auth.service";
import {CustomAuthService} from "./auth.custom.service";

export function authFactory() {
  switch (environment.authMode) {
    case AuthMode.InMemory:
      return new InMemoryAuthService()
    case AuthMode.Firebase:
      return new FirebaseAuthService()
    case AuthMode.CustomServer:
      return new CustomAuthService()
    /*case AuthMode.GraphQL:
      throw new Error('Not yet implemented')*/
  }
}
