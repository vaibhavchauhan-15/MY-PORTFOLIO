import '../styles/globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins, Roboto_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import BackToTopButton from '@/components/BackToTopButton';
import Script from 'next/script';

// Configure fonts
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins'
});

const robotoMono = Roboto_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vaibhavchauhan-portfolio.vercel.app'),
  title: 'Vaibhav Chauhan | Data Scientist & ML Engineer',
  description: 'Portfolio of Vaibhav Chauhan - Data Scientist and Machine Learning Engineer specializing in data analysis, visualization, and AI solutions',
  keywords: ['data science', 'machine learning', 'python', 'portfolio', 'Vaibhav Chauhan', 'AI'],
  authors: [{ name: 'Vaibhav Chauhan' }],
  creator: 'Vaibhav Chauhan',
  twitter: {
    card: 'summary_large_image',
    title: 'Vaibhav Chauhan | Data Scientist & ML Engineer',
    description: 'Experienced Data Scientist with expertise in Python, ML, and data visualization',
    images: ['/images/og-image.jpg'],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vaibhavchauhan-portfolio.vercel.app',
    title: 'Vaibhav Chauhan | Data Scientist & ML Engineer',
    description: 'Experienced Data Scientist with expertise in Python, ML, and data visualization',
    siteName: 'Vaibhav Chauhan Portfolio',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vaibhav Chauhan Portfolio',
      },
    ],
  },
  icons: {
    icon: '/images/logo.jpg',
    apple: '/images/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable} ${robotoMono.variable} scroll-smooth`}>
      <head>
        <Script id="dark-mode-script" strategy="beforeInteractive">
          {`
            (function() {
              // Check if theme is stored in localStorage
              const savedTheme = localStorage.getItem('theme');
              
              if (savedTheme === 'dark') {
                // Apply dark mode if explicitly set
                document.documentElement.classList.add('dark');
              } else if (savedTheme === 'light') {
                // Apply light mode if explicitly set
                document.documentElement.classList.remove('dark');
              } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                // Apply dark mode based on system preference if no explicit setting
                document.documentElement.classList.add('dark');
              }
            })();
          `}
        </Script>
        {/* Font Awesome for icons */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
        {/* Animate CSS for additional animations */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
        {/* Favicon tags */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`font-sans antialiased text-textDark dark:text-textLight bg-bgLight dark:bg-bgDark min-h-screen flex flex-col`}>
        {/* Background elements for visual appeal */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/5 to-accent1/5 rounded-bl-full filter blur-3xl opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-accent2/5 to-accent3/5 rounded-tr-full filter blur-3xl opacity-60"></div>
        </div>
        
        <Navbar />
        <main className="flex-grow relative z-10">
          {children}
        </main>
        
        {/* Back to top button as a client component */}
        <BackToTopButton />
      </body>
    </html>
  );
} 