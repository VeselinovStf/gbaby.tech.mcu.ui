import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ChoiceClass from 'src/app/components/footer/models/choice-class';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  email: any;
  form: FormGroup;
  errorMessage?: string | undefined;

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email');
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) {

    this.form = this.fb.group({
      password: ['', [
        Validators.required
      ]],
      username: [this.email, [
        Validators.required
      ]],
      userPassword: ['', [
        Validators.required
      ]]
    })
  }

  get ssid() { return this.form.get('ssid'); }

  get password() { return this.form.get('password'); }

  get username() { return this.form.get('username'); }

  get userPassword() { return this.form.get('userPassword'); }

  login() {
    if (this.form.valid) {
      const values = this.form.value;
      if (values.ssid && values.password && values.connections.value && values.username && values.userPassword) {
        this.userService.create(values.password, values.username, values.userPassword)
          .subscribe((res: any) => {
            if (res.success) {
              console.log(res)
              if (res.status == 200) {
                this.router.navigateByUrl('/login');
              } else {
                this.errorMessage = "Try again or contact System Administrators";
              }
            } else {
              this.errorMessage = res.message;
            }

          })
      }
    } else {
      this.validateAllFormFields(this.form);
    }

  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    })
  };
}
