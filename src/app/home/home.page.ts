import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Document } from '../models/document.model';
import { DataService } from '../services/data.service';
import { DocumentService } from '../services/document.service';

let currentModal = null;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: [ 'home.page.scss' ]
})
export class HomePage implements OnInit {
  user: boolean;
  document = new Document();
  available = true;
  shortId: string;
  valid = false;
  url: string;

  constructor(
    private clipboard: Clipboard,
    private dataService: DataService,
    private documentService: DocumentService,
    public modalController: ModalController,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.dataService.getUserConnected().subscribe((value) => {
      this.user = value;
    });
  }

  createDocument() {
    if (this.url !== undefined && this.url !== '') {
      if (this.shortId !== undefined && this.shortId !== '') {
        if (/^[a-zA-Z0-9_.-]*$/.test(this.shortId)) {
          if (this.available) {
            this.createCustomDocument();
          } else {
            this.unavailableId();
          }
        } else {
          this.badId();
        }
      } else {
        this.createGenericDocument();
      }
    }
  }

  createGenericDocument() {
    this.documentService
      .createGenericDocument(this.url, this.user ? this.dataService.user._id : '')
      .then((response: Document) => {
        this.document = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createCustomDocument() {
    this.documentService
      .createCustomDocument(this.url, this.shortId, this.user ? this.dataService.user._id : '')
      .then((response: Document) => {
        this.document = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  validateUrl() {
    if (this.url !== undefined && this.url !== '') {
      this.valid = true;
    } else {
      this.valid = false;
    }
  }

  verifyIfshortIdIsAvailable() {
    this.documentService
      .verifyIfshortIdIsAvailable(this.shortId)
      .then((response: boolean) => {
        if (response !== null) {
          this.available = response;
        } else {
          this.available = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  copyLink() {
    this.clipboard.copy(`https://shortened.daedal.pro/${this.document.shortId}`);
    this.copyToast();
  }

  reset() {
    this.document = new Document();
    this.url = undefined;
    this.shortId = undefined;
    this.valid = false;
  }

  async badId() {
    const toast = await this.toastController.create({
      message: `caractères spéciaux non autorisés dans l'id`,
      duration: 2000
    });
    toast.present();
  }

  async unavailableId() {
    const toast = await this.toastController.create({
      message: 'id indisponible, merci de le modifier',
      duration: 2000
    });
    toast.present();
  }

  async copyToast() {
    const toast = await this.toastController.create({
      message: 'Lien copié',
      duration: 1000
    });
    toast.present();
  }

  async showQrCode() {
    const modal = await this.modalController.create({
      component: QrCodePage,
      componentProps: {
        qrCode: this.document.qrCode
      }
    });
    currentModal = modal;
    return await modal.present();
  }
}

@Component({
  selector: 'app-qr-code',
  templateUrl: 'qr-code.page.html',
  styleUrls: [ 'qr-code.page.scss' ]
})
export class QrCodePage {
  @Input() qrCode: string;

  dismiss() {
    currentModal.dismiss().then(() => {
      currentModal = null;
    });
  }
}
