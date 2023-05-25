import PageLayout from "@/components/global/PageLayout";
import { completeMessagesTree } from "@/utils/i18n";

export async function getStaticProps({ locale }) {
  const messages = await completeMessagesTree(locale);
  return {
    props: {
      messages,
    },
  };
}

export default function TeamMember() {
  return (
    <PageLayout>
        <h1>Team Member</h1>
    </PageLayout>
  )
}


