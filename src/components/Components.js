import { Text } from 'components/Atom';
import { FlexBox } from 'components/Container';
import { IconPic, MergedPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import { AppContext } from 'contexts/app-context';
import CharacterCard from 'pages/CharacterCard';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';


const StyledIconPic = styled(IconPic)`
  position: absolute;
  left: 0%;
  top: 0%;
	width: 20px;
	height: 20px;
	z-index: 1;
  border-radius:50%;
`;

const StyledPrices = styled.div`
  display: inline-block;
  position: relative;
  margin: 0 15px 0 0;
  padding-left: 25px;
  line-height: 20px;
  font-size: 1rem;
  color: #ff2a00;
  &:after { 
    content: ',';
    margin: 0 0 0 2px;
    font-size: 1.25rem;
    color: #fff;
  }
  &:last-of-type:after {
    content: '';
    margin: 0;
  }
  &:last-of-type {
    margin: 0;
  }
  em {
    color: #ffc719;
    text-shadow: -1px -1px 0 #fff,1px 1px 0 #000;
  }
`;

const remainingItem = (data, saveData) => {
  if (data.cate === 'g') {
    return saveData.info.money;
  } else if (data.cate === 'p') {
    return saveData.info.diamond;
  } else {
    let num = 0;
    saveData.items[data.type].forEach((item) => {
      if (item.idx === data.idx) {
        num ++;
      };
    });
    return num;
  }
}
export const Prices = ({
  payment,
  imgSet,
  saveData,
  gameData,
  ...props
}) => {
  console.log(payment);
  return (
    payment.map((data, idx) => {
      return <StyledPrices {...props} key={`payment${idx}`}>
        <StyledIconPic type={data.type} pic={data.img} idx={data.idx} />
        -{util.comma(data.price)} <em>({util.comma(remainingItem(data, saveData))})</em>
      </StyledPrices>
    })
  );
}
const StyledRangeTrack = styled.input`
	position:relative;
  appearance: none;
  cursor: pointer;
  outline: none;
  border: 2px solid #ffcc15;
  margin: 0;
  padding: 0;
	height: 10px;
	width: 100%;
	border-radius: 10px;
  box-sizing: border-box;
	background: linear-gradient(to left, #ffcc15, rgba(0,0,0,.5), rgba(0,0,0,.1));
  touch-action: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ffcc15;
    cursor: pointer;
    box-shadow: 0 0 2px #000, 0 0 5px #000;
  }
  &::-moz-range-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ffcc15;
    cursor: pointer;
    box-shadow: 0 0 2px #000, 0 0 5px #000;
    border: none;
  }
`;
const TextMinMax = styled(FlexBox)`
  margin: 0 0 5px 0;
  width: 100%;
`;
const TextValueContainer = styled(FlexBox)`
  margin: 15px 0 0 0;
  width: 100%;
`;
const TextValue = styled.div`
  display: inline-block;
  padding: 5px;
  background: rgba(0,0,0,.3);
  border: 2px solid #ffcc15;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  text-align: right;
  &:first-of-type {
    width: 40%;
  }
  &:last-of-type {
    margin: 0 0 0 5px;
    width: 60%;
  }
`;
export const RangeSlider = ({
  min,
	max,
	step,
	value,
  pirce,
	setValue,
  showCal,
}) => {
  return (
    <>
      <TextMinMax justifyContent="space-between">
        <Text code="t2" color="main">{min}</Text>
        <Text code="t2" color="main">{util.comma(max)}</Text>
      </TextMinMax>
      <StyledRangeTrack type="range" min={min} max={max} step={step} value={value} onChange={(e) => {
        setValue(e.target.value);
      }} />
      <TextValueContainer justifyContent="space-between">
        <TextValue onClick={() => {
          showCal(true);
        }}>{util.comma(String(value))}</TextValue>
        <TextValue>{util.comma(String(pirce * value))}</TextValue>
      </TextValueContainer>
    </>
	)
}
const CalContainer = styled.div`
  position:fixed;
  left:0;right:0;top:0;bottom:0;z-index:2;
  .cal_value{
    display:inline-block;margin:5px;width:200px;height:60px;line-height:60px;text-align:center;
    font-size:1.5rem;font-weight:600;
  }
  .cal_layout{
    position:absolute;
    left:50%;top:50%;
    width:280px;height:280px;
    transform:translate(-50%,-50%);
    z-index:1;
  }
  button{
    margin:5px;padding:0;
    width:60px;height:60px;
    background:#f50;border-radius:10px;box-shadow:0 0 10px #f50;
    line-height:60px;font-size:1.25rem;font-weight:600;color:#fff;
  }
  button.result{
    background:#0090ff;box-shadow:0 0 10px #0090ff;
  }
  .cal_shadow{
    content:'';
    position:absolute;
    left:0;right:0;top:0;bottom:0;
    background:rgba(0,0,0,.7);
  }
`;
const calArr = [0,1,2,3,4,5,6,7,8,9];
export const Calculator = ({
  value,
  max,
  setValue,
  showCal,
}) => {
  const [result, setResult] = useState(String(value));
  return (
    <CalContainer>
      <div className="cal_layout">
        <div className="cal_value">
          {util.comma(result)}
        </div>
        <button className="result" onClick={() => {
          setValue(result);
          showCal(false);
        }}>=</button>
        {calArr.map((data,idx) => {
          return <button key={`cal${idx}`} onClick={() => {
            setResult((num) => {
              if (num === '0') {
                const count = calArr[idx] >= max ? max : calArr[idx];
                return String(count);
              } else {
                const count = Number(num) + calArr[idx] >= max ? String(max) : num + calArr[idx];
                return count;
              }
            })
          }}>{data}</button>
        })}
        <button onClick={() => {
          if (result.length > 1) {
            setResult((num) => {
              return num.substr(0,num.length-1);
            });
          } else {
            if (result !== '0') {
              setResult('0');
            }
          }
        }}>←</button>
        <button onClick={() => {
          setResult('0');
        }}>C</button>
      </div>
      <div className="cal_shadow" onClick={() => {
        showCal(false);
      }}></div>
    </CalContainer>
  );
}

const ChCard = styled(CharacterCard)``;
const TextArea = styled(FlexBox)`
  position: absolute;
  right: 5px;
  top: 5px;
  width: auto;
  height: auto;
  z-index: 10;
  background: rgba(0,0,0,.7);
  padding: 5px;
  border-radius: 5px;
`;
export const ActionChDisplay = ({
  type,
  chList,
  gameData,
  actionChIdx,
}) => {
  const context = useContext(AppContext);
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  let skillIdx = "",
    skillLv = "";
  switch(type) {
    case 'tradingPost':
    case 'accessory':
    case 'equipment':
    case 'townhall':
    case 'tool':
      skillIdx = 15;
      break;
    case 'composite':
      skillIdx = 20;
      break;
    case 'guild':
    case 'training':
    case 'mystery':
      skillIdx = 0;
      break;
    case 'blacksmith':
      skillIdx = 17;
      break;
    case 'church':
      skillIdx = 25;
      break;
    case 'temple':
      skillIdx = 26;
      break;
    case 'recruitment':
      skillIdx = 22;
      break;
    case 'shipyard':
      skillIdx = 17;
      break;
    default:
      break;
  }
  if (actionChIdx !== '' && actionChIdx !== undefined) {
    for (const [idx, skillData] of chList[actionChIdx].hasSkill.entries()) {
      if (skillData.idx === skillIdx) {
        skillLv = skillData.lv;
        break;
      };
    };
  } else {
    skillLv = "";
  }
  if (skillLv !== "") {
    const displayIdx = gameData.ch[chList[actionChIdx].idx].display;
    return (
      <div>
        <TextArea direction="column" alignItems="flex-end">
          <Text font="point" lineHeight="1.2" code="t1" color="main">{`${chList[actionChIdx].actionPoint} / ${chList[actionChIdx].actionMax}`}</Text>
          <Text font="point" lineHeight="1.2" code="t1" color="main">{`${gameData.skill[skillIdx].na[lang]} Lv.${skillLv}`}</Text>
        </TextArea>
				<MergedPic isAbsolute pic="card" idx={40} />
        <ChCard usedType="actionCh" saveCharacter={chList[actionChIdx]} saveData={true} slotIdx={actionChIdx} />
      </div>
    )
  } else {
    return (
      <div className="action_ch none"></div>
    )
  }
};