import { Component } from '@angular/core';
import { CheckUsernameUniqueComponent } from '../../mini-features/check-username-unique/check-username-unique.component';

@Component({
  selector: 'app-mini-features',
  standalone: true,
  imports: [CheckUsernameUniqueComponent],
  templateUrl: './mini-features.component.html',
  styleUrl: './mini-features.component.scss'
})
export class MiniFeaturesComponent {

}
