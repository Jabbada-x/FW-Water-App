import './globals.css';
import 'leaflet/dist/leaflet.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FW Water App',
  description: 'Einsatzhilfe zur schnellen Ermittlung von Wasserentnahmestellen'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
