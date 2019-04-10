import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  private baseUrl = '**';
  private recipesUrl = 'recipes.json';

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private auth: AuthService) {}

  storeRecipes() {
    const token = this.auth.getToken();
    return this.http.put(this.baseUrl + this.recipesUrl + '?auth=' + token, this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.auth.getToken();
    this.http.get(this.baseUrl + this.recipesUrl + '?auth=' + token)
      .subscribe(
        (response: Response) => {
          const recipes: Recipe[] = response;
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
