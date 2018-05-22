import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../_services/statistics.service';
import { EventService } from '../../_services';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs/Subscription';
import { HttpEventType, HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-organization-home',
  templateUrl: './organization-home.component.html',
  styleUrls: ['./organization-home.component.css']
})
export class OrganizationHomeComponent implements OnInit {

  showSpinner: boolean;
  private organization_id = localStorage.getItem('user-data-id');
  chart1 = [];
  chart2 = [];
  chart3 = [];
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
          console.log(resp);
          const statistic = JSON.parse(JSON.stringify(resp));
          const statistic1 = JSON.parse(JSON.stringify(statistic['eventsStartInMonth']));
          const statistic2 = JSON.parse(JSON.stringify(statistic['assistenceByEvent']));
          const statistic3 = JSON.parse(JSON.stringify(statistic['scoreByEvent']));
          const datasets1 = [];
          for (const key in statistic1) {
            if (statistic1.hasOwnProperty(key)) {
              const element = statistic1[key];
              datasets1.push(
                {
                  data: element,
                  borderColor: OrganizationHomeComponent.getRandomColor(),
                  fill: false,
                  label: key
                }
              );
            }
          }
          const datasets2 = [];
          for (const key in statistic2) {
            if (statistic1.hasOwnProperty(key)) {
              const element = statistic1[key];
              datasets2.push(
                {
                  data: element,
                  borderColor: OrganizationHomeComponent.getRandomColor(),
                  fill: false,
                  label: key
                }
              );
            }
          }
          const datasets3 = [];
          for (const key in statistic3) {
            if (statistic1.hasOwnProperty(key)) {
              const element = statistic1[key];
              datasets3.push(
                {
                  data: element,
                  borderColor: OrganizationHomeComponent.getRandomColor(),
                  fill: false,
                  label: key
                }
              );
            }
          }
          this.chart1 = new Chart('canvas', {
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
          this.chart2 = new Chart('canvas1', {
            type: 'pie',
            data: {
              datasets: [{
                data: datasets3,
                backgroundColor: [
                  OrganizationHomeComponent.getRandomColor(),
                  OrganizationHomeComponent.getRandomColor(),
                  OrganizationHomeComponent.getRandomColor(),
                  OrganizationHomeComponent.getRandomColor(),
                  OrganizationHomeComponent.getRandomColor(),
                ],
                label: 'Dataset 1'
              }],
              labels: [
                'Red',
                'Orange',
                'Yellow',
                'Green',
                'Blue'
              ]
            },
            options: {
              responsive: true
            }
          });
          this.chart3 = new Chart('canvas2', {
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
        });
  }


  getRandomColor() {
    let color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  private static getRandomColor() {
    let color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
}
