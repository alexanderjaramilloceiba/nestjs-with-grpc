import { Observable } from 'rxjs';
import { HelloRequest } from './hello.request';
import { HelloReply } from './hello.reply';

export interface Greeter {
  SayHello(data: HelloRequest): Observable<HelloReply>;
  SayHelloStreamReply(
    upstream: Observable<HelloRequest>,
  ): Observable<HelloReply>;
}
