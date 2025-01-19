import React, { useState, useContext, createContext } from "react";
import { Snackbar, Alert } from "@mui/material";

export enum SeverityEnum {
    Success = "success",
    Error = "error",
    Info = "info",
    Warning = "warning",
}

interface SnackbarContextType {
    showSnackbar: (message: string, severity: SeverityEnum) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [serverity, setSeverity] = useState<SeverityEnum>(SeverityEnum.Success);

    const showSnackbar = (message: string, severity: SeverityEnum) => {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}

            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert
                    onClose={handleClose}
                    severity={serverity}
                    sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};