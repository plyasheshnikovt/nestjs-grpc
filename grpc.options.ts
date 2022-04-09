import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:5000',
    package: ['photo'],
    protoPath: [join(__dirname, './modules/photo/photo.proto')],
  },
};
