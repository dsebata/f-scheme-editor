import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { IScheme } from '../i-scheme';
import { CreateSchemeRequest } from './create-scheme.request';
import { CreateEntityHandlerBase, EEntityType, IEntitySummary, StorageService } from '@core';
import { GuidExtensions } from '@foblex/core';
import { ESchemeBackground } from '../e-scheme-background';

@Injectable({
  providedIn: 'root'
})
export class CreateSchemeHandler extends CreateEntityHandlerBase {

  constructor(
      private storage: StorageService,
  ) {
    super();
  }

  public handle(payload: CreateSchemeRequest): Observable<IEntitySummary> {
    const entity: IScheme = {
      key: GuidExtensions.generate(),
      parentKey: payload.inDirectory,
      name: payload.name,
      type: EEntityType.SCHEME_DRAWER,
      background: ESchemeBackground.RECT,
      fill: '#ffffff00',
      stroke: 'rgba(0, 0, 0, 0.1)',
      nodes: [],
      connections: []
    };

    this.storage.setEntity(entity);

    return this.storage.saveData().pipe(switchMap(() => {
      return of({ key: entity.key, name: entity.name, type: entity.type });
    }));
  }
}
