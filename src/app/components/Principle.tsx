// import React, { useState } from 'react';
import Guideline from './Guideline';
import { getPrincipleAudits } from '../api/db';

export default async function Principle({
	principle,
	principleNumber,
	username,
}: {
	principle: { title: string; description: string; guidelines: any };
	principleNumber: number;
	username: string;
}) {
	const audits: any = await getPrincipleAudits(username, principleNumber);

	let passedAudits = 0;
	for (let i = 0; i < audits.length; i++) {
		if (audits[i].pass) passedAudits++;
	}

	const ratio = audits.length > 0 ? passedAudits / audits.length : 0;

	// const [expanded, setExpanded] = useState(false);

	let circleColor = ratio === 1 ? 'green' : ratio > 0.6 ? 'yellow' : 'red';

	return (
		<>
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
		</>
	);
}
