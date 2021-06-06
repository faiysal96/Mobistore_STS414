"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrapInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
class WrapInterceptor {
    constructor() {
        this.logger = new common_1.Logger('WrapInterceptor');
    }
    intercept(context, next) {
        return next
            .handle()
            .pipe(operators_1.tap(() => this.logger.log('WrapInterceptor intercept response...')), operators_1.map(response => ({ status: 'success', data: response })));
    }
}
exports.WrapInterceptor = WrapInterceptor;
//# sourceMappingURL=wrap.interceptor.js.map