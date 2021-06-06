"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("./swagger");
const trim_strings_pipe_1 = require("./common/pipes/trim-strings.pipe");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(helmet());
    app.use(compression());
    app.use(rateLimit({
        windowMs: 5 * 60 * 1000,
        max: 100,
    }));
    app.enableCors();
    swagger_1.setupSwagger(app);
    app.useGlobalPipes(new trim_strings_pipe_1.TrimStringsPipe(), new common_1.ValidationPipe());
    class_validator_1.useContainer(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map