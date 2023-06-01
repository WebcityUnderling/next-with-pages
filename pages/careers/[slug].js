import PageLayout from '@/components/global/PageLayout';
import { completeMessagesTree } from '@/utils/i18n'
import fido from '@/utils/fido';

  
export const getServerSideProps = async ({params, locale}) => {
    const { data } = await fido.get(`https://api.savage.si/employment/positions/${params.slug}`)
    if (!data.id) return { notFound: true } 
    
    const messages = await completeMessagesTree(locale);
    return {
        props: {
            locale,
            messages,
            position: data
        }
    }
}

export default function Position({position}) {
  return (
    <>
    <PageLayout>
        <div className='container'>
            <div className='copy-block'>
                <span>{position.category}</span>
                <h1>{position.title}</h1>
                <p>{position.tagline}</p>
                <div>
                    <h2>This position is:</h2>
                    <ul>
                        <li>{position.position_type}</li>
                        <li>{`Located in ${position.location}`}</li>
                    </ul>
                </div>
            </div>
        </div>
    </PageLayout>
    </>
  )
}