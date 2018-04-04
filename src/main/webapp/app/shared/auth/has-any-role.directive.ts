import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Principal } from './principal.service';

/**
 * @whatItDoes Conditionally includes an HTML element if current user has any
 * of the authorities passed as the `expression`.
 *
 * @howToUse
 * ```
 *     <some-element *jhiHasAnyRole="'ROLE_ADMIN'">...</some-element>
 *
 *     <some-element *jhiHasAnyRole="['ROLE_ADMIN', 'ROLE_USER']">...</some-element>
 * ```
 */
@Directive({
    selector: '[jhiHasAnyRole]'
})
export class HasAnyRoleDirective {

    private roles: string[];

    constructor(private principal: Principal, private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {
    }

    @Input()
    set jhiHasAnyRole(value: string|string[]) {
        this.roles = typeof value === 'string' ? [ <string> value ] : <string[]> value;
        this.updateView();
        // Get notified each time authentication state changes.
        this.principal.getAuthenticationState().subscribe((identity) => this.updateView());
    }

    private updateView(): void {
        this.principal.hasAnyRole(this.roles).then((result) => {
            this.viewContainerRef.clear();
            if (result) {
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            }
        });
    }
}
