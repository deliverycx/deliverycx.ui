import { InputHTMLAttributes, FC } from 'react';
import cn from 'classnames';

export type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<Props> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={cn(
        'font-tilda py-2.5 px-4 bg-primary border-0 rounded-xl text-base outline-1 outline-main',
        className,
      )}
    />
  );
};
