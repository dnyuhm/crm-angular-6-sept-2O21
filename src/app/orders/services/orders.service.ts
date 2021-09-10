import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ColErrorHandler } from 'src/app/core/abstracts/col-error-handler';
import { StateOrder } from 'src/app/core/enums/state-order';
import { Order } from 'src/app/core/models/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService extends ColErrorHandler {
  public collection$ = new BehaviorSubject<Order[]>([]);
  public urlApi = environment.urlApi;
  constructor(private httpClient: HttpClient) {
    super();
    this.refreshCollection();
  }

  public refreshCollection(): void {
    this.httpClient
      .get<Order[]>(`${this.urlApi}/orders`)
      .pipe(
        map((tab) => {
          return tab.map((obj) => {
            return new Order(obj);
          });
        }),
        catchError(this.handleError)
      ).subscribe((data) => {
        this.collection$.next(data);
      })
  }

  public changeState(item: Order, state: StateOrder): Observable<Order> {
    const obj = new Order({ ...item });
    obj.state = state;
    return this.update(obj);
  }

  public update(item: Order): Observable<Order> {
    return this.httpClient.put<Order>(`${this.urlApi}/orders/${item.id}`, item).pipe(
      tap((data) => {
        // ici que vous traitez les codes erreur retournés par l'api
        this.refreshCollection();
        catchError(this.handleError);
      })
    );
  }

  public add(item: Order): Observable<any> {
    return this.httpClient.post<any>(`${this.urlApi}/orders`, item).pipe(
      tap((data) => {
        // ici que vous traitez les codes erreur retournés par l'api
        this.refreshCollection();
        catchError(this.handleError);
      })
    );;
  }

  public getItemById(id: number): Observable<Order> {
    return this.httpClient.get<Order>(`${this.urlApi}/orders/${id}`);
  }
  public delete(id: number): Observable<Order> {
    return this.httpClient.delete<Order>(`${this.urlApi}/orders/${id}`).pipe(
      tap((data) => {
        // ici que vous traitez les codes erreur retournés par l'api
        this.refreshCollection();
        catchError(this.handleError);
      })
    );
  }


}
