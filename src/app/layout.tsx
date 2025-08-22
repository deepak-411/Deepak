import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: "Deepak Kumar Personal Profile",
  description: "The personal portfolio of Deepak Kumar, a passionate Software Engineer, Full-Stack Developer, and AI/ML Enthusiast specializing in creating innovative and impactful solutions.",
  keywords: ["Deepak Kumar", "Software Engineer", "Full-Stack Developer", "AI/ML Enthusiast", "React Developer", "Node.js", "Portfolio"],
  authors: [{ name: "Deepak Kumar" }],
  creator: "Deepak Kumar",
  openGraph: {
    type: "website",
    title: "Deepak Kumar Personal Profile",
    description: "The personal portfolio of Deepak Kumar, a passionate Software Engineer, Full-Stack Developer, and AI/ML Enthusiast.",
    siteName: "Deepak Kumar Portfolio",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Deepak Kumar - Software Engineer",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deepak Kumar Personal Profile",
    description: "The personal portfolio of Deepak Kumar, Software Engineer and AI/ML Enthusiast.",
    images: ["/og-image.png"], 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
        
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
