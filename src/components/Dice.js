import { Text } from 'components/Atom';
import { IconPic, MergedPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import { AppContext } from 'contexts/app-context';
import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';

const Scene = styled.div`
  position: absolute;
  width: 60%;
  padding-top: 60%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;
const SuccessText = styled(Text)`
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;
const BackPic = styled(MergedPic)`
	position: absolute;
	inset: 0;
`;
const DiceGroup = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${({width}) => width}px;
  padding-top: ${({width}) => width}px;
  height: 0;
  perspective: 800px;
  z-index: 1;
`;

const RollContainer = styled.div`
  position: absolute;
  inset: 0;
  left: ${({num, idx, width}) => `calc(50% - (${num * width}px + ${(num - 1) * 5}px)/ 2 + ${idx} * (${width}px + 5px)
  )`};
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s;
  ${({ select, idx }) => {
    const map = {
      1: "rotateX(0deg) rotateY(0deg)",
      2: "rotateX(-90deg) rotateY(0deg)",
      3: "rotateX(0deg) rotateY(-90deg)",
      4: "rotateX(0deg) rotateY(90deg)",
      5: "rotateX(90deg) rotateY(0deg)",
      6: "rotateX(0deg) rotateY(180deg)",
    };
    if (select === "") {
      return `
        animation: roll${idx} 1s linear infinite;
      `;
    } else {
      return `
        transform: ${map[select]};
      `;
    }
  }}
`;
const DiceCore = styled.div`
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transition: transform 5s cubic-bezier(0.22, 1, 0.36, 1);
  ${({select}) => {
    if (select === "") return "";
    return `
      animation: diceBounce 0.35s ease-out;
    `;
  }}
`;
const Face = styled(IconPic)`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  ${({num}) => {
    switch(num) {
      case 1: return `transform: translateZ(20px);`
      case 2: return `transform: translateY(-20px) rotateX(90deg);`
      case 3: return `transform: translateX(20px) rotateY(90deg);`
      case 4: return `transform: translateX(-20px) rotateY(-90deg);`
      case 5: return `transform: translateY(20px) rotateX(270deg);`
      case 6: return `transform: translateZ(-20px) rotateY(-180deg);`
    }
  }}
`;
const Dice = ({
  color,
  successNum,
  num = 2,
  width = 50,
  isPlay,
  setMsg,
  setMsgOn,
  setShowDice,
  onClick,
  callback,
  bg = 0,
}) => {
  const context = useContext(AppContext);
  const diceCount = useRef(0);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  const diceColor = React.useMemo(() => {
    switch(color) {
      case "red":
        return "dice2";
      case "white":
        return "dice1";
      default:
        return "dice0";
    }
  }, [color]);
  const [diceSelect, setDiceSelect] = useState(Array.from({length: num}, (_) => ""));
  const [isSuccess, setIsSuccess] = useState(false);
  return (
    <Scene onClick={(e) => {
      e.stopPropagation();
      if (isPlay && diceCount.current >= isPlay || isSuccess) {
        setShowDice(false);
        return;
      }
      // 다시 굴리기
      if (diceSelect[0] !== "") {
        setDiceSelect(Array.from({length: num}, (_) => ""));
      } else {
        const countArr = diceSelect.map(() => Math.floor(Math.random() * 6) + 1);
        setMsgOn(true);
        if (util.getSum(countArr) >= successNum) {
          setIsSuccess(true);
          setMsg(gameData.msg.sentence['diceSuccess'][lang]);
        } else {
          setMsg(gameData.msg.sentence['diceFailed'][lang]);
        }
        setDiceSelect(countArr);
        callback && callback({
          diceArr: countArr,
          isHide: diceCount.current >= isPlay,
        });
        diceCount.current += 1;
      }
      onClick && onClick();
    }}>
      {successNum && <SuccessText code="t4" color="main" weight="bold">{gameData.msg.title.diceSum[lang] + ": " + successNum}</SuccessText>}
      <DiceGroup width={width}>
        {diceSelect.map((_, idx) => {
          return <RollContainer select={diceSelect[idx]} idx={idx} num={num} width={width} key={idx}>
            <DiceCore select={diceSelect[idx]}>
              <Face type={diceColor} idx={0} pic="icon200" num={1} />
              <Face type={diceColor} idx={1} pic="icon200" num={2} />
              <Face type={diceColor} idx={2} pic="icon200" num={3} />
              <Face type={diceColor} idx={3} pic="icon200" num={4} />
              <Face type={diceColor} idx={4} pic="icon200" num={5} />
              <Face type={diceColor} idx={5} pic="icon200" num={6} />
            </DiceCore>
        </RollContainer>
        })}
      </DiceGroup>
      <BackPic pic="img800" idx={74 + bg} />
    </Scene>
  );
}

export default Dice;