import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-image-two',
  templateUrl: './svg-image-two.component.html',
  styleUrls: ['./svg-image-two.component.css']
})
export class SvgImageTwoComponent {
  @Input() shades: string[] = []
}
