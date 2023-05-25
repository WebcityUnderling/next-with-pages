import PageLayout from '@/components/global/PageLayout';

import { completeMessagesTree } from '@/utils/i18n'
import {useTranslations} from 'next-intl';

export async function getStaticProps({locale}) {
  const messages = await completeMessagesTree(locale, 'careers');
  return {
    props: {
      messages,
    }
  };
}

export default function Careers() {
  const t = useTranslations();
  const meta = {
    title: t('careers.meta.title'),
    description: t('careers.meta.description')
  }

  return (
    <PageLayout meta={meta}>
      <h1>{ t('careers.title') }</h1>
      <p>{ t('careers.description') }</p>
    </PageLayout>
  )
}