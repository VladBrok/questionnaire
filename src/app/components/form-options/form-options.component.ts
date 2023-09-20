import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-options',
  templateUrl: './form-options.component.html',
  styleUrls: ['./form-options.component.scss'],
})
export class FormOptionsComponent {
  constructor(private readonly router: Router) {}

  onCancel() {
    this.router.navigate(['/manage']);
  }
}
