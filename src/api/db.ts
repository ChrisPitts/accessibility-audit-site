import { PrismaClient, Audit } from '@prisma/client';

const globalForPrisma = global as unknown as {
	prisma: PrismaClient | undefined;
};

const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		log: ['query'],
	});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function getAudits(username: string): Promise<Audit[]> {
	return prisma.$queryRaw`SELECT * FROM Audit WHERE username=${username} ORDER BY principle, guideline, section`;
}


export function getAuditsByPrinciple(
	audits: Audit[],
	principle: number
): Audit[] {
	let returnArr: Audit[] = [];
	audits.forEach((audit) => {
		if (audit.principle === principle) returnArr.push(audit);
	});

	return returnArr;
}

export function getAuditsByGuideline(
	audits: Audit[],
	guideline: number
): Audit[] {
	let returnArr: Audit[] = [];
	audits.forEach((audit) => {
		if (audit.guideline === guideline) returnArr.push(audit);
	});

	return returnArr;
}

export function getAuditBySection(
	audits: Audit[],
	section: number
): Audit {
	audits.forEach((audit) => {
		if (audit.section === section) return audit;
	});

    throw new Error('Section not found');
}
