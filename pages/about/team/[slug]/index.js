import PageLayout from "@/components/global/PageLayout";
import { completeMessagesTree } from "@/utils/i18n";
import styles from '@/styles/employee.module.css'
import fido from '@/utils/fido'

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

export async function getStaticProps({ locale, params }) {
  const messages = await completeMessagesTree(locale);
  const { data } = await fido.get(`http://localhost:3000/api/teammember?slug=${params.slug}`, params)

  return {
    props: {
      messages,
      employee: data ?? {}
    },
  };
}

export default function TeamMember({employee}) {
  let blurb = ""
  switch(employee.team) {
    case 'Product' :
      blurb = "[Employee Name] is a valuable member of our Product Department at [Company Name]. With a passion for innovation and a keen eye for detail, [he/she] plays a crucial role in shaping the development of our groundbreaking iPad apps. [He/She] brings a wealth of experience in product management and a deep understanding of user needs, allowing [him/her] to contribute to the creation of user-centric and intuitive app experiences. [Employee Name] thrives in collaborative environments, working closely with cross-functional teams to translate ideas into actionable plans and drive projects forward. With a commitment to delivering excellence, [he/she] continues to push the boundaries of what's possible, ensuring that our apps remain at the forefront of the industry."
      break;
    case 'Marketing' :
      blurb = "[Employee Name] is a key member of our Marketing Department at [Company Name]. With a creative mindset and a strategic approach, [he/she] spearheads our marketing initiatives to build brand awareness and drive customer engagement. Leveraging [his/her] expertise in digital marketing and communication, [he/she] develops and implements effective marketing campaigns, captivating content, and impactful strategies. [Employee Name] possesses a deep understanding of target audiences and market trends, allowing [him/her] to craft compelling messages that resonate with our customers. Through [his/her] innovative ideas and collaborative nature, [he/she] consistently delivers measurable results, helping to elevate our brand and achieve our marketing objectives."
      break;
    case 'Ops' : 
      blurb = "[Employee Name] is a valued member of our Ops Department at [Company Name]. With a meticulous and detail-oriented approach, [he/she] ensures the smooth operations and seamless execution of our projects. With a strong background in operations management, [he/she] oversees critical processes, resource allocation, and logistical coordination, optimizing efficiency and productivity. [Employee Name] thrives in fast-paced environments and demonstrates exceptional problem-solving skills, allowing [him/her] to address challenges proactively and ensure that our operations run seamlessly. [He/She] plays a vital role in enabling our team to deliver high-quality products and services to our customers."
      break; 
  }

  const meta = {
    title: `${employee.name} – App Company`,
  }

  const initials = employee.name.split(' ').map((word) => word[0]).join('');

  return (
    <PageLayout meta={meta}>
      <div className="container">
        <div className={`${styles["employee"]} ${styles[`employee--${employee.team.toLowerCase()}`]}`}>
          <aside className={styles["employee-page__sidebar"]}>
              <div className={styles["avatar"]}>
                <span>{initials}</span>
              </div>
              <ul className="employee-page__sidebar-data">
                <li><span>Team:</span> {employee.team}</li>
                <li><span>Position:</span> {employee.position}</li>
                <li><span>Time at company:</span> {employee.yearsAtCompany} years</li>
              </ul>
          </aside>
          <section>
            <div className={`${styles["employee-page__content"]} copy-block`}>
              <h1>{employee.name}</h1>
              <p>{blurb}</p>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  )
}


