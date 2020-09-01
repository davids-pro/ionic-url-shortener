import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DataService } from './services/data.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.scss' ]
})
export class AppComponent implements OnInit {
  user: boolean;

  constructor(
    private dataService: DataService,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private userService: UserService
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.dataService.getUserConnected().subscribe((value) => {
      this.user = value;
    });
    this.storage
      .get('credentials')
      .then((data) => {
        if (data) {
          const credentials = this.dataService.decryptData(data);
          this.userService
            .getUserbyUsernameAndPassword(credentials.username, credentials.password)
            .then((res: any) => {
              this.dataService.user._id = res.mongoUser._id;
              this.dataService.user.username = res.mongoUser.username;
              this.dataService.setUserConnected(true);
            })
            .catch(() => {
              this.storage.remove('credentials');
              this.router.navigate([ 'login' ]);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
