import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Role } from './role.model';
import { RolePopupService } from './role-popup.service';
import { RoleService } from './role.service';

@Component({
    selector: 'jhi-role-delete-dialog',
    templateUrl: './role-delete-dialog.component.html'
})
export class RoleDeleteDialogComponent {

    role: Role;

    constructor(
        private roleService: RoleService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.roleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'roleListModification',
                content: 'Deleted an role'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-role-delete-popup',
    template: ''
})
export class RoleDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rolePopupService: RolePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.rolePopupService
                .open(RoleDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
