import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import EditPasswordModal from '../components/EditPasswordModal';
import { Card as PasswordData } from '../types';
import { useCards } from '../hooks/useCards';
import SearchBar from '../components/SearchBar';
import CardList from '../components/CardList';
import DeleteDialog from '../components/DeleteDialog';


function Home() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [filterText, setFilterText] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [cardToDelete, setCardToDelete] = useState<string | null>(null);

    const { cards, loading, error, loadCards, handleDeleteCard } = useCards(filterText);

    const handleOpenModal = (card: PasswordData | null) => {
        setSelectedCard(card);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedCard(null);
    }

    const handleSave = () => {
        loadCards(filterText);
        closeModal();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            loadCards(filterText);
        }
    };

    const handleDeleteClick = (cardId: string) => {
        setCardToDelete(cardId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (cardToDelete) {
            await handleDeleteCard(cardToDelete);
            setDeleteDialogOpen(false);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setCardToDelete(null);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom>
                Pass List
            </Typography>

            <SearchBar
                filterText={filterText}
                onFilterTextChange={setFilterText}
                onSearch={() => loadCards(filterText)}
                onAddClick={() => handleOpenModal(null)}
            />

            {loading && <Typography>Carregando...</Typography>}
            {error && <Typography color="error">{error}</Typography>}

            <CardList
                cards={cards}
                onCardClick={handleOpenModal}
                onDeleteClick={handleDeleteClick}
            />

            <EditPasswordModal
                open={modalOpen}
                onClose={closeModal}
                onSave={handleSave}
                initialData={selectedCard}
            />

            <DeleteDialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
            />
        </div>
    );
}

export default Home
