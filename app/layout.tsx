import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';
import Footer from '@/components/footer';
import NavBar from '@/components/navbar';
import ModalProvider from '@/providers/modal-provider';
import ToastProvider from '@/providers/toast-provider';
import { ThemeProvider } from '@/providers/theme-provider';

const urbanist = Urbanist({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Store',
    description: 'Store',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={urbanist.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <ToastProvider />
                    <ModalProvider />
                    <NavBar />
                    {children}
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
