import { ChPic, IconPic } from 'components/ImagePic';
import styled from 'styled-components';

// .ch_list .list_chstyle{position:absolute;left:0;right:0;top:0;bottom:0;background-repeat:no-repeat;background-position:center 0;z-index:2;}

const ListRing = styled(ChPic)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
`;
const ListElement = styled(ChPic)`
  position: absolute;
  bottom: 20%;
`;
const ListCh = styled(ChPic)`
  position: absolute;
  top: 0;
  z-index: 1;
`;
const ListJobActionType = styled.div`
  position:absolute;left:3px;top:3px;width:20%;font-size:0;z-index:2;
`;
const ListJob = styled.span`
  display:inline-block;width:100%;padding-top:100%;z-index:5;
`;
const ListActionType = styled.span`
  display:block;position:relative;width:100%;padding-top:100%;background-repeat:no-repeat;background-position:center center;z-index:5;
`;
const ListFrame = styled(ChPic)`
  position: absolute;
  top: 0;
`;
const ListActionPoint = styled.div`
  position:absolute;left:50%;bottom:5px;transform:translate(-50%, 0);white-space:nowrap;text-shadow:1px 1px 1px #000;font-size:1rem;
`;
const StyledIconPic = styled(IconPic)`
  position: absolute;
  left: 0;
  top: 0;
`;

const ChListCard = ({
  saveCh,
  chData,
  type,
}) => {
  return (
    <>
      {/* <CharacterCard usedType="list" saveData={saveData} gameData={gameData} saveCharacter={data} gameSpd={gameSpd} /> */}
      <ListRing type="cardBack" pic="card" idx={0} />
      {type !== 'paging' && <ListElement type="elementBack" pic="card" idx={chData.element} />}
      <ListCh pic="ch" idx={chData.display} />
      <ListJobActionType>
        <ListJob>
          <IconPic type="job" isAbsolute={true} pic="icon100" idx={saveCh.job} />
        </ListJob>
        {saveCh.newActionType.map((data, idx) => {
          return (
            <ListActionType key={'action'+idx}>
              <StyledIconPic type="element" pic="icon100" idx={idx + 1} />
            </ListActionType>
          )
        })}
      </ListJobActionType>
      <ListFrame type="cardBack" pic="card" idx={1} />
      {type !== 'paging' && <ListActionPoint>{`${saveCh.actionPoint} / ${saveCh.actionMax}`}</ListActionPoint>}
    </>
  )
}

export default ChListCard;
