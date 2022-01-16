import { Component, Input, OnInit } from '@angular/core';
import ShoppingListService from 'src/app/shopping-list/services/shopping-list.services';
import Recipe from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input()
  recipe: Recipe;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  addToShoppingList(): void {
    this.shoppingListService.addManyIngredients(this.recipe.ingredients)
  }

}
