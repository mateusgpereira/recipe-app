import { Component, OnInit } from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import Ingredient from 'src/app/shared/ingredient.model'
import { AppState } from 'src/app/store/app.reducer'
import RecipeService from '../services/recipe.service'
import { recipesSelector } from '../store/recipe.selectors'

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number

  editMode: boolean

  recipeEditForm: FormGroup

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.editMode = !!params['id']
      this.initForm()
    })
  }

  private initForm(): void {
    let recipeName = ''
    let description = ''
    let imagePath = ''
    const recipeIngredients = new FormArray([])

    if (this.editMode) {
      this.store.select(recipesSelector).subscribe((recipes) => {
        const recipe = recipes[this.id]
        recipeName = recipe.name
        description = recipe.description
        imagePath = recipe.imagePath

        if (recipe.ingredients) {
          recipe.ingredients.forEach((ingredient) => {
            recipeIngredients.push(this.createFormIngredient(ingredient))
          })
        }
      })
    }

    this.recipeEditForm = this.createRecipeEditForm(
      recipeName,
      description,
      imagePath,
      recipeIngredients
    )
  }

  get controls() {
    return this.getRecipeFormIngredients().controls
  }

  onAddIngredient(): void {
    this.getRecipeFormIngredients().push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onSubmit(): void {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeEditForm.value)
    } else {
      this.recipeService.addRecipe(this.recipeEditForm.value)
    }
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  onDeleteIngredient(index: number): void {
    this.getRecipeFormIngredients().removeAt(index)
  }

  getRecipeFormIngredients(): FormArray {
    return <FormArray>this.recipeEditForm.get('ingredients')
  }

  private createFormIngredient(ingredient: Ingredient): FormGroup {
    return new FormGroup({
      name: new FormControl(ingredient.name, Validators.required),
      amount: new FormControl(ingredient.amount, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    })
  }

  private createRecipeEditForm(
    name: string,
    description: string,
    imagePath: string,
    ingredients: FormArray
  ): FormGroup {
    return new FormGroup({
      name: new FormControl(name, Validators.required),
      description: new FormControl(description, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      ingredients
    })
  }
}
