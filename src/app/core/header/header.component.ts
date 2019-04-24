import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {DataStorageService} from '../../shared/data-storage.service';
import {AuthService} from '../../auth/auth.service';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private dataService: DataStorageService,
              private auth: AuthService,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.dataService.storeRecipes()
      .subscribe(
        (response) => console.log(response),
        error => console.log(error)
      );
  }

  onFetchData() {
    this.dataService.getRecipes();
  }

  onLogout() {
    this.auth.logout();
  }
}

