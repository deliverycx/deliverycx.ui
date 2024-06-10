import { MaterialSymbol } from 'material-symbols';
import 'material-symbols/outlined.css';
import cn from 'classnames';
import { FC, HTMLAttributes } from 'react';

type Props = {
  symbol: MaterialSymbol;
} & HTMLAttributes<HTMLSpanElement>;

// You can see all available icons here:
// https://fonts.google.com/icons?icon.set=Material+Symbols&icon.size=24&icon.color=%235f6368&icon.platform=web

export const Icon: FC<Props> = ({ symbol, className, ...props }) => {
  return (
    <span {...props} className={cn('material-symbols-outlined', className)}>
      {symbol}
    </span>
  );
};
