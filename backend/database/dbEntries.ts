import { isValidObjectId } from "mongoose"
import { db } from "./"
import { BEntry, Entry } from "./models"

export const getEntryById = async (id: string): Promise<BEntry | null> => {
    if(!isValidObjectId(id)){
        return null
    }

    await db.connect()
    const entry = await Entry.findById(id).lean();
    await db.disconnect()

    return JSON.parse(JSON.stringify(entry))
}