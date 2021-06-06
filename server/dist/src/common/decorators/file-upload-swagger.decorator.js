"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFile = void 0;
const swagger_1 = require("@nestjs/swagger");
const ApiFile = () => (target, propertyKey, descriptor) => {
    return swagger_1.ApiBody({
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    })(target, propertyKey, descriptor);
};
exports.ApiFile = ApiFile;
//# sourceMappingURL=file-upload-swagger.decorator.js.map