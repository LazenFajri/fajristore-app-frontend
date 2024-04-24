import '@/styles/globals.css';
import { SessionProvider } from "next-auth/react";
import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { CartContextProvider } from '../lib/CartContext';
import Footer from './components/Footer';
import Header from './components/Header';

const inter = Poppins({
  subsets: ['latin'],
  weight: '500'
});

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return <>
  <SessionProvider session={session}>
    <CartContextProvider>
      <main className={`${inter.className} min-h-screen max-w-screen-2xl mx-auto bg-background sm:px-6`}>
        <Header />
        <div className="min-h-screen max-w-screen-2xl mx-auto">
        <Toaster position='top-center' />
        <Component {...pageProps} className="sm:mt-36" />
        </div>
        <Footer />
      </main>
    </CartContextProvider>
    </SessionProvider>
  </>
}
