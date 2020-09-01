import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: [ './signup.page.scss' ]
})
export class SignupPage {
  username: string;
  email: string;
  password: string;
  confirmedPassword: string;

  constructor(
    private dataService: DataService,
    private router: Router,
    private storage: Storage,
    private userService: UserService,
    public toastController: ToastController
  ) {}

  createUser() {
    if (
      this.username !== undefined &&
      this.username !== '' &&
      this.password !== undefined &&
      this.password !== '' &&
      this.confirmedPassword !== undefined &&
      this.confirmedPassword !== '' &&
      this.email !== undefined &&
      this.email !== ''
    ) {
      this.userService.verifyIfUsernameIsAvailable(this.username).then((available) => {
        if (available) {
          if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.email)) {
            if (this.password === this.confirmedPassword) {
              this.userService
                .createUser({
                  username: this.username,
                  password: this.password,
                  email: this.email
                })
                .then((res: any) => {
                  this.dataService.user._id = res.mongoUser._id;
                  this.dataService.user.username = res.mongoUser.username;
                  this.dataService.setUserConnected(true);
                  this.storage.set('credentials', res.token).then(() => {
                    this.router.navigate([ 'home' ]);
                  });
                });
            } else {
              this.password = undefined;
              this.confirmedPassword = undefined;
              this.invalidPasswords();
            }
          } else {
            this.email = undefined;
            this.invalidEmail();
          }
        } else {
          this.username = undefined;
          this.usernameUnavailable();
        }
      });
    } else {
      this.incomplete();
    }
  }

  async invalidEmail() {
    const toast = await this.toastController.create({
      message: 'Merci de renseigner une adresse email valide',
      duration: 2000
    });
    toast.present();
  }

  async incomplete() {
    const toast = await this.toastController.create({
      message: 'Merci de renseigner tous les champs',
      duration: 2000
    });
    toast.present();
  }

  async usernameUnavailable() {
    const toast = await this.toastController.create({
      message: `Ce nom d'utilisateur est déjà utilisé, merci d'en choisir un nouveau`,
      duration: 2000
    });
    toast.present();
  }

  async invalidPasswords() {
    const toast = await this.toastController.create({
      message: 'Les mots de passe ne correspondent pas',
      duration: 2000
    });
    toast.present();
  }
}
