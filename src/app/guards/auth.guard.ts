import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable} from 'rxjs';


import { map, take, tap } from 'rxjs/operators';

import {AngularFireAuth } from 'angularfire2/auth';
import {AuthService} from '../servicios/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // return this.afAuth.authState.pipe(map(authState => !! authState));
    return this.afAuth.authState.pipe(
      map(authState => !! authState),
      take(1),
      tap(allowed => {
          if (!allowed) {
              this.router.navigate(['/login']);
          }
      }));
  }
}
