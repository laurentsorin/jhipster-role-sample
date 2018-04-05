import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { RoleComponent } from './role.component';
import { RoleDetailComponent } from './role-detail.component';
import { RolePopupComponent } from './role-dialog.component';
import { RoleDeletePopupComponent } from './role-delete-dialog.component';

@Injectable()
export class RoleResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const roleRoute: Routes = [
    {
        path: 'role',
        component: RoleComponent,
        resolve: {
            'pagingParams': RoleResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'sampleApp.role.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'role/:id',
        component: RoleDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'sampleApp.role.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rolePopupRoute: Routes = [
    {
        path: 'role-new',
        component: RolePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'sampleApp.role.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'role/:id/edit',
        component: RolePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'sampleApp.role.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'role/:id/delete',
        component: RoleDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'sampleApp.role.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
