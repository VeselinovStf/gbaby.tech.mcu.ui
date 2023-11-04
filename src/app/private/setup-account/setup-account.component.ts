
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ChoiceClass from 'src/app/components/footer/models/choice-class';
import Consts from 'src/app/consts/consts';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-setup-account',
  templateUrl: './setup-account.component.html'
})
export class SetupAccountComponent implements OnInit {
  connections = [
    new ChoiceClass('Use existing WIFI Access Point', '0'),
    new ChoiceClass("Create your own Access Point", '1')
  ]
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
      ssid: ['', [Validators.required]],
      accessPointPassword: ['', [
        Validators.required
      ]],
      ipAddress: ['', [
        Validators.required,
        Validators.pattern(Consts.IP_REGEX)
      ]],
      gateway: ['', [
        Validators.required,
        Validators.pattern(Consts.IP_REGEX)
      ]],
      subnetmask: ['', [
        Validators.required,
        Validators.pattern(Consts.IP_REGEX)
      ]],
      username: [this.email, [
        Validators.required
      ]],
      oldPassword: ['', [
        Validators.required,
        Validators.pattern(Consts.PASSWORD_REGEX)
      ]],
      newPassword: ['', [
        Validators.required,
        Validators.pattern(Consts.PASSWORD_REGEX)
      ]],
      connections: [null, [Validators.required]]
    })
  }

  get ssid() { return this.form.get('ssid'); }

  get accessPointPassword() { return this.form.get('accessPointPassword'); }

  get ipAddress() { return this.form.get('ipAddress'); }

  get gateway() { return this.form.get('gateway'); }

  get subnetmask() { return this.form.get('subnetmask'); }

  get username() { return this.form.get('username'); }

  get oldPassword() { return this.form.get('oldPassword'); }

  get newPassword() { return this.form.get('newPassword'); }

  setup() {
    if (this.form.valid) {
      const values = this.form.value;
      if (values.ssid && values.accessPointPassword && values.ipAddress && values.subnetmask && values.gateway && values.connections.value && values.username  &&
        values.oldPassword && values.newPassword) {

          this.userService.setUpAccount(
              values.ssid, 
              values.accessPointPassword,
              values.ipAddress,
              values.subnetmask,
              values.gateway,
              values.connections.value, 
              values.username, 
              values.oldPassword, 
              values.newPassword)
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
