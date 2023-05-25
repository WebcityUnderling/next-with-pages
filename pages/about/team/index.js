import PageLayout from "@/components/global/PageLayout";
import { completeMessagesTree } from "@/utils/i18n";
import PersonCard from "@/components/PersonCard";

let team = [
    {
        "name": "John Smith",
        "slug": "john-smith",
        "team": "Product",
        "position": "Product Manager",
        "yearsAtCompany": 5
    }, 
    {
        "name": "Maria Rodriguez",
        "slug": "maria-rodriguez",
        "team": "Marketing",
        "position": "Marketing Director",
        "yearsAtCompany": 3
    }, 
    {
        "name": "Peter Lee",
        "slug": "peter-lee",
        "team": "Ops",
        "position": "Operations Manager",
        "yearsAtCompany": 7
    }, 
    {
        "name": "Emma Brown",
        "slug": "emma-brown",
        "team": "Product",
        "position": "Product Designer",
        "yearsAtCompany": 2
    }, 
    {
        "name": "Alex Kim",
        "slug": "alex-kim",
        "team": "Marketing",
        "position": "Social Media Specialist",
        "yearsAtCompany": 1
    }, 
    {
        "name": "Sarah Chen",
        "slug": "sarah-chen",
        "team": "Ops",
        "position": "Customer Support Manager",
        "yearsAtCompany": 4
    }, 
    {
        "name": "David Hernandez",
        "slug": "david-hernandez",
        "team": "Product",
        "position": "Front-end Developer",
        "yearsAtCompany": 6
    }, 
    {
        "name": "Cynthia Nguyen",
        "slug": "cynthia-nguyen",
        "team": "Marketing",
        "position": "Content Writer",
        "yearsAtCompany": 8
    }, 
    {
        "name": "Tom Wilson",
        "slug": "tom-wilson",
        "team": "Ops",
        "position": "Logistics Coordinator",
        "yearsAtCompany": 9
    }, 
    {
        "name": "Jessica Kim",
        "slug": "jessica-kim",
        "team": "Product",
        "position": "Product Owner",
        "yearsAtCompany": 10
    }
];

team.sort((a, b) => {
    return b.yearsAtCompany - a.yearsAtCompany;
}) //sort team by yearsAtCompany descending

export async function getStaticProps({ locale }) {
  const messages = await completeMessagesTree(locale);
  return {
    props: {
      messages,
      team
    },
  };
}

export default function Team({team}) {
  return (
    <PageLayout>
      <div className="team-members">
        {team.map((person, index) => {
          return <PersonCard key={index} person={person} />;
        })}
      </div>
    </PageLayout>
  );
}
