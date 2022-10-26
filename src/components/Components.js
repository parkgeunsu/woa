import styled from 'styled-components';

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