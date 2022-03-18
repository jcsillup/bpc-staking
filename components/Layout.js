import Navbar from './Navbar'
import Footer from './Footer'
import Head from '../components/Head'
import Link from 'next/link'

export default function Layout({children}) {
    return(
        <div className="min-h-screen bg-red-100 relative pb-64">
            <main>
                {children}
            </main>
            <footer className="absolute bottom-24 right-0 left-0 text-center">
                <img src="/logo.png" className="w-12 mx-auto mb-4" />
                <p className="font-bold text-gray-800">&copy; Big Picture Coin</p>
                <Link href="/terms-and-conditions"><a className="text-sm font-medium hover:opacity-70">Please read our Terms and Conditions</a></Link>
            </footer>
        </div>
    )
}