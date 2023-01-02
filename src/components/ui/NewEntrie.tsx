import { ChangeEvent, useState, useContext } from 'react'
import { Button, TextField } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Box } from '@mui/system';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';


export const NewEntrie = () => {

  
  const [inputValue, setInputValue] = useState('')
  const [touched, setTouched] = useState(false)

  const {addNewEntry} = useContext(EntriesContext)

  const {setIsAddingEntry, isAdding} = useContext(UIContext)


  const onTextChange = (event: ChangeEvent<HTMLInputElement>) =>{
    setInputValue(event.target.value)
  }

  const onSaved = () =>{
    if(inputValue.length <= 0) return;

    addNewEntry(inputValue)
    setIsAddingEntry(false);
    setTouched(false);
    setInputValue('');
  }


  return (
    <Box sx={{marginBottom: 2, paddingX: 2}}>
      
      {
        isAdding ? (
          <>
            <TextField 
              fullWidth
              sx={{marginTop: 2, marginBottom: 1 }}
              placeholder='Nueva Tarea'
              autoFocus
              multiline
              label='Agrega una Tarea'
              helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
              error={inputValue.length <= 0 && touched}
              value={inputValue}
              onChange={onTextChange}
              onBlur={() => setTouched(true)}
            />

            <Box display={'flex'} justifyContent={'space-between'} marginTop={2}>
              <Button
                variant='outlined'
                color='secondary'
                endIcon={<SaveOutlinedIcon/>}
                onClick={onSaved}
              >
                Guardar
              </Button>
            
              <Button
                variant='text'
                color='secondary'
                onClick={() => setIsAddingEntry(false)}
              >
                Cancelar
              </Button>
            </Box>
          </>
        ):(
          <Button 
            startIcon={<AddCircleOutlineOutlinedIcon/>}
            variant='outlined'
            color='secondary'
            fullWidth
            onClick={() => setIsAddingEntry(true)}
          >
            Agregar Tarea
          </Button>
        )
      }
      
    </Box>
  )
}
