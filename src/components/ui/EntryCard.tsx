import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { DragEvent, useContext } from 'react'
import { UIContext } from '../../context/ui'
import { IEntry } from '../../interfaces'
import { dateDistace } from '../../utils/dateFunctions'

interface Props {
  entry: IEntry
}

export const EntryCard = ({entry}: Props) => {

  const {startDragging, endDragging} = useContext(UIContext)

  const router = useRouter()


  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', entry._id!)

    startDragging();
  }

  const onDragEnd = (event: DragEvent<HTMLDivElement>) =>{
    endDragging();
  }

  const onClick = () => {
    router.push(`/entry/${entry._id}`)
  }

  return (
    <Card 
      sx={{marginBottom: 1}} 
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    >
          <CardActionArea>
            <CardContent>
              <Typography sx={{whiteSpace: 'pre-line'}}>{entry.description}</Typography>
            </CardContent>
          
            <CardActions sx={{display: 'flex', justifyContent:'end', paddingRight: 2}}>
              <Typography variant='body2'>{dateDistace(entry.createdAt)}</Typography>
            </CardActions>
          </CardActionArea>
    </Card>
  )
}
