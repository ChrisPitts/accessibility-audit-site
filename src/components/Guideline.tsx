import React, { useState } from 'react';
import Section from './Section';

export default function Guideline({
	guideline,
	guidelineNumber,
	principleNumber,
}: {
	guideline: { title: string; description: string; sections: {} };
	guidelineNumber: string;
	principleNumber: number;
	})
{
	const [expanded, setExpanded] = useState(false);
	let toggleExpand = () =>
	{
		setExpanded(!expanded);
	}
	
	return (
		<>
			<button className='block' onClick={toggleExpand}>
				<h3 className='text-lg font-bold underline'>
					{principleNumber}.{guidelineNumber} {guideline.title}
				</h3>
				<p>{guideline.description}</p>
			</button>
			<div className={expanded ? '' : 'hidden'} aria-expanded={expanded}>
				{Object.entries(guideline.sections).map(
					([key, value]: [key: string, value: any]) => {
						return (
							<Section
								section={value}
								sectionNumber={key}
								guidelineNumber={guidelineNumber}
								principleNumber={principleNumber}
							/>
						);
					}
				)}
			</div>
		</>
	);
}
