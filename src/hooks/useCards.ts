import { useState, useEffect } from 'react';
import { fetchCards, deleteCard } from '../services/api';
import { Card } from '../types';
import { SeverityEnum, useSnackbar } from '../contexts/SnackbarContext';

export const useCards = (filterText: string = '') => {
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        if (filterText.length === 0) {
            loadCards();
        }
    }, [filterText]);

    const loadCards = async (filterText: string = '') => {
        console.log(filterText);

        try {
            const data = await fetchCards(filterText);
            setCards(data);
            setLoading(false);
        } catch (err) {
            setError('Error to fetch cards.');
            setLoading(false);
            console.error(err);
        }
    };

    const handleDeleteCard = async (cardId: string) => {
        try {
            await deleteCard(cardId);
            loadCards('');
            showSnackbar('Data removed successfully!', SeverityEnum.Success);
        } catch (err) {
            showSnackbar('Error deleting card!', SeverityEnum.Error);
        }
    }

    return { cards, loading, error, loadCards, handleDeleteCard };
};
