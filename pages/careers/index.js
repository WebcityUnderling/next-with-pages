import PageLayout from '@/components/global/PageLayout';
import { completeMessagesTree } from '@/utils/i18n'
import {useTranslations} from 'next-intl';
import CareersList from '@/components/pages/careers/CareersList';

export async function getServerSideProps({locale}) {
  const messages = await completeMessagesTree(locale, 'careers');
  
  if (locale != 'en-US') return {redirect: {permanent: true, destination: '/careers', params: {locale: 'en-US'} }}
  return {
    props: {
      locale,
      messages,   
    }
  };
}

export default function Careers({locale}) {
  const t = useTranslations();
  
  const meta = {
    title: t('careers.meta.title'),
    description: t('careers.meta.description')
  }

  return (
    <>
      <PageLayout meta={meta}>
        <div className="container">
          <div className='copy-block'>
            <h1>{ t('careers.title') }</h1>
            <p>{ t('careers.description') }</p>
          </div>
          <CareersList/>
        </div>
      </PageLayout>
    </>
  )
}