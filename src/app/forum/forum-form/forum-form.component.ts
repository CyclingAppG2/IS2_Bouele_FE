import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { EventService } from '../../_services';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { ForumService } from '../../_services/forum.service';
import { FileUploadService } from '../../_services/file-upload.service';

@Component({
  selector: 'app-forum-form',
  templateUrl: './forum-form.component.html',
  styleUrls: ['./forum-form.component.css']
})
export class ForumFormComponent implements OnInit {

  private selectedFile: File;
  public forumForm: FormGroup;
  public category: any;
  public categories: any;
  public options: Object = {
    placeholderText: 'Agrega aquí tu contenido',
  };
  public files: any;
  public url: any;




  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private forumService: ForumService,
    private fileUpload: FileUploadService
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  public createForm() {
    this.getEventsCategory();
    this.forumForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      category: ['', Validators.required],
      tags: this.formBuilder.array([]),
      image: null
    });
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
      this.selectedFile = <File>event.target.files[0];
      // tslint:disable-next-line:no-shadowed-variable
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

  public getEventsCategory() {
    this.eventService.getEventsCategory()
      .subscribe(
        resp => {
          this.categories = JSON.parse(JSON.stringify(resp)).data;
        }
      );

  }

  public structureJsonForum() {
    // tslint:disable-next-line:prefer-const
    const tags = [];
    for (let index = 0; index < this.forumForm.value.tags.length; index++) {
      tags.push({
        'title': this.forumForm.value.tags[index].tag_name
      });
    }
    return {
      'forum_thread': {
        'body': this.forumForm.controls['body'].value,
        'title': this.forumForm.controls['title'].value,
        'event_id': this.forumForm.controls['category'].value,
        'tags': tags
        }
    };
  }


  public createForum() {
    this.forumService.createForum(this.structureJsonForum())
      .subscribe(
        resp => {
          this.fileUpload.uploadPreviewForum( this.selectedFile, JSON.parse(JSON.stringify(resp)).id)
            .subscribe(
              data => {
                alert('creado');
                console.log(data);
              }
            );
        }
      );
  }

}
