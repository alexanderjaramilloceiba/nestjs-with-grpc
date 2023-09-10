import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientInternalOptions } from '../grpc-client.internal.options';
import { HeroController } from './infrastructure/hero.controller';
import { HeroGrpc } from './infrastructure/grpc/server/hero.grpc';
import { grpcClientExternalOptions } from 'src/grpc-client.external.options';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HERO_PACKAGE',
        ...grpcClientInternalOptions,
      },
    ]),
    ClientsModule.register([
      {
        name: 'HELLO_PACKAGE',
        ...grpcClientExternalOptions,
      },
    ]),
  ],
  controllers: [HeroGrpc, HeroController],
})
export class HeroModule {}
