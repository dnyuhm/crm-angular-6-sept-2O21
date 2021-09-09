import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StateClient } from 'src/app/core/enums/state-client';
import { Client } from 'src/app/core/models/client';
import { ColClientsService } from '../../services/col-clients.service';

@Component({
  selector: 'app-page-list-clients',
  templateUrl: './page-list-clients.component.html',
  styleUrls: ['./page-list-clients.component.scss'],
})
export class PageListClientsComponent implements OnInit {
  public myTitle: string;
  public collection$!: Observable<Client[]>;
  public states!: StateClient[];
  public headers = [
    'name',
    'email',
    'taux_tva',
    'total_ca_ht',
    'Total TTC',
    'State',
  ];

  constructor(private colClientsService: ColClientsService) {
    this.myTitle = 'List clients';
    this.collection$ = this.colClientsService.collection$;
    this.states = Object.values(StateClient);
  }
  ngOnInit(): void {}

  public changeState(item: Client, event: any): void {
    const state = event.target.value;
    this.colClientsService
      .changeState(item, state)
      .subscribe((data) => Object.assign(item, data));
  }

  changeTitle(): void {
    this.myTitle = 'my list of clients';
  }
}
