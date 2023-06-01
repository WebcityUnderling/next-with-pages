import PageLayout from '@/components/global/PageLayout';
import { completeMessagesTree } from '@/utils/i18n'
import FormInput from '@/components/global/FormInput';
import fido from '@/utils/fido';

export const getServerSideProps = async ({locale}) => {
    const messages = await completeMessagesTree(locale)
    return {
        props: {
            locale, 
            messages
        }
    } 
}

export default function ContactPage() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('well... here we are')
    }

    return (
        <PageLayout>
            <div className='container'>
                <h1>Contact us</h1>
                <form onSubmit={handleSubmit}>
                    <FormInput test={() => handleSubmit}></FormInput>
                    <button class="btn" type="submit">Submit</button>
                </form>
            </div>
        </PageLayout>
    )
}