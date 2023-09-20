import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-question-page',
  templateUrl: './edit-question-page.component.html',
  styleUrls: ['./edit-question-page.component.scss'],
})
export class EditQuestionPageComponent {
  constructor(private readonly route: ActivatedRoute) {
    const id = route.snapshot.paramMap.get('id');
    console.log('id:', id);
  }
}
