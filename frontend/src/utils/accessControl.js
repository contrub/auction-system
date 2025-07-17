const accessControl = (userRoles = [], roles = []) => {
    return roles.some(role => userRoles.includes(role));
};

export {
    accessControl
};
