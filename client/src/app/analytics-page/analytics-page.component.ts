import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Chart } from 'chart.js';

import { AnalyticsService } from '../shared/services/analytics.service';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('gain') gainRef!: ElementRef;
  @ViewChild('order') orderRef!: ElementRef;

  average!: number;
  pending = true;

  destroy$ = new Subject<void>();

  constructor(private service: AnalyticsService) {
  }

  ngAfterViewInit(): void {
    const gainConfig: any = {
      label: 'Gain',
      color: 'rgb(255, 99, 132)'
    };
    const orderConfig: any = {
      label: 'Order',
      color: 'rgb(54, 162, 235)'
    };
    
    this.service.getAnalytics().pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.average = data.average;

      gainConfig.labels = data.chart.map(item => item.label);
      gainConfig.data = data.chart.map(item => item.gain);
      orderConfig.labels = data.chart.map(item => item.label);
      orderConfig.data = data.chart.map(item => item.order);

      const gainCtx = this.gainRef.nativeElement.getContext('2d');
      gainCtx.canvas.height = '300px';
      const orderCtx = this.orderRef.nativeElement.getContext('2d');
      orderCtx.canvas.height = '300px';


      new Chart(gainCtx, createChartConfig(gainConfig));
      new Chart(orderCtx, createChartConfig(orderConfig));

      this.pending = false;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

function createChartConfig({ labels, data, label, color }: any): any {
  return {
    type: 'line',
    option: {
      responsive: true
    },
    data: {
      labels,
      dataSets: [{
        label,
        data,
        borderColor: color,
        steppedLine: false,
        fill: false
      }]
    }
  }
}
