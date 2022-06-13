import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { catchError, exhaustMap, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as featureActions from './feature.action';
import * as appActions from '../../shared/state/app.action';


import { ICharacter } from '../../shared/models/AlbumModels';
import { AlbumService } from 'src/app/shared/services/album.service';

@Injectable()
export class FeatureEffects {

  constructor(private action$: Actions, private albumService: AlbumService) { }

  readonly fetchData$ = createEffect(() =>
    this.action$.pipe(
      ofType(featureActions.fetchDataAction),
      exhaustMap(action => this.albumService.getCharacters(action.limit, action.skip).pipe(
        switchMap((data: ICharacter[]) => [
          appActions.toggleSpinnerAction({ loading: false }),
          featureActions.fetchDataSuccessAction({ limit: action.limit, skip: action.skip, data })
        ]),
        catchError((error: any) =>
          from([
            appActions.toggleSpinnerAction({ loading: false }),
            featureActions.fetchDataErrorAction({ error })
          ])
        )
      ))
    )
  );

  readonly fetchMoreData$ = createEffect(() =>
    this.action$.pipe(
      ofType(featureActions.loadMoreDataAction),
      exhaustMap(action => this.albumService.getCharacters(action.limit, action.skip).pipe(
        switchMap((data: ICharacter[]) => [
          appActions.toggleSpinnerAction({ loading: false }),
          featureActions.loadMoreDataSuccessAction({limit: action.limit, skip: action.skip, data })
        ]),
        catchError((error: any) =>
          from([
            appActions.toggleSpinnerAction({ loading: false }),
            featureActions.loadMoreDataErrorAction({ error })
          ])
        )
      ))
    )
  );
}
