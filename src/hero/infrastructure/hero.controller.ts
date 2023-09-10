import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, ReplaySubject } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { HeroByIdRequest } from './grpc/proto/interfaces/hero-by-id.request';
import { HeroResponse } from './grpc/proto/interfaces/hero.response';
import { Hero } from './grpc/proto/interfaces/hero.interface';
import { Greeter } from './grpc/proto/interfaces/greeter.interface';
import { HelloReply } from './grpc/proto/interfaces/hello.reply';

@Controller('hero1')
export class HeroController implements OnModuleInit {
  private heroService: Hero;
  private greeterService: Greeter;

  constructor(
    @Inject('HERO_PACKAGE') private readonly client: ClientGrpc,
    @Inject('HELLO_PACKAGE') private readonly client2: ClientGrpc,
  ) {}

  onModuleInit() {
    this.heroService = this.client.getService<Hero>('Hero');
    this.greeterService = this.client2.getService<Greeter>('Greeter');
  }

  @Get()
  getMany(): Observable<HeroResponse[]> {
    const ids$ = new ReplaySubject<HeroByIdRequest>();
    ids$.next({ id: 1 });
    ids$.next({ id: 2 });
    ids$.complete();

    const stream = this.heroService.findMany(ids$.asObservable());
    return stream.pipe(toArray());
  }

  @Get('external')
  getExternal(): Observable<HelloReply> {
    return this.greeterService.SayHello({ name: 'Alex' });
  }

  @Get(':id')
  getById(@Param('id') id: string): Observable<HeroResponse> {
    return this.heroService.findOne({ id: +id });
  }
}
