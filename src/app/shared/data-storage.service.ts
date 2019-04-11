import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class DataStorageService {
  private baseUrl = 'https://cookbook-81e90.firebaseio.com/';
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
      .pipe(map(
        (response: any) => {
          const recipes: Recipe[] = response;
          for (const recipe of recipes) {
            if (!recipe.ingredients) {
              recipe.ingredients = [];
            }
          }
          return recipes;
        }
      ))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
