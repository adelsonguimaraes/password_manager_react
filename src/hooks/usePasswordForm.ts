import React, { useState } from 'react';
import { Card } from '../types';
import { saveOrUpdateCard } from '../services/api';

export const usePasswordForm = (initialData?: Card, onSave?: () => Promise<void>) => {
    const [formData, setFormData] = useState<Card>({
        id: initialData?.id || '',
        url: initialData?.url || '',
        name: initialData?.name || '',
        username: initialData?.username || '',
        password: initialData?.password || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        await saveOrUpdateCard(formData);
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