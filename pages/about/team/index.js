import PageLayout from "@/components/global/PageLayout";
import { completeMessagesTree } from "@/utils/i18n";
import PersonCard from "@/components/pages/team/PersonCard";
import { useTranslations } from "next-intl";
import team from '@/datasets/team.js'
import styles from '@/styles/pages/team.module.css'

team.sort((a, b) => {
    return b.yearsAtCompany - a.yearsAtCompany;
}) //sort team by yearsAtCompany descending

export async function getStaticProps({ locale }) {
  const messages = await completeMessagesTree(locale, 'about');
  return {
    props: {
      messages,
      team
    },
  };
}

export default function Team({team}) {
  const t = useTranslations()
  
  const meta = {
    title: t('about.team.meta.title'),
    description: t('about.team.meta.description'),
    locales: ['en-US']
  }

  return (
    <PageLayout meta={meta}>
      <div className="container">
          <div className='copy-block'>
            <div className={styles["team-members"]}>
              {team.map((person, index) => {
                return <PersonCard key={index} person={person} />;
              })}
            </div>
          </div>
      </div>
    </PageLayout>
  );
}
