import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {EventService} from '../_services';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  filterForm: FormGroup;
  minDate = {year: 2018, month: 1, day: 1};
  maxDate = {year: 2029, month: 12, day: 31};
  @Output() filteredEvents = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private atp: AmazingTimePickerService,
    private eventService: EventService
  ) {
    this.createFilterForm();
  }

  ngOnInit() {
  }

  private createFilterForm() {
    this.filterForm = this.formBuilder.group({
      plus: [''],
      date_min: [''],
      time_min: [''],
      date_max: [''],
      time_max: [''],
      name: ['']
    });
  }

  public open1() {
    const amazingTimePicker = this.atp.open({
      theme: 'material-orange',
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.filterForm.patchValue({time_min: time});
    });
  }

  public open2() {
    const amazingTimePicker = this.atp.open({
      theme: 'dark',
      arrowStyle: {
        background: 'red',
        color: 'white'
      }
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.filterForm.patchValue({time_max: time});
    });
  }

  public filter() {

    // tslint:disable-next-line:prefer-const
    let request = {
      'filters': []
    };


    if (this.filterForm.controls['plus'].value) {
      request.filters.push(
        {
          'type': 'plus',
          'data': this.filterForm.controls['plus'].value
        }
      );
    }
    if (this.filterForm.controls['date_min'].value) {
      request.filters.push(
        {
          'type': 'date_min',
          // tslint:disable-next-line:max-line-length
          'data': new Date(this.filterForm.controls['date_min'].value.month + ' ' + this.filterForm.controls['date_min'].value.day + ', ' + this.filterForm.controls['date_min'].value.year + ' ' + this.filterForm.controls['time_min'].value).getTime() || ''
        }
      );
    }
    if (this.filterForm.controls['date_max'].value) {
      request.filters.push(
        {
          'type': 'date_max',
          // tslint:disable-next-line:max-line-length
          'data': new Date(this.filterForm.controls['date_max'].value.month + ' ' + this.filterForm.controls['date_max'].value.day + ', ' + this.filterForm.controls['date_max'].value.year + ' ' + this.filterForm.controls['time_max'].value).getTime() || ''
        }
      );
    }
    if (this.filterForm.controls['name'].value) {
      request.filters.push(
        {
          'type': 'name',
          'data': this.filterForm.controls['name'].value
        }
      );
    }


    if (request.filters.length >= 1) {
      this.eventService.filter(request)
        .subscribe(
          resp => {
            this.filteredEvents.emit(resp);
          }
        );
    }
  }

}
