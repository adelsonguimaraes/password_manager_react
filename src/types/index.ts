export interface Card {
    id: string;
    url: string;
    name: string;
    username: string;
    password: string;
}

export interface CustomModalProps {
    open: boolean;
    onClose: () => void;
    card: Card;
    onEdit: (card: Card) => void;
}