import PageLayout from '@/components/global/PageLayout';
import { useRouter } from 'next/router';
// import { usePathname } from 'next-intl/client';
import { completeMessagesTree } from '@/utils/i18n'
import {useTranslations} from 'next-intl';
import { useEffect } from 'react';

export async function getStaticProps({locale}) {
  
  const messages = await completeMessagesTree(locale, 'careers');
   
  return {
    props: {
      locale,
      messages,
    }
  };
}

export default function Careers({locale}) {
  const router = useRouter();
  const t = useTranslations();
  
  //redirect if page is not available in the locale
  useEffect(() => {
    if (locale != 'en-US') {
      router.push(router.asPath, router.asPath, {locale: 'en-US'});
    }
  }) 
  
  const meta = {
    title: t('careers.meta.title'),
    description: t('careers.meta.description')
  }

  return (
    <>
    {/* don't display page until rediect has happened. */}
    {locale === 'en-US' &&
      <PageLayout meta={meta}>
        <div className="container">
          <div className='copy-block'>
            <h1>{ t('careers.title') }</h1>
            <p>{ t('careers.description') }</p>
          </div>
        </div>
      </PageLayout>
    }
    </>
  )
}