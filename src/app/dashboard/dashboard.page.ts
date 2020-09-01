import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Observable, Subscription, timer } from 'rxjs';
import { Document } from '../models/document.model';
import { DataService } from '../services/data.service';
import { DocumentService } from '../services/document.service';

let currentModal = null;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: [ './dashboard.page.scss' ]
})
export class DashboardPage implements OnInit {
  documents: Array<Document>;
  user: boolean;
  subscription: Subscription;
  timer: Observable<number> = timer(0, 10000);

  constructor(
    private clipboard: Clipboard,
    private dataService: DataService,
    private documentService: DocumentService,
    public modalController: ModalController,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.dataService.getUserConnected().subscribe((value) => {
      if (value) {
        this.user = value;
        this.subscription = this.timer.subscribe(
          () => {
            this.documentService.getDocumentsByUserId(this.dataService.user._id).subscribe(
              (response: any) => {
                this.documents = response;
              },
              (err) => {
                console.log(err);
              }
            );
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  copy(document: Document) {
    this.clipboard.copy(`https://shortened.daedal.pro/${document.shortId}`);
    this.presentToast();
  }

  async qrCode(document: Document) {
    const modal = await this.modalController.create({
      component: QrCodePage,
      componentProps: {
        qrCode: document.qrCode
      }
    });
    currentModal = modal;
    return await modal.present();
  }

  delete(document: Document) {
    this.documentService
      .deleteDocumentById(document._id)
      .then(() => {
        this.ngOnInit();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Lien copié',
      duration: 1000
    });
    toast.present();
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
