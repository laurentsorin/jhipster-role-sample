/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SampleTestModule } from '../../../test.module';
import { RoleDetailComponent } from '../../../../../../main/webapp/app/entities/role/role-detail.component';
import { RoleService } from '../../../../../../main/webapp/app/entities/role/role.service';
import { Role } from '../../../../../../main/webapp/app/entities/role/role.model';

describe('Component Tests', () => {

    describe('Role Management Detail Component', () => {
        let comp: RoleDetailComponent;
        let fixture: ComponentFixture<RoleDetailComponent>;
        let service: RoleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SampleTestModule],
                declarations: [RoleDetailComponent],
                providers: [
                    RoleService
                ]
            })
            .overrideTemplate(RoleDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoleDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Role(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.role).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
