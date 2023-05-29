import Link from 'next/link'
import styles from "@/styles/components/personcard.module.css"

//component to render a person card
const PersonCard = ({person}) => {
    const initials = person.name.split(' ').map((word) => word[0]).join('');
    return (
    <Link href={`/about/team/${person.slug}`} className={`${styles[person.team.toLowerCase()]} ${styles["person-card"]}`}>
        <div className={styles["avatar"]}>
            <span>{initials}</span>
        </div>
        <div className={styles["info"]}>
            <h3 className={styles["name"]}>{person.name}</h3>
            <p className={styles["position"]}>{person.position}</p>
        </div>
    </Link>
  )
}

export default PersonCard