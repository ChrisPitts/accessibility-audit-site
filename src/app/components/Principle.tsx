import React from 'react';

export default function Principle({
	principle, index
}: {
        principle: { title: string; description: string; guidelines: any }
        index: number
}) {
	console.log(principle);
	return (
		<>
			<h2>Principle {index}: {principle.title}</h2>
			<p>{principle.description}</p>
		</>
	);
}
