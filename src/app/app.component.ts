import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrafficLightComponent } from './traffic-light/traffic-light.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TrafficLightComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'junction';

  private mainInterval: any;
  verticalLightColor: string = 'green';
  horizontalLightColor: string = 'red';
  emergencyMode: boolean = false;

  ngOnInit(): void {
    this.startLightsInterval();
  }

  clearLightsInterval() {
    clearInterval(this.mainInterval);
  }

  startLightsInterval() {
    if (!this.emergencyMode) {
      this.mainInterval = setInterval(() => {
        const newVerticalLightColor =
          this.verticalLightColor === 'red' ? 'green' : 'red';
        const newHorizontalLightColor =
          this.horizontalLightColor === 'red' ? 'green' : 'red';

        this.changeToYellow(newVerticalLightColor, newHorizontalLightColor);
      }, 5000);
    }
  }

  changeToYellow(
    newVerticalLightColor: string,
    newHorizontalLightColor: string
  ) {
    this.verticalLightColor = 'yellow';
    this.horizontalLightColor = 'yellow';

    setTimeout(() => {
      this.verticalLightColor = newVerticalLightColor;
      this.horizontalLightColor = newHorizontalLightColor;
    }, 2000);
  }

  handleEmergency() {
    if (!this.emergencyMode) {
      this.emergencyMode = true;
      this.horizontalLightColor = 'yellow';
      this.verticalLightColor = 'yellow';
      this.clearLightsInterval();

      setTimeout(() => {
        this.emergencyMode = false;
        this.resetLights();
        this.startLightsInterval();
      }, 10000);
    }
  }

  resetLights() {
    this.verticalLightColor = 'red';
    this.horizontalLightColor = 'green';
  }

  ngOnDestroy(): void {
    this.clearLightsInterval();
  }
}
