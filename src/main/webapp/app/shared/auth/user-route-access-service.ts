import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Principal } from '../';
import { LoginModalService } from '../login/login-modal.service';
import { StateStorageService } from './state-storage.service';

@Injectable()
export class UserRouteAccessService implements CanActivate {

    constructor(private router: Router,
                private loginModalService: LoginModalService,
                private principal: Principal,
                private stateStorageService: StateStorageService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {

        const authorities = route.data['authorities'];
        // We need to call the checkLogin / and so the principal.identity() function, to ensure,
        // that the client has a principal too, if they already logged in by the server.
        // This could happen on a page refresh.
        return this.checkLogin(authorities, state.url);
    }

    checkLogin(authorities: string[], url: string): Promise<boolean> {
        const principal = this.principal;
        return Promise.resolve(principal.identity().then((account) => {

            if (!authorities || authorities.length === 0) {
                return true;
            }
            const roles: string[] = new Array();
            for (const authority of authorities) {
                if (authority.startsWith('ROLE_')) {
                    roles.push(authority);
                }
            }

            if (account) {
                // Check if authorities is a ROLE (with prefix) because
                // authorityRoute of all generated entities check authorities 'ROLE_ADMIN'
                // Improvement is to add 'roles' in data of authorityRoute and handle it here
                if (roles && roles.length > 0) {
                    return principal.hasAnyRole(roles).then((response) => {
                        if (response) {
                            return true;
                        }
                        return false;
                    });
                }
                return principal.hasAnyAuthority(authorities).then((response) => {
                    if (response) {
                        return true;
                    }
                    return false;
                });
            }

            this.stateStorageService.storeUrl(url);
            this.router.navigate(['accessdenied']).then(() => {
                // only show the login dialog, if the user hasn't logged in yet
                if (!account) {
                    this.loginModalService.open();
                }
            });
            return false;
        }));
    }
}
