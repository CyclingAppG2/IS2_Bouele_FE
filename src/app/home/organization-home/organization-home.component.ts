import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../_services/statistics.service';
import { EventService } from '../../_services';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-organization-home',
  templateUrl: './organization-home.component.html',
  styleUrls: ['./organization-home.component.css']
})
export class OrganizationHomeComponent implements OnInit {

  chart = [];

  constructor(
    private statisticService: StatisticsService,
    private eventService: EventService

  ) {
    this.eventService.getMyEvents()
      .subscribe(
        resp => {
          for (let index = 0; index < resp.length; index++) {
            const element = resp[index];
            this.getStatisticsEventCreations(element.id);
          }
        }
      );
  }

  ngOnInit() {
  }

  public getStatisticsEventCreations(id) {
    this.statisticService.getStatisticsEventCreations(id).
      subscribe(
        resp => {
          const statistic = JSON.parse(JSON.stringify(resp));
          const statistic1 = JSON.parse(JSON.stringify(statistic['eventsStartInMonth']));
          const datasets = [];
          for (const key in statistic1) {
            if (statistic1.hasOwnProperty(key)) {
              const element = statistic1[key];
              datasets.push(
                {
                  data: element,
                  borderColor: '#3cba9f',
                  fill: false,
                  label: key
                }
              );
            }
          }
          this.chart = new Chart('canvas', {
            type: 'line',
            data: {
              labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
                'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
              datasets: datasets,
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

}
