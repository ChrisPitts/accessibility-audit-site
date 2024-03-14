import { getAudits } from '@/app/api/db';

export default async function ViewPage({
	params,
}: {
	params: { username: string };
}) {
	const audits : any = await getAudits(params.username);

	let sumPassed = 0;
    let sumFailed = 0;
    

	audits.forEach((audit : any) => {
		if (audit.pass) sumPassed++;
		else sumFailed++;
    });
    
}
