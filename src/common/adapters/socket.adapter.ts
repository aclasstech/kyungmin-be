// import { INestApplication } from "@nestjs/common";
// import { IoAdapter } from "@nestjs/platform-socket.io";
// import { REDIS_PUBSUB } from "~/shared/redis/redis.constant";
// import { createAdapter } from "@socket.io/redis-adapter";

// export const RedisIoAdapterKey = "a1-math-club-socket";

// export class RedisIoAdapter extends IoAdapter {
//   constructor(private readonly app: INestApplication) {
//     super(app);
//   }

//   createIOServer(port: number, options?: any) {
//     const server = super.createIOServer(port, options);

//     const { pubClient, subClient } = this.app.get(REDIS_PUBSUB);

//     const redisAdapter = createAdapter(pubClient, subClient, {
//       key: RedisIoAdapterKey,
//       requestsTimeout: 10000,
//     });
//     server.adapter(redisAdapter);
//     return server;
//   }
// }
