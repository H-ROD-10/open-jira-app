import { createContext } from "react";

export interface ContextProps {
    sideMenuOpen: boolean;
    isAdding: boolean;
    isDragging: boolean;
    openSideMenu: () => void;
    closeSideMenu: () => void;
    setIsAddingEntry: (value: boolean) => void;
    endDragging: () => void;
    startDragging: () => void;

}

export const UIContext = createContext({} as ContextProps)