import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { MaterializeService } from '../shared/classes/materialize.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  destroy$ = new Subject();

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  onSubmit(): void {
    this.form.disable();

    this.authService.register(this.form.value).pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.router.navigate(['login'], {
          queryParams: {
            registered: true
          }
        })
        this.form.enable()
      },
      (err) => {
        MaterializeService.toast(err.error.message);
        this.form.enable()
      }
    )
  }
}
