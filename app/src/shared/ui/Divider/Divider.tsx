// Divider.tsx

import React, { CSSProperties, FC } from 'react';

import clsx from 'clsx';

import styles from './Divider.module.scss';

interface IDividerProps {
	orientation?: 'horizontal' | 'vertical';
	className?: string;
	style?: CSSProperties;
}

const Divider: FC<IDividerProps> = ({ orientation = 'vertical', className, style }) => {
	return (
		<div
			role="separator"
			aria-orientation={orientation === 'vertical' ? 'vertical' : 'horizontal'}
			className={clsx(styles.divider, orientation === 'vertical' && styles.vertical, className)}
			style={style}
		/>
	);
};

export default Divider;
