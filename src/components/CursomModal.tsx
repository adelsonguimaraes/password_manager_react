import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, TextField, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { saveOrUpdateCard } from '../services/api';
import { Card } from '../types';

interface EditPasswordModalProps {
    open: boolean;
    onClose: () => void;
    onSave: () => Promise<void>;
    initialData?: Card;
}

const EditPasswordModal = ({ open, onClose, onSave, initialData }: EditPasswordModalProps) => {
    const [formData, setFormData] = useState<Card>({
        id: initialData ? initialData.id : '',
        url: initialData ? initialData.url : '',
        name: initialData ? initialData.name : '',
        username: initialData ? initialData.username : '',
        password: initialData ? initialData.password : '',
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async () => {
        await saveOrUpdateCard(formData);
        onSave();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" gutterBottom color='text.primary'>
                    Edit Password {formData?.name}
                </Typography>

                <TextField
                    fullWidth
                    label="URL"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />

                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />

                <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />

                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePasswordVisibility}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button onClick={onClose} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} variant="contained">
                        Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditPasswordModal;
