import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Authority } from './authority.model';
import { AuthorityPopupService } from './authority-popup.service';
import { AuthorityService } from './authority.service';

@Component({
    selector: 'jhi-authority-delete-dialog',
    templateUrl: './authority-delete-dialog.component.html'
})
export class AuthorityDeleteDialogComponent {

    authority: Authority;

    constructor(
        private authorityService: AuthorityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.authorityService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'authorityListModification',
                content: 'Deleted an authority'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-authority-delete-popup',
    template: ''
})
export class AuthorityDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private authorityPopupService: AuthorityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.authorityPopupService
                .open(AuthorityDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
