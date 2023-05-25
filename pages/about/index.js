import PageLayout from '@/components/global/PageLayout';
import {useTranslations} from 'next-intl';
import { completeMessagesTree } from '@/utils/i18n'


export async function getStaticProps({locale}) {
  const messages = await completeMessagesTree(locale, 'about');
  return {
    props: {
      messages
    }
  };
}

export default function About() {
  const t = useTranslations();
  return (
    <PageLayout>
      <h1>{ t('about.title') }</h1>
      <div dangerouslySetInnerHTML={{__html: t.raw('about.description')}}></div>
    </PageLayout>
  )
}
