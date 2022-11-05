import React, { useState } from 'react';
import styled from 'styled-components';
import { Range, getTrackBackground } from 'react-range';

const StyledPrices = styled.div`
  display:inline-block;
  position:relative;
  margin:0 15px 0 0;
  padding-left:25px;
  line-height:20px;
  font-size:16px;
  color:#ff2a00;
  &:after{content:',';margin:0 0 0 2px;font-size:20px;color:#fff;}
  &:last-of-type:after{content:'';margin:0;}
  &:last-of-type{margin:0;}
  &:before{
    content:'';position:absolute;left:0;top:0;width:20px;height:20px;
    background:#fff url(${({ icoType }) => icoType}) no-repeat left center;background-size:20px;
    background-position:center center;border-radius:50%;
  }
  em{color:#ffc719;text-shadow:-1px -1px 0 #fff,1px 1px 0 #000;}
`;

const icon = (data, imgSet, gameData) => {
  switch(data.type) {
    case 'p':
      return imgSet.icon.iconDia;
    case 'g':
      return imgSet.icon.iconGold;
    default:
      return imgSet[data.imgGroup][gameData.items[data.type][data.idx].display];
      break;
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
      return <StyledPrices icoType={icon(data, imgSet, gameData)} {...props} key={`payment${idx}`} dangerouslySetInnerHTML={{__html:`-${data.price} <em>(${remainingItem(data, saveData)})</em>`}}></StyledPrices>
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
  font-size:12px;
  color:#ddd;
  justify-content:space-between;
`;
const TextValue = styled.div`
  display:inline-block;
  padding:5px;
  background:rgba(0,0,0,.3);
  border-radius:5px;
  font-size:16px;
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
    <div style={{padding:'5px 20px'}}>
      <TextMinMax><span>{min}</span><span>{max_}</span></TextMinMax>
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
        }}>{String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TextValue>
        <TextValue>{String(pirce * value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TextValue>
      </div>
    </div>
	)
}
const CalContainer = styled.div`
  position:fixed;
  left:0;right:0;top:0;bottom:0;z-index:2;
  .cal_value{
    display:inline-block;margin:5px;width:200px;height:60px;line-height:60px;text-align:center;
    font-size:24px;font-weight:600;
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
    line-height:60px;font-size:20px;font-weight:600;color:#fff;
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
          {result.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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