import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Authority } from './authority.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Authority>;

@Injectable()
export class AuthorityService {

    private resourceUrl =  SERVER_API_URL + 'api/authorities';

    constructor(private http: HttpClient) { }

    create(authority: Authority): Observable<EntityResponseType> {
        const copy = this.convert(authority);
        return this.http.post<Authority>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(authority: Authority): Observable<EntityResponseType> {
        const copy = this.convert(authority);
        return this.http.put<Authority>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Authority>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Authority[]>> {
        const options = createRequestOption(req);
        return this.http.get<Authority[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Authority[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Authority = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Authority[]>): HttpResponse<Authority[]> {
        const jsonResponse: Authority[] = res.body;
        const body: Authority[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Authority.
     */
    private convertItemFromServer(authority: Authority): Authority {
        const copy: Authority = Object.assign({}, authority);
        return copy;
    }

    /**
     * Convert a Authority to a JSON which can be sent to the server.
     */
    private convert(authority: Authority): Authority {
        const copy: Authority = Object.assign({}, authority);
        return copy;
    }
}
