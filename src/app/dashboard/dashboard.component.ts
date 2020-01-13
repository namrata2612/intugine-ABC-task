import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { TransporterService } from '../transporter.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  selectesColor:any=''
  records:any=[]
  pinStatusData:any=[]
  status:any=0
  menustatus:boolean=false
  login:any
  titleText:any
  noteText:any
  newlistclick:boolean=false
  pinStatus:boolean=false
  colorShowStatus:boolean=false
  noteclick:boolean=false
  recordStatus:boolean=false
  addlabelstatus:boolean=false
  inputstatus:boolean=false
  labeltextStatus:boolean=false
  labelExists:boolean=false
  labeltext:any
  labelcreate:any
  labelrecord:any
  color:any = [
   '#ffffff','#000105','#3e6158','#3f7a89','#96c582',
   '#b7d5c4','#bcd6e7','#7c90c1','#9d8594','#dad0d8',
   '#4b4fce','#4e0a77','#a367b5','#ee3e6d','#d63d62',
   '#c6a670','#f46600','#cf0500','#efabbd','#8e0622',
   '#f0b89a','#f0ca68','#62382f','#c97545','#c1800b'
 ];
  constructor(private route:ActivatedRoute,private trans:TransporterService ) {

  this.route.queryParams.subscribe((res:any)=>{
    this.login = JSON.parse(res.login)
  })
}

  ngOnInit() {
    this.refresh()
  }



textarea(data){
  this.status=data
  this.selectesColor=''
  this.colorShowStatus=false
}
menulist(){
  this.menustatus=this.menustatus==true?false:true
  this.newlistclick=false
  this.colorShowStatus=false
  this.noteclick=false
  this.addlabelstatus=false
  this.inputstatus=false
  // this.labeltextStatus=false
  // this.labelExists=false
}

createlable(data){
  this.inputstatus=this.labelcreate==''?false:true
}

refresh(){
    var data=this.trans.login.filter((obj:any)=>{
    return obj.id == this.login.username
  })
  if(data.length>0){
    this.recordStatus=true
    this.records=data
    this.pinStatusData=data[0].note
    this.labeltext=data[0].label
    if(this.labeltext!=undefined){
      if(this.labeltext.length>0){
        this.labeltextStatus=true
      }else{
        this.labeltextStatus=false
      }
    }
    if(this.pinStatusData!=undefined){
      var data1=this.pinStatusData.filter((obj:any)=>{
        return obj.pin == 1
      })
      if(data1.length>0){
        this.pinStatus=true
      }else{
        this.pinStatus=false
      }
    }
  }else{
    this.recordStatus=false
  }
}



collect(){
  var data=this.trans.login.filter((obj:any)=>{
    return obj.id == this.login.username
  })

  if(data.length>0 ){
    for(let i=0;i<this.trans.login.length;i++){
      if(this.trans.login[i].id==this.login.username){
        var labelData = this.trans.login[i].label.filter((labelObj:any)=>{
          return labelObj.label==this.labelcreate
        })
        if(labelData.length>0){
          for(let j=0;j<this.trans.login[i].label.length;j++){
            if(this.trans.login[i].label[j].label==this.labelcreate){
              this.labelExists=true
            }else{
              this.labelExists=false
            }
          }
        }
        else{
          this.trans.login[i].label.push(
            {
              label:this.labelcreate
            }
          )
        }
        this.refresh()
      }
    }
  }
  else{
    this.trans.login.push(
      {
        id:this.login.username,
        note:[],
        label:[
            {
              label:this.labelcreate
            }
          ]
      }
    )
    this.refresh()
  }
}


submitText(){
  var data=this.trans.login.filter((obj:any)=>{
    return obj.id == this.login.username
  })

  if(data.length>0 ){
    for(let i=0;i<this.trans.login.length;i++){
      if(this.trans.login[i].id==this.login.username){
        this.trans.login[i].note.push(
          {
            label:this.noteText,
            title:this.titleText,
            pin:0,
            color:this.selectesColor==''?'white':this.selectesColor,
            addLabel:[]
          }
        )

        this.refresh()

      }
    }
  }
  else{
    this.trans.login.push(
      {
        id:this.login.username,
        note:[
            {
              label:this.noteText,
              title:this.titleText,
              pin:0,
              color:this.selectesColor==''?'white':this.selectesColor,
              addLabel:[]
            }
          ],
          label:[]
      }
    )

    this.refresh()


  }

}


pin(value,index){
  var data=this.trans.login.filter((obj:any)=>{
    return obj.id == this.login.username
  })
  if(data.length>0){
    for(let i=0;i<this.trans.login.length;i++){
      if(this.trans.login[i].id==this.login.username){
        this.trans.login[i].note[index].pin=value
        this.refresh()
      }
    }
  }
}


colorShow(){
  this.colorShowStatus=this.colorShowStatus==true?false:true
  this.addlabelstatus=false
  this.menustatus=false
}


colorchange(data){
  this.selectesColor=data
}

addlabel(){
  this.colorShowStatus=false

  this.addlabelstatus=this.addlabelstatus==true?false:true
  this.menustatus=this.addlabelstatus==true?false:true

}


changeStatusLabel(a,index,data){
  if(data.target.checked==true){
    for(let i=0;i<this.trans.login.length;i++){
      if(this.trans.login[i].id==this.login.username){
        this.trans.login[i].note[index].addLabel.push(a)
        this.refresh()
      }
    }
  }
  else{
    for(let i=0;i<this.trans.login.length;i++){
      if(this.trans.login[i].id==this.login.username){
        var b = this.removeByAttr(this.trans.login[i].note[index].addLabel,'label',a.label)
        this.refresh()
      }
    }
  }
}


removeByAttr(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i]
           && arr[i].hasOwnProperty(attr)
           && (arguments.length > 2 && arr[i][attr] === value ) ){
             arr.splice(i,1);
           }
    }
    return arr;
}


}
