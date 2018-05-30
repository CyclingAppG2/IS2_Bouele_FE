import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../_services/forum.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.css']
})
export class ForumDetailComponent implements OnInit {

  public forum;
  forum_id = +this.route.snapshot.paramMap.get('id');


  constructor(
    private forumService: ForumService,
    private route: ActivatedRoute,
  ) {
    this.forumService.getForumById(this.forum_id)
      .subscribe(
        resp => {
          this.forum = resp;
        }
      );
  }

  ngOnInit() {
  }

}
