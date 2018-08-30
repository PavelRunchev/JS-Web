import { Component, OnInit } from '@angular/core';
import { RecipeCreate } from '../models/recipe-create.model';
import { RecipeService } from '../recipe.service';
import { ToastrService } from '../../../../node_modules/ngx-toastr';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {
  bindingModel : RecipeCreate;

  constructor(
    private recipeService : RecipeService,
    private toastr : ToastrService,
    private router : Router
  ) {
    this.bindingModel = new RecipeCreate("", "", "");
  }

  ngOnInit() {
  }

  create() {
    this.recipeService.createRecipe(
      this.bindingModel)
      .subscribe(() => {
        this.toastr.success('Recipe created!', 'Success');
        this.router.navigate(['/recipes/list']);
      })
  }

}