import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from "@angular/forms";

@Component({
  selector: 'app-forum-form',
  templateUrl: './forum-form.component.html',
  styleUrls: ['./forum-form.component.css']
})
export class ForumFormComponent implements OnInit {

  public forumForm: FormGroup;
  public category: any;
  public categories: any;
  public options: Object = {
    placeholderText: 'Agrega aquí tu contenido',
  }
  public files: any;
  public url: any;




  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  public createForm() {
    this.forumForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      category: ['', Validators.required],
      tags: this.formBuilder.array([]),
      image: null
    })
  }

  get tags(): FormArray {
    return this.forumForm.get('tags') as FormArray;
  }

  public addTag() {
    this.tags.push(
      this.formBuilder.group(
        {
          tag_name: ['']
        }
      )
    );
  }

  public deleteTag(index: number) {
    const control = <FormArray>this.forumForm.controls['tags'];
    control.removeAt(index);
  }

  public showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  public toEmptyUrls(array: Array<string>) {
    console.log(array);
    array.forEach(element => {
      array.splice(element.indexOf(element));
    });
    console.log(array);
  }

}
