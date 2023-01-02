import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../backend/database'
import { BEntry, Entry } from '../../../backend/database/models'

type Data = 
    | {message: string}
    | BEntry

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    

    const {id} = req.query

    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({message:'El id no es valido'})
    }

    switch (req.method) {
        case 'PUT':
            return updateEntry(req, res)
        case 'GET':
            return getEntryById(req, res)

        default:
            return  res.status(400).json({ message: 'Endpoint no existe' })
    }


}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {id} = req.query

    if(!id){
        res.status(400).json({message: 'Error ID invalido'})
    }

   

    try {
        await db.connect()
        const entryByUpdate = await Entry.findById(id)
        const {description = entryByUpdate?.description, status = entryByUpdate?.status} = req.body
      
        const entry = await Entry.findByIdAndUpdate(id, {description, status}, {runValidators: true, new: true} )
        await db.disconnect()

        res.status(200).json(entry!)

    } catch (error: any) {
        console.log(error)
        await db.disconnect()
        res.status(400).json({message: error.errors.status.message})
    }

}

const getEntryById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {id} = req.query

    if(!id){
        res.status(400).json({message: 'Error ID invalido'})
    }

    try {
        await db.connect()
        const entryById = await Entry.findById(id)
        await db.disconnect()
        res.status(200).json(entryById!)
    } catch (error: any) {
        console.log(error)
        await db.disconnect()
        res.status(400).json({message: error.errors.status.message})
    }
}