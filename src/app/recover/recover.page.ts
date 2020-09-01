import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: [ './recover.page.scss' ]
})
export class RecoverPage {
  username: string;
  validUser = false;
  securityCode: number;
  password: string;
  confirmedPassword: string;

  constructor(
    private router: Router,
    private userService: UserService,
    public alertController: AlertController,
    public toastController: ToastController
  ) {}

  verifyUser() {
    if (this.username !== undefined && this.username !== '') {
      this.userService
        .verifyIfUsernameIsAvailable(this.username)
        .then((res) => {
          if (res) {
            this.unknownUser();
          } else {
            this.userService
              .sendResetCode(this.username)
              .then(() => {
                this.sentEmail();
                this.validUser = true;
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  async unknownUser() {
    const toast = await this.toastController.create({
      message: `Nom d'utilisateur inconnu`,
      duration: 2000
    });
    toast.present();
  }

  async sentEmail() {
    const toast = await this.toastController.create({
      message: `Un code de sécurité vient d'être envoyé à votre adresse email`,
      duration: 3000
    });
    toast.present();
  }

  updateUser() {
    if (this.securityCode !== undefined) {
      if (this.password !== undefined && this.password !== '' && this.confirmedPassword !== undefined && this.confirmedPassword !== '') {
        if (this.password === this.confirmedPassword) {
          this.userService
            .updatePassword(this.username, this.password, this.securityCode)
            .then((res) => {
              this.userUpdated();
              this.username = undefined;
              this.validUser = false;
              this.securityCode = undefined;
              this.password = undefined;
              this.confirmedPassword = undefined;
              this.router.navigate([ 'home' ]);
            })
            .catch(() => {
              this.securityCode = undefined;
              this.invalidCode();
            });
        } else {
          this.invalidPasswords();
        }
      }
    }
  }

  async invalidPasswords() {
    const toast = await this.toastController.create({
      message: 'Les mots de passe ne correspondent pas',
      duration: 2000
    });
    toast.present();
  }

  async userUpdated() {
    const toast = await this.toastController.create({
      message: 'Mot de passe modifié',
      duration: 2000
    });
    toast.present();
  }

  async invalidCode() {
    const toast = await this.toastController.create({
      message: 'Code de sécurité incorrect',
      duration: 2000
    });
    toast.present();
  }
}
