import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
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

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeByIndex(this.id)
      recipeName = recipe.name
      description = recipe.description
      imagePath = recipe.imagePath
    }

    this.recipeEditForm = new FormGroup({
      'name': new FormControl(recipeName),
      'description': new FormControl(description),
      'imagePath': new FormControl(imagePath)
    })
  }

}
