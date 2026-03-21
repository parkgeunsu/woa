import { Text } from 'components/Atom';
import { FlexBox } from 'components/Container';
import { ItemPic } from 'components/ImagePic';
import styled from 'styled-components';

const ItemLayoutContainer = styled.div`
  display: inline-block;
  ${({isEquip}) => isEquip ? `
    position: absolute;
    top: 0;
    left: 0;
  `
   : 'position: relative;'};
  margin: 1%;
  ${({isEquip, num, size}) => {
    if (isEquip) {
      return `
        padding-top: 0;
        width: 100%;
        height: 100%;
      `;
    } else if (num) {
      switch(num) {
        case 1:
          return `
            padding-top: 96%;
            width: 96%;
            height: 0;`;
        case 2:
          return `
            padding-top: 48%;
            width: 48%;
            height: 0;`;
        case 3:
          return `
            padding-top: 31%;
            width: 31%;
            height: 0;`;
        case 4:
          return `
            padding-top: 23%;
            width: 23%;
            height: 0;`;
        case 5:
          return `
            padding-top: 18%;
            width: 18%;
            height: 0;`;
        case 6:
          return `
            padding-top: 14.65%;
            width: 14.65%;
            height: 0;`;
        case 8:
          return `
            padding-top: 10.5%;
            width: 10.5%;
            height: 0;`;
        default:
          break;
      }
    } else {
      return `
        padding-top: ${size}px;
        width: ${size}px;
        height: 0;`
    }
  }}
  border-radius: ${({isEquip}) => isEquip ? 0 : '10%'};
  ${({num}) => num !== 1 && `box-shadow: 0px 0px 10px #000;`}
  overflow: hidden;
  background-image: ${({grade, part}) => {
    if (grade) {
      switch(grade) {
        case 1:
          return `radial-gradient(
            at 30% 30%,
            rgba(0, 0, 0, 0.3) 0%,
            var(--color-normal) 100%
          );`;
        case 2:
          return `radial-gradient(
            at 30% 30%,
            rgba(0, 0, 0, 0.3) 0%,
            var(--color-magic) 100%
          );`;
        case 3:
          return `radial-gradient(
            at 30% 30%,
            rgba(0, 0, 0, 0.3) 0%,
            var(--color-rare) 100%
          );`;
        case 4:
          return `radial-gradient(
            at 30% 30%,
            rgba(0, 0, 0, 0.3) 0%,
            var(--color-epic) 100%
          );`;
        case 5:
          return `radial-gradient(
            at 30% 30%,
            rgba(0, 0, 0, 0.3) 0%,
            var(--color-set) 100%
          );`;
        case 6:
          return `radial-gradient(
            at 30% 30%,
            rgba(0, 0, 0, 0.3) 0%,
            var(--color-unique) 100%
          );`;
        case 7:
          return `radial-gradient(
            at 30% 30%,
            rgba(0, 0, 0, 0.3) 0%,
            var(--color-legend) 100%
          );`;
        default:
          break;
      }
    } else {
      switch(part) {
        case "1":
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-red) 100%);`;
        case "2":
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-green) 100%);
          `;
        case "3":
          return `
            background-image:radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-blue) 100%);
          `;
        case "4":
          return `
            background-image:radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-lightblue) 100%);
          `;
        case "5":
          return `
            background-image:radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-yellow) 100%);
          `;
        case "10":
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-grey) 100%);
          `;
        case "11":
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-point1) 100%);
          `;
        case "12":
          return `
            background-image: radial-gradient(at 30% 30%,rgba(255,255,255,.5) 0%,var(--color-b) 100%);
          `;
        case "13":
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-point5) 100%);
          `;
        case "14":
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-point5) 100%);
          `;
        default:
          break;
      }
    }
  }}
  ${({sealed, impossible}) => {
    if (sealed) {
      return `
        & > div:first-of-type {
          filter: brightness(0.3) drop-shadow(0px 0px 1px #fff);
        }
        &:before {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          content: "?";
          z-index: 1;
          font-size: 1.25rem;
        }
      `
    } else {
      return impossible ? `filter: invert(1);` : '';
    }
  }}
  &:after {
    content:"";
    position: absolute;
    left: 50%;
    top: 2px;
    transform: translate(-50%, 0);
    color: #fff;
    text-shadow: -1px -1px 0 #fff, 1px 1px 0 #000;
  }
  ${({favorite}) => {
    switch(favorite) {
      case 1:
        return `
          content: "■";
          color: #ffff00;
        `;
      case 2:
        return `
          content: "♥";
          color: #ff0000;
        `;
      case 3:
        return `
          content: "●";
          color: #ff00ff;
        `;
      case 4:
        return `
          content: "♠";
          color: #00ffff;
        `;
      case 5:
        return `
          content: "♣";
          color: #00ff00;
        `;
      default:
        break;
    }
  }}
  ${({selected}) => {
    switch(selected) {
      case 0:
        return `
          outline: 2px solid #fff;
          box-shadow: 0 0 20px #fff;
        `;
      case 1:
        return `
          outline: 2px solid #ffac2f;
          box-shadow: 0 0 20px #ffac2f;
        `;
      case 2:
        return `
          outline: 2px solid #e14040;
          box-shadow: 0 0 20px #e14040;
        `;
      case 3:
        return `
          outline: 2px solid #a800ff;
          box-shadow: 0 0 20px #a800ff;
        `;
      case 4:
        return `
          outline: 2px solid #0090ff;
          box-shadow: 0 0 20px #0090ff;
        `;
      case 5:
        return `
          outline: 2px solid #00a90c;
          box-shadow: 0 0 20px #00a90c;
        `;
      default:
        break;
    }
  }}
`;

// .item_layout .pic .has_num {
//   display: block;
//   position: absolute;
//   right: 0;
//   bottom: 0;
//   padding: 2px 5px;
//   height: 20px;
//   line-height: 20px;
//   font-size: 0.75rem;
//   color: #fff;
//   background: rgba(0, 0, 0, 0.5);
//   border-radius: 10px 0 20px 0;
//   text-align: center;
// }
// .item_layout .pic .has_num.infinite {
//   font-size: 1rem;
//   font-weight: 600;
// }


const Hole = styled(FlexBox)`
  position: absolute;
  inset: 5%;
  z-index: 3;
  width: 90%;
  height: 90%;
  pointer-events: none;
	img{
    margin:2px 0 0 0;
    width:20px;
    height:20px;
    vertical-align:middle;
  }
`
const HoleSlot = styled.span`
  width: 15%;
  height: 0;
  padding-top: 15%;
  border-radius: 50%;
  background: ${({fixed}) => fixed ? `
    rgba(255, 172, 47, 0.7);
  ` : `
    rgba(0, 0, 0, 0.7);
  `}
`;
const DisplayText = styled(Text)`
  display: block;
  position: absolute;
  top: 2%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  text-align: center;
  pointer-events: none;
`;

const ItemLayout = ({
	gameItem,
  sealed,
  favorite,
  icon={
    type: "itemEtc",
    pic: "etc",
    idx: 0,
    mergeColor: "",
  },
  text,
  size="18%",
  num,
  selectColor,
  itemsHole,
  grade,
  part,
  isEquip,
  impossible,
  onClick,
}) => {
	return icon.idx !== undefined ? <ItemLayoutContainer 
    num={num}
    isEquip={isEquip}
    impossible={impossible}
    size={size}
    grade={grade}
    part={part}
    {...sealed && {sealed:sealed}}
    {...favorite && {favorite:favorite}}
    {...onClick && {onClick: onClick}}
    selected={selectColor}>
    <ItemPic type={icon.type} pic={icon.pic} idx={icon.idx} mergeColor={icon.mergeColor} isAbsolute>
      {text && <DisplayText code="t1" color="main">{text}</DisplayText>}
    </ItemPic>
    {itemsHole && <Hole alignItems="flex-end" justifyContent="space-between">
      {itemsHole.map((holeData, holeidx) => {
        const holePic = holeData !== 0 ? gameItem.hole[holeData.idx].display : 0;
        return (
          <HoleSlot className={`hole_slot hole${holeidx}`} fixed={holePic !== 0} key={`hole${holeidx}`}>
            <ItemPic className="pic" pic="itemEtc" type="hole" idx={holePic} />
          </HoleSlot>
        );
      })}
    </Hole>}
  </ItemLayoutContainer> : <ItemLayoutContainer 
    num={num}
    size={size}
    selected={selectColor}
    {...onClick && {onClick: onClick}}
  />
}

export default ItemLayout;