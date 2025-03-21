import { ChPic, IconPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
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
  display:inline-block;
  position:relative;
  margin:0 15px 0 0;
  padding-left:25px;
  line-height:20px;
  font-size:1rem;
  color:#ff2a00;
  &:after{content:',';margin:0 0 0 2px;font-size:1.25rem;color:#fff;}
  &:last-of-type:after{content:'';margin:0;}
  &:last-of-type{margin:0;}
  em{color:#ffc719;text-shadow:-1px -1px 0 #fff,1px 1px 0 #000;}
`;

const icon = (data, gameData) => {
  console.log(data.type, gameData);
  switch(data.type) {
    case 'p':
      return 2;
    case 'g':
      return 3;
    default:
      //[data.imgGroup][gameData.items[data.type][data.idx].display]
      return 0;
  }
};
const remainingItem = (data, saveData) => {
  if (data.type === 'g') {
    return saveData.info.money;
  } else if (data.type === 'p') {
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
  return (
    payment.map((data, idx) => {
      return <StyledPrices {...props} key={`payment${idx}`} dangerouslySetInnerHTML={{__html:`-${util.comma(data.price)} <em>(${util.comma(remainingItem(data, saveData))})</em>`}}>
        <StyledIconPic type="commonBtn" pic="icon100" idx={icon(data, gameData)} />
      </StyledPrices>
    })
  );
}
const StyledRangeTrack = styled.div`
	position:relative;
	height:20px;
	width:100%;
	border-radius:10px;
  border:2px solid #000;
  box-sizing:border-box;
	background:${props => getTrackBackground({
		values: props.value,
		colors: ['#ffcc15', 'rgba(0,0,0,.5)', 'rgba(0,0,0,.1)'],
		min: props.min,
		max: props.max,
	})};
`;
const StyledRangeThumb = styled.div`
	position:absolute;
	top:0;
	width:20px;
	height:20px;
	border-radius:20px;
	box-shadow:0 0 2px #000,0 0 5px #000;
	background:#ffcc15;
	outline:none;
`;
const TextMinMax = styled.div`
  display:flex;
  margin:0 0 5px 0;
  font-size:0.75rem;
  color:#ddd;
  justify-content:space-between;
`;
const TextValue = styled.div`
  display:inline-block;
  padding:5px;
  background:rgba(0,0,0,.3);
  border-radius:5px;
  font-size:1rem;
  font-weight:600;
  text-align:right;
  &:first-of-type{width:40%;}
  &:last-of-type{margin:0 0 0 5px;width:60%;}
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
  const max_ = typeof max === 'number' ? max : 999999;
  return (
    <>
      <TextMinMax><span>{min}</span><span>{util.comma(max_)}</span></TextMinMax>
      <Range
        draggableTrack
        step={step}
        min={min}
        max={max_}
        values={value}
        onChange={(value) => {
          setValue(value);
        }}
        renderTrack={({props, children}) => (
          <StyledRangeTrack {...props} min={min} max={max_} value={value}>
            {children}
          </StyledRangeTrack>
        )}
        renderThumb={({props}) => (
          <StyledRangeThumb {...props} />
        )}
      />
      <div flex="true" style={{margin:'10px 0 0 0'}}>
        <TextValue onClick={() => {
          showCal(true);
        }}>{util.comma(String(value))}</TextValue>
        <TextValue>{util.comma(String(pirce * value))}</TextValue>
      </div>
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

// .ch_select_area .list_job_actiontype{position:absolute;left:3px;top:3px;width:20%;font-size:0;z-index:2;}
// .ch_select_area .list_job{display:inline-block;width:100%;padding-top:100%;background-repeat:no-repeat;background-position:center center;z-index:5;}
// .ch_select_area .list_action_type{display:inline-block;width:100%;padding-top:100%;background-repeat:no-repeat;background-position:center center;z-index:5;}
// .ch_select_area .list_actionPoint{position:absolute;left:50%;bottom:5px;transform:translate(-50%, 0);white-space:nowrap;text-shadow:1px 1px 1px #000;font-size:1rem;}

const ListCh = styled(ChPic)`
  position:absolute;
  top:0;
  z-index:1;
`;
const ListJob = styled.span`
  background-image:url(${({jobIcon}) => jobIcon});background-size:100%;
`;
const ListActionType = styled.span`
  background-image:url(${({actionType}) => actionType});background-size:100%;
`;
const ListRing = styled(ChPic)`
  position:absolute;
  top:0;
  background-position:center 55%;
  z-index:1;
  ${'' /* background-size:85%; */}
`;
const ListElement = styled(ChPic)`
  position: absolute;
  bottom: 20%;
`;
const ListFrame = styled(ChPic)`
  position: absolute;
  top: 0;
`;
export const ActionChDisplay = ({
  type,
  saveData,
  gameData,
  actionCh,
  imgSet,
}) => {
  let skillIdx = '',
    hasSkill = false;
  switch(type) {
    case 'tradingPost':
    case 'shop':
    case 'tool':
      skillIdx = 201;
      break;
    case 'shipyard':
      skillIdx = 202;
      break;
    case 'composite':
      skillIdx = 205;
      break;
    case 'enhancingStickers':
      skillIdx = 203;
      break;
    case 'recruitment':
      skillIdx = 208;
      break;
    default:
      break;
  }
  if (actionCh.idx !== '') {
    for (const [idx, skillData] of saveData.ch[actionCh.idx].hasSkill.entries()) {
      if (skillData.idx === skillIdx) {
        hasSkill = true;
        break;
      };
    };
  } else {
    hasSkill = '';
  }
  if (hasSkill) {
    return (
      <div className={`action_ch g${saveData.ch[actionCh.idx].grade}`}>
        <ListRing type="cardBack" pic="card" idx={0} />
        <ListElement type="elementBack" pic="card" idx={gameData.ch[saveData.ch[actionCh.idx].idx].element} />
        <ListCh className="transition" pic="ch" idx={gameData.ch[saveData.ch[actionCh.idx].idx].display} />
        <div className="list_job_actiontype">
          <ListJob jobIcon={imgSet.job[saveData.ch[actionCh.idx].job]} className="list_job"/>
          {saveData.ch[actionCh.idx].newActionType.map((data, idx) => {
            return (
              <ListActionType key={'action'+idx} actionType={imgSet.element[data + 1]} className="list_action_type"/>
            )
          })}
        </div>
        <ListFrame type="cardBack" pic="card" idx={1} />
        <div className="list_actionPoint">{`${saveData.ch[actionCh.idx].actionPoint} / ${saveData.ch[actionCh.idx].actionMax}`}</div>
      </div>
    )
  } else {
    return (
      <div className="action_ch none"></div>
    )
  }
};