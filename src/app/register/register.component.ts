import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { TransporterService } from '../transporter.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
registerForm:any
  constructor(private fb:FormBuilder,private transporter:TransporterService) {
    this.registerForm=fb.group({
    name:['',Validators.compose([Validators.required])],
    email:['',Validators.compose([Validators.required])],
    contact:['',Validators.compose([Validators.required])],
    dob:['',Validators.compose([Validators.required])],
    password:['',Validators.compose([Validators.required])],
    confirmpassword:['',Validators.compose([Validators.required])]


    })}

  ngOnInit() {
  }


  register(data){
    this.transporter.register.push(data)
    this.registerForm.reset()
}

}
