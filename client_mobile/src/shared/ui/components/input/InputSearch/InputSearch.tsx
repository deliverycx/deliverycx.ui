import { Input, Props as InputProps } from '../Input';
import { FC } from 'react';
import cn from 'classnames';
import { Icon } from '../../../Icons';

type Props = Omit<InputProps, 'placeholder'>;

export const InputSearch: FC<Props> = ({ className, ...props }) => {
	return (
		<div className={cn('inline-block relative', className)}>
			<Icon
				className="absolute text-secondary left-3 top-2.5"
				symbol="search"
			/>
			<Input {...props} placeholder="Найти" className="pl-11 w-full" />
		</div>
	);
};
