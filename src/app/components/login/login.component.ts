// import { Component } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import Consts from 'src/app/consts/consts';
// import { AuthService } from 'src/app/services/auth.service';
// import { TokenService } from 'src/app/services/token.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html'
// })
// export class LoginComponent {
//   form: FormGroup;
//   errorMessage?: string | undefined;

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router,
//     private tokenService: TokenService) {
//     this.form = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [ 
//         Validators.required,
//         Validators.pattern(Consts.PASSWORD_REGEX)
//       ]]
//     })
//   }

//   get email() { return this.form.get('email'); }

//   get password() { return this.form.get('password'); }

//   login() {
//     if (this.form.valid) {
//       const values = this.form.value;
//       if (values.email && values.password) {
//         this.authService.login(values.email, values.password)
//           .subscribe((res: any) => {
//             if (res.success) {
//               console.log(res)
//               if (res.status == 200) {
//                 this.tokenService.setTokens(res.data)
//                 this.router.navigateByUrl('/dashboard');
//               } else if (res.status == 401) {
//                 this.tokenService.setTokens(res.data)
//                 this.router.navigate(["/setup-account"], { queryParams: { email: values.email } });
//               } else {
//                 this.errorMessage = "Please try again later!";
//               }
//             } else {
//               this.errorMessage = res.message;
//             }

//           })
//       }
//     } else {
//       this.validateAllFormFields(this.form);
//     }

//   }

//   validateAllFormFields(formGroup: FormGroup) {
//     Object.keys(formGroup.controls).forEach(field => {
//       const control = formGroup.get(field);
//       if (control instanceof FormControl) {
//         control.markAsTouched({ onlySelf: true });
//       } else if (control instanceof FormGroup) {
//         this.validateAllFormFields(control);
//       }
//     })
//   };
// }
