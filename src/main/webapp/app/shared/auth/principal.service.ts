import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AccountService } from './account.service';

@Injectable()
export class Principal {
    private userIdentity: any;
    private authenticated = false;
    private authenticationState = new Subject<any>();

    constructor(
        private account: AccountService
    ) {}

    authenticate(identity) {
        this.userIdentity = identity;
        this.authenticated = identity !== null;
        this.authenticationState.next(this.userIdentity);
    }

    hasAnyAuthority(authorities: string[]): Promise<boolean> {
        return Promise.resolve(this.hasAnyAuthorityDirect(authorities));
    }

    hasAnyAuthorityDirect(authorities: string[]): boolean {
        if (!this.authenticated || !this.userIdentity || !this.userIdentity.roles || !this.userIdentity.roles[0].authorities) {
            return false;
        }

        const roles = this.userIdentity.roles;
        for (let i = 0; i < authorities.length; i++) {
            for (const role of roles) {
                for (const auth of role.authorities) {
                    if (auth.name === authorities[i]) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    hasAuthority(authority: string): Promise<boolean> {
        if (!this.authenticated) {
           return Promise.resolve(false);
        }

        return this.identity().then((id) => {
            return Promise.resolve(
                id.authorities && this.resolveAuthority(id, authority));
        }, () => {
            return Promise.resolve(false);
        });
    }

    resolveAuthority(userIdentity: any, authority: any): boolean {
        if (!userIdentity.roles[0].authorities) {
            return false;
        }

        const roles = this.userIdentity.roles;
        for (const role of roles){
            for (const auth of role.authorities) {
                if (auth.name === authority) {
                    return true;
                }
            }
        }
        return false;
    }

    /* Roles */

    hasAnyRole(roles: string[]): Promise<boolean> {
        return Promise.resolve(this.hasAnyRoleDirect(roles));
    }

    hasAnyRoleDirect(roles: string[]): boolean {
        if (!this.authenticated || !this.userIdentity || !this.userIdentity.roles) {
            return false;
        }

        const userRoles = this.userIdentity.roles;
        for (let i = 0; i < roles.length; i++) {
            for (const r of userRoles){
                if (r.name === roles[i]) {
                    return true;
                }
            }
        }

        return false;
    }

    hasRole(role: string): Promise<boolean> {
        if (!this.authenticated) {
           return Promise.resolve(false);
        }

        return this.identity().then((id) => {
            return Promise.resolve(id.roles && this.resolveAuthority(id, role));
        }, () => {
            return Promise.resolve(false);
        });
    }

    resolveRole(userIdentity: any, role: any): boolean {
        if (!userIdentity.roles) {
            return false;
        }
        const userRoles = this.userIdentity.roles;
            for (const r of userRoles) {
                if (r.name === role) {
                    return true;
                }
        }
        return false;
    }

    identity(force?: boolean): Promise<any> {
        if (force === true) {
            this.userIdentity = undefined;
        }

        // check and see if we have retrieved the userIdentity data from the server.
        // if we have, reuse it by immediately resolving
        if (this.userIdentity) {
            return Promise.resolve(this.userIdentity);
        }

        // retrieve the userIdentity data from the server, update the identity object, and then resolve.
        return this.account.get().toPromise().then((response) => {
            const account = response.body;
            if (account) {
                this.userIdentity = account;
                this.authenticated = true;
            } else {
                this.userIdentity = null;
                this.authenticated = false;
            }
            this.authenticationState.next(this.userIdentity);
            return this.userIdentity;
        }).catch((err) => {
            this.userIdentity = null;
            this.authenticated = false;
            this.authenticationState.next(this.userIdentity);
            return null;
        });
    }

    isAuthenticated(): boolean {
        return this.authenticated;
    }

    isIdentityResolved(): boolean {
        return this.userIdentity !== undefined;
    }

    getAuthenticationState(): Observable<any> {
        return this.authenticationState.asObservable();
    }

    getImageUrl(): String {
        return this.isIdentityResolved() ? this.userIdentity.imageUrl : null;
    }
}
