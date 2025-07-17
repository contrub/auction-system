import React from 'react';

import StatusPage from './base/StatusPage';

const NotFoundPage = () => (
    <StatusPage
        title="Element Not Found"
        subtitlePrefix="The element you are looking for was not found at"
        defaultPathText="the requested element"
    />
);

export default NotFoundPage;
