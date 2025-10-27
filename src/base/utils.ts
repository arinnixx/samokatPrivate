import * as configDotenv from 'dotenv';

export const config = configDotenv.config().parsed;

export const checkChanges = (initValue: Object = {}, formValue: Object = {}, checkField: Object = null) => {
    try {
        return !Object.entries(checkField ?? formValue).every(([key, value]) => {
            if (Array.isArray(initValue[key]) && Array.isArray(value)) {
                if (initValue[key].length === value.length) return value.every((elm, index) => !checkChanges(initValue[key][index], elm));
                return false;
            }
            if (typeof initValue[key] === 'object' && initValue[key] !== null) return !checkChanges(initValue[key], value);
            return initValue[key] == value;
        });
    } catch (e) {
        return true;
    }
};

export const timestampInSeconds = () => Math.floor(Date.now() / 1000);
