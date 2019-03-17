import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GeneralRestService {
    constructor(private http: HttpClient) { }

    public get(url) {
        return this.http.get(url);
    }

    public post(url, opt) {
        return this.http.post(url, typeof opt === 'string' ? JSON.parse(opt) : opt);
    }

    public put(url, opt) {
        return this.http.put(url, typeof opt === 'string' ? JSON.parse(opt) : opt);
    }

    public delete(url) {
        return this.http.delete(url);
    }
}
