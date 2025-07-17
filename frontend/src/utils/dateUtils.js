const getInitialAuctionDates = (durationMinutes = 60) => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const local = new Date(now.getTime() - offset * 60000);

    const startDate = local.toISOString().slice(0, 16);
    const endDate = new Date(local.getTime() + durationMinutes * 60000).toISOString().slice(0, 16);

    return { startDate, endDate };
};

const getClientTimezoneOffset = () => {
    const offsetMinutes = new Date().getTimezoneOffset();
    const sign = offsetMinutes > 0 ? '-' : '+';
    const absMinutes = Math.abs(offsetMinutes);
    const hours = String(Math.floor(absMinutes / 60)).padStart(2, '0');
    const minutes = String(absMinutes % 60).padStart(2, '0');
    return `${sign}${hours}:${minutes}`;
};

const addTimezoneOffset = (datetimeStr) => {
    const offset = getClientTimezoneOffset();
    return `${datetimeStr}:00${offset}`;
};

const formatReadableDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';

    return date.toLocaleString('en-EN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const toDatetimeLocal = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return '';

    const pad = (num) => num.toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const toISOString = (datetimeLocalStr) => {
    if (!datetimeLocalStr) return null;

    const date = new Date(datetimeLocalStr);
    return date.toISOString();
};

const isExpiredDate = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    return !isNaN(date.getTime()) && date < new Date();
};

export {
    getInitialAuctionDates,
    addTimezoneOffset,
    getClientTimezoneOffset,
    formatReadableDate,
    toDatetimeLocal,
    toISOString,
    isExpiredDate
};
