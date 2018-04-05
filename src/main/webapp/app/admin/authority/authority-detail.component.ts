import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Authority } from './authority.model';
import { AuthorityService } from './authority.service';

@Component({
    selector: 'jhi-authority-detail',
    templateUrl: './authority-detail.component.html'
})
export class AuthorityDetailComponent implements OnInit, OnDestroy {

    authority: Authority;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private authorityService: AuthorityService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAuthorities();
    }

    load(id) {
        this.authorityService.find(id)
            .subscribe((authorityResponse: HttpResponse<Authority>) => {
                this.authority = authorityResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAuthorities() {
        this.eventSubscriber = this.eventManager.subscribe(
            'authorityListModification',
            (response) => this.load(this.authority.id)
        );
    }
}
