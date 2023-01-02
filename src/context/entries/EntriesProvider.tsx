import React, {useReducer, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import { entriesApi } from '../../../backend/apis';
import { IEntry } from '../../interfaces'
import { EntriesContext,  entriesReducer } from './'

export interface EntriesState{
    entries: IEntry[]
}

type Props ={
    children: JSX.Element
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: []
}


const EntriesProvider = ({children}: Props) => {

    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)

    const addNewEntry = async (description: string) =>{
        

        try {
            const { data } = await entriesApi.post<IEntry>('/entries', { description});

            dispatch({
                type:'[Entry] - Addd-Entry',
                payload: data
            });

        } catch (error) {
            console.log(error)
        }

        
    }

    const updateEntry = async (entry: IEntry) => {
        const { data } = await entriesApi.put<IEntry>(`/entries/${entry._id}`, { description: entry.description, status: entry.status});
        try {
            dispatch({
                type: '[Entry] - Update-Entry', 
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }

    const refreshEntries = async () => {
        const {data} = await entriesApi.get<IEntry[]>('/entries'); 
        dispatch({
            type:'[Entry] - Initial-Load-Data',
            payload: data
        })    
    }

    useEffect(() => {
        refreshEntries();
    }, [])
    

  return (
    <EntriesContext.Provider value={{
        ...state,

        //Method
        addNewEntry,
        updateEntry,
    }}>

        {children}
    </EntriesContext.Provider>
  )
}

export default EntriesProvider