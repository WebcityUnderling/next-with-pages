import PageLayout from '@/components/global/PageLayout';

import { completeMessagesTree } from '@/utils/i18n'
import {useTranslations} from 'next-intl';

export async function getStaticProps({locale}) {
  const messages = await completeMessagesTree(locale, 'home');
  return {
    props: {
      messages,
    }
  };
}

export default function Careers() {
  const t = useTranslations();
  const meta = {
    title: t('home.meta.title'),
    description: t('home.meta.description')
  }

  return (
    <PageLayout meta={meta}>
      <h1>{ t('home.title') }</h1>
      <p>{ t('home.description') }</p>
    </PageLayout>
  )
}