import {Component} from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  constructor(private dataService: DataStorageService,
              private auth: AuthService) {}

  onSaveData() {
    this.dataService.storeRecipes()
      .subscribe(
        (response: Response) => console.log(response),
        error => console.log(error)
      );
  }

  onFetchData() {
    this.dataService.getRecipes();
  }

  onLogout() {
    this.auth.logout();
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }
}

