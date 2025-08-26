import { FC, SVGAttributes } from 'react';

import * as MaterialIcons from 'react-icons/md';

import { TypeMaterialIconName } from './icons.types';

interface IMaterialIconProps extends SVGAttributes<SVGElement> {
	name?: TypeMaterialIconName;
	className?: string;
	color?: string;
	size?: string | number;
	title?: string;
}

const MaterialIcon: FC<IMaterialIconProps> = ({
	name,
	className,
	color,
	size = '1.5em',
	title,
	...rest
}) => {
	const IconComponent = name ? MaterialIcons[name] : null;
	return IconComponent ? (
		<IconComponent {...rest} className={className} color={color} size={size} title={title} />
	) : (
		<MaterialIcons.MdMenu {...rest} className={className} color={color} size={size} title={title} />
	);
};

export default MaterialIcon;
