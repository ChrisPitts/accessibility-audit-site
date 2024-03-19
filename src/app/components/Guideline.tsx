import React from 'react';
import Section from './Section';

export default function Guideline({
	guideline,
	guidelineNumber,
	principleNumber,
}: {
	guideline: { title: string; description: string; sections: {} };
	guidelineNumber: string;
	principleNumber: number;
}) {
	return (
		<>
			<h3 className='text-lg font-semibold underline'>
				{principleNumber}.{guidelineNumber} {guideline.title}
			</h3>
			<p>{guideline.description}</p>
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
		</>
	);
}
