import {SetMetadata} from '@nestjs/common';

export const SafeHttp = () => SetMetadata('safe-http', true);
export const SafeLog = () => {
    return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> => {
        const originalMethod = descriptor.value;
        if (originalMethod.constructor && originalMethod.constructor.name === 'AsyncFunction') {
            descriptor.value = async function () {
                try {
                    return await originalMethod.apply(this, arguments);
                } catch (err) {
                    console.error(propertyKey, err.message);
                }
            };
        } else {
            descriptor.value = function () {
                try {
                    return originalMethod.apply(this, arguments);
                } catch (err) {
                    console.error(propertyKey, err.message);
                }
            };
        }
        return descriptor;
    };
};
export const SafeApi = (isThrowError = true) => {
    return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> => {
        const originalMethod = descriptor.value;
        if (originalMethod.constructor && originalMethod.constructor.name === 'AsyncFunction') {
            descriptor.value = async function () {
                try {
                    return await originalMethod.apply(this, arguments);
                } catch (err) {
                    console.error(propertyKey, `${err.message}: ${err.response?.data?.message}`);
                    if (isThrowError) throw new Error(err.message);
                }
            };
        } else {
            descriptor.value = function () {
                try {
                    return originalMethod.apply(this, arguments);
                } catch (err) {
                    console.error(propertyKey, `${err.message}: ${err.response?.data?.message}`);
                    if (isThrowError) throw new Error(err.message);
                }
            };
        }
        return descriptor;
    };
};