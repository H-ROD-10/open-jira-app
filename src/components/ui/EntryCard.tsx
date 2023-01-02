import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import React, { DragEvent, useContext } from 'react'
import { UIContext } from '../../context/ui'
import { IEntry } from '../../interfaces'

interface Props {
  entry: IEntry
}

export const EntryCard = ({entry}: Props) => {

  const {startDragging, endDragging} = useContext(UIContext)

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', entry._id!)

    startDragging();
  }

  const onDragEnd = (event: DragEvent<HTMLDivElement>) =>{
    endDragging();
  }

  return (
    <Card 
      sx={{marginBottom: 1}} 
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
          <CardActionArea>
            <CardContent>
              <Typography sx={{whiteSpace: 'pre-line'}}>{entry.description}</Typography>
            </CardContent>
          
            <CardActions sx={{display: 'flex', justifyContent:'end', paddingRight: 2}}>
              <Typography variant='body2'>{entry.createdAt}</Typography>
            </CardActions>
          </CardActionArea>
    </Card>
  )
}