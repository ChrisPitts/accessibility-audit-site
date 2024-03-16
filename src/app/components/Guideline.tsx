import React from 'react';

export default function Guideline({
	guideline,
	guidelineNumber,
	principleNumber,
}: {
	guideline: { title: string; description: string };
	guidelineNumber: string;
	principleNumber: number;
}) {
	return (
		<>
			<h3 className='text-lg font-semibold underline'>
				{principleNumber}.{guidelineNumber} {guideline.title}
			</h3>
			<p>{guideline.description}</p>
		</>
	);
}
