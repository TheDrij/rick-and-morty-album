import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { combineLatest, fromEvent, map, Observable } from 'rxjs';
import { ICharacter } from '../models/AlbumModels';
import { Store } from '@ngrx/store';
import { getLimitValue, getSkipValue, IFeatureState, isAllLoaded, isSearched } from 'src/app/dashboard/state/feature.reducer';
import * as appActions from 'src/app/shared/state/app.action';
import * as featureActions from './../../dashboard/state/feature.action';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  fetchData(limit: number, skip: number) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient,
    private readonly store: Store<IFeatureState>
  ) { }


  readonly scrollAction$: Observable<Event> = fromEvent(document, 'scroll');
  readonly isSearched$: Observable<boolean> = this.store.select(isSearched);
  readonly isAllLoaded$: Observable<boolean> = this.store.select(isAllLoaded);
  readonly getLimitValue$: Observable<number> = this.store.select(getLimitValue);
  readonly getSkipValue$: Observable<number> = this.store.select(getSkipValue);

  readonly loadMoreData$: Observable<boolean> = combineLatest([
    this.isSearched$,
    this.scrollAction$,
    this.isAllLoaded$
  ]).pipe(
    map(([searched, _, allLoaded]) => {
      if (searched && !allLoaded) {
        return (
          Math.floor(
            document.documentElement.scrollHeight -
            document.documentElement.scrollTop -
            document.documentElement.clientHeight
          ) === 0
        );
      }
      return false;
    })
  );

  getCharacterIds(skip: number, limit: number): number[] {
    return Array.from({ length: skip }, (_, i) => i + 1).filter(number => number > limit)
  }

  getCharacters(skip: number, limit: number): Observable<ICharacter[]> {
    const ids = this.getCharacterIds(skip, limit)
    return this.http.get<ICharacter[]>(`${environment.apiBaseUrl}/character/${ids}`);
  }

  fetchDataAction(limit: number, skip: number): void {
    this.store.dispatch(appActions.toggleSpinnerAction({ loading: true }));
    this.store.dispatch(featureActions.fetchDataAction({ limit, skip }));
  }

  loadMoreDataAction(limit: number, skip: number): void {
    this.store.dispatch(appActions.toggleSpinnerAction({ loading: true }));
    this.store.dispatch(featureActions.loadMoreDataAction({ limit, skip }));
  }
}
