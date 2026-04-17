import { Text } from 'components/Atom';
import { FlexBox } from 'components/Container';
import { IconPic } from 'components/ImagePic';
import InfoGroup from 'components/InfoGroup';
import { util } from 'components/Libs';
import Popup from 'components/Popup';
import PopupContainer from 'components/PopupContainer';
import { AppContext } from 'contexts/app-context';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled(FlexBox)`
  position: absolute;
  top: 0;
  padding: 25px 20px 20px;
  box-sizing: border-box;
`;
const SkillGroup = styled.div`
  display: grid;
  padding: 0 5px;
  width: calc(100% - 10px);
  height: 100%;
  grid-template-columns: repeat(2, calc(50% - 2.5px));
  grid-template-rows: repeat(4, calc(25% - 5px));
  gap: 5px;
`;
const Skill = styled(FlexBox)`
  position: relative;
  box-sizing: border-box;
  filter: ${({possible}) => possible ? `` : `grayscale(100%) brightness(0.3);`};
  .lv{
    margin:0 5px 0 0;
  }
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    border: 10px solid transparent;
  }
`;
const SkillTypePic = styled(IconPic)`
  position: absolute;
  width: 20px;
  height: 20px;
  left: 0;
  top: 0;
  z-index: 2;
`;
const SkillInfo = styled(FlexBox)``;
const SkillIconWrap = styled(FlexBox)`
  position: relative;
  width: auto;
  flex-shrink: 0;
`;
const SkillTxt = styled(FlexBox)`
  margin: 0 0 0 5px;
  overflow-y: auto;
`;
const SkillName = styled(Text)`
`;
const ActionType = styled.div`
  position: relative;
  margin: 0 0 0 3px;
  width: 20px;
  height: 20px;
`;
const SkillIcon = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;
const SkillEff = styled(Text)`
  margin: 3px 0 0 0;
  width: 100%;
  text-align: left;
  line-height: 1.5;
  span[co0]{
    color: var(--color-green);
  }
  span[co1]{
    color: var(--color-purple);
  }
  span[co2]{
    color: var(--color-magic);
  }
  > * {
    margin: 0 0 0 5px;
    line-height: 1;
    vertical-align: baseline;
  }
  span[chance]{
    color: var(--color-yellow);
  }
`;
const LvBar = styled(FlexBox)`
  margin: 5px 0 0 0;
  height: auto;
  .exp{
    position: relative;
    width: 100%;
    height: 5px;
    border-radius: 5px;
    background: var(--color-grey);
    overflow: hidden;
  }
  .exp span{
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    background-color: var(--color-blue);
    border-radius: 0 20px 20px 0;}
`;
const CharacterSkill = ({
  saveData,
  chList,
  slotIdx,
}) => {
  const context = useContext(AppContext);
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);

  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  const saveCh = React.useMemo(() => chList ? chList[slotIdx] : saveData.ch[slotIdx] || {}, [chList, saveData, slotIdx]);
  const chName = React.useMemo(() => gameData.ch[saveCh.idx]?.na1[lang], [gameData, saveCh]);
  const [popupOn, setPopupOn] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupInfo, setPopupInfo] = useState({});
  const saveSkill = React.useMemo(() => saveCh.sk, [saveCh]);

  return (
    <>
      <Wrap className="skill scroll-y">
        <InfoGroup pointTitle={`Lv.${saveCh.lv} ${chName}`} title={`${gameData.msg.grammar.conjunction[lang]} ${gameData.msg.menu.jobSkill[lang]}`} guideClick={() => {
          setPopupType('guide');
          setPopupOn(true);
          setPopupInfo({
            data: gameData.guide["characterSkill"],
          });
        }}>
          <SkillGroup>
          {saveSkill && saveSkill.map((skillData, idx) => {
            const skData = gameData.skill[skillData.idx];
            if (!skData) return null;

            const { skillText, skillType, skillCate } = util.getSkillText({
              skill: skData,
              lv: skillData.lv - 1,
              lang: lang,
            });
            let actionPossibleSkill = 'possible';
            if (skillType > 0 && skillType < 7) {
              const isMatch = saveCh.newActionType?.some((type) => (type + 1) === skillType);
              actionPossibleSkill = isMatch ? 'possible' : '';
            }

            const skillKey = `skill-${skillData.idx}-${idx}`;

            return (
              <Skill key={skillKey} possible={actionPossibleSkill}direction="column">
                {skillData.idx !== 0 && <SkillTypePic pic="icon100" type="skillType" idx={skillCate} />}
                <SkillInfo>
                  <SkillIconWrap direction="column" justifyContent="flex-start">
                    <SkillIcon>
                      <IconPic pic="skill" idx={skData.idx} />
                    </SkillIcon>
                    {typeof skillData.exp === "number" && (
                      <LvBar>
                        <span className="exp">
                          <span className="gradient_dark" style={{ width: `${skillData.exp || 0}%` }}></span>
                        </span>
                      </LvBar>
                    )}
                  </SkillIconWrap>
                  <SkillTxt direction="column" justifyContent="flex-start">
                    <SkillName code="t0"  color="main" weight="600" lineHeight="1">
                      <span className="lv">LV.{skillData.lv}</span>{skData.na[lang]}
                    </SkillName>
                    {skData.element_type !== 0 && (
                      <ActionType>
                        <IconPic type="element" isAbsolute={true} isThumb={true} pic="icon100" idx={skData.element_type} />
                      </ActionType>
                    )}
                    <SkillEff code="t0"  color="main" className="txt" dangerouslySetInnerHTML={{ __html: skillText }} />
                  </SkillTxt>
                </SkillInfo>
              </Skill>
            );
          })}
          </SkillGroup>
        </InfoGroup>
      </Wrap>
      <PopupContainer>
        {popupOn && <Popup type={popupType} dataObj={popupInfo} showPopup={setPopupOn} />}
      </PopupContainer>
    </>
  );
}

export default CharacterSkill;
