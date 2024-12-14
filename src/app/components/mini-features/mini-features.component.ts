import { Component } from '@angular/core';
import { CheckUsernameUniqueComponent } from '../../mini-features/check-username-unique/check-username-unique.component';
import { DateTimeDemoComponent } from '../../mini-features/date-time-demo/date-time-demo.component';
import { PaginationUIComponent } from "../../mini-features/pagination-ui/pagination-ui.component";

@Component({
  selector: 'app-mini-features',
  standalone: true,
  imports: [CheckUsernameUniqueComponent, DateTimeDemoComponent, PaginationUIComponent],
  templateUrl: './mini-features.component.html',
  styleUrl: './mini-features.component.scss'
})
export class MiniFeaturesComponent {

}
