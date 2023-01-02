import { IEntry } from "../../interfaces";
import { EntriesState } from "./EntriesProvider";

type EntriesActionsTypes = 
    | {type: '[Entry] - Addd-Entry', payload: IEntry }
    | {type: '[Entry] - Update-Entry', payload: IEntry }
    | {type: '[Entry] - Initial-Load-Data', payload: IEntry[] }
 


export const entriesReducer = (state: EntriesState, action: EntriesActionsTypes): EntriesState =>{
    switch (action.type) {
        case '[Entry] - Addd-Entry':
            return {
                ...state,
                entries: [...state.entries, action.payload]
            };
        case '[Entry] - Update-Entry':
            return{
                ...state,
                entries: state.entries.map((entry)=>{
                    if(entry._id === action.payload._id){
                        entry.status === action.payload.status;
                        entry.description === action.payload.description;
                    }
                    return entry
                })
            }
        case '[Entry] - Initial-Load-Data':
            return{
                ...state,
                entries: [...action.payload]
            }
    
        default:
           return state;
    }
}