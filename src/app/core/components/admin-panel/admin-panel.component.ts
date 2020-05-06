import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';

@Component({
	selector: 'app-home',
	templateUrl: './admin-panel.component.html',
	styleUrls: [ './admin-panel.component.css' ]
})
export class AdminPanel implements OnInit {

  @Input()
  user: AppUser;
  @Input('show-actions') showActions = true;
  isAdmin = true;
  
  appUser: AppUser;
	constructor(private auth: AuthService) {}

	ngOnInit(): void {}

	logout() {
		this.auth.logout();
	}
}
