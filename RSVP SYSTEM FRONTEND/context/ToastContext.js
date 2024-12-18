import { createContext, useContext, useEffect, useState } from "react";

const ToastContext = createContext({
    toast: {
        show: false,
        message: null,
        type: null,
    },
});

export const ToastProvider = ({ children }) => {    
    
    const [toast, setToast] = useState({
        show: false,
        message: null,
        type: null,
    });

    useEffect(() => {
        (() => {
            if (toast.show) {
                setTimeout(() => {
                    setToast(prev => ({
                        ...prev,
                        show: false,
                    }));
                }, 3000);
            }
        })();
    }, [toast]);

    return (
        <ToastContext.Provider value={{ toast, setToast }}>
        {children}
        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);
