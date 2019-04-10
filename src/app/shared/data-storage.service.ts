import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  private baseUrl = 'https://cookbook-81e90.firebaseio.com/';
  private recipesUrl = 'recipes.json';

  constructor(private http: HttpClient,
              private recipeService: RecipeService) {}

  storeRecipes() {
    return this.http.put(this.baseUrl + this.recipesUrl, this.recipeService.getRecipes());
  }

  getRecipes() {
    this.http.get(this.baseUrl + this.recipesUrl)
      .subscribe(
        (response: Response) => {
          const recipes: Recipe[] = response;
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
