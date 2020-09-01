import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: [ './login.page.scss' ]
})
export class LoginPage {
  username: string;
  password: string;

  constructor(
    private dataService: DataService,
    private router: Router,
    private storage: Storage,
    private userService: UserService,
    public toastController: ToastController
  ) {}

  connectUser() {
    this.userService
      .getUserbyUsernameAndPassword(this.username, this.password)
      .then((res: any) => {
        this.dataService.user._id = res.mongoUser._id;
        this.dataService.user.username = this.username;
        this.dataService.setUserConnected(true);
        const encryptedData = this.dataService.encryptData({ username: this.username, password: this.password });
        this.storage.set('credentials', encryptedData).then(() => {
          this.username = undefined;
          this.password = undefined;
        });
        this.router.navigate([ 'home' ]);
        this.welcome();
      })
      .catch(() => {
        this.invalidCredentials();
        this.username = undefined;
        this.password = undefined;
      });
  }

  signUp() {
    this.router.navigate([ 'signup' ]);
  }

  async invalidCredentials() {
    const toast = await this.toastController.create({
      message: 'Identifiant ou mot de passe incorrect',
      duration: 2000
    });
    toast.present();
  }

  async welcome() {
    const toast = await this.toastController.create({
      message: `Bienvenue ${this.dataService.user.username} !`,
      duration: 1000
    });
    toast.present();
  }
}
