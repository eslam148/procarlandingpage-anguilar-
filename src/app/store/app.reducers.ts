import { ActionReducerMap } from '@ngrx/store';
import { translationReducer, TranslationState } from './translation/translation.reducer';

export interface AppState {
  translation: TranslationState;
}

export const reducers: ActionReducerMap<AppState> = {
  translation: translationReducer
};
