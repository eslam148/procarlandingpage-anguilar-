import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {
  loadTranslations,
  loadTranslationsSuccess,
  loadTranslationsFailure,
  changeLanguageApi,
  changeLanguageApiSuccess,
  changeLanguageApiFailure,
  setLanguage,
  loadTranslations as loadTranslationsAction
} from './translation.actions';

@Injectable()
export class TranslationEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadTranslations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTranslations),
      mergeMap(({ language }) =>
        this.http.get(`/assets/i18n/${language}.json`).pipe(
          map(translations => loadTranslationsSuccess({ translations })),
          catchError(error => {
            console.error('Error loading translations:', error);
            return of(loadTranslationsFailure({ error }));
          })
        )
      )
    )
  );

  // Simplified API language change effect (without ProfileService)
  changeLanguageApi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeLanguageApi),
      mergeMap(({ language }) => {
        // For now, just handle locally since ProfileService doesn't exist
        // When backend API is ready, add actual API call here
        return of(changeLanguageApiSuccess({ language })).pipe(
          mergeMap(() => [
            changeLanguageApiSuccess({ language }),
            setLanguage({ language }),
            loadTranslationsAction({ language })
          ]),
          catchError(error => {
            console.error('Language change API error:', error);
            return of(changeLanguageApiFailure({ error }));
          })
        );
      })
    )
  );
}
