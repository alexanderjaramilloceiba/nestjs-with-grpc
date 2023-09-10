import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable, Subject } from 'rxjs';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { HeroResponse } from '../proto/interfaces/hero.response';
import { HeroByIdRequest } from '../proto/interfaces/hero-by-id.request';

// @Injectable()
@Controller('hero')
export class HeroGrpc {
  private readonly items: HeroResponse[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
    { id: 3, name: 'Alex' },
  ];

  @GrpcMethod('Hero')
  findOne(
    data: HeroByIdRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): HeroResponse {
    Logger.log({ metadata, call });
    return this.items.find(({ id }) => id === data.id);
  }

  @GrpcStreamMethod('Hero')
  findMany(data$: Observable<HeroByIdRequest>): Observable<HeroResponse> {
    const hero$ = new Subject<HeroResponse>();

    const onNext = (HeroByIdRequest: HeroByIdRequest) => {
      const item = this.items.find(({ id }) => id === HeroByIdRequest.id);
      hero$.next(item);
    };
    const onComplete = () => hero$.complete();
    data$.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return hero$.asObservable();
  }
}
