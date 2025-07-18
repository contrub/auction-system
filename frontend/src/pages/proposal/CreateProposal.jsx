import React, {useState, useEffect, useMemo} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import { Button, Grid, TextField, Avatar } from '@mui/material';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';

import {styles} from '../../styles/formStyles';
import paths from '../../routes/paths';
import {handleFieldChange} from '../../utils/formHandlers';
import {extractErrorMessage} from "../../utils/errorUtils";
import ErrorSnackbar from '../../components/ErrorSnackbar';
import LotService from '../../services/lot/LotService';
import ProposalService from '../../services/proposal/ProposalService';
import CategoryService from "../../services/category/CategoryService";
import Loading from "../../components/Loading";

const CreateProposal = () => {
    const { lotID } = useParams();
    const [lot, setLot] = useState({
        id: 0,
        auctionId: 0,
        categoryId: 0,
        amount: 0,
        title: '',
        description: '',
    });
    const [categories, setCategories] = useState([{
        id: 0,
        title: '',
        description: '',
    }]);
    const [formData, setFormData] = useState({
        id: 0,
        lotId: lotID,
        description: '',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        LotService.getLot({ id: lotID })
            .then((data) => setLot(data))
            .catch((err) => {
                const errorMessage = extractErrorMessage(err);
                setError(errorMessage);
                setSnackbarOpen(true);
            });
    }, [lotID]);

    useEffect(() => {
        CategoryService.fetchCategories()
            .then((data) => setCategories(data))
            .catch((err) => {
                const errorMessage = extractErrorMessage(err);
                setError(errorMessage);
                setSnackbarOpen(true);
            })
            .finally(() => setIsLoading(false));
    }, [isLoading]);

    const handleInputChange = handleFieldChange(setFormData);

    const handleCreateClick = async () => {
        try {
            await ProposalService.createProposal(formData);
            setError('');
            navigate(paths.auctions);
        } catch (err) {
            const errorMessage = extractErrorMessage(err);
            setError(errorMessage);
            setSnackbarOpen(true);
        }
    };

    const categoryMap = useMemo(() => {
        const map = {};
        categories.forEach(cat => {
            map[cat.id] = cat.title;
        });
        return map;
    }, [categories]);

    if (isLoading) return <Loading />;

    return (
        <Grid container sx={styles.container}>
            <Grid item xs={12} md={6} lg={4}>
                <Avatar sx={styles.avatar}>
                    <SpeakerNotesIcon sx={styles.avatarIcon} />
                </Avatar>
                <form>
                    <TextField
                        label="Title"
                        name="title"
                        value={lot.title}
                        fullWidth
                        margin="normal"
                        disabled
                    />
                    <TextField
                        label="Description"
                        name="lotDescription"
                        value={lot.description}
                        fullWidth
                        margin="normal"
                        multiline
                        disabled
                    />
                    <TextField
                        label="Category"
                        name="category"
                        value={categoryMap[lot.categoryId] || '-'}
                        onChange={handleInputChange}
                        disabled={true}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Amount"
                        name="amount"
                        type="number"
                        value={lot.amount}
                        fullWidth
                        margin="normal"
                        disabled
                    />
                    <TextField
                        label="Proposal"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        multiline
                    />
                </form>
                <div style={styles.flexCenter}>
                    <Button style={styles.createButton} onClick={handleCreateClick}>
                        Create
                    </Button>
                </div>
                <ErrorSnackbar
                    open={snackbarOpen}
                    message={error}
                    onClose={() => setSnackbarOpen(false)}
                />
            </Grid>
        </Grid>
    );
}

export default CreateProposal;
