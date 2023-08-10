import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { Filter } from '../../shared/interfaces/filter';
import { MaterialDatepicker, MaterializeService } from '../../shared/classes/materialize.service';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements AfterViewInit, OnDestroy {
  @Output() filter = new EventEmitter<Filter>();
  @ViewChild('start') startRef!: ElementRef;
  @ViewChild('end') endRef!: ElementRef;

  order?: number;
  start?: MaterialDatepicker;
  end?: MaterialDatepicker;

  isValid = true;


  ngAfterViewInit() {
    this.start = MaterializeService.initDatepicker(this.startRef, this.validate.bind(this));
    this.end = MaterializeService.initDatepicker(this.endRef, this.validate.bind(this));
  }

  ngOnDestroy() {
    this.start?.destroy();
    this.end?.destroy();
  }

  validate(): void {
    if (!this.start?.date || !this.end?.date) {
      this.isValid = true;
      return
    }

    this.isValid = this.start.date < this.end.date
  }

  submit() {
    const filterValue: Filter = {};

    if (this.order) {
      filterValue.order = this.order;
    }
    if (this.start?.date) {
      filterValue.start = this.start.date;
    }
    if (this.end?.date) {
      filterValue.end = this.end.date;
    }
    this.filter.emit(filterValue);
  }
}
