import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard = (): CanActivateFn => route => !!inject(AuthService).user || createUrlTreeFromSnapshot(route, ['/', 'login']);
