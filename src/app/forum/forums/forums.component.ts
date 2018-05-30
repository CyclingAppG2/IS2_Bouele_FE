import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../_services/forum.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.css']
})
export class ForumsComponent implements OnInit {

  public forums;
  public total_forum_pages;
  public page = 1;
  private default_image = 'https://cdn0.iconfinder.com/data/icons/computer-web/512/18-512.png';

  constructor(
    private forumService: ForumService,
    private _sanitizer: DomSanitizer
  ) {
    this.forumService.getForumsTotalPages()
      .subscribe(
        resp => {
          this.total_forum_pages = resp;
        }
      );
    this.getForumByCreation(this.page);
  }

  ngOnInit() {
  }

  public getForumByCreation(page) {
    this.forumService.getForumsByCreation(page)
      .subscribe(
        resp => {
          console.log(resp);
          this.forums = resp;
        }
      );
  }

  getBackground(image) {
    return image ? this._sanitizer
    .bypassSecurityTrustStyle(`url(http://localhost:3000${image})`) : this._sanitizer
    .bypassSecurityTrustStyle(`url(` + this.default_image + `)`);
  }

  getRandomColor() {
    // tslint:disable-next-line:prefer-const
    let color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

}
