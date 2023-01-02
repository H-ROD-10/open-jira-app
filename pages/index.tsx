
import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import { EntriesList, Layout, NewEntrie } from '../src/components'




export default function Home() {
 
  return (
    <Layout title='Home-OpenJira'>
      
      <Grid container spacing={2}>

        <Grid item xs={12} sm={4}>
          <Card sx={{height:'calc(100vh - 100px)'}}>
            <CardHeader title='Pendientes'/>
            <NewEntrie/>
            <CardContent>    
              <EntriesList status='pending'/>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{height:'calc(100vh - 100px)'}}>
            <CardHeader title='En Progreso'/>
            <CardContent>
              <EntriesList status='in-progress'/>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{height:'calc(100vh - 100px)'}}>
            <CardHeader title='Completadas'/>
            <CardContent>
              <EntriesList status='finished'/>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
      
    </Layout>
  )
}
