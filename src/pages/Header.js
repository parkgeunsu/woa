import { AppContext } from 'App';
import { IconPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  height: 50px;
  z-index: 2;
  li .txt{
    background: url(${({bar}) => bar}) repeat-x 0 center;
    background-size: 100% 22px;
    border-image: url(${({frameMain}) => frameMain}) 6 stretch;}
  li.lv .ico{
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }
  li.diamond .ico{position:absolute;}
  li.money .ico{position:absolute;}
`;
const HeaderGroup = styled.ul`
  display:flex;width:100%;justify-content:space-between;padding:0 20px 0 10px;overflow:hidden;
`;
const HeaderList = styled.li`
  position:relative;margin:0 0 0 5px;padding:5px 0;
  &:first-of-type{margin:0;}
  .ico{display:inline-block;width:40px;height:40px;}
  .txt{display:block;margin:7px 0 7px 24px;padding:0 5px 0 8px;height:25px;border-radius:5px;border:3px solid transparent;line-height:19px;box-sizing:border-box;overflow:hidden;}
  &.lv .ico .txt{display:inline-block;margin:0;padding:0;background:none;border:none;line-height:25px;}
  &.lv > .txt{text-align:center;}
  &.back{flex-grow:0;}
  &.diamond{flex-grow:0;}
  &.lv{flex-grow:1;}
  &.diamond .txt{width:60px;text-align:right;}
  &.money{flex-grow:0;}
  &.money .txt{width:80px;text-align:right;}
  .num{position:absolute;right:10px;top:50%;transform:translate(0,-50%);transition:all 1s;font-weight:600;font-size:0.875rem;white-space:nowrap;color:transparent;}
  .num.minus{color:#ff2a00;}
  .num.plus{color:#0090ff;}
  .num.minus:before{content:'- ';}
  .num.plus:before{content:'+ ';}
  &.on .num{top:20%;}
  &.menu{float:right;overflow:hidden;}
  &.menu li{position:relative;float:left;visibility:hidden;height:100%;text-align:center;}
  &.menu li.used{visibility:visible;}
  &.menu li:last-of-type{margin:0;}
`;
const Header = ({
  saveData,
}) => {
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/")[1];
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
      <Wrapper bar={imgSet.etc.bar0} frameMain={imgSet.etc.frameMain}>
        <HeaderGroup>
          {(location !== 'gameMain' && location !== 'moveEvent') && 
            <HeaderList className="back">
              <IconPic className="ico" type="commonBtn" pic="icon100" idx={0} onClick={() => {
                util.historyBack(navigate);
              }}></IconPic>
            </HeaderList>
          }
          <HeaderList className="lv">
            <IconPic className="ico" type="commonBtn" pic="icon100" idx={1}>
              <span className="txt number">
                {saveData?.info?.lv}
              </span>
            </IconPic>
            <span className="txt">{saveData?.info?.id}</span>
          </HeaderList>
          <HeaderList className={`diamond ${minusDia === '' ? '' : 'on'}`}>
            <IconPic className="ico" type="commonBtn" pic="icon100" idx={2} />
            <span className="txt won number_w">{String(saveData?.info?.diamond).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
            <span className={`num ${diaColor}`}>{minusDia}</span>
          </HeaderList>
          <HeaderList className={`money ${minusMoney === '' ? '' : 'on'}`}>
            <IconPic className="ico" type="commonBtn" pic="icon100" idx={3} />
            <span className="txt won number_w">{String(saveData?.info?.money).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
            <span className={`num ${moneyColor}`}>{minusMoney}</span>
          </HeaderList>
          {/* <span class="frame_bar"><span class="bar"></span><span class="txt number_w">80</span></span> */}
        </HeaderGroup>
      </Wrapper>
    </>
  );
}

export default Header;
