import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateClient } from 'src/app/core/enums/state-client';
import { Client } from 'src/app/core/models/client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ColClientsService {
  public collection$!: Observable<Client[]>;
  public urlApi = environment.urlApi;
  constructor(private httpClient: HttpClient) {
    console.log('service clients instanced');
    this.collection$ = this.httpClient
      .get<Client[]>(`${this.urlApi}/clients`)
      .pipe(
        map((tab) => {
          return tab.map((obj) => {
            return new Client(obj);
          });
        })
      );
  }

  public changeState(item: Client, state: StateClient): Observable<Client> {
    const obj = new Client({ ...item });
    obj.state = state;
    return this.update(obj);
  }

  public update(item: Client): Observable<Client> {
    return this.httpClient.put<Client>(
      `${this.urlApi}/clients/${item.id}`,
      item
    );
  }

  public add(item: Client): Observable<Client> {
    return this.httpClient.post<Client>(`${this.urlApi}/clients`, item);
  }
}
