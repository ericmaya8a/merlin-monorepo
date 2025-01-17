import { Geist, Geist_Mono } from 'next/font/google';

import { Providers } from '@/components/providers';
import '@workspace/ui/globals.css';
import type { Metadata } from 'next';

const fontSans = Geist({
	subsets: ['latin'],
	variable: '--font-sans',
});

const fontMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
});

export const metadata: Metadata = {
	title: {
		default: 'Merlin Ticket PoC',
		template: '%s | Merlin Ticket',
	},
	description: 'Ticket flow PoC',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}>
				<Providers>
					<main className="min-h-screen font-[family-name:var(--font-geist-sans)]">{children}</main>
				</Providers>
			</body>
		</html>
	);
}
