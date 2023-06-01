import PageLayout from "@/components/global/PageLayout";
import { completeMessagesTree } from "@/utils/i18n";

import { useTranslations } from "next-intl";

export async function getServerSideProps({ locale }) {
  const messages = await completeMessagesTree(locale, "home");
  return {
    props: {
      messages,
    },
  };
}

export default function Home() {
  const t = useTranslations();
  const meta = {
    title: t("home.meta.title"),
    description: t("home.meta.description"),
    image: t("home.meta.image"),
  };

  return (
    <PageLayout meta={meta}>
      <div className="container">
        <div className="copy-block">
          <h1>{t("home.title")}</h1>
          <p>{t("home.description")}</p>
        </div>
      </div>
    </PageLayout>
  );
}
