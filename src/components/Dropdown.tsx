'use client';

import { CSSProperties, ReactNode, useState } from 'react';
import '../app/css/components/Dropdown.scss';

export default function Dropdown({
	headerContent,
	bodyContent,
	classList,
	key,
	arrowIsLight,
}: {
	headerContent: ReactNode;
	bodyContent: ReactNode;
	classList: string;
	key: number;
	arrowIsLight: boolean;
}) {
	const [expanded, setExpanded] = useState(false);
	const toggleExpand = () => {
		setExpanded(!expanded);
	};
	return (
		<div className='w-full'>
			<button
				aria-expanded={expanded}
				aria-controls={`dropdown-${key}`}
				onClick={toggleExpand}
				className={`dropdown ${classList}`}
			>
				{headerContent}
				<div
					className={`dropdown-arrow__${arrowIsLight ? 'white' : 'black'} dropdown-arrow dropdown-arrow__${
						expanded ? 'up' : 'down'
					}`}
					aria-expanded={expanded}
				></div>
			</button>
			<div id={`dropdown-${key}`} className={`p-2 ${ expanded? '': 'hidden' }`}>
                {bodyContent}
            </div>
		</div>
	);
}
