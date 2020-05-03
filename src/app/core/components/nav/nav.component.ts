import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { AuthService } from 'shared/services/auth.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Meal } from '../../../shared/models/meal';
import { MealService } from '../../../shared/services/meal.service';


@Component({
  selector: 'side-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;

  meals$: Observable<Meal[]>;
  @Input('meal') meal;


  @Input()
  user: AppUser;
  @Input('show-actions') showActions = true;
  
  isAdmin = true;
  appUser: AppUser;
  shoppingCartItemCount: number;
  cart$: Observable<ShoppingCart>;

  private _mobileQueryListener: () => void;

  constructor(
    private auth: AuthService,
    private cartService: ShoppingCartService,
    private mealService: MealService,
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
  }

  
  async ngOnInit() {
    this.meals$ = this.mealService.getAllMeals();

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