import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { AuthService } from 'shared/services/auth.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

import { AppUser } from './../../../shared/models/app-user';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input('show-actions') showActions = true;
  
  appUser: AppUser;
  shoppingCartItemCount: number;
  cart$: Observable<ShoppingCart>;

  constructor(
    private auth: AuthService,
    private cartService: ShoppingCartService) {  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.cart$ = await this.cartService.getCart();
  }

  login(){
    this.auth.login();
  }

  logout(){
    this.auth.logout();
  }
}
