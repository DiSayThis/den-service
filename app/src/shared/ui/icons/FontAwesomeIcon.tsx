import { FC } from 'react';

import * as FontAwesome6Icon from 'react-icons/fa';

import { TypeFontAwesomeIconName } from './icons.types';

interface IFontAwesomeIconProps {
	name: TypeFontAwesomeIconName;
	className?: string;
	color?: string;
	size?: string | number;
}

const FontAwesomeIcon: FC<IFontAwesomeIconProps> = ({ name, className, color, size }) => {
	const IconComponent = name ? FontAwesome6Icon[name] : null;
	return IconComponent ? (
		<IconComponent className={className} color={color} size={size} />
	) : (
		<FontAwesome6Icon.FaMedal />
	);
};

export default FontAwesomeIcon;
