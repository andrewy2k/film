import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

    URL = {
        'GET_DATA': 'http://www.omdbapi.com/',
        'GET_PHOTO': 'http://img.omdbapi.com/'
    };
    APIKEY = 'b66a769c';

    getDataById(id: string): Observable<any> {
        const params = new HttpParams()
            .set('i', id)
            .set('apikey', this.APIKEY);
        return this.http.get<any>(this.URL.GET_DATA, {params});
    }

    getDataByTitle (title: string, page?: number): Observable<any> {
        const params = new HttpParams()
            .set('s', title)
            .set('apikey', this.APIKEY)
            .set('page', page ? String(page) : '');
        return this.http.get<any>(this.URL.GET_DATA, {params});
    }

    constructor( private http: HttpClient) {}
}
