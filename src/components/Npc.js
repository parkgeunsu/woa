import { Text } from 'components/Atom';
import { FlexBox } from "components/Container";
import { MergedPic } from "components/ImagePic";
import { util } from 'components/Libs';
import styled from "styled-components";

const NpcContainer = styled(FlexBox)`
	padding: 0 20px;
	height: 30%;
	width: calc(100% - 40px);
`;
const NpcPic = styled(FlexBox)`
	position: relative;
	width: auto;
	height: 100%;
	border-radius: 5%;
	overflow: hidden;
`;
const NpcMenu = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px;
	margin: 0 0 0 10px;
  flex: 1;
	height: 100%;
`;
const NpcTalk = styled(FlexBox)`
  display: inline-flex;
	padding: 3px 10px;
	border-radius: 20px;
	box-sizing: border-box;
  background: ${({selected}) => selected ? `rgba(255, 100, 0, 0.7);` : 'rgba(0, 0, 0, 0.7);'}
`;

const getShopType = (type) => {
	switch (type) {
		case 'equipment':
			return 1;
		case 'tool':
			return 2;
		case 'accessory':
			return 3;
		case 'inven':
			return 0;
    case 'training':
      return 5;
    case 'blacksmith':
      return 7;
		case 'tradingPost':
			return 6;
    case 'composite':
      return 4;
    case 'church':
      return 8;
    case 'temple':
      return 9;
    case 'mystery':
      return 10;
    case 'tavern':
      return 11;
    case 'shipyard':
      return 12;
    case 'port':
      return 13;
    case 'townHall':
      return 14;
    case 'guild':
      return 15;
    case 'gate':
      return 16;
    case 'prison':
      return 17;
		default:
			return 0;
	}
}
const Img = styled.img.attrs(
	({imgurl}) => ({
		src: imgurl 
	})
)`
	height: 100%;
`;
const Npc = ({
  shopType,
  gameData,
  imgSet,
  lang,
  selectTab,
  setSelectTab,
  navigate,
  onClick,
  onMenuClick,
}) => {
	return (
		<NpcContainer>
      <NpcPic onClick={() => {
        onClick && onClick();
      }}>
        <MergedPic isAbsolute pic="card" idx={40} />
        <MergedPic style={{
          width: "90%",
          height: "90%",
          left: "5%",
          top: "5%",
        }} isAbsolute pic="shop" idx={getShopType(shopType)} />
        <Img imgurl={imgSet.images.transparent800} />
      </NpcPic>
      <NpcMenu flexWrap="wrap" alignItems="flex-start" justifyContent="flex-start">
        {gameData.shop[shopType].menu.map((menuData, menuIdx) => {
          return (
            <NpcTalk selected={selectTab === menuIdx} key={`npcTalk${menuIdx}`} onClick={() => {
              if (menuIdx !== gameData.shop[shopType].menu.length - 1) {
                setSelectTab(menuIdx);
              } else {
                util.historyBack(navigate);
              }
              onMenuClick && onMenuClick(menuIdx);
            }}>
              <Text lineHeight={1.2} code="t2" align="center" color="main">{gameData.msg.building[menuData.text][lang]}</Text>
            </NpcTalk>
          )
        })}
      </NpcMenu>
    </NpcContainer>
	)
}

export default Npc;
