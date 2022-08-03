import { Component, OnInit } from '@angular/core';
import { clientService } from '../../services/clients.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
// import { RouterService } from 'src/app/services/router.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizeService } from 'src/app/services/authorize.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  user: any;
  id: any;
  constructor(private auth: AuthorizeService, private route: Router) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.minLength(10)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  get f() {
    return this.form.controls;
  }

  log() {
    let userlogin = {
      data: {
        email: this.form.value.email,
        password: this.form.value.password,
      },
    };

    if (this.form.invalid) {
      return;
    } else {
      this.auth.loguser(userlogin.data).subscribe(
        (myData: any) => {
          this.user = myData.user[0].id;
          this.route.navigate(['/landing']);
          console.log(this.user);
         
          localStorage.setItem('id', this.user);
          
          this.id = this.user;
        },
        (err) => {
          return err.error.errorMessage;
        }
      );
    }
  }

}
