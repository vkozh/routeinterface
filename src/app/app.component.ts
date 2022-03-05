import { Component, ViewChild } from '@angular/core';
import { Route } from './Route';
import { routes } from './routes';
// import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { pipe, map, fromEvent, switchAll, Observable } from 'rxjs';
import { Subject, of, tap, from } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ContentObserver } from '@angular/cdk/observers';

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
    // this.dataSource$.subscribe(
    //   next => console.log('next', next)
    // )
  }

  getData(): Observable<Route[]> {
    return of(routes);
  }

  sort(itemId: string) {
    this.dataSource$ = this.getData().pipe(
      tap(v => console.log(v)),
      map(data =>
        data.sort((a, b) => {
          // console.log(itemId)
          if (itemId === 'address' || itemId === 'interface' || itemId === 'gateway')
            return a[itemId] > b[itemId] ? 1 : -1;
          return 0
        })
      )
    )
    // this.buttonClicked$.unsubscribe();
    // this.dataSource$.subscribe(
    //  next => console.log('subscribe')
    // )
  }

  ngOnInit() {
    // this.dataSource$ = this.getData();
    this.buttonClicked$.subscribe((itemId) => {
      this.sort(itemId)
      // console.log('subscribe')
    });
  }

  public getItem(itemId: string) {
    this.buttonClicked$.next(itemId);
    // console.log("hi")
  }

}
