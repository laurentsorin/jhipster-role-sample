/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SampleTestModule } from '../../../test.module';
import { AuthorityDetailComponent } from '../../../../../../main/webapp/app/admin/authority/authority-detail.component';
import { AuthorityService } from '../../../../../../main/webapp/app/admin/authority/authority.service';
import { Authority } from '../../../../../../main/webapp/app/admin/authority/authority.model';

describe('Component Tests', () => {

    describe('Authority Management Detail Component', () => {
        let comp: AuthorityDetailComponent;
        let fixture: ComponentFixture<AuthorityDetailComponent>;
        let service: AuthorityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SampleTestModule],
                declarations: [AuthorityDetailComponent],
                providers: [
                    AuthorityService
                ]
            })
            .overrideTemplate(AuthorityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AuthorityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AuthorityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Authority(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.authority).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
