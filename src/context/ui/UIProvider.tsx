import { useReducer, FC } from 'react'
import { UIContext, uiReducer } from "./";


export interface UIState {
    sideMenuOpen: boolean;
    isAdding: boolean;
    isDragging: boolean
  
    
}

type Props = {
    children: JSX.Element
}

const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false, 
    isAdding: false,
    isDragging: false
}

export const UIProvider = ({children}: Props) =>{

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE,)

    const openSideMenu = () =>{
        dispatch({
            type:'UI - Open Sidebar'
        })
    }
    const closeSideMenu = () => {
        dispatch({
            type:'UI - Close Sidebar'
        })
    }

    const setIsAddingEntry = (value: boolean) => {
        dispatch({
            type: 'UI - View Form',
            payload: value
        })
    }
    
    const startDragging = () => {
        dispatch({
            type:'UI - Start Dragging'
        })
    }

    const endDragging = () => {
        dispatch({
            type:'UI - End Dragging'
        })
    }
   


    return (
        <UIContext.Provider value={{
            //sideMenuOpen: state.sideMenuOpen || 
            ...state,

            //Methods
            openSideMenu,
            closeSideMenu, 
            setIsAddingEntry,
            startDragging,
            endDragging
        }}>
            {children}
        </UIContext.Provider>
    )
}