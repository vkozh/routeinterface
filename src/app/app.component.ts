import { Component, ViewChild } from '@angular/core';
import { Route } from './Route';
import { routes } from './routes';
import { pipe, map, fromEvent, switchAll, Observable } from 'rxjs';
import { Subject, of, tap, from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedColumns: string[] = ['address', 'gateway', 'interface'];
  dataSource$: Observable<Route[]>;
  buttonClicked$ = new Subject<string>();

  constructor() {
    this.dataSource$ = this.getData();
  }

  getData(): Observable<Route[]> {
    return of(routes);
  }

  sort(itemId: string) {
    this.dataSource$ = this.getData().pipe(
      map(data =>
        data.sort((a, b) => {
          if (itemId === 'address' || itemId === 'gateway') {
            const num1 = Number(a[itemId].split('.').map(n => (`000${n}`).slice(-3)).join(''));
            const num2 = Number(b[itemId].split('.').map(n => (`000${n}`).slice(-3)).join(''));
            return num1 - num2;
          }
          if (itemId === 'interface')
            return a[itemId] > b[itemId] ? 1 : -1;
          return 0
        })
      )
    )
  }

  ngOnInit() {
    this.buttonClicked$.subscribe((itemId) => {
      this.sort(itemId)
    });
  }

  public getItem(itemId: string) {
    this.buttonClicked$.next(itemId);
  }

}
