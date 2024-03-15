import { getAudits } from '@/app/api/db';
import Principle from '@/app/components/Principle';
import Wcag from '@/app/wcag.json';


function getPrinciplesAsArray() : Array<any> {
	let arr = [];
    for (const key in Wcag.principles)
    {
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
	let sumFailed = 0;

	audits.forEach((audit: any) => {
		if (audit.pass) sumPassed++;
		else sumFailed++;
    });

	return (
		<>
			<h1>Viewing {params.username}</h1>
            {getPrinciplesAsArray().map((principle, index) =>
            {
                return <Principle principle={principle} index={index + 1} />
            })}
		</>
	);
}
