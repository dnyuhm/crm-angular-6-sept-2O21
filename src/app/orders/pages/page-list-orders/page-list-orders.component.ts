import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-list-orders',
  templateUrl: './page-list-orders.component.html',
  styleUrls: ['./page-list-orders.component.scss'],
})
export class PageListOrdersComponent implements OnInit {
  public myTitle: string;
  constructor(private ordersService: OrdersService) {
    this.myTitle = 'List orders';
    this.ordersService.collection$.subscribe();
  }

  ngOnInit(): void {}

  changeTitle(): void {
    this.myTitle = 'my list of orders';
  }
}
