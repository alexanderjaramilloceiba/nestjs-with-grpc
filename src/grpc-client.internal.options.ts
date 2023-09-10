import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientInternalOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'hero', // ['hero', 'hero2']
    protoPath: join(__dirname, './hero/infrastructure/grpc/proto/hero.proto'), // ['./hero/hero.proto', './hero/hero2.proto']
  },
};
