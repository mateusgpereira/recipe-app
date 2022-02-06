import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { AddIngredients } from 'src/app/shopping-list/store/shopping-list.action'
import { AppState } from 'src/app/shopping-list/types'
import Recipe from '../recipe.model'
import RecipeService from '../services/recipe.service'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe

  id: number

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.recipe = this.recipeService.getRecipeByIndex(this.id)
    })
  }

  addToShoppingList(): void {
    console.log(this.recipe.ingredients)
    this.store.dispatch(new AddIngredients(this.recipe.ingredients))
  }

  onEditRecipe(): void {
    this.router.navigate(['edit'], { relativeTo: this.route })
  }

  onDelete(): void {
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['../'], { relativeTo: this.route })
  }
}
