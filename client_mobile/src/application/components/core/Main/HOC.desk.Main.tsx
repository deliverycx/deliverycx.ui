import HOCdescHead from 'application/components/common/Head/HOC.desc.Head';
import HOCShopDesc from '../Shop/HOC.Shop.desc';
import HOCFooterDesc from 'application/components/common/Footer/HOC.footer.desc';

const HOCdeskMain = () => {
  return (
    <>
      <div className="container">
        <HOCdescHead />
      </div>

      <HOCShopDesc />
      <HOCFooterDesc />
    </>
  );
};
export default HOCdeskMain;
