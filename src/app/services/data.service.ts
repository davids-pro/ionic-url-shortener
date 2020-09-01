import { Injectable } from '@angular/core';
import * as cryptoJs from 'crypto-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  user = new User();
  userConnected: BehaviorSubject<boolean>;
  private encryptSecretKey = 'd43d4L';

  constructor() {
    this.userConnected = new BehaviorSubject(false);
  }

  getUserConnected(): Observable<boolean> {
    return this.userConnected.asObservable();
  }

  setUserConnected(value: boolean) {
    this.userConnected.next(value);
  }

  encryptData(data: any) {
    try {
      return cryptoJs.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
    } catch (e) {
      console.log(e);
    }
  }

  decryptData(data: any) {
    try {
      const bytes = cryptoJs.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(cryptoJs.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
