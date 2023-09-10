import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientExternalOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'helloworld',
    url: 'localhost:50051',
    protoPath: join(
      __dirname,
      './hero/infrastructure/grpc/proto/helloworld.proto',
    ),
  },
};
