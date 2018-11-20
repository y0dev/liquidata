import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  readonly ROOT_URL = "interview-contact-submit-api-lb-1009699934.us-east-1.elb.amazonaws.com";

  email: string;
  subject: string;
  body: string;
  status: string;
  messageForm: FormGroup;
  submitted: boolean = false;
  success: boolean = false;

  constructor(private formBuilder: FormBuilder,private http: HttpClient) {
    this.messageForm = this.formBuilder.group({
      email: ['',Validators.required],
      subject: ['',Validators.required],
      body: ['',Validators.required]
    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid){ return; }
    this.email = this.messageForm.controls.email.value
    this.subject = this.messageForm.controls.subject.value
    this.body = this.messageForm.controls.body.value

    this.postContactInfo()
  }

  postContactInfo() {
    this.http.post(this.ROOT_URL,
    {
      email: this.email,
      subject: this.subject,
      body: this.body
    }).subscribe(
      (data:any) => {
        this.success = true;
        this.status = data['status']
        console.log(data)
      }, error => {
        this.status = error['status']
        console.log(this.status)
      } // error path
    )
  }

  ngOnInit() {
  }

}
