const extractErrorMessage = (error) => {
    if (!error) return 'Unknown error';

    try {
        const parsed = JSON.parse(error.message);
        return parsed?.message || 'Something went wrong';
    } catch {
        return error.message || 'Failed to fetch';
    }
}

export {
    extractErrorMessage
}
