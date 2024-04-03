import { Audit } from '@prisma/client';
import Dropdown from './Dropdown';
import Wcag from '../app/wcag.json';
import AuditView from './AuditView';

export default function AuditList({
	principle,
	audits,
}: {
	principle: number;
	audits: Audit[];
}) {
	let failedDropdownHeader = <h3>Failed</h3>;
	let passedDropdownHeader = <h3>Passed</h3>;

	let passedAudits: Audit[] = [];
	let failedAudits: Audit[] = [];

	audits.forEach((audit) => {
		if (audit.pass) passedAudits.push(audit);
		else failedAudits.push(audit);
	});

	console.log('Passed Audits', passedAudits);
	console.log('Failed Audits', failedAudits);

	return (
		<>
			<Dropdown
				headerContent={failedDropdownHeader}
				bodyContent={
					<BodyContent principle={principle} audits={failedAudits} />
				}
				classList='border-2 my-2 rounded-lg'
				key={0}
				arrowIsLight={false}
			/>
			<Dropdown
				headerContent={passedDropdownHeader}
				bodyContent={
					<BodyContent principle={principle} audits={passedAudits} />
				}
				classList='border-2 my-2 rounded-lg'
				key={0}
				arrowIsLight={false}
			/>
		</>
	);
}

function BodyContent({
	principle,
	audits,
}: {
	principle: number;
	audits: Audit[];
}) {
	// console.log(audits);
	return (
		<>
			{Object.entries(
				Wcag.principles[principle as unknown as keyof typeof Wcag.principles]
					.guidelines
			).map(([key, guideline]) => {
				if (audits.length === 0 || audits[0].guideline != parseInt(key)) return;

				return (
					<>
						<div>
                            <h4 className='font-black underline'>{`${key} ${guideline.title}`}</h4>
                            <p>{ guideline.description }</p>
						</div>

						{Object.entries(guideline.sections).map(([key, section]) => {
							if (audits.length === 0) return;
							if (audits[0].section === parseInt(key)) {
								// console.log('Length before:', audits.length);
								let audit = audits.shift();
								// console.log('Length after:', audits.length);
								return (
									<div className='px-2'>
										<AuditView audit={audit as Audit} wcagSection={section} />
									</div>
								);
							}

							return <></>;
						})}
					</>
				);
			})}
		</>
	);
}
