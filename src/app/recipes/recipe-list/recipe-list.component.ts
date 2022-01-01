import { Component, OnInit } from '@angular/core';
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
    )
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
