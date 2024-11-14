import { Component } from '@angular/core';
import { CheckUsernameUniqueComponent } from '../../mini-features/check-username-unique/check-username-unique.component';
import { MomentjsDateTimeDemoComponent } from '../../mini-features/momentjs-date-time-demo/momentjs-date-time-demo.component';

@Component({
  selector: 'app-mini-features',
  standalone: true,
  imports: [CheckUsernameUniqueComponent, MomentjsDateTimeDemoComponent],
  templateUrl: './mini-features.component.html',
  styleUrl: './mini-features.component.scss'
})
export class MiniFeaturesComponent {

}
