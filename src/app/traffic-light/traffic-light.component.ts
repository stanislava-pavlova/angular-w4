import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-traffic-light',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './traffic-light.component.html',
  styleUrl: './traffic-light.component.scss',
})
export class TrafficLightComponent {
  @Input() lightColor!: string;
  @Input() isHorizontal!: boolean;
}
