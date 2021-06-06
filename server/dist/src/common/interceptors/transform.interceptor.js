"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const lodash_1 = require("lodash");
const class_transformer_1 = require("class-transformer");
class TransformInterceptor {
    constructor() {
        this.logger = new common_1.Logger('TransformInterceptor');
    }
    intercept(context, next) {
        return next
            .handle()
            .pipe(operators_1.tap(() => this.logger.log('TransformInterceptor intercept response...')), operators_1.map(res => (lodash_1.isObject(res) ? this.transformResponse(res) : res)));
    }
    transformResponse(response) {
        if (lodash_1.isArray(response)) {
            return response.map(item => this.transformToPlain(item));
        }
        return this.transformToPlain(response);
    }
    transformToPlain(plainOrClass) {
        return plainOrClass && plainOrClass.constructor !== Object ? class_transformer_1.classToPlain(plainOrClass) : plainOrClass;
    }
}
exports.TransformInterceptor = TransformInterceptor;
//# sourceMappingURL=transform.interceptor.js.map