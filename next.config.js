/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    // If you are modifying locales, you also need to update the i18n config file to match
    locales: ['en-US', 'es'],
    defaultLocale: 'en-US',
 
    domains: [
      {
        // Note: subdomains must be included in the domain value to be matched
        // e.g. www.example.com should be used if that is the expected hostname
        domain: 'http://localhost:3000',
        defaultLocale: 'en-US',
      },
      {
        domain: 'http://localhost:3000/es',
        defaultLocale: 'es',
        locales: ['es']
      },
    ],
  },
}

module.exports = nextConfig
