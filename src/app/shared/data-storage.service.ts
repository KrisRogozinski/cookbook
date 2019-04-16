import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
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
    const req = new HttpRequest('PUT', this.baseUrl + this.recipesUrl, this.recipeService.getRecipes(),
      {reportProgress: true});
    return this.http.request(req);
  }

  getRecipes() {
    this.http.get<Recipe[]>(this.baseUrl + this.recipesUrl, {
      observe: 'body',
      responseType: 'json'
    })
      .pipe(map(
        (recipes) => {
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
