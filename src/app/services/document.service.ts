import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  rootUri: string;

  constructor(private http: HttpClient) {
    this.rootUri = `${environment.apiEndPoint}/documents/`;
  }

  createGenericDocument(url: string, userId: string) {
    return this.http.post(this.rootUri, { url, userId }).toPromise();
  }

  createCustomDocument(url: string, shortId: string, userId: string) {
    return this.http
      .post(this.rootUri + 'customId/' + shortId, {
        url,
        userId,
        customized: true
      })
      .toPromise();
  }

  getDocumentByShortId(shortId: string) {
    return this.http.get(this.rootUri + shortId).toPromise();
  }

  getDocumentsByUserId(userId: string) {
    return this.http.get(this.rootUri + 'userId/' + userId);
  }

  updateDocumentById(document: Document, id: string) {
    return this.http.put(this.rootUri + id, document).toPromise();
  }

  deleteDocumentById(id: string) {
    return this.http.delete(this.rootUri + id).toPromise();
  }

  verifyIfshortIdIsAvailable(shortId: string) {
    return this.http.get(this.rootUri + 'checkId/' + shortId).toPromise();
  }
}
