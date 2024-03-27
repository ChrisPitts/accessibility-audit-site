'use client';

import { CSSProperties, ReactNode, useState } from 'react';
import '../css/components/Dropdown.scss';

export default function Dropdown({
	headerContent,
	bodyContent,
	classList,
	key,
}: {
	headerContent: ReactNode;
	bodyContent: ReactNode;
	classList: string;
	key: number;
}) {
	const [expanded, setExpanded] = useState(false);
	const toggleExpand = () => {
		setExpanded(!expanded);
	};
	return (
		<div>
			<button
				aria-expanded={expanded}
				aria-controls={`dropdown-${key}`}
				onClick={toggleExpand}
				className={`dropdown ${classList}`}
			>
				{headerContent}
				<div
					className={`dropdown-arrow dropdown-arrow__${
						expanded ? 'up' : 'down'
					}`}
					aria-expanded={expanded}
				></div>
			</button>
            <div id={`dropdown-${key}`} className={expanded ? '' : 'hidden'}>
                {bodyContent}
            </div>
		</div>
	);
}
