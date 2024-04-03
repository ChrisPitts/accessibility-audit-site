import { Audit } from '@prisma/client';
import Dropdown from './Dropdown';
import AuditList from './AuditList';

export default function Principle({
	principle,
	principleNumber,
	audits,
}: {
	principle: { title: string; description: string; guidelines: any };
	principleNumber: number;
	audits: Audit[];
}) {
	let passedAudits = [];
	let failedAudits = [];
	for (let i = 0; i < audits.length; i++) {
		if (audits[i].pass) passedAudits.push(audits[i]);
		else failedAudits.push(audits[i]);
	}

	const ratio = audits.length > 0 ? passedAudits.length / audits.length : 0;

	let circleColor = ratio === 1 ? 'green' : ratio > 0.6 ? 'yellow' : 'red';

	const headerContent = (
		<div className='flex justify-between items-center w-full'>
			<div>
				<h2 className='text-lg font-extrabold'>
					Principle {principleNumber}: {principle.title}
				</h2>
				<p>{principle.description}</p>
			</div>

			<span
				className='audit-circle m-4'
				style={
					{
						'--data-progress': ratio,
						'--data-color': circleColor,
					} as React.CSSProperties
				}
			>
				{passedAudits.length}/{audits.length}
			</span>
		</div>
	);

	const bodyContent = <AuditList principle={principleNumber} audits={audits} />;

	return (
		<>
			<Dropdown
				classList='principle-container'
				headerContent={headerContent}
				bodyContent={bodyContent}
				key={principleNumber}
				arrowIsLight={true}
			/>
		</>
	);
}
