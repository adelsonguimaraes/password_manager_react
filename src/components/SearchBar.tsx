import { Box, TextField, InputAdornment, IconButton, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

interface SearchBarProps {
    filterText: string;
    onFilterTextChange: (text: string) => void;
    onSearch: () => void;
    onAddClick: () => void;
}

const SearchBar = ({ filterText, onFilterTextChange, onSearch, onAddClick }: SearchBarProps) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
            <TextField
                fullWidth
                label="Filtrar por nome ou usuário"
                value={filterText}
                onChange={(e) => onFilterTextChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={onSearch}>
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
                onClick={onAddClick}
                sx={{ padding: '15px 15px', borderRadius: '10px' }}
            >
                <AddIcon />
            </Button>
        </Box>
    );
};

export default SearchBar;