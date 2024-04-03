import { Audit } from '@prisma/client';
import Dropdown from './Dropdown';
import { randomUUID } from 'crypto';

type WcagSection = {
    level: string;
    title: string;
    description: string;
    link: string;
}

export default function AuditView({ audit, wcagSection }: { audit: Audit, wcagSection: WcagSection })
{
    const auditViewHeader = <h5>{`${audit.principle}.${audit.guideline}.${audit.section} ${wcagSection.title} - Level ${audit.level}`}</h5>

    const auditViewBody = (<div className='ml-4'>
        <p><h6 className=' inline font-bold'>Rule Description: </h6> {wcagSection.description}</p>
        <h6 className='font-bold underline'>Failed Pages</h6>
        {audit.failure_pages.split(' ').map(url =>
        {
            return <a className='block underline ml-4' target='_blank' href={url}>{url}</a>;
        })}
        <p><h6 className='inline font-bold'>Notes:</h6> {audit.notes}</p>
        <a className='p-2 inline-block border-2 rounded-lg border-solid' target='_blank' href={wcagSection.link}><h6>Read More About { `${audit.principle}.${audit.guideline}.${audit.section}` }</h6></a>
    </div>)

    return <Dropdown headerContent={auditViewHeader} bodyContent={auditViewBody} classList='border-2 rounded-lg my-1' key={parseInt(randomUUID())} arrowIsLight={false}/>
}
