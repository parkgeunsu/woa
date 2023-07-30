import { AppContext } from 'App';
import { util } from 'components/Libs';
import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  li .txt{background:url(${({ bar}) => bar}) repeat-x 0 center;background-size:100% 22px;border-image:url(${({ frameMain}) => frameMain}) 6 stretch;}
  li.back .ico{background-image:url(${({ iconBack }) => iconBack});}
  li.lv .ico{
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    background-image: url(${({ iconLv }) => iconLv});
    z-index: 2;
  }
  li.diamond .ico{position:absolute;background-image:url(${({ iconDia }) => iconDia});}
  li.money .ico{position:absolute;background-image:url(${({ iconGold }) => iconGold});}
  li.menu li.view_type{margin:0 5px 0 0;width:20px;height:33px;background:url(${({ iconAllview }) => iconAllview}) no-repeat center center;background-size:50px;}
  li.menu li.view_type.on{background-image:url(${({ iconLargeview }) => iconLargeview});background-size:50px;}
`;

const Header = ({
  navigate,
  saveData,
  changePage,
  page,
}) => {
  const [minusMoney, setMinusMoney] = useState('');
  const [minusDia, setMinusDia] = useState('');
  const [moneyColor, setMoneyColor] = useState('');
  const [diaColor, setDiaColor] = useState('');
  const moneyRef = useRef();
  const diaRef = useRef();
  const timeMoney = useRef();
  const timeDia = useRef();
  const imgSet = useContext(AppContext).images;
  useEffect(() => {
    if (moneyRef.current !== undefined && moneyRef.current - saveData.info.money !== 0) {
      //const minusPlus = moneyRef.current - saveData.info.money > 0 ? '-' : '+';
      if (moneyRef.current - saveData.info.money > 0) {
        setMoneyColor('minus');
      } else {
        setMoneyColor('plus');
      }
      setMinusMoney(util.comma(Math.abs(moneyRef.current - saveData.info.money)));
      timeMoney.current = setTimeout(() => {
        setMinusMoney('');
        setMoneyColor('');
      }, 1000);
      //moneyAction
    }
    if (diaRef.current !== undefined && diaRef.current - saveData.info.diamond !== 0) {
      //const minusPlus = diaRef.current - saveData.info.diamond > 0 ? '-' : '+';
      if (diaRef.current - saveData.info.diamond > 0) {
        setDiaColor('minus');
      } else {
        setDiaColor('plus');
      }
      setMinusDia(util.comma(Math.abs(diaRef.current - saveData.info.diamond)));
      timeDia.current = setTimeout(() => {
        setMinusDia('');
        setDiaColor('');
      }, 1000);
      //diaAction
    }
    if (Object.keys(saveData).length !== 0) {
      moneyRef.current = saveData.info.money;
      diaRef.current = saveData.info.diamond;
    }
  }, [saveData]);
  return (
    <>
      <Wrapper className="header" iconBack={imgSet.icon.iconBack} iconLv={imgSet.icon.iconLv} iconDia={imgSet.icon.iconDia} iconGold={imgSet.icon.iconGold} iconAllview={imgSet.icon.iconAllview} iconLargeview={imgSet.icon.iconLargeview} bar={imgSet.etc.bar0} frameMain={imgSet.etc.frameMain}>
        <ul className="default">
          {page !== 'gameMain' && 
            <li className="back"><span className="ico" onClick={() => {
              util.historyBack(navigate, changePage);
            }}></span></li>
          }
          <li className="lv"><span className="ico">
            <span className="txt number">{saveData?.info?.lv}</span></span><span className="txt">{saveData?.info?.id}</span>
          </li>
          <li className={`diamond ${minusDia === '' ? '' : 'on'}`}>
            <span className="ico"></span><span className="txt won number_w">{String(saveData?.info?.diamond).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
            <span className={`num ${diaColor}`}>{minusDia}</span>
          </li>
          <li className={`money ${minusMoney === '' ? '' : 'on'}`}>
            <span className="ico"></span><span className="txt won number_w">{String(saveData?.info?.money).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
            <span className={`num ${moneyColor}`}>{minusMoney}</span>
          </li>
          {/* <span class="frame_bar"><span class="bar"></span><span class="txt number_w">80</span></span> */}
        </ul>
      </Wrapper>
    </>
  );
}

export default Header;
