import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sta--footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  footerDate = new Date().getFullYear();
}
