export default function Section({
	section,
	sectionNumber,
	guidelineNumber,
	principleNumber,
}: {
	section: { level: string; title: string; description: string; link: string };
	sectionNumber: string;
	guidelineNumber: string;
	principleNumber: number;
}) {
	return (
		<>
			<h4 className='underline'>
				{principleNumber}.{guidelineNumber}.{sectionNumber} {section.title}
			</h4>
            <p>{section.description }</p>
		</>
	);
}
