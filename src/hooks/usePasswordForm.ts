import React, { useState, useEffect } from 'react';
import { Card } from '../types';
import { saveOrUpdateCard } from '../services/api';
import { useSnackbar } from '../contexts/SnackbarContext';

export const usePasswordForm = (initialData?: Card, onSave?: () => Promise<void>) => {
    const { showSnackbar } = useSnackbar();

    const [formData, setFormData] = useState<Card>({
        id: initialData?.id || '',
        url: initialData?.url || '',
        name: initialData?.name || '',
        username: initialData?.username || '',
        password: initialData?.password || '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                id: initialData.id || '',
                url: initialData.url || '',
                name: initialData.name || '',
                username: initialData.username || '',
                password: initialData.password || '',
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        await saveOrUpdateCard(formData, showSnackbar);
        if (onSave) {
            await onSave();
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit,
    };
}