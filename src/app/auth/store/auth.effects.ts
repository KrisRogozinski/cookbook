import {Actions, Effect, ofType} from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import {Injectable} from '@angular/core';
import {map, switchMap, mergeMap} from 'rxjs/operators';
import {from} from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.TRY_SIGNUP),
    map((action: AuthActions.TrySignup) => {
      return action.payload;
    }),
    switchMap((authData: {username: string, password: string}) => {
      return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    }),
    switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken());
    }),
    mergeMap((token: string) => {
      return [
        {
          type: AuthActions.SIGNUP
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
      }
    )
  );
  constructor(private actions$: Actions) {
  }

}
