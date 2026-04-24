import { Component, signal, computed, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-form',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  authService = inject(AuthService);
  router = inject(Router);
  private fb = new FormBuilder();

  isLoading = signal(false);

  passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const confirm = group.get('rePassword')?.value;

    return pass === confirm ? null : { passwordMismatch: true };
  }

  registerForm = this.fb.group(
    {
      name: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],

      rePassword: ['', Validators.required],

      phone: ['', [Validators.required, Validators.pattern(/^(?:\+?2)?01[0125]\d{8}$/)]],

      terms: [false, Validators.requiredTrue],
    },
    {
      validators: this.passwordMatchValidator,
    },
  );

  get name() {
    return this.registerForm.controls.name;
  }
  get email() {
    return this.registerForm.controls.email;
  }
  get password() {
    return this.registerForm.controls.password;
  }
  get rePassword() {
    return this.registerForm.controls.rePassword;
  }
  get phone() {
    return this.registerForm.controls.phone;
  }
  get terms() {
    return this.registerForm.controls.terms;
  }

  passwordStrength = computed(() => {
    const value = this.password.value ?? '';

    if (!value) return { width: 0, label: '', color: '' };

    let score = 0;

    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[!@#$%^&*]/.test(value)) score++;

    const levels = [
      { width: 25, label: 'Weak', color: 'bg-red-500' },
      { width: 50, label: 'Medium', color: 'bg-orange-500' },
      { width: 75, label: 'Strong', color: 'bg-yellow-500' },
      { width: 100, label: 'Excellent', color: 'bg-emerald-500' },
    ];

    return levels[Math.max(score - 1, 0)];
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
