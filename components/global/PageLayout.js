import Head from 'next/head';
import Link from 'next/link'
import {useTranslations} from 'next-intl';
import styles from '@/styles/Home.module.css'
import LocaleSwitcher from '@/components/global/LocaleSwitcher';

export default function PageLayout({children, meta}) {
  const t = useTranslations();

  // 
  const title = meta?.title ? meta.title : t('global.fallback_meta.title');
  const description = meta?.description ? meta.description : t('global.fallback_meta.description');
  const image  = meta?.image ? meta.image : t('global.fallback_meta.image');

  const twitterCard = meta?.twitterCard ? meta.twitterCard : "summary_large_image"

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
      <footer>
        <p>I am the footer</p>
      </footer>
    </>
  );
}
