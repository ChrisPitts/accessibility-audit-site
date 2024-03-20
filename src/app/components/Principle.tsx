'use client';
import { useState } from 'react';
import Guideline from './Guideline';
import { Audit } from '@prisma/client';

export default function Principle({
	principle,
	principleNumber,
	username,
	audits,
}: {
	principle: { title: string; description: string; guidelines: any };
	principleNumber: number;
	username: string;
	audits: Audit[];
}) {
	// console.log(`Principle ${principleNumber}`, audits)
	let passedAudits = 0;
	for (let i = 0; i < audits.length; i++) {
		if (audits[i].pass) passedAudits++;
	}

	const ratio = audits.length > 0 ? passedAudits / audits.length : 0;

	const [expanded, setExpanded] = useState(false);

	let toggleExpand = () => {
		console.log(!expanded);
		setExpanded(!expanded);
	};

	let circleColor = ratio === 1 ? 'green' : ratio > 0.6 ? 'yellow' : 'red';

	return (
		<>
			<button className='block w-full' onClick={toggleExpand}>
				<div className='dropdown-container'>
					<div className='container-top'>
						<h2 className='text-lg font-extrabold'>
							Principle {principleNumber}: {principle.title}
						</h2>
						<p>
							Passed:
							<span
								className='audit-circle m-4'
								style={
									{
										'--data-progress': ratio,
										'--data-color': circleColor,
									} as React.CSSProperties
								}
							>
								{passedAudits}/{audits.length}
							</span>
						</p>
					</div>

					<p>{principle.description}</p>
				</div>
			</button>
			<div className={expanded ? '' : 'hidden'}>
				{Object.entries(principle.guidelines).map(
					([key, value]: [key: string, value: any]) => {
						return (
							<Guideline
								guideline={value}
								guidelineNumber={key}
								principleNumber={principleNumber}
							/>
						);
					}
				)}
			</div>
		</>
	);
}
