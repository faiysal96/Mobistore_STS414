import { ApiBody } from "@nestjs/swagger";

export const ApiFile = (): MethodDecorator => (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
   return  ApiBody({
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