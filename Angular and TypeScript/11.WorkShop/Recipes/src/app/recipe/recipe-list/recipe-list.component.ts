import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeList } from '../models/recipe-list.model';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Observable<RecipeList[]>;

  constructor(
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.recipes = this.recipeService.getAllRecipes();
  }

}
