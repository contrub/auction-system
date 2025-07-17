import React from 'react';

import StatusPage from './base/StatusPage';

const ForbiddenPage = () => (
    <StatusPage
        title="Access Denied"
        subtitlePrefix="You do not have permission to"
        defaultPathText="the requested resource"
    />
);

export default ForbiddenPage;
