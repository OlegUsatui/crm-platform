import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of, switchMap } from 'rxjs';
import { CategoriesService } from '../../shared/services/categories.service';
import { MaterializeService } from '../../shared/classes/materialize.service';
import { Category } from '../../shared/interfaces/categories.interfaces';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  @ViewChild('inputFile') fileInputRef!: ElementRef;
  form!: FormGroup;
  image?: File;
  imagePreview: string | ArrayBuffer | null = '';
  isEditMode = false;
  category?: Category;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private categoriesService: CategoriesService) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.required]
    });

    this.form.disable();

    this.route.params.pipe(switchMap(params => {
      if (params['id']) {
        this.isEditMode = true;
        return this.categoriesService.getById(params['id'])
      }
      return of(null)
    }))
      .subscribe(category => {
        if (category) {
          this.category = category;
          this.form.patchValue({
            name: category.name
          });
          this.imagePreview = category.imgSrc;
          MaterializeService.updateTextInput();
        }
        this.form.enable();
      })
  }

  onSubmit() {
    let obs$;
    this.form.disable();
    if (this.isEditMode) {
      obs$ = this.categoriesService.update(this.category!._id as string, this.form.value.name, this.image)
    } else {
      obs$ = this.categoriesService.create(this.form.value.name, this.image)
    }

    obs$.subscribe(
      category => {
        this.category = category;
        MaterializeService.toast('Изменения сохранены');
        this.form.enable();
      },
      error => {
        MaterializeService.toast(error.error.message);
        this.form.enable();
      }
    )
  }

  triggerClick() {
    this.fileInputRef.nativeElement.click();
  }

  onUploadImage(event: any) {
    const file = event.target.files[0];
    this.image = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result
    }

    reader.readAsDataURL(file)
  }

  deleteCategory() {
    const decision = window.confirm('Ви дійсно хочете видалити категорію');

    if (decision) {
      this.categoriesService.delete(this.category?._id as string).subscribe(
        res => MaterializeService.toast(res.message),
        error => MaterializeService.toast(error.error.message),
        () => this.router.navigate(['/categories'])
      )
    }
  }
}
