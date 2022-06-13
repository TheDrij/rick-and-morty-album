import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { getData, getSkipValue, getLimitValue, IFeatureState} from '../state/feature.reducer';
import { ICharacter } from 'src/app/shared/models/AlbumModels';
import { AlbumService } from 'src/app/shared/services/album.service';
import { IApplicationState, isLoading } from 'src/app/shared/state/app.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private readonly store: Store<IFeatureState>,
    private readonly albumService: AlbumService,
    private appStore: Store<IApplicationState>
  ) { }

  readonly data$: Observable<ICharacter[]> = this.store.select(getData);
  readonly limitValue$: Observable<number> = this.store.select(getLimitValue);
  readonly skipValue$: Observable<number> = this.store.select(getSkipValue);
  loading$!: Observable<boolean>;

  readonly loadMore$ = this.albumService.loadMoreData$.pipe(
    filter((loadMore: boolean) => loadMore),
    withLatestFrom(this.limitValue$, this.skipValue$),
    tap(([_, limit, skip]) => this.albumService.loadMoreDataAction(limit, skip))
  );

  ngOnInit(): void {
    this.albumService.fetchDataAction(9, 0);
    this.loadMore$.subscribe();
    this.loading$ = this.appStore.select(isLoading);
  }
}
