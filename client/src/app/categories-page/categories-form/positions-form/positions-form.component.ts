import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PositionsService } from '../../../shared/services/positions.service';
import { Position } from '../../../shared/interfaces/positions.interfaces';
import { MaterialInstance, MaterializeService } from '../../../shared/classes/materialize.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() categoryId!: string;
  @ViewChild('modal') ModalRef!: ElementRef;

  positions: Position[] = [];
  loading = false;
  modal!: MaterialInstance;
  form!: FormGroup;

  constructor(private positionsService: PositionsService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      cost: [null, [Validators.required, Validators.min(1)]]
    })

    this.loading = true;
    this.positionsService.getAll(this.categoryId).subscribe(
      positions => {
        this.positions = positions;
        this.loading = false
      },
      error => {
        MaterializeService.toast(error.error.message)
        this.loading = false
      }
    )
  }

  ngAfterViewInit() {
    this.modal = MaterializeService.initModal(this.ModalRef);
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  createPosition() {
    this.modal.open();
  }

  onSelectPosition() {
    this.modal.open();
  }

  onCancel() {
    this.modal.close();
  }

  onSubmit() {
    this.form.disable();
    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    }
    this.positionsService.create(newPosition).subscribe(
      position => {
        MaterializeService.toast('Position is created');
        this.positions.push(position);
      },
      error => MaterializeService.toast(error.error.message),
      () => {
        this.modal.close();
        this.form.enable();
      }
    )
  }
}
