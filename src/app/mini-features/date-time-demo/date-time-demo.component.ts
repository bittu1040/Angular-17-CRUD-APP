import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import moment from 'moment';
import 'moment-timezone';
import { interval, Subscription } from 'rxjs';
import { dateTimeFormats, timezones } from './time-settings';

dayjs.extend(utc);
dayjs.extend(timezone);

@Component({
  selector: 'app-date-time-demo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './date-time-demo.component.html',
  styleUrl: './date-time-demo.component.scss'
})
export class DateTimeDemoComponent implements OnInit {

  timeForm!: FormGroup;

  localTime: string = '';
  utcTime: string = '';
  private timeSubscription!: Subscription;

  timezones = timezones;
  dateTimeFormats = dateTimeFormats;
  convertedTime: string | null = null;

  ngOnInit(): void {
    this.timeForm = new FormGroup({
      date: new FormControl(moment().format('YYYY-MM-DD')),
      time: new FormControl(moment().format('HH:mm')),
      dateTime: new FormControl(null),
      timezone: new FormControl('Asia/Kolkata'),
      format: new FormControl('MM/DD/YYYY hh:mm A')
    });

    this.updateTimes();
    this.timeSubscription = interval(60000).subscribe(() => this.updateTimes());

  }


  updateTimes(): void {
    const now = dayjs();
    this.localTime = now.format('YYYY-MM-DD h:mm A');
    this.utcTime = now.utc().format('YYYY-MM-DD h:mm A'); 
  }

  convertTime(): void {
    if (this.timeForm.invalid) {
      return;
    }

    const { date, time, timezone, format } = this.timeForm.value;

    const dateTime = `${date} ${time}`;

    this.convertedTime = dayjs.utc(dateTime).tz(timezone).format(format);
  }


  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
  }

}








































// getCombinedDateTime(date: string, time: string): string {

//   const isToday = moment(date).isSame(moment(), 'day');
//   const formattedTime = time || (isToday ? moment().format('HH:mm') : '00:00');

//   return moment(`${date} ${formattedTime}`, 'YYYY-MM-DD HH:mm').toISOString();
// }



  // getCombinedDateTime(date: string, time: string): string {
  //   const isToday = moment(date).isSame(moment(), 'day');
  //   const formattedTime = time ? time : (isToday ? moment().format('HH:mm') : '00:00');
  //   return moment(`${date} ${formattedTime}`, 'YYYY-MM-DD HH:mm').toISOString();
  // }