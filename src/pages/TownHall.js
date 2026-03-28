
import { FlexBox } from 'components/Container';
import { util } from 'components/Libs';
import Npc from 'components/Npc';
import { AppContext } from 'contexts/app-context';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrap = styled(FlexBox)`
  position: absolute;
  inset: 0;
  padding: 0 0 20px 0;
  box-sizing: border-box;
  overflow: hidden;
`;

const TownHall = ({
	saveData,
	changeSaveData,
  setLoading,
}) => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [selectTab, setSelectTab] = useState(0);
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  const gameItem = React.useMemo(() => {
    return gameData.items;
  }, [gameData]);
  const sData = React.useMemo(() => Object.keys(saveData).length === 0 ? util.loadData('saveData') : saveData, [saveData]);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
			<Wrap direction="column">
				<Npc imgSet={imgSet} shopType={'townHall'} gameData={gameData} lang={lang} selectTab={selectTab} setSelectTab={setSelectTab} navigate={navigate} onClick={() => {
				}}/>
      </Wrap>
    </>
  );
};

export default TownHall;