import React, { ChangeEvent, useContext, useMemo, useState } from 'react'
import { GetServerSideProps } from 'next'
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from '@mui/material';
import { Layout } from '../../src/components';
import SaveIcon from '@mui/icons-material/Save';
import {IEntry, StatusEntry} from '../../src/interfaces/index'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { isValidObjectId } from 'mongoose';
import { dbEntries } from '../../backend/database';
import { EntriesContext } from '../../src/context/entries';
import { useRouter } from 'next/router';
import { dateDistace } from '../../src/utils/dateFunctions';

const validStatus: StatusEntry[] = ['pending', 'in-progress', 'finished']

interface IPropsEntryPage{
    entry: IEntry
}

const EntryPage = ({entry}: IPropsEntryPage) => {

    const [inputValue, setInputValue] = useState(entry.description)

    const [status, setStatus] = useState<StatusEntry>(entry.status)
    const [touched, setTouched] = useState(false)

    const {updateEntry} = useContext(EntriesContext)

    const router = useRouter()

    const isNotValidForm = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) =>{
        setInputValue(event.target.value)
      }
      const onClicked = () =>{
        if(inputValue.trim().length === 0) return;

        const newEntry: IEntry = {
            ...entry,
            status, 
            description: inputValue
        }

        updateEntry(newEntry)

        router.push('/')
      }
      

      const onStatusChange = (event: ChangeEvent<HTMLInputElement>) =>{
        setStatus(event.target.value as StatusEntry)
      }
  return (
    <Layout title={inputValue.substring(0,20) + '....'}>
        <Grid 
            container
            justifyContent={'center'}
            sx={{ marginTop: 2 }}
        >
            <Grid item xs={12} sm={8} md={6}>
                <Card>
                    <CardHeader
                        title={`Entrada: `}
                        subheader={`Creada hace: ${dateDistace(entry.createdAt)}`}
                    >
                    </CardHeader>
                    <CardContent>
                        <TextField
                            sx={{marginTop: 2, marginBottom: 1}}
                            fullWidth
                            placeholder='Nueva tarea'
                            autoFocus
                            multiline
                            label='Nueva tarea'
                            value={inputValue}
                            onChange={onInputChange}
                            helperText={isNotValidForm && 'Ingrese un texto valido'}
                            onBlur={() => setTouched(true)}
                            error={isNotValidForm}
                        />
                        <FormControl>
                            <FormLabel id="controlled-radio-buttons-group">Estado</FormLabel>
                            <RadioGroup
                                row
                                value={status}
                                onChange={onStatusChange}
                                name="controlled-radio-buttons-group"
                            >
                                {
                                    validStatus.map((option) =>(
                                        <FormControlLabel key={option} value={option} control={<Radio />} label={capitalize(option)} />

                                        
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Button
                            startIcon={<SaveIcon/>}
                            variant='outlined'
                            fullWidth
                            onClick={onClicked}
                            disabled={inputValue.length <= 0 }
                        >
                            Guardar
                        </Button>
                    </CardActions>

                    
                </Card>
            </Grid>

        </Grid>
        <IconButton 
            sx={{
                position:'fixed',
                bottom: 30,
                right: 30,
                backgroundColor: 'red'
            }}
        >
             <DeleteOutlineOutlinedIcon/>                   
        </IconButton>
    </Layout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async (ctx) => {
   
    const {id} = ctx.params as {id: string}

    const entry = await dbEntries.getEntryById(id)

    if(!entry){
        return{
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
          entry  
        }
    }
}


export default EntryPage;