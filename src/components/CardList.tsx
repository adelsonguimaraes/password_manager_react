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
                            e.preventDefault();
                            onDeleteClick(card);
                        }}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton>
                            <LockIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            ))}
        </Box>
    );
};

export default CardList;