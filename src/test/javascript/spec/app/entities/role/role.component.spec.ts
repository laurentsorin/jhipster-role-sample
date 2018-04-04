/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SampleTestModule } from '../../../test.module';
import { RoleComponent } from '../../../../../../main/webapp/app/entities/role/role.component';
import { RoleService } from '../../../../../../main/webapp/app/entities/role/role.service';
import { Role } from '../../../../../../main/webapp/app/entities/role/role.model';

describe('Component Tests', () => {

    describe('Role Management Component', () => {
        let comp: RoleComponent;
        let fixture: ComponentFixture<RoleComponent>;
        let service: RoleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SampleTestModule],
                declarations: [RoleComponent],
                providers: [
                    RoleService
                ]
            })
            .overrideTemplate(RoleComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Role(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.roles[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
