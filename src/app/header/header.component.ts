import {Component} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  constructor(private dataService: DataStorageService) {}

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
}

