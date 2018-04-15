import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'ui-form',
  template: `
    <form class="formly" role="form" novalidate [formGroup]="form" (ngSubmit)="this.action.emit({ action: 'save', item: item })">
      <div class="card">
        <div *ngIf="config.hasHeader !== false" class="card-header">
          <i [class]="config.icon || ''"></i>
          <span *ngIf="!config.title && item.id">Edit</span>
          <span *ngIf="!config.title && !item.id">Add</span>
          <span *ngIf="config.title">{{config.title}}</span>
        </div>
        <div class="card-block">
          <formly-form [model]="item" [fields]="config.fields" [form]="form">
            <button type="submit" class="ant-btn ant-btn-primary ng-star-inserted">
              保存
            </button>
            <button *ngIf="config.showCancel" type="button" class="ant-btn ant-btn-primary ng-star-inserted" (click)="action.emit({ action: 'cancel' })">
              取消
            </button>
          </formly-form>
        </div>
        <div class="card-footer">
          [card-footer]
        </div>
      </div>
    </form>
  `,
  styles: [
    `
    .card {
      margin-bottom: 0px;
    }
  `,
  ],
})
export class UiFormComponent {
  form: FormGroup = new FormGroup({})
  @Input() config
  @Input() item
  @Output() action = new EventEmitter()
}
