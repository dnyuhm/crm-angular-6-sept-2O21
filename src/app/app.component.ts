import { Component } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'crm';
  private obs = new Observable((listXsubscribe) => {
    listXsubscribe.next('hello');
  });
  private subj = new Subject();
  private behave = new BehaviorSubject(0);
  constructor() {
    // this.obs.subscribe((data) => console.log(data));
    // this.obs.subscribe((data) => console.log(data));
    // this.subj.subscribe((data) => console.log(data));
    // this.subj.subscribe((data) => console.log(data));
    // this.subj.next(Math.random());
    // this.behave.next(Math.random());
    // this.behave.subscribe((data) => console.log(data));
    // this.behave.subscribe((data) => console.log(data));
  }
}
