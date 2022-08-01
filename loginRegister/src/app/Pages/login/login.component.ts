import { Component, OnInit } from '@angular/core';
import { clientService } from '../../services/clients.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { RouterService } from 'src/app/services/router.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  [x: string]: any;

  constructor(private formBuilder: FormBuilder, 
    private clientService  : clientService ,
    private currentPath : RouterService,
    private route:ActivatedRoute,
    private router:Router){}

  myForm!: FormGroup;
  submitted: boolean = false;
  usertype!: string;
  myRes!: any;
  rememberMe!: boolean;

 
  get Form(){
    return this['loginForm'].controls;
  }


  ngOnInit(): void {
    this.currentPath.get_Current_Path("login");

    this.myForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });

    
  }
  

   // convenience getter for easy access to form fields
   get f() { 
     return this.myForm.controls; 
    }
    
  login(): void {
    this.submitted = true;

    let user = {
      username: this.myForm.value.username,
      password: this.myForm.value.password

      
    }
    
    this.clientService .login(user).subscribe(res => {
      this.myRes = res;
      this.usertype = this.myRes.usertype;
      
      Swal.fire({
        icon: 'success',
        title: 'Logged In',
        text: "Let's start working"
      }).then((SweetAlertResult) => {
        if(SweetAlertResult.value == true) {
          window.location.href = `/${this.usertype}-landing`
        }
      }); 


      sessionStorage.setItem('user_details', JSON.stringify(res));
      localStorage.setItem('username', JSON.stringify(this.myRes.email));
      sessionStorage.setItem('back', JSON.stringify('Back'));

      if(res.userType == 'client'){
        sessionStorage.setItem('selector', JSON.stringify('all'))
      }


    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err.error}`
      })
    });


  }

  // emailCheck():void{
  //    this.clientService .emailCheckUnique(this.myForm.value).subscribe(
  //      data=>{
  //      }
  //    )
  // }

  async  routerF(){
    
    this.router.navigate([`/`]);

    return await setTimeout(() => {
      this.router.navigate([`/${this.usertype}-landing`]);},0,1
      )
  
  }

}
