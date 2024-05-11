import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { interval, Subject } from 'rxjs';
import { TrafficLightComponent } from './traffic-light/traffic-light.component';
import { takeUntil } from 'rxjs/operators';
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

  private destroy$: Subject<boolean> = new Subject<boolean>();
  verticalLightColor: string = 'green';
  horizontalLightColor: string = 'red';

  constructor() {}

  ngOnInit(): void {
    interval(5000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.horizontalLightColor = 'yellow';
        setTimeout(() => {
          this.horizontalLightColor = 'green';
          setTimeout(() => {
            this.horizontalLightColor = 'red';
          }, 5000);
        }, 2000);

        this.verticalLightColor = 'yellow';
        setTimeout(() => {
          this.verticalLightColor = 'red';
          setTimeout(() => {
            this.verticalLightColor = 'green';
          }, 5000);
        }, 2000);
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
