import { ChPic } from 'components/ImagePic';
import styled from 'styled-components';

const LoadingScreen = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.75);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  pointer-events: ${({ isVisible }) => (isVisible ? 'auto' : 'none')};
`;
const Loader = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
`;
const LoadingText = styled.div`
  color: ${({ theme }) => theme?.font?.main};
  font-size: 18px;
  font-family: 'myFont_number', 'myFont', 'myFont_e', 'myFont_j', sans-serif;
  letter-spacing: 1px;
  opacity: 0.9;
`;
const LoadingIcon = styled(ChPic)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-block;
  animation: bounce 0.6s infinite ease-in-out;
  &:nth-child(1) { animation-delay: 0s; }
  &:nth-child(2) { animation-delay: 0.15s; }
  &:nth-child(3) { animation-delay: 0.3s; }
  &:nth-child(4) { animation-delay: 0.45s; }
  &:nth-child(5) { animation-delay: 0.6s; }
`;
const Loading = ({
  gameData,
  lang,
  isVisible
}) => {
  const listArr = Array.from({length:5}, () => Math.floor(Math.random() * 89));
  return (
    <LoadingScreen isVisible={isVisible}>
      <Loader>
        {listArr.map((item, idx) => {
          return <LoadingIcon key={idx} isRound={10} pic={`chs${item}`} element={0}/>
        })}
      </Loader>
      <LoadingText>{gameData.msg.title.loading[lang]}</LoadingText>
    </LoadingScreen>
  );
};

export default Loading;
