'use client';
import { useState } from 'react';
import Guideline from './Guideline';
import { Audit } from '@prisma/client';
import Dropdown from './Dropdown';

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

	const headerContent = (
		<div className='flex justify-between items-center'>
			<div>
				<h2 className='text-lg font-extrabold'>
					Principle {principleNumber}: {principle.title}
				</h2>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde hic
					numquam consequuntur quos. Inventore nostrum, delectus neque ullam
					mollitia eaque sint aliquam exercitationem laboriosam, magni laborum
					soluta totam nam harum nisi molestiae ex quibusdam commodi. Doloremque
					sunt cumque animi sapiente neque aliquid vel reprehenderit dolorum
					sint debitis! Qui, quae perferendis?
				</p>
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
				{passedAudits}/{audits.length}
			</span>
		</div>
	);

	const bodyContent = (
		<>
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


	return (
		<>
			<Dropdown
				classList='principle-container'
				headerContent={headerContent}
				bodyContent={bodyContent}
				key={principleNumber}
			/>
			
		</>
	);
}
