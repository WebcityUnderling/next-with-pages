import Link from 'next/link'

//component to render a person card
const PersonCard = ({person}) => {
    const initials = person.name.split(' ').map((word) => word[0]).join('');
    return (
    <Link href={`/about/team/${person.slug}`} className={`${person.team.toLowerCase()} person-card`}>
        <div className="avatar">
            <span>{initials}</span>
        </div>
        <div className="info">
            <h3 className="name">{person.name}</h3>
            <p className="position">{person.position}</p>
        </div>
    </Link>
  )
}

export default PersonCard