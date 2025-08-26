import React from 'react';

import styles from './GlareHover.module.scss';

interface IGlareHoverProps {
	children?: React.ReactNode;
	glareColor?: string;
	glareOpacity?: number;
	glareAngle?: number;
	glareSize?: number;
	transitionDuration?: number;
	playOnce?: boolean;
	className?: string;
	style?: React.CSSProperties;
	customType?: 'child' | 'absolute';
}

const GlareHover: React.FC<IGlareHoverProps> = ({
	children,
	glareColor = '#ffffff',
	glareOpacity = 0.5,
	glareAngle = -45,
	glareSize = 250,
	transitionDuration = 650,
	playOnce = false,
	className = '',
	style = {},
	customType = 'child',
}) => {
	const hex = glareColor.replace('#', '');
	let rgba = glareColor;
	if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
		const r = parseInt(hex.slice(0, 2), 16);
		const g = parseInt(hex.slice(2, 4), 16);
		const b = parseInt(hex.slice(4, 6), 16);
		rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
	} else if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
		const r = parseInt(hex[0] + hex[0], 16);
		const g = parseInt(hex[1] + hex[1], 16);
		const b = parseInt(hex[2] + hex[2], 16);
		rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
	}
	let startPos = '-100% -100%';
	let endPos = '100% 100%';

	if (glareAngle === 45) {
		startPos = '-100% 100%';
		endPos = '100% -100%';
	} else if (glareAngle === 135) {
		startPos = '100% 100%';
		endPos = '-100% -100%';
	} else if (glareAngle === -135) {
		startPos = '100% -100%';
		endPos = '-100% 100%';
	}

	const vars: React.CSSProperties & { [k: string]: string } = {
		'--gh-angle': `${glareAngle}deg`,
		'--gh-duration': `${transitionDuration}ms`,
		'--gh-size': `${glareSize}%`,
		'--gh-rgba': rgba,
		'--gh-start': startPos,
		'--gh-end': endPos,
	};

	if (customType === 'child')
		return (
			<div
				className={`${styles['glare-hover']} ${playOnce ? styles['glare-hover--play-once'] : ''} ${className}`}
				style={{ ...vars, ...style } as React.CSSProperties}
			>
				{children}
			</div>
		);
	return (
		<div
			className={`${styles['glare-hover-absolute']} ${playOnce ? styles['glare-hover--play-once'] : ''} ${className}`}
			style={{ ...vars, ...style }}
		/>
	);
};

export default GlareHover;
