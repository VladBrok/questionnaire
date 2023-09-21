import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-form-options',
  templateUrl: './form-options.component.html',
  styleUrls: ['./form-options.component.scss'],
})
export class FormOptionsComponent {
  constructor(private readonly location: Location) {}

  onCancel() {
    this.location.back();
  }
}
