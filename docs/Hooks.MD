# Hooks
Diretório para organizar arquivos de controle de `Hooks`, 

Hooks são ferramentas do `react` para controlar estados de variáveis, úteis para quando precisamos atualizar informações em memória que precisão ser exibidas na tela.

No exemplo abaixo temos o arquivo `useCards.ts` que controla o carregando, filtro e remoção dos cartões da tela, muito parecido com o conceito de `camada de controller` onde o script era separado da interface.

Isso claramente separa as responsabilidade e deixa o código mais limpo e organizado.
```ts
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

```