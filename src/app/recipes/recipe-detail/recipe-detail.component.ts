import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import ShoppingListService from 'src/app/shopping-list/services/shopping-list.services';
import Recipe from '../recipe.model';
import RecipeService from '../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number

  constructor(private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']
        this.recipe = this.recipeService.getRecipeByIndex(this.id)
      }
    )
  }

  addToShoppingList(): void {
    this.shoppingListService.addManyIngredients(this.recipe.ingredients)
  }

  onEditRecipe(): void {
    this.router.navigate(['edit'], { relativeTo: this.route })
  }

  onDelete(): void {
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['../'], { relativeTo: this.route })
  }

}
