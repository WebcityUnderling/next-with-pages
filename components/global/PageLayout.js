import Head from 'next/head';
import Link from 'next/link'
import {useTranslations} from 'next-intl';
import styles from '@/styles/Home.module.css'
import LocaleSwitcher from '@/components/global/LocaleSwitcher';
import { useRouter } from 'next/router';

export default function PageLayout({children, meta}) {
  const t = useTranslations();

  const title = meta?.title ? meta.title : t('global.fallback_meta.title');
  const description = meta?.description ? meta.description : t('global.fallback_meta.description');
  const image  = meta?.image ? meta.image : t('global.fallback_meta.image');
  const twitterCard = meta?.twitterCard ? meta.twitterCard : "summary_large_image"

  // locale metadata configuration
  const {locale, locales, defaultLocale, domainLocales, asPath} = useRouter();
  let availableLocales = domainLocales;
  const defaultDomain = domainLocales.find(l => l.defaultLocale == (meta?.locales ? meta.locales[0] : defaultLocale)).domain;
  const canonicalDomain = domainLocales.find(l => l.defaultLocale == locale).domain;
  
  if (meta.locales) {
    availableLocales = domainLocales.filter(l => meta.locales.includes(l.defaultLocale));
  }

  return (
    <>
      <Head>
        {/* Title Meta */}
        <title>{title}</title>
        <meta property="og:title" content={title}/>
        <meta name="twitter:title" content={title}/>

        {/* Description Meta */}
        <meta name="description" content={description}/>
        <meta name="twitter:description" content={description}/>
        <meta property="og:description" content={description}/>
        
        {/* Image Meta */}
        <meta name="twitter:image" content={`http://localhost:3000${image}`}/>
        <meta property="og:image" content={`http://localhost:3000${image}`}/>

        {/* Other Meta */}
        <meta name="twitter:card" content={twitterCard}/>

        {/* Relative Links */}
        <meta property="og:locale" content={locale}/>
        <link rel="alternate" href={`${defaultDomain}${asPath}`} hrefLang="x-default"/>
        <link rel="canonical" href={`${canonicalDomain}${asPath}`}/>
        {availableLocales.map((l, index) => (
          <link key={index} rel="alternate" href={`${l.domain}${asPath}`} hrefLang={l.defaultLocale}/>
        ))}

      </Head>
      <header>
        <div className='container'>
          <nav>
            
            <ul>
              <li><Link href="/">{t('global.nav.home')}</Link></li>
              <li><Link href="/about">{t('global.nav.about')}</Link></li>
              <li><Link href="/about/team">{t('global.nav.team')}</Link></li>
              <li><Link href="/careers">{t('global.nav.careers')}</Link></li>
            </ul>
          </nav>
          <LocaleSwitcher/>
        </div>
      </header>
      <main className={`${styles.main}`}>
        {children}
      </main>
    </>
  );
}
