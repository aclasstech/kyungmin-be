import { INestApplication, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { API_SECURITY_AUTH } from "./common/decorators/swagger.decorator";
import { ResOp, TreeResult } from "./common/model/response.model";
import { ConfigKeyPaths, IAppConfig, ISwaggerConfig } from "./config";

export function setupSwagger(
  app: INestApplication,
  configService: ConfigService<ConfigKeyPaths>
): void {
  const { name, port } = configService.get<IAppConfig>("app")!;
  const { enable, path } = configService.get<ISwaggerConfig>("swagger")!;

  if (!enable) return;

  const documentBuilder = new DocumentBuilder()
    .setTitle(name)
    .setDescription(`${name} API document`)
    .setVersion("1.0");

  documentBuilder.addSecurity(API_SECURITY_AUTH, {
    description: "Nhập token",
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  });

  const document = SwaggerModule.createDocument(app, documentBuilder.build(), {
    ignoreGlobalPrefix: false,
    extraModels: [ResOp, TreeResult],
  });

  SwaggerModule.setup(path, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const logger = new Logger("SwaggerModule");
  logger.log(`Document running on http://127.0.0.1:${port}/${path}`);
}
