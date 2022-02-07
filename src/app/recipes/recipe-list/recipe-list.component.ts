import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { AppState } from 'src/app/store/app.reducer'
import Recipe from '../recipe.model'
import RecipeService from '../services/recipe.service'
import { recipesSelector } from '../store/recipe.selectors'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = []

  recipesChangedSubscription: Subscription

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes()
    this.recipesChangedSubscription = this.store
      .select(recipesSelector)
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes
      })
  }

  ngOnDestroy(): void {
    this.recipesChangedSubscription.unsubscribe()
  }

  onNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
}
