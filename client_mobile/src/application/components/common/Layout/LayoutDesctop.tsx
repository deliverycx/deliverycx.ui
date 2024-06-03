import { FC } from 'react';
import { ReactNode } from 'react';
import HOCFooterDesc from '../Footer/HOC.footer.desc';
import HOCdescHead from 'application/components/common/Head/HOC.desc.Head';

const LayoutDesctop: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="layout-head">
        <div className="container">
          <HOCdescHead />
        </div>
      </div>
      <div className="gray-bg">
        <div className="container">{children}</div>
      </div>

      <HOCFooterDesc />
    </>
  );
};
export default LayoutDesctop;
