import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  hostUrl: string = environment.hostUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getAuthHeaders(options = {}) {
    const authToken = this.getAccessToken();
    const httpHeader = new HttpHeaders({
      ...options,
      Authorization: `Bearer ${authToken}`
    })
    return httpHeader;
  }

  get(url: string, options = {}) {
    const fullUrl = this.getFullUrl(url);
    const withAuthToken = this.getAuthHeaders(options);
    return this.httpClient.get(fullUrl, { headers: withAuthToken, ...options });
  }

  post(url: string, data = {}, options = {}) {
    const fullUrl = this.getFullUrl(url);
    const withAuthToken = this.getAuthHeaders(options);

    return this.httpClient.post(fullUrl, data, { headers: withAuthToken, ...options });
  }

  put(url: string, data = {}, options = {}) {
    const fullUrl = this.getFullUrl(url);
    const withAuthToken = this.getAuthHeaders(options);

    return this.httpClient.put(fullUrl, data, { headers: withAuthToken, ...options });
  }

  delete(url: string, options = {}) {
    const fullUrl = this.getFullUrl(url);
    const withAuthToken = this.getAuthHeaders(options);

    return this.httpClient.delete(fullUrl, { headers: withAuthToken, ...options });
  }

  getFullUrl(url) {
    return `${this.hostUrl}${url}`;
  }
}
