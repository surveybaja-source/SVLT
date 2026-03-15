export const metadata = {
  title: 'SurveyLink',
  description: 'Marine Cargo Survey Platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
