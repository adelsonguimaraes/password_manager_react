Components
Esse é um diretório bem utilizado nos padrões comums de projetos React, aqui temos pequenos blocos de códigos isolados que foram uma interface maior que chamamos de `Page`.

No exemplo abaixo temos o arquivo `CardList.tsx`, nele está tudo que é necessário para fazer a lista de cards funcionar, temos uma interface que configura como devem ser os parâmetros necessários para a utilização, incluindo `métodos` callback que serão chamados em ações de click.

Com isso ao chamar este component, podemos passar uma função externa para ser executada aqui dentro, muito último para trabalhar com `distribuição de responsabilidades` nesse exemplo a responsabilidade desse component é montar a interface e acionar os eventos, a responsabilidade dos métodos fica para os `hooks` que vimos anteriormente.

```tsx
import React from 'react';
import { Box, Card, CardActions, CardContent, Typography, IconButton } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card as PasswordData } from '../types';

interface CardListProps {
    cards: PasswordData[];
    onCardClick: (card: PasswordData) => void;
    onDeleteClick: (card: PasswordData) => void;
};

const CardList = ({ cards, onCardClick, onDeleteClick }: CardListProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '24px',
                cursor: 'pointer',
                justifyContent: 'center'
            }}>
            {cards.map((card: PasswordData) => (
                <Card
                    key={card.id}
                    sx={{
                        width: '250px',
                        height: '180px'
                    }}
                    onClick={() => onCardClick(card)}
                >
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <Box sx={{ color: 'text.secondary' }}>
                            <LockIcon />
                        </Box>

                        <Typography variant='h5'>
                            {card.name}
                        </Typography>

                        <Typography variant='body2' color='text.secondary'>
                            {card.url}
                        </Typography>
                    </CardContent>

                    <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton onClick={(e) => {
                            e.stopPropagation();
                            onDeleteClick(card);
                        }}>
                            <DeleteIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            ))}
        </Box>
    );
};

export default CardList;
```