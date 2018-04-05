/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SampleTestModule } from '../../../test.module';
import { AuthorityComponent } from '../../../../../../main/webapp/app/admin/authority/authority.component';
import { AuthorityService } from '../../../../../../main/webapp/app/admin/authority/authority.service';
import { Authority } from '../../../../../../main/webapp/app/admin/authority/authority.model';

describe('Component Tests', () => {

    describe('Authority Management Component', () => {
        let comp: AuthorityComponent;
        let fixture: ComponentFixture<AuthorityComponent>;
        let service: AuthorityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SampleTestModule],
                declarations: [AuthorityComponent],
                providers: [
                    AuthorityService
                ]
            })
            .overrideTemplate(AuthorityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AuthorityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AuthorityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Authority(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.authorities[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
