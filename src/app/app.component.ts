import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Login-SignUp';
  SignUpUsers:any[]=[];
  SignUpObj:any={
    username:'',
    email:'',
    password:''
  }
  LoginObj:any={
    username:'',
    password:''
  }

  ngOnInit():void{
    localStorage.clear();
    const localdata = localStorage.getItem('signupUsers')
    if(localdata != undefined){
      this.SignUpUsers = JSON.parse(localdata)
    }
  }
  SignUp(){
    this.SignUpObj.password = this.encrypt(this.SignUpObj.password)
    this.SignUpUsers.push(this.SignUpObj);
    localStorage.setItem('signupUsers',JSON.stringify(this.SignUpUsers));
    this.SignUpObj={
      username:'',
      email:'',
      password:''
    }
  }
  Login(){
    this.SignUpUsers.forEach(user => {
      user.password = this.decrypt(user.password);
    })
    const isUserExist = this.SignUpUsers.find(data => data.username==this.LoginObj.username && data.password==this.LoginObj.password);
    if(isUserExist != undefined){
      alert("Login Successfull");
    }
    else{
      alert("Wrong Credientials");
    }

  }
  key='varun';
  private encrypt(value:string){
    return CryptoJS.AES.encrypt(value,this.key).toString();
  }
  private decrypt(value:string){
    return CryptoJS.AES.decrypt(value,this.key).toString(CryptoJS.enc.Utf8)
  }
   

}
