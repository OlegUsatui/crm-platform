import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of, switchMap } from 'rxjs';
import { CategoriesService } from '../../shared/services/categories.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private categoriesService: CategoriesService) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.required]
    });

    this.form.disable();

    this.route.params.pipe(switchMap(params => {
      if(params['id']) {
        return this.categoriesService.getById(params['id'])
      }
      return of(null)
    }))
      .subscribe(category => {
        if(category) {
          this.form.patchValue({
            name: category.name
          })
        }
        this.form.enable();
      })
  }

  onSubmit() {

  }
}
