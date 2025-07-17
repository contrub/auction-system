const handleFieldChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({
        ...prev,
        [name]: value,
    }));
};

export {
    handleFieldChange
};
