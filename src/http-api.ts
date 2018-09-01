import { CONFIG } from './app-config';
import { Injectable } from '@angular/core';
import { Headers, Http as AngularHttp } from '@angular/http';

@Injectable()
export class Http {
	constructor(private http: AngularHttp) {}

	get(path: string, args: string = "") {
		return this.http.get(CONFIG.proxyURL + CONFIG.meetUpURL + path + '?' + args + '&key=' + CONFIG.key + '&sign=true');
	}

	post(path: string, data: any) {
		
	}
};
