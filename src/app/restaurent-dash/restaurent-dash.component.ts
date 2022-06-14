import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Form } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurentData } from './restaurent.model';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent implements OnInit {

  formValue !: FormGroup
  restaurentModelObj:RestaurentData = new RestaurentData
  allRestaurentData:any
  showAddBtn!:boolean
  showUpdateBtn!:boolean

  constructor(private fb: FormBuilder, private api:ApiService) { }


  ngOnInit(): void {
    this.formValue = this.fb.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      service: ['']
    })
    this.getAllData()
  }
  clickAddRestro(){
    this.formValue.reset();
    this.showAddBtn=true
    this.showUpdateBtn=false
  }

  //Now Subscribing our data which is mapped via services..
  addRestaurent(){
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.service = this.formValue.value.service;

    this.api.postRestaurent(this.restaurentModelObj).subscribe(res=>{
      console.log(res)
      alert('Restaurent Data Added Successfully')
      this.getAllData()
      this.formValue.reset()      

    },
    err=>{
      alert('Something went wrong!!!!!')
    }
    )

  }

  //get all data
  getAllData(){
    this.api.getRestaurent().subscribe(res=>{
      this.allRestaurentData=res;
    
      console.log(this.allRestaurentData)
    })
  }

  //delete data
  deletetRestaurent(data:any){
    console.log('data for delete Restaurent Record==>',data)
    this.api.deletetRestaurent(data.id).subscribe(res=>{
      alert('Restaurent Record Deleted Successfully')
      this.getAllData();
    })
  }

  onEditRestaurent(data:any){
    this.showAddBtn=false
    this.showUpdateBtn=true
    this.restaurentModelObj.id=data.id
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email)
    this.formValue.controls['mobile'].setValue(data.mobile)
    this.formValue.controls['address'].setValue(data.address)
    this.formValue.controls['service'].setValue(data.service)
  }

  updateRestaurent(){
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.service = this.formValue.value.service;

    this.api.updateRestaurent(this.restaurentModelObj, this.restaurentModelObj.id).subscribe(res=>{
      alert("Restaurent Records Updated")
      let ref = document.getElementById('clear')
      ref?.click();
      this.formValue.reset()
      this.getAllData();

    })
  }

}
