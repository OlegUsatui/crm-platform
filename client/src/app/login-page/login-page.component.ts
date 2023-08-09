import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { MaterializeService } from '../shared/classes/materialize.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterializeService.toast('Теперь вы можете войти в систему используя свои данные');
      } else if (params['accessDenied']) {
        MaterializeService.toast('Для начала авторизуйтесь в системе');
      } else if (params['tokenExpired']) {
        MaterializeService.toast('Пожалуйста войдите в систему снова');
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    this.form.disable();

    this.authService.login(this.form.value).pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.router.navigate(['/overview'])
      },
      (err) => {
        MaterializeService.toast(err.error.message);
        this.form.enable();
      }
    )
  }
}
