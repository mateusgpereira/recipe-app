import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { map, switchMap } from 'rxjs'
import { AddIngredients } from 'src/app/shopping-list/store/shopping-list.action'
import { AppState } from 'src/app/store/app.reducer'
import Recipe from '../recipe.model'
import { DeleteRecipe } from '../store/recipe.actions'
import { recipesSelector } from '../store/recipe.selectors'

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
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => +params['id']),
        switchMap((id) => {
          this.id = id
          return this.store.select(recipesSelector)
        }),
        map((recipes) => recipes[this.id])
      )
      .subscribe((recipe) => {
        this.recipe = recipe
      })
  }

  addToShoppingList(): void {
    this.store.dispatch(new AddIngredients(this.recipe.ingredients))
  }

  onEditRecipe(): void {
    this.router.navigate(['edit'], { relativeTo: this.route })
  }

  onDelete(): void {
    this.store.dispatch(new DeleteRecipe(this.id))
    this.router.navigate(['../'], { relativeTo: this.route })
  }
}
