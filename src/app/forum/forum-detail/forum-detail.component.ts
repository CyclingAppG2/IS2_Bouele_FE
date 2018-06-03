import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../_services/forum.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noUiSlider } from 'nouislider';
import { AuthenticationService } from '../../_services';
import swal from 'sweetalert2';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.css']
})

export class ForumDetailComponent implements OnInit {

  responses: Object;
  public interactionForm: FormGroup;
  public points_day: any;
  public default_image = 'https://chopra.com/sites/default/files/field/image/Volunteers.jpg';
  public forum;
  public forum_id = +this.route.snapshot.paramMap.get('id');
  public options: Object = {
    placeholderText: 'Agrega aquí tu contenido',
    pluginsEnabled: ['charCounter'],
    height: 300,
    charCounterMax: 300,
    charCounterCount: true
  };

  constructor(
    private forumService: ForumService,
    private route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.forumService.getForumById(this.forum_id)
      .subscribe(
        resp => {
          this.forum = resp;
        }
      );
    this.authService.validateToken()
      .subscribe(
        resp => {
          this.points_day = JSON.parse(JSON.stringify(resp)).data.points_day;
        }
      );
    this.responsesForum();
    this.initInteractionForm();
  }

  ngOnInit() {
  }

  public initInteractionForm() {
    this.interactionForm = this.formBuilder.group({
      'slider': [1],
      'answer': ['', Validators.required]
    });
  }
  getBackground(image) {
    return image ? this._sanitizer
      .bypassSecurityTrustStyle(`url(http://localhost:3000${image})`) : this._sanitizer
        .bypassSecurityTrustStyle(`url(` + this.default_image + `)`);
  }

  transform(value) {
    return this._sanitizer.bypassSecurityTrustHtml(value);
  }

  public rate() {
    let rate: any;
    rate = {
      'forum_thread': {
        'points': this.interactionForm.value.slider
      }
    };
    this.forumService.rateForum(this.forum_id, rate)
      .subscribe(
        resp => {
          this.forum = resp;
          this.authService.validateToken()
            .subscribe(
              user => {
                this.points_day = JSON.parse(JSON.stringify(user)).data.points_day;
              }
            );
        }
      );

  }

  public answer() {
    let answer: any;
    answer = {
      'forum_post': {
        'forum_thread_id': this.forum_id,
        'text': this.interactionForm.value.answer
      }
    };
    this.forumService.responseForum(answer)
      .subscribe(
        resp => {
          swal({
            type: 'success',
            title: 'Correcto',
            text: 'Hemos enviado tu respuesta'
          });
          this.responsesForum();
        });
  }

  public responsesForum() {
    this.forumService.responsesForum(this.forum_id)
      .subscribe(
        resp => {
          this.responses = resp;
        }
      );
  }

  public like(id) {
    let like;
    like = {
      'board': {
        'like': 1,
        'forum_post_id': id
      }
    };
    this.forumService.likeResponse(like)
      .subscribe(
        resp => {
          this.responsesForum();
        }
      );
  }

  public dislike(id) {
    let like;
    like = {
      'board': {
        'like': -1,
        'forum_post_id': id
      }
    };
    this.forumService.likeResponse(like)
      .subscribe(
        resp => {
          this.responsesForum();
        }
      );
  }
}
