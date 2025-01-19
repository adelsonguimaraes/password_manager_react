# Services
Este diretório serve para organizar aquivos de `service`.

Aqui temos o exemplo de `api.ts` que serve para comunicação com a API, controlando as requisões.

Utilizamos a biblioteca `Axios` para fazer as requisições para a API.

Todos os métodos retornam uma `Promise` e utilizam `async await` para aguardar o retorno.
```ts
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
```