import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../_services/statistics.service';
import { EventService } from '../../_services';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-organization-home',
  templateUrl: './organization-home.component.html',
  styleUrls: ['./organization-home.component.css']
})
export class OrganizationHomeComponent implements OnInit {

  current_page = 1;
  loading = false;
  showSpinner: boolean;
  private organization_id = localStorage.getItem('user-data-id');
  public chart1 = [];
  public chart2 = [];
  public chart3 = [];
  my_events: any;
  busy: Subscription;

  constructor(
    private statisticService: StatisticsService,
    private eventService: EventService
  ) {
    this.getStatisticsEventCreations();
    this.eventService.getMyEvents()
      .subscribe(
        data => {
          this.my_events = data;
        }
      );
  }

  ngOnInit() {
  }

  public getStatisticsEventCreations() {
    this.busy = this.statisticService.getStatisticsEventCreations(this.organization_id).
      subscribe(
        resp => {
          const statistics = JSON.parse(JSON.stringify(resp));

          // tslint:disable-next-line:prefer-const
          let statistic1 = JSON.parse(JSON.stringify(statistics['eventsStartInMonth']));
          // tslint:disable-next-line:prefer-const
          let statistic2 = JSON.parse(JSON.stringify(statistics['scoreByEvent']));
          // tslint:disable-next-line:prefer-const
          let statistic3 = JSON.parse(JSON.stringify(statistics['assistenceByEvent']));


          // tslint:disable-next-line:prefer-const
          let datasets1 = [];
          for (const key in statistic1) {
            if (statistic1.hasOwnProperty(key)) {
              const element = statistic1[key];
              datasets1.push(
                {
                  data: element,
                  borderColor: this.getRandomColor(),
                  fill: false,
                  label: key
                }
              );
            }
          }
          // tslint:disable-next-line:prefer-const
          let datasets2 = [];
          for (const key in statistic2) {
            if (statistic2.hasOwnProperty(key)) {
              const element = statistic2[key];
              datasets2.push(
                {
                  data: element,
                  borderColor: this.getRandomColor(),
                  fill: false,
                }
              );
            }
          }
          // tslint:disable-next-line:prefer-const
          let datasets3 = [];
          for (const key in statistic3) {
            if (statistic3.hasOwnProperty(key)) {
              const element = statistic3[key];
              datasets3.push(
                [{
                  data: [(element.assistences * 100) / element.max_voluntaries,
                  100 - ((element.assistences * 100) / element.max_voluntaries)],
                  label: key,
                  backgroundColor: [this.getRandomColor(), this.getRandomColor()],
                  borderWidth: 1
                }]
              );
            }
          }
          this.chart1 = new Chart('canvas1', {
            type: 'line',
            data: {
              labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
                'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
              datasets: datasets1,
              options: {
                legend: {
                  display: false
                },
                scales: {
                  xAxes: [{
                    display: true
                  }],
                  yAxes: [{
                    display: true
                  }],
                }
              }
            }
          });
          this.chart2 = new Chart('canvas2', {
            type: 'pie',
            data: {
              labels: ['Asistieron', 'No asistieron'],
              datasets: datasets3[1]
            },
            options: {
              responsive: false,
              display: true
            }
          });
          this.chart3 = new Chart('canvas3', {
            type: 'pie',
            data: {
              labels: ['Asistieron', 'No asistieron'],
              datasets: datasets3[3]
            },
            options: {
              responsive: false,
              display: true
            }
          });
        });
  }

  getRandomColor() {
    // tslint:disable-next-line:prefer-const
    let color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  downloadStatisticPDF() {
    this.statisticService.downloadPDF(this.organization_id);
  }

  public onScrollDown() {
    console.log('scrolled!!');
    this.loading = true;
    this.current_page = this.current_page + 1;
    this.eventService.getPage(this.current_page)
      .subscribe(
        resp => {
          for (const iterator of JSON.parse(JSON.stringify(resp))) {
            this.my_events.push(iterator);
          }
        }
      );
  }



}
