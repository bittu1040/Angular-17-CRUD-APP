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
  selector: 'app-momentjs-date-time-demo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './momentjs-date-time-demo.component.html',
  styleUrl: './momentjs-date-time-demo.component.scss'
})
export class MomentjsDateTimeDemoComponent implements OnInit {

  timeForm!: FormGroup;
  currentTime: string = moment().format('HH:mm');

  localTime: string = '';
  utcTime: string = '';
  private timeSubscription!: Subscription;

  timezones = timezones;
  dateTimeFormats = dateTimeFormats;
  convertedTime: string | null = null;

  ngOnInit(): void {
    this.currentTime = moment().format('HH:mm');
    this.timeForm = new FormGroup({
      date: new FormControl(moment().format('YYYY-MM-DD')),
      time: new FormControl(moment().format('HH:mm')),
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

    // Combine date and time
    const dateTime = `${date} ${time}`;

    // Convert and format the time
    this.convertedTime = dayjs(dateTime)
      .tz(timezone)
      .format(format);
  }

  checkTime() {
    const selectedTime = this.timeForm.get('time')?.value;
    if (moment(selectedTime, 'HH:mm').isBefore(moment(this.currentTime, 'HH:mm'))) {
      this.timeForm.get('time')?.setValue(this.currentTime);
      alert('The selected time is earlier than the current time.');
    }
  }


  getCombinedDateTime(date: string, time: string, timezone: string): string {
    const isToday = moment.tz(date, timezone).isSame(moment().tz(timezone), 'day');
    const formattedTime = time || (isToday ? moment().tz(timezone).format('HH:mm') : '00:00');

    // Construct date-time in the selected timezone
    return moment.tz(`${date} ${formattedTime}`, 'YYYY-MM-DD HH:mm', timezone).toISOString();
  }

  isPastTime(date: string, time: string, timezone: string): boolean {
    const selectedDateTime = moment.tz(`${date} ${time}`, 'YYYY-MM-DD HH:mm', timezone);
    const currentDateTime = moment().tz(timezone);
    return selectedDateTime.isBefore(currentDateTime);
  }



  submitTime(){

      console.log(this.timeForm.value);

      const date = this.timeForm.value.date;
      const time = this.timeForm.value.time;
      const timezone = this.timeForm.value.timezone;
  
      if (time && this.isPastTime(date, time, timezone)) {
        alert('Selected time is in the past for the chosen timezone.');
        return;
      }
  
      // Get the combined date and time in ISO format based on the timezone
      const dateTime = this.getCombinedDateTime(date, time, timezone);

      console.log(dateTime);
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