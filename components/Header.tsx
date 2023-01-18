import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = () => {

    const router = useRouter();
    const isActive: (pathname: string) => boolean = (pathname) =>
        router.pathname === pathname;

    const { data: session } = useSession()

    return (
        <div className="fixed top-0 z-50 w-full bg-gray-100 flex justify-between items-center py-3 px-10 border-b-[1px] border-slate-200">
            <div className='flex items-end'>
                <h1 className="text-xl font-medium text-slate-500">Midwit Memes</h1>
                <a href="https://www.twitter.com/alexalbertt" className="text-xs text-slate-500 hover:text-slate-800 ml-2">
                by @alexalbertt <FontAwesomeIcon icon={faTwitter} size="1x" style={{color: "#1DA1F2" }}/> 
                </a>
            </div>
            <div>
                {session ? <div className="flex items-center">
                <h1 className='text-slate-500 mr-2'>Hi, {session.user?.name?.split(" ")[0]}</h1>
                <button onClick={() => signOut()} className="border border-slate-500 rounded p-1 text-slate-500 hover:text-slate-800">Sign out</button>
            </div> : <button className="border border-slate-500 rounded p-1 text-slate-500 hover:text-slate-800" onClick={() => signIn()}>Sign in</button>}
                
            </div>
        </div>
    )
}

export default Header