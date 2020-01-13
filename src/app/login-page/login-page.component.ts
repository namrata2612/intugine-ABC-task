import { Component, OnInit  } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { TransporterService } from '../transporter.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
loginform:any
forgetvar:any
forstatus:boolean=false
  constructor(private fb:FormBuilder,private transporter:TransporterService,private router:Router) {
    this.loginform=fb.group({
     username:['',Validators.compose([Validators.required])],
     password:['',Validators.compose([Validators.required])]
   })
  }

  ngOnInit() {
  }

login(data){
  if(data){
    var login=this.transporter.register.filter((obj:any)=>{
      return obj.name==data.username && obj.password==data.password
    })
    if(login.length>0){
      this.router.navigate(['/dashboard'],{queryParams:{login:JSON.stringify(data)}})
    }
    else{}
  }
}

forget(){
  this.forstatus=this.forstatus==true?false:true
}

clickbutton(){

  var login=this.transporter.register.filter((obj:any)=>{
    return obj.email==this.forgetvar
  })
  if(login.length>0){

    this.router.navigate(['/dashboard'])
  }else{}
}

}
