import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-image-one',
  templateUrl: './svg-image-one.component.html',
  styleUrls: ['./svg-image-one.component.css']
})
export class SvgImageOneComponent {
  @Input() shades: string[] = []
}
