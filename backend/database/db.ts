import mongoose from 'mongoose';

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

const mongoConection = {
    isConnected: 0

}

export const connect = async () =>{
    if(mongoConection.isConnected ){
        console.log('CONECTADOS')
        return;
    }

    if(mongoose.connections.length > 0){
        mongoConection.isConnected = mongoose.connections[0].readyState;
        if(mongoConection.isConnected === 1){
            console.log('usando conexion anterior')
            return;
        }

        await mongoose.disconnect()
    }

    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DATABASE as string || '');
    mongoConection.isConnected = 1;
    console.log('Conectado a mongoDB', process.env.DATABASE )
}

export const disconnect = async () => {

    if( process.env.NODE_ENV === 'development') return;

    if( mongoConection.isConnected === 0) return;

    
    await mongoose.disconnect();
    mongoConection.isConnected = 0;
    
    console.log('Desconectado de MongoDB')
}