import React, { useEffect, useState } from 'react';
import { Box, Card, CardActions, CardContent, Typography, Button, TextField, InputAdornment, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import EditPasswordModal from '../components/CursomModal';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteCard, fetchCards } from '../services/api';
import { Card as PasswordData } from '../types';

function Home() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const [filterText, setFilterText] = useState('');
    const [cards, setCards] = useState<PasswordData[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [cardToDelete, setCardToDelete] = useState<string | null>(null);

    useEffect(() => {
        loadCards();
    }, []);

    const loadCards = async () => {
        try {
            const data = await fetchCards(filterText);
            setCards(data);
            setLoading(false);
        } catch (err) {
            setError('Erro ao carregar os cards.');
            setLoading(false);
            console.error(err);
        }
    };

    const handleOpenModal = (card: PasswordData) => {
        setSelectedCard(card);
        setModalOpen(true);
    };

    const handleSave = () => {
        setModalOpen(false);
        loadCards();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            loadCards();
        }
    };

    const handleDeleteClick = (cardId: string) => {
        setCardToDelete(cardId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (cardToDelete) {
            try {
                await deleteCard(cardToDelete);
                loadCards();
                setDeleteDialogOpen(false);
            } catch (err) {
                console.error('Erro ao excluir o card:', err);
            }
        }
    };

    // Função para cancelar a exclusão
    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setCardToDelete(null);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom>
                Pass List
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
                <TextField
                    fullWidth
                    label="Filtrar por nome ou usuário"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={loadCards}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'transparent',
                            },
                            '&:hover fieldset': {
                                borderColor: '#ccc',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#3f51b5',
                            },
                        },
                    }}
                />
                <Button
                    variant='contained'
                    onClick={() => handleOpenModal(null)}
                    sx={{ padding: '15px 15px', borderRadius: '10px' }}
                >
                    <AddIcon />
                </Button>
            </Box>

            {loading && <Typography>Carregando...</Typography>}
            {error && <Typography color="error">{error}</Typography>}

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '24px',
                    cursor: 'pointer',
                    justifyContent: 'center'
                }}>
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        sx={{
                            width: '250px',
                            height: '180px'
                        }}
                        onClick={() => handleOpenModal(card)}
                    >
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <Box sx={{ color: 'text.secondary' }}>
                                <LockIcon />
                            </Box>

                            <Typography variant='h5'>
                                {card.name}
                            </Typography>
                            <Typography variant='body2' color='textSecondary'>
                                {card.url}
                            </Typography>
                        </CardContent>

                        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(card.id);
                            }}>
                                <DeleteIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                ))}
            </Box>

            <EditPasswordModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSave}
                initialData={selectedCard}
            />

            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
            >
                <DialogTitle>Remove</DialogTitle>
                <DialogContent>
                    <Typography>
                        Do you really want to remove this card?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error">
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Home
