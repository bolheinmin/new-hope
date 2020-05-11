import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '../../../shared/services/user.service';
import { Router } from '@angular/router';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private route: Router) { }

   ngOnInit(){
     this.afAuth.getRedirectResult().then(result => {
       if (result.user) {
         this.userService.save(result.user)
         .then(()=> {
           const returnUrl = localStorage.getItem('returnUrl');
           if( !returnUrl) return;

           this.route.navigateByUrl(returnUrl);
           localStorage.removeItem('returnUrl');
         })
       }
     })
   }

  login(){
    this.auth.loginWithFacebook();
  }

  // loginWithGoogle(){
  //   this.auth.loginWithGoogle();
  // }
}
