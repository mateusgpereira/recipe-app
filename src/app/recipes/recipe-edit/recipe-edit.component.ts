import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import Recipe from '../recipe.model';
import RecipeService from '../services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number
  editMode: boolean
  recipeEditForm: FormGroup

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']
        this.editMode = !!params['id']
        this.initForm()
      }
    )
  }

  private initForm(): void {
    let recipeName = ''
    let description = ''
    let imagePath = ''
    let recipeIngredients = new FormArray([])

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeByIndex(this.id)
      recipeName = recipe.name
      description = recipe.description
      imagePath = recipe.imagePath

      if (recipe.ingredients) {
        recipe.ingredients.forEach(ingredient => {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }))
        })
      }
    }

    this.recipeEditForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(description, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'ingredients': recipeIngredients
    })
  }

  get controls() {
    return (<FormArray>this.recipeEditForm.get('ingredients')).controls
  }

  onAddIngredient(): void {
    (<FormArray>this.recipeEditForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeEditForm.value)
    } else {
      this.recipeService.addRecipe(this.recipeEditForm.value)
    }
  }

}
