import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { faHome, faShoppingCart, faQuestionCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;

  homeIcon = faHome;
  cartIcon = faShoppingCart;
  quesIcon = faQuestionCircle;

  appUser: AppUser;
  isCollapsed = true;
  shoppingCartItemCount: number;
  cart$: Observable<ShoppingCart>;

  private _mobileQueryListener: () => void;

  constructor(
    private auth: AuthService,
    private cartService: ShoppingCartService,
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
     }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.cart$ = await this.cartService.getCart();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout(){
    this.auth.logout();
  }
}
