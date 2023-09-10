import { Observable } from 'rxjs';
import { HeroByIdRequest } from './hero-by-id.request';
import { HeroResponse } from './hero.response';

export interface Hero {
  findOne(data: HeroByIdRequest): Observable<HeroResponse>;
  findMany(upstream: Observable<HeroByIdRequest>): Observable<HeroResponse>;
}
