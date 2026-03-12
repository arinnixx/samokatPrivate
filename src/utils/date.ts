export const formatDateJS = (t, m = null) => {
    if (!t) return null;
    if (!m) m = 'hh:mm YYYY-MM-DD';
    if (t.toString().length == 10) t *= 1000;
    const d = new Date(t);
    const mmmmm = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
    const mmmm = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    m = m.replace('YYYY', String(d.getUTCFullYear()));
    m = m.replace('YY', (d.getUTCFullYear() % 100 > 9 ? '' : '0') + d.getUTCFullYear() % 100);
    m = m.replace('MMMMM', mmmmm[d.getUTCMonth()]);
    m = m.replace('MMMM', mmmm[d.getUTCMonth()]);
    m = m.replace('MM', ((d.getUTCMonth() + 1) > 9 ? '' : '0') + (d.getUTCMonth() + 1));
    m = m.replace('DD', (d.getUTCDate() > 9 ? '' : '0') + d.getUTCDate());
    m = m.replace('hh', (d.getUTCHours() > 9 ? '' : '0') + d.getUTCHours());
    m = m.replace('mm', (d.getUTCMinutes() > 9 ? '' : '0') + d.getUTCMinutes());
    m = m.replace('ss', (d.getUTCSeconds() > 9 ? '' : '0') + d.getUTCSeconds());
    return m;
};
export const getUnixTime = (date, format = null) => {
    if (!format) format = 'hh:mm YYYY-MM-DD';
    let Y = date.substring(format.indexOf('Y'), format.lastIndexOf('Y') + 1);
    let M = date.substring(format.indexOf('M'), format.lastIndexOf('M') + 1).length ? date.substring(format.indexOf('M'), format.lastIndexOf('M') + 1) : '0';
    let D = date.substring(format.indexOf('D'), format.lastIndexOf('D') + 1).length ? date.substring(format.indexOf('D'), format.lastIndexOf('D') + 1) : '1';
    let h = date.substring(format.indexOf('h'), format.lastIndexOf('h') + 1).length ? date.substring(format.indexOf('h'), format.lastIndexOf('h') + 1) : '0';
    let m = date.substring(format.indexOf('m'), format.lastIndexOf('m') + 1).length ? date.substring(format.indexOf('m'), format.lastIndexOf('m') + 1) : '0';
    let s = date.substring(format.indexOf('s'), format.lastIndexOf('s') + 1).length ? date.substring(format.indexOf('s'), format.lastIndexOf('s') + 1) : '0';

    if (Y.length < 4) {
        Y = '200'.substring(0, 4 - Y.length) + '' + Y;
    }

    if (Y.match(/^\d+$/) && M.match(/^\d+$/) && D.match(/^\d+$/) && h.match(/^\d+$/) && m.match(/^\d+$/) && s.match(/^\d+$/)) {
        Y = parseInt(Y);
        M = parseInt(M);
        D = parseInt(D);
        h = parseInt(h);
        m = parseInt(m);
        s = parseInt(s);
        if (s >= 0 && s < 60 && m >= 0 && m < 60 && h >= 0 && h < 24 && D > 0 && D <= 31 && M > 0 && M <= 12) {
            if (Y > 2100) Y = 2100;
            const feb = IsLeapYear(Y) ? 29 : 28;
            if ((M === 2 && D > feb) || (D > 30 && (M === 4 || M === 6 || M === 9 || M === 11))) return null;
            return Date.UTC(Y, M - 1, D, h, m, s) / 1000;
        }
        return null;
    }

    return null;
};

export const getDateInSeconds = (date = null) => date ? Math.floor(+(new Date(date)) / 1000) : null;

export function IsLeapYear(year) {
    if (year % 4 === 0) {
        if (year % 100 === 0) {
            return year % 400 === 0;
        }
        return true;
    }
    return false;
}

export const safeGetUnixTime = (dateString: string | undefined, format: string): number => {
    if (!dateString) {
        return null;
    }
    try {
        const result = getUnixTime(dateString, format);
        return result || null;
    } catch (error) {
        return null;
    }
};

export const timeZoneOffset = (new Date()).getTimezoneOffset() * 60;

export const getDateFromTimestamp = (data, format = 'YYYY-MM-DD') => formatDateJS(data - timeZoneOffset, format);

