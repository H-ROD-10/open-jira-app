import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

    if(request.nextUrl.pathname.startsWith('/api/entries/')){
        const id = request.nextUrl.pathname.replace('/api/entries/', '')
        const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

        if(!checkMongoIDRegExp.test(id)){
            const url = request.nextUrl.clone()

            url.pathname = '/api/bad-request';
            url.search= `?message=${id} is not valid MongoId`

            return NextResponse.rewrite(url)
        }
    }

   

    //console.log({req: request.nextUrl.pathname})

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        //'/api/:path', 
        '/api/:entries/:path*'
    ],
  }