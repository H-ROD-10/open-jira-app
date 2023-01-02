import {DragEvent, useContext, useMemo} from 'react'
import { List, Paper, ListItem } from "@mui/material"
import { EntryCard } from "./EntryCard"
import { StatusEntry } from '../../interfaces/IEntry'
import { EntriesContext } from '../../context/entries'
import { UIContext } from '../../context/ui'

import styles from './EntriesList.module.css'

interface Props {
  status: StatusEntry
}


export const EntriesList = ({status}: Props) => {

  const {entries, updateEntry} = useContext(EntriesContext)
  const {isDragging, endDragging} = useContext(UIContext)

  const entriesByStatus = useMemo(() => entries.filter((entry)=> entry.status === status), [entries])
  
 

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }

  const onDropEntry = (event: DragEvent<HTMLDivElement>) =>{
    const id = event.dataTransfer.getData('text')
    
    const entry = entries.find(e => e._id === id)!;
    entry.status = status;
    updateEntry(entry);
    endDragging();

  }

  return (
    <div 
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging? styles.dragging : ''}
    >
        <Paper sx={{height: 'calc(100vh - 250px)', backgroundColor: 'transparent', overflowY: 'scroll' }}> {/**overflow: 'scroll', */}
            
            <List sx={{opcity: isDragging? 0.1 : 1, padding: 1, transition: 'all .3s'}}>
       
               {
                entriesByStatus.map((entry, i)=> (
                  
                    <EntryCard entry={entry} key={i}/>
                  
                ))
               }
            
            </List>
        </Paper>
    </div>
  )
}
