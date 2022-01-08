import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Recipe from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe(
      'recipe one',
      'first veggie recipe',
      'https://www.eatwell101.com/wp-content/uploads/2017/05/Sausage-and-Veggies-One-Pot-1-800x800.jpg'
    ),
    new Recipe(
      'Recipe Two',
      'Second veggie recipe',
      'https://www.eatwell101.com/wp-content/uploads/2017/05/Sausage-and-Veggies-One-Pot-1-800x800.jpg'
    )
  ]

  @Output()
  selectedRecipeItem = new EventEmitter<Recipe>()

  constructor() { }

  ngOnInit(): void {
  }

  onSelectRecipe(recipe: Recipe) {
    this.selectedRecipeItem.emit(recipe)
  }

}
