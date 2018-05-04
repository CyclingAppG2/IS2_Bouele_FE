import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  now: Date;  
  fixedTimezone = '2015-06-15T09:03:01+0900';

  constructor() {}

  ngOnInit() {
    this.utcTime();
  }

  utcTime(): void {
    setInterval(() => {
      this.now = new Date();
    }, 1000);
}

}
