import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { StateOrder } from 'src/app/core/enums/state-order';
import { Order } from 'src/app/core/models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-list-orders',
  templateUrl: './page-list-orders.component.html',
  styleUrls: ['./page-list-orders.component.scss'],
})
export class PageListOrdersComponent implements OnInit {
  public myTitle: string;
  public collection$!: Subject<Order[]>;
  public states!: StateOrder[];
  public headers = [
    'Action',
    'Type',
    'Client',
    'NbJours',
    'TjmHT',
    'Total HT',
    'Total TTC',
    'State',
  ];

  constructor(
    private ordersService: OrdersService,
    private router: Router
  ) {
    this.myTitle = 'List orders';
    this.collection$ = this.ordersService.collection$;
    this.states = Object.values(StateOrder);
  }
  ngOnInit(): void {}

  public changeState(item: Order, event: any): void {
    const state = event.target.value;
    this.ordersService
      .changeState(item, state)
      .subscribe((data) => Object.assign(item, data));
  }

  changeTitle(): void {
    this.myTitle = 'my list of orders';
  }

  public goToEdit(id: number): void {
    this.router.navigate(['orders', 'edit', id]);
  }
  public deleteItem(id: number): void {
    this.ordersService.delete(id).subscribe();
  }
}
