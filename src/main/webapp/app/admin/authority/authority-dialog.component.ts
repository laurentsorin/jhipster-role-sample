import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Authority } from './authority.model';
import { AuthorityPopupService } from './authority-popup.service';
import { AuthorityService } from './authority.service';
import { Role, RoleService } from '../role';

@Component({
    selector: 'jhi-authority-dialog',
    templateUrl: './authority-dialog.component.html'
})
export class AuthorityDialogComponent implements OnInit {

    authority: Authority;
    isSaving: boolean;

    roles: Role[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private authorityService: AuthorityService,
        private roleService: RoleService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.roleService.query()
            .subscribe((res: HttpResponse<Role[]>) => { this.roles = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.authority.id !== undefined) {
            this.subscribeToSaveResponse(
                this.authorityService.update(this.authority));
        } else {
            this.subscribeToSaveResponse(
                this.authorityService.create(this.authority));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Authority>>) {
        result.subscribe((res: HttpResponse<Authority>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Authority) {
        this.eventManager.broadcast({ name: 'authorityListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRoleById(index: number, item: Role) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-authority-popup',
    template: ''
})
export class AuthorityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private authorityPopupService: AuthorityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.authorityPopupService
                    .open(AuthorityDialogComponent as Component, params['id']);
            } else {
                this.authorityPopupService
                    .open(AuthorityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
