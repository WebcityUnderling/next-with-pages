import PageLayout from "@/components/global/PageLayout";
import { completeMessagesTree } from "@/utils/i18n";

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          slug: 'next.js',
        },
      }, // See the "paths" section below
    ],
    fallback: true, // false or "blocking"
  };
};

export async function getStaticProps({ locale }) {
  const messages = await completeMessagesTree(locale);
  return {
    props: {
      messages,
    },
  };
}


export default function TeamMember({messages}) {
  return (
    <PageLayout>
        <h1>Team Member</h1>
        <p>Here, I will attempt to use the api to set the team member before you get to the page using the api</p>
        <p>Storing the team members data in a redux store.</p>
        <p>The fetch the data as part of the static props to be loaded onto the page.</p>
        <p>A weird thing to do, but should be interesting :)</p>
    </PageLayout>
  )
}


