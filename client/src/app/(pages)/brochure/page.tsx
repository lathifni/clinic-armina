import { NextPage } from 'next'
import Image from 'next/image'

interface Props {}

const Brochure: NextPage<Props> = ({}) => {
  return <section className='container py-16'>
    <Image src="https://www.its.ac.id/wp-content/uploads/2023/08/brosur-FKK-b.jpeg" alt="Brochure " height={1500} width={1500} className='w-full rounded-3xl'/>
  </section>
}

export default Brochure