import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as featureReducer from 'src/app/dashboard/state/feature.reducer'
import { AlbumService } from './album.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { fetchDataAction } from 'src/app/dashboard/state/feature.action';
import { defaultState } from 'src/app/dashboard/state/feature.reducer';

describe('AlbumService', () => {
  let service: AlbumService;
  let httpController: HttpTestingController;

  const initialState = {
    limit: 10,
    skip: 0,
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlbumService, provideMockStore({ initialState })]

    });
    service = TestBed.inject(AlbumService);
    httpController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getData function', () => {
    expect(service.getCharacterIds).toBeTruthy();
  });

  it('get character id list', () => {
    const action = fetchDataAction({ limit: 10, skip: 0 });
    const initialState = defaultState
    const state = featureReducer.featureReducer(initialState, action);
    const charaterIds = service.getCharacterIds(state.limit, state.skip);

    expect(charaterIds.length).toBeGreaterThan(0);
    expect(charaterIds.length).toBeLessThanOrEqual(9);
  })

  it('get characters', () => {
    const action = fetchDataAction({ limit: 10, skip: 0 });
    const initialState = defaultState
    const state = featureReducer.featureReducer(initialState, action);
    service.getCharacters(state.skip, state.limit).subscribe((res) => {
      expect(res)
      expect(res.length).toBeGreaterThan(0);
    })
  })
});
