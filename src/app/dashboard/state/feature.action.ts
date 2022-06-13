import { createAction, props } from '@ngrx/store';
import { ICharacter } from 'src/app/shared/models/AlbumModels';

export const fetchDataAction = createAction(
  '[Feature] Fetch Data',
  props<{ limit: number, skip: number }>()
);

export const fetchDataSuccessAction = createAction(
  '[Feature] Fetch Data Success',
  props<{ limit: number, skip: number, data: ICharacter[] }>()
);

export const fetchDataErrorAction = createAction(
  '[Feature] Fetch Data Error',
  props<{ error: string }>()
);

export const loadMoreDataAction = createAction(
  '[Feature] Load Data',
  props<{ limit: number, skip: number }>()
);

export const loadMoreDataSuccessAction = createAction(
  '[Feature] Load Data Success',
  props<{limit: number, skip: number, data: ICharacter[] }>()
);

export const loadMoreDataErrorAction = createAction(
  '[Feature] Load Data Error',
  props<{ error: string }>()
);

