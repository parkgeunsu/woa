// import { util } from 'components/Libs';
import { IconPic } from 'components/ImagePic';
import styled from 'styled-components';
// import PopupContainer from 'components/PopupContainer';
// import Popup from 'components/Popup';
const setPos = (pos) => {
  return `
    ${pos[0]}: 10px;
    ${pos[1]}: 0px;
  `
}
const QuestionButton = styled.div`
  position:absolute;
  ${({pos}) => setPos(pos)};
  width:${({size}) => size}px;
  height:${({size}) => size}px;
  border-radius:${({size}) => size / 2}px;
  box-shadow:0 0 7px ${({shadowColor}) => shadowColor};
`;
const GuideQuestion = ({
  size,
  pos,
  onclick,
  colorSet,
}) => {
  const backImg = colorSet === 'black' ? 5 : 6;
  const shadowColor = colorSet === 'black' ? '#fff' : '#000';
  return (
    <QuestionButton size={size} pos={pos} shadowColor={shadowColor} backImg={backImg} onClick={onclick}>
      <IconPic type="commonBtn" pic="icon100" idx={backImg} />
    </QuestionButton>
  );
}

export default GuideQuestion;
