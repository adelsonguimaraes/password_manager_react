import axios from 'axios';
import { Card } from '../types';

const BASE_URL = 'http://localhost:3000';

export const fetchCards = async (filter = ''): Promise<Card[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/password-cards?filter=${filter}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cards:', error);
        throw new Error('Error to fetch cards.');
    }
}

export const saveOrUpdateCard = async (card: Card) => {
    try {
        let response;
        if (card.id) {
            response = await axios.put(`${BASE_URL}/password-cards/${card.id}`, card);
        } else {
            response = await axios.post(`${BASE_URL}/password-cards`, card);
        }
        return response.data;
    } catch (error) {
        console.error('Error saving or updating card:', error);
        throw new Error('Error to save or update card.');
    }
};

export const deleteCard = async (cardId: string) => {
    try {
        await axios.delete(`${BASE_URL}/password-cards/${cardId}`);
    } catch (error) {
        console.error('Error deleting card:', error);
        throw new Error('Error to delete card.');
    }
};