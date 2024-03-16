import { getAudits } from '@/app/api/db';
import Principle from '@/app/components/Principle';
import Wcag from '@/app/wcag.json';

function getPrinciplesAsArray(): Array<any> {
	let arr = [];
	for (const key in Wcag.principles) {
		arr.push(Wcag.principles[key as keyof typeof Wcag.principles]);
	}
	return arr;
}

export default async function ViewPage({
	params,
}: {
	params: { username: string };
}) {
	const audits: any = await getAudits(params.username);

	let sumPassed = 0;

	audits.forEach((element: { pass: boolean }) => {
		sumPassed += element.pass ? 1 : 0;
	});

	const ratio = audits.length > 0 ? sumPassed / audits.length : 0;

	const circleColor = ratio === 1 ? 'green' : ratio > 0.6 ? 'yellow' : 'red';

	return (
		<>
			<h1 className='text-xl font-black'>Viewing {params.username}</h1>
			<p>
				Audits passed:{' '}
				<span
					className='audit-circle'
					style={
						{
							'--data-progress': ratio,
							'--data-color': circleColor,
						} as React.CSSProperties
					}
				>
					{sumPassed}/{audits.length}
				</span>
			</p>
			{getPrinciplesAsArray().map((principle, index) => {
				return (
					<Principle
						username={params.username}
						principle={principle}
						principleNumber={index + 1}
					/>
				);
			})}
		</>
	);
}
