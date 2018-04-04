import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SampleRoleModule } from './role/role.module';
import { SampleAuthorityModule } from './authority/authority.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        SampleRoleModule,
        SampleAuthorityModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SampleEntityModule {}
