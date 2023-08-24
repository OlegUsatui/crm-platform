import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OverviewPage } from '../shared/interfaces/analytics';
import { AnalyticsService } from '../shared/services/analytics.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {

  data$!: Observable<OverviewPage>;
  yesterday = new Date();

  constructor(private analyticsService: AnalyticsService) {
  }

  ngOnInit(): void {
    this.data$ = this.analyticsService.getOverview();
    this.yesterday.setDate(this.yesterday.getDate() - 1)
  }
}
