import { FC, HTMLAttributes } from 'react';

import styles from './ContainerScreenSize.module.scss';

export interface IContainerScreenSizeProps extends HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

const ContainerScreenSize: FC<IContainerScreenSizeProps> = ({ children, ...rest }) => {
	return (
		<div {...rest} className={`${styles.container} ${rest.className}`}>
			{children}
		</div>
	);
};

export default ContainerScreenSize;
