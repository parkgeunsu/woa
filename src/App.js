import { FlexBox } from 'components/Container';
import { MergedPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import { ColorSet, FontSet } from 'components/Theme';
import { AppContext } from 'contexts/app-context';
import 'css/keyFrameAnimation.css';
import 'css/root.css';
import { gameData, version } from 'gamedata/data';
import { saveNew } from 'gamedata/savedata';
import Battle from 'pages/Battle';
import Blacksmith from 'pages/Blacksmith';
import CardPlacement from 'pages/CardPlacement';
import Cards from 'pages/Cards';
import CharacterList from 'pages/CharacterList';
import Church from 'pages/Church';
import Composite from 'pages/Composite';
import Recruitment from 'pages/Gacha';
import GameMain from 'pages/GameMain';
import Gate from 'pages/Gate';
import Guild from 'pages/Guild';
import Header from 'pages/Header';
import Home from 'pages/Home';
import InvenShop from 'pages/InvenShop';
import Menu from 'pages/Menu';
import MoveEvent from 'pages/MoveEvent';
import Mystery from 'pages/Mystery';
import Port from 'pages/Port';
import Prison from 'pages/Prison';
import Sail from 'pages/Sail';
import Setup from 'pages/Setup';
import Shipyard from 'pages/Shipyard';
import StartGame from 'pages/StartGame';
import Tavern from 'pages/Tavern';
import Temple from 'pages/Temple';
import TownHall from 'pages/TownHall';
import TradingPost from 'pages/TradingPost';
import Training from 'pages/Training';
import React, { useEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import Loading from 'components/Loading';
import TestSkill from 'pages/TestSkill';

const RootContainer = styled.div`
  height: 100%;
  overflow-y: overlay;
  overflow-x: hidden;
`;
const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  background: #000;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    ${({location}) => location === "" ? `background: linear-gradient(#000, rgba(0,0,0,0), #000);` : ''}
  }
`;
const CountryBackground = styled(MergedPic)`
  margin: auto;
  padding-top: 175%;
  width: 100%;
  height: 0;
`;
const BackgroundShadow = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0.5;
  background: #000;
  z-index: 1;
`;
const ContentContainer = styled(FlexBox)`
  position: absolute;
  width: 100%;
  ${({location}) => location === "recruitment" || location === "battle" ? `
    top: 0px;
    height: 100%;
  ` : `
    top: 50px;
    height: calc(100% - 50px);
  `};
  overflow: hidden;
  z-index: 2;
  .skillEffect {
    position:absolute;left:0;top:0;right:0;bottom:0;z-index:10;pointer-events:none;
    .skillName{
      position:absolute;font-size:1.875rem;transform:translate(-50%,-50%);white-space:nowrap;transition:all 1s ease-in-out;
    }
    .oldName{
      left:50%;top:50%;opacity:0;text-align:center;
    }
    .skillLv{
      color:var(--color-w);
    }
    .skillExp{
      position:relative;
      margin:10px 0 0 0;
      width:150px;
      height:15px;
      border-radius:10px;
      overflow:hidden;
      background-color:var(--color-w);
      em{
        position:absolute;left:0;top:0;bottom:0;
        border-radius:10px;
        background-color:var(--color-blue);
      }
    }
    .newName1{
      left:0;top:100%;
    }
    .newName2{
      left:100%;top:0;
    }
    &.on .skillName{
      left:50%;top:50%;
    }
    &.fadeIn .skillName{
      opacity:1;
    }
    &.fadeOut .skillName{
      opacity:0;
    }
    &.effect0{
      color:var(--color-w);
      text-shadow:0 0 5px var(--color-w),0 0 8px var(--color-w),0 0 20px var(--color-w);
    }
    &.effect1{
      color:var(--color-purple);
      text-shadow:0 0 5px var(--color-w),0 0 8px var(--color-purple),0 0 20px var(--color-purple);
    }
    &.effect2{
      color:var(--color-yellow);
      text-shadow:0 0 5px var(--color-w),0 0 8px var(--color-yellow),0 0 20px var(--color-yellow);
    }
    &.effect3{
      color:var(--color-blue);
      text-shadow:0 0 5px var(--color-w),0 0 8px var(--color-blue),0 0 20px var(--color-blue);
    }
    &.effect4{
      color:var(--color-red);
      text-shadow:0 0 5px var(--color-w),0 0 8px var(--color-red),0 0 20px var(--color-red);
    }
    &.effect5{
      color:var(--color-lightblue);
      text-shadow:0 0 5px var(--color-w),0 0 8px var(--color-lightblue),0 0 20px var(--color-lightblue);
    }
    &.effect6{
      color:var(--color-green);
      text-shadow:0 0 5px var(--color-w),0 0 8px var(--color-green),0 0 20px var(--color-green);
    }
  }
`;
const setCity = ({
  gameData,
  saveData,
  countryData,
  goodsData,
  classification,
  lang
}) => {
  const cityD = Array.from({length:countryData.length}, (v, idx) => {
    const crimeRate = Number((Math.random() * 0.9 + 0.1).toFixed(2));//범죄율 (일주일에 한번씩 랜덤 변동 0.1 ~ 1.0)
    return {
      idx: idx,
      cityName: countryData[idx].name[lang],
      price: Number((Math.random() * 1.9 + 0.1).toFixed(2)), //물가 (일주일에 한번씩 랜덤 변동 0.1 ~ 2.0)
      crimeRate: crimeRate, 
      tool: {
        price: 1,
        upgrade: [{idx:0},{idx:1},{idx:6},{idx:7}],
        etc: [{idx:20}, {idx:21}, {idx:22}, {idx: util.getStringToCountryIdx(countryData[idx].id) + 30}],
      },
      accessory: {
        price: 1,
        ring: Array.from({length:20}, () => {
          return {...util.getItem({
            saveData: false,
            gameData: gameData,
            changeSaveData: false,
            option: {
              type:'equip',
              items: 4,
              lv:Math.round(Math.random()*100),
              sealed:false,
            },
            isSave: false,
            lang:lang
          })}
        }),
        amulet: Array.from({length:20}, () => {
          return {...util.getItem({
            saveData: false,
            gameData: gameData,
            changeSaveData: false,
            option: {
              type:'equip',
              items: 5,
              lv:Math.round(Math.random()*100),
              sealed:false,
            },
            isSave: false,
            lang:lang
          })}
        }),
      },
      equipment: {
        price: 1,
        helm: Array.from({length:20}, () => {
          return {...util.getItem({
            saveData: false,
            gameData: gameData,
            changeSaveData: false,
            option: {
              type:'equip',
              items: 1,
              lv:Math.round(Math.random()*100),
              sealed:false,
            },
            isSave: false,
            lang:lang
          })}
        }),
        armor:Array.from({length:20}, () => {
          return {...util.getItem({
            saveData: false,
            gameData: gameData,
            changeSaveData: false,
            option: {
              type:'equip',
              items: 2,
              lv:Math.round(Math.random()*100),
              sealed:false,
            },
            isSave: false,
            lang:lang
          })}
        }),
        weapon:Array.from({length:20}, () => {
          return {...util.getItem({
            saveData: false,
            gameData: gameData,
            changeSaveData: false,
            option: {
              type:'equip',
              items: 3,
              lv:Math.round(Math.random()*100),
              sealed:false,
            },
            isSave: false,
            lang:lang
          })}
        }),
      },
      tradingPost: {
        price: 1,
        goods: countryData[idx].goods.map((goods, goodsIdx) => {
          return {
            idx: goods,
            num: goodsData[goods].numSize,
          }
        })
      },
      prison: {
        criminal: Array.from({length:Math.round(crimeRate * 10)}, () => {
          const crimeNum = Math.floor(Math.random() * 6);
          const ch = util.makeCard({
            heroArr: classification,
            gachaNum: 1,
            gachaType: "p",
            gameData: gameData,
            saveData: saveData,
            isPrison: true,
          }).chDataArr[0];
          const skills = [...ch.hasSkill.filter((hSkill) => {
            return !["", 0, 1, 2].includes(hSkill.idx);
          }), ...ch.animalSkill.flatMap((animalSkill) => {
            return animalSkill.filter((skill) => {
              return !["", 0, 1, 2].includes(skill.idx);
            })
          })]
          const equipGrade = ch.items.filter((item) => {
            return Object.keys(item).length > 0;
          })?.grade;
          const money = Math.floor(Math.random() * 100) * 100;
          const info = [
            [...skills.map((skill) => {
              return `hasSkill_${skill.idx}`;
            }), `totalSkillNum_${skills.length}`],
            [`hasEquipment_${equipGrade}`],
            [`hasGrade_${ch.grade}`,`hasJob_${ch.job}`,`hasBadge_${ch.animalBadge}`,`hasExp_${ch.hasExp}`],
            ["hasState_st0","hasState_st1","hasState_st2","hasState_st3","hasState_st4","hasState_st5","hasState_st6","hasState_st7"],
            [`hasKg_${ch.kg}`,`hasMoney_${money}`]
          ];
          return {
            crime: crimeNum,
            sentence: gameData.crime[crimeNum].sentence,
            ch: ch,
            info: info,
            arrestDate: new Date().getTime(),
            openInfo: [],
          }
        })
      },
      shipyard: {
        blueprint:[30],
        wood:[0,3,4,5,7],
        sail:[0,1,2,5],
        figure:[0,5,6,7,20,22,35,40,47],
        anchor:[0,1,2,6],
        cannon:[0,1,2,3,4,5,6]
      },
    }
  });
  return cityD;
}
const setDifficultLv = (gameData) => {
  const difficultLv = [],
    difficultCount = Math.floor(Math.random()*4);
  const level = [[
    50,50,
    40,40,40,40,
    30,30,30,30,30,
    20,20,20,20,20,20,20,20,
    10,10,10,10,10,10,10,10,10],
    [
    50,50,50,50,
    40,40,40,40,40,
    30,30,30,30,30,30,
    20,20,20,20,20,20,
    10,10,10,10,10,10,10],
    [
    50,50,50,50,50,50,50,
    40,40,40,40,40,40,
    30,30,30,30,30,30,
    20,20,20,20,20,
    10,10,10,10],
    [
    50,50,50,50,50,50,50,50,50,
    40,40,40,40,40,40,40,40,
    30,30,30,30,30,
    20,20,20,20,
    10,10]];
  gameData.country.regions.forEach((countryData, idx) => {
    const lvCount = Math.floor(Math.random()* level[difficultCount].length);//countryData.difficultLv;
    difficultLv[idx] = level[difficultCount][lvCount];
    level[difficultCount].splice(lvCount,1);
  });
  return difficultLv;
}
const classification = (gameData) => {
  const classification = {
    grade: [],
    country: [],
    countryGrade: [[],[],[],[],[],[],[],[],[],[],[],[]],
    job: [],
    cost: [],
    region: [],
    regionGrade:[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
  };
  classification.countryGrade[100] = [];
  classification.regionGrade[100] = [];
  gameData.ch.forEach((chData) => {
    if (!chData?.na1) return;
    if (!classification.grade[chData.grade]) {
      classification.grade[chData.grade] = [];
    }
    classification.grade[chData.grade].push(chData.idx);

    const chCountry = util.getCountryToIdx(chData.region);
    if (!chCountry) return;
    if (!classification.country[chCountry]) {
      classification.country[chCountry] = [];
    }
    classification.country[chCountry].push(chData.idx);
    if (!classification.countryGrade[chCountry][chData.grade]) {
      classification.countryGrade[chCountry][chData.grade] = [];
    }
    classification.countryGrade[chCountry][chData.grade].push(chData.idx);

    const chRegion = util.getRegionToIdx(chData.region);
    if (!classification.region[chRegion]) {
      classification.region[chRegion] = [];
    }
    classification.region[chRegion].push(chData.idx);
    if (!classification.regionGrade[chRegion][chData.grade]) {
      classification.regionGrade[chRegion][chData.grade] = [];
    }
    classification.regionGrade[chRegion][chData.grade].push(chData.idx);

    if (!classification.job[chData.job[0]]) {
      classification.job[chData.job[0]] = [];
    }
    classification.job[chData.job[0]].push(chData.idx);

    if (!classification.cost[chData.cost]) {
      classification.cost[chData.cost] = [];
    }
    classification.cost[chData.cost].push(chData.idx);
  });
  return classification;
}
const makeSaveData = (saveData) => {
  saveData.actionCh = {
    equipment: {idx:''},
    church0: {idx:''},
    church1: {idx:''},
    temple: {idx:''},
    mystery: {idx:''},
    tavern: {idx:''},
    townHall: {idx:''},
    guild: {idx:''},
    port: {idx:''},
    accessory: {idx:''},
    tool: {idx:''},
    shipyard: {idx:''},
    prison: {idx:''},
    tradingPost: {idx:''},
    blacksmith: {idx:''},
    training: {idx:''},
    training2: {idx:''},
    composite: {idx:''},
    recruitment: {idx:''}
  }
  saveData.hasHeroNum = [];
  saveData.info = {
    id:'',
    lv:1,
    diamond:0,
    money:0,
    morality:100,
    memberNum:0,
    stay:0,
    leaderIdx:0,
    shipIdx:0,
  }
  saveData.entry = [0];
  saveData.lineup = {
    select: 0,
    save_slot: Array.from({length: 8}, () => {
      return {
        no: 0,
        leader: 0,
        entry: Array.from({length: 25}, () => ""),
        num: 0,
      }
    })
  }
  saveData.eventLineup = {
    select: 0,
    save_slot: Array.from({length: 8}, () => {
      return {
        no: 0,
        leader: 0,
        entry: Array.from({length: 25}, () => ""),
        num: 0,
      }
    })
  }
  return saveData;
}
const App = ({
  loadData,
}) => {
  const navigate = useNavigate();
  const locationObj = useLocation();
  const location = locationObj.pathname.split("/")[1];
  const [saveData, setSaveData] = useState({});
  const savedDataRef = useRef(saveData);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    savedDataRef.current = saveData;
  }, [saveData]);
  const [gameMode, setGameMode] = useState('');
  const slotIdx = 'all';
  const [showDim, setShowDim] = useState(false);
  const paramData = React.useMemo(() => {
    return util.loadData('historyParam');
  }, []);
  const isMoveEvent = React.useMemo(() => {
    return util.loadData("historyParam")?.moveEvent && Object.keys(util.loadData("historyParam").moveEvent).length > 0;
  }, []);
  const theme = {
    color: ColorSet,
    font: FontSet,
  }
  const classificationData = React.useMemo(() => {
    return classification(gameData);
  }, [gameData]);
  const [contextData, setContextData] = useState({
    images: loadData,
    gameData: {
      ...gameData,
    },
    setting: {
      lang: 'ko',
      bgm: true,
      efm: true,
      resolution: 1,
      bge: false,
      speed: 2,
    },
    classification: classificationData,
    difficultLv: setDifficultLv(gameData),
  });
  const setBack = (location) => {
    switch(location) {
      case "home":
        return {
          pic: "areaBack1",
          idx: 0
        };
      case "temple":
        return {
          pic: "areaBack1",
          idx: 1
        };
      case "cardPlacement":
        return {
          pic: "areaBack1",
          idx: 2
        };
      case "training":
        return {
          pic: "areaBack1",
          idx: 3
        };
      case "church":
        return {
          pic: "areaBack1",
          idx: 4
        };
      case "accessory":
        return {
          pic: "areaBack1",
          idx: 5
        };
      case "equipment":
        return {
          pic: "areaBack1",
          idx: 6
        };
      case "tradingPost":
        return {
          pic: "areaBack1",
          idx: 7
        };
      case "mystery":
        return {
          pic: "areaBack1",
          idx: 8
        };
      case "tool":
        return {
          pic: "areaBack1",
          idx: 9
        };
      case "blacksmith":
        return {
          pic: "areaBack1",
          idx: 10
        };
      case "tavern":
        return {
          pic: "areaBack1",
          idx: 11
        };
      case "townHall":
        return {
          pic: "areaBack1",
          idx: 12
        };
      case "guild":
        return {
          pic: "areaBack1",
          idx: 13
        };
      case "port":
        return {
          pic: "areaBack1",
          idx: 14
        };
      case "shipyard":
        return {
          pic: "areaBack1",
          idx: 15
        };
      case "composite":
        return {
          pic: "areaBack1",
          idx: 16
        };
      case "gate":
        return {
          pic: "areaBack1",
          idx: 17
        };
      case "prison":
        return {
          pic: "areaBack1",
          idx: 18
        };
      case "post":
        return {
          pic: "areaBack1",
          idx: 19
        };
      case "greeting":
        return {
          pic: "areaBack1",
          idx: 20
        };
      case "cardsList":
      case "cards":
        return {
          pic: "areaBack1",
          idx: 21
        }
      case "explorationLight":
        return {
          pic: "areaBack2",
          idx: 0
        };
      case "explorationDark":
        return {
          pic: "areaBack2",
          idx: 1
        };
      case "explorationRain":
        return {
          pic: "areaBack2",
          idx: 2
        };
      case "explorationFire":
        return {
          pic: "areaBack2",
          idx: 3
        };
      case "explorationWind":
        return {
          pic: "areaBack2",
          idx: 4
        };
      case "explorationSnow":
        return {
          pic: "areaBack2",
          idx: 5
        };
      case "explorationRock":
        return {
          pic: "areaBack2",
          idx: 6
        };
      case "explorationField":
        return {
          pic: "areaBack2",
          idx: 7
        };
      case "explorationTown":
        return {
          pic: "areaBack2",
          idx: 8
        };
      case "tower":
        return {
          pic: "areaBack2",
          idx: 9
        };
      case "explorationDesert":
        return {
          pic: "areaBack2",
          idx: 10
        };
      case "explorationJungle":
        return {
          pic: "areaBack2",
          idx: 11
        };
      case "explorationMarsh":
        return {
          pic: "areaBack2",
          idx: 12
        };
      case "explorationDungeon":
        return {
          pic: "areaBack2",
          idx: 13
        };
      case "sail":
        return {
          pic: "areaBack2",
          idx: 14
        };
      case "surrounded":
        return {
          pic: "areaBack2",
          idx: 15
        };
      case "battleWin":
        return {
          pic: "areaBack2",
          idx: 16
        };
      case "battleLose":
        return {
          pic: "areaBack2",
          idx: 17
        };
      case "treasure1":
        return {
          pic: "areaBack2",
          idx: 18
        };
      case "treasure2":
        return {
          pic: "areaBack2",
          idx: 19
        };
      case "message":
      case "setup":
        return {
          pic:"country",
          idx:location === "" ? Math.floor(Math.random() * 28) : util.getRegionToIdx(saveData?.info?.stay)
        };
      default:
        return {
          pic:"country",
          idx:location === "" ? Math.floor(Math.random() * 28) : util.getRegionToIdx(saveData?.info?.stay)
        };
    }
  }
  const changeSaveData = (updater) => {
    setSaveData(prev => {
      const nextData =
        typeof updater === 'function'
          ? updater(prev)
          : updater;

      util.saveData('saveData', nextData);
      return nextData;
    });

  }
  const setLang = (data) => {
    const setting = util.loadData('setting');
    setting.lang = data;
    util.saveData('setting', setting);
    const cloneContextData = {...contextData};
    cloneContextData.setting.lang = data;
    setContextData(cloneContextData);
  }
  const setSpeed = (data) => {
    const setting = util.loadData('setting');
    setting.speed = data * 2;
    util.saveData('setting', setting);
    let cloneContextData = {...contextData};
    cloneContextData.setting.speed = data * 2;
    setContextData(cloneContextData);
  }
  const setBgm = (data) => {
    const setting = util.loadData('setting');
    setting.bgm = data;
    util.saveData('setting', setting);
    let cloneContextData = {...contextData};
    cloneContextData.setting.bgm = data;
    setContextData(cloneContextData);
  }
  const setEfm = (data) => {
    const setting = util.loadData('setting');
    setting.efm = data;
    util.saveData('setting', setting);
    let cloneContextData = {...contextData};
    cloneContextData.setting.efm = data;
    setContextData(cloneContextData);
  }
  const setResolution = (data) => {
    const setting = util.loadData('setting');
    setting.resolution = data;
    util.saveData('setting', setting);
    let cloneContextData = {...contextData};
    cloneContextData.setting.resolution = data;
    setContextData(cloneContextData);
  }
  const setBge = (data) => {
    const setting = util.loadData('setting');
    setting.bge = data;
    util.saveData('setting', setting);
    let cloneContextData = {...contextData};
    cloneContextData.setting.bge = data;
    setContextData(cloneContextData);
  }
  // useEffect(() => {
  //   setCityData(city(gameData.city.port));
  // }, []); //하루가 지났을때 24시에 리셋
  useEffect(() => {
    // setContextData();
    const storageVer = util.loadData('version'),
      continueGame = util.loadData('continueGame'),
      saveData = util.loadData('saveData');
    let useSaveData = {}
    if (!continueGame || (typeof continueGame === 'object' && Object.keys(continueGame).length === 0) || saveData === null) { //신규 게임
      if (location !== '') {
        navigate('../');
      }
      const sData = makeSaveData(saveNew);
      sData.city = setCity({
        gameData: gameData,
        saveData: saveData,
        countryData: gameData.country.regions,
        goodsData: gameData.items.material,
        classification: classificationData,
        lang: contextData.setting.lang
      });
      util.saveData("saveData", sData);
      util.saveData("version", version);
      localStorage.setItem('lastCityReset', new Date().getTime().toString());
      util.saveData("setting", {
        lang: 'ko',
        bgm: true,
        efm: true,
        resolution: 1,
        bge: true,
        speed: 2,
      });
      util.saveData("history",[]);
      useSaveData = saveNew;
      setSaveData(saveNew);
    } else {
      if (storageVer !== version) { //데이터 버전이 다를 경우
        //버전 업데이트 통신
        useSaveData = util.loadData("saveData");
        util.saveData('version', version);
      } else {
        useSaveData = util.loadData("saveData");
      }
      const setting = util.loadData('setting');
      let cloneContextData = {...contextData};
      cloneContextData.setting = setting;
      setContextData(cloneContextData);
      
      const lastResetStr = localStorage.getItem('lastCityReset');
      const currentTime = new Date().getTime();
      const parsedTime = parseInt(lastResetStr, 10);
      const is7DaysPast = !lastResetStr || isNaN(parsedTime) || (currentTime - parsedTime >= 7 * 24 * 60 * 60 * 1000);
      
      if (is7DaysPast && useSaveData) {
        const cloneCity = setCity({
          gameData: gameData,
          saveData: saveData,
          countryData: gameData.country.regions,
          goodsData: gameData.items.material,
          classification: classificationData,
          lang: setting.lang,
        });
        cloneCity.prison = useSaveData.city.prison;
        useSaveData.city = cloneCity;
        util.saveData("saveData", useSaveData);
        localStorage.setItem('lastCityReset', currentTime.toString());
      }
      setSaveData(() => {
        if (useSaveData?.ch[0]?.bSt0) { //캐릭 전투능력치 설정이 안되어 있을 경우
          util.saveData('saveData', useSaveData);
          return useSaveData;
        } else {
          const sData = util.saveCharacter({
            saveData: useSaveData, 
            chSlotIdx: slotIdx,
            gameData: gameData,
          });
          util.saveData('saveData', sData);
          return sData;
        }
      });
      if (!location || location === 'start') {
        util.saveHistory({
          prevLocation: 'gameMain',
          navigate: navigate,
          callback: () => {},
          isNavigate: false,
        });
        
        // Restore last route if exists
        const lastRoute = localStorage.getItem('lastRoute');
        if (lastRoute && lastRoute !== '/' && lastRoute !== '/start') {
          navigate(lastRoute);
        }
      }
      // const history = util.loadData('history');
      // if ((history === null || history === undefined || history.length === 0 || history[0] === '') && 
      // changePage('gameMain', {aa: 1, bb: 2});
    }
    util.getTimeGap(useSaveData, changeSaveData);//시간 저장
    
    return () => {
      localStorage.setItem('closeTime', new Date());
    }
  }, []);

  useEffect(() => {
    // Save current route to restore it when webview is reloaded
    if (locationObj.pathname && locationObj.pathname !== '/' && locationObj.pathname !== '/start') {
      localStorage.setItem('lastRoute', locationObj.pathname + locationObj.search);
    }
  }, [locationObj.pathname, locationObj.search]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (!savedDataRef.current || !savedDataRef.current.ch) return;
      
      const currentData = JSON.stringify(savedDataRef.current);
      const cloneData = JSON.parse(currentData);
      let isChanged = false;
      
      const lastResetStr = localStorage.getItem('lastCityReset');
      const currentTime = new Date().getTime();
      const parsedTime = parseInt(lastResetStr, 10);
      
      if (!lastResetStr || isNaN(parsedTime) || (currentTime - parsedTime >= 7 * 24 * 60 * 60 * 1000)) {
        const lang = util.loadData('setting')?.lang || 'ko';
        const cloneCity = setCity({
          gameData: gameData,
          saveData: saveData,
          countryData: gameData.country.regions,
          goodsData: gameData.items.material,
          classification: classificationData,
          lang: lang,
        });
        cloneCity.prison = cloneData.city.prison;
        cloneData.city = cloneCity;
        localStorage.setItem('lastCityReset', currentTime.toString());
        isChanged = true;
      }
      
      cloneData.ch.forEach(ch => {
        const maxActionPoint = ch.actionMax || 50;
        if ((ch.actionPoint || 0) < maxActionPoint) {
          ch.actionPoint = (ch.actionPoint || 0) + 1;
          isChanged = true;
        }
      });
      
      if (isChanged) {
        changeSaveData(cloneData);
      }
    }, gameData.actionPoint.recoveryTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={contextData}>
        <RootContainer>
          <Wrapper location={location} className={`root ${location}`}>
            {location !== "battle" && location !== "" && location !== "main" && location !== "start" && (location !== "recruitment" && !paramData?.start?.begin) && location.indexOf('test') < 0 && (
              <Header saveData={saveData} setLoading={setLoading}/>
            )}
            <CountryBackground {...setBack(location)} />
            {showDim && (location === "gameMain" || location === "setup" || location === "chat") && <BackgroundShadow />}
            <ContentContainer location={location} direction="column" className="content">
              <Routes>
                <Route path="*" element={<Navigate to={isMoveEvent ? "/moveEvent" : "/gameMain"} replace />} />

                <Route path="/" element={<Menu type="new" />} />

                <Route path="/start" element={<StartGame saveData={saveData} changeSaveData={changeSaveData} setLang={setLang} setLoading={setLoading}/>} />

                <Route path="/setup" element={<Setup setLang={setLang} setSpeed={setSpeed} setBgm={setBgm} setEfm={setEfm} setRes={setResolution} setBge={setBge} setLoading={setLoading} />} />

                <Route path="/gameMain" element={<GameMain saveData={saveData} changeSaveData={changeSaveData} gameMode={gameMode} setGameMode={setGameMode} showDim={showDim} setShowDim={setShowDim} setLoading={setLoading} />} />

                <Route path="/home" element={<Home saveData={saveData} changeSaveData={changeSaveData} setLoading={setLoading} />} />

                <Route path="/church" element={<Church saveData={saveData} changeSaveData={changeSaveData} setLoading={setLoading} />} />

                <Route path="/temple" element={<Temple saveData={saveData} changeSaveData={changeSaveData} setLoading={setLoading} />} />

                <Route path="/guild" element={<Guild saveData={saveData} changeSaveData={changeSaveData} setLoading={setLoading} />} />

                <Route path="/port" element={<Port saveData={saveData} changeSaveData={changeSaveData} setLoading={setLoading} />} />

                <Route path="/townHall" element={<TownHall saveData={saveData} changeSaveData={changeSaveData} setLoading={setLoading} />} />

                <Route path="/tavern" element={<Tavern saveData={saveData} changeSaveData={changeSaveData} setLoading={setLoading} />} />

                <Route path="/mystery" element={<Mystery saveData={saveData} changeSaveData={changeSaveData} setLoading={setLoading} />} />

                <Route path="/gate" element={<Gate saveData={saveData} changeSaveData={changeSaveData} setGameMode={setGameMode} setShowDim={setShowDim} setLoading={setLoading} />} />

                <Route path="/prison" element={<Prison saveData={saveData} changeSaveData={changeSaveData} setLoading={setLoading} />} />

                <Route path="/cardsList" element={<CharacterList saveData={saveData} changeSaveData={changeSaveData} setLoading={setLoading} />} />

                <Route path="/cards" element={<Cards saveData={saveData} changeSaveData={changeSaveData} setLoading={setLoading} />} />

                <Route path="/inven" element={<InvenShop shopType="inven" saveData={saveData} changeSaveData={changeSaveData} setLoading={setLoading} />} />

                <Route path="/recruitment" element={<Recruitment saveData={saveData} changeSaveData={changeSaveData} setLoading={setLoading} />} />

                <Route path="/cardPlacement" element={<CardPlacement saveData={saveData} changeSaveData={changeSaveData} setLoading={setLoading} />} />

                <Route path="/battle" element={<Battle saveData={saveData} changeSaveData={changeSaveData} setLoading={setLoading} />} />

                <Route path="/moveEvent" element={<MoveEvent saveData={saveData} changeSaveData={changeSaveData} gameMode={gameMode} setGameMode={setGameMode} showDim={showDim} setShowDim={setShowDim} setLoading={setLoading} />} />

                <Route path="/blacksmith" element={<Blacksmith saveData={saveData} changeSaveData={changeSaveData} setLoading={setLoading} />} />

                <Route path="/training" element={<Training saveData={saveData} changeSaveData={changeSaveData} setLoading={setLoading} />} />

                <Route path="/composite" element={<Composite saveData={saveData} changeSaveData={changeSaveData} setLoading={setLoading} />} />

                <Route path="/equipment" element={<InvenShop shopType="equipment" saveData={saveData} changeSaveData={changeSaveData} setLoading={setLoading} />} />

                <Route path="/accessory" element={<InvenShop shopType="accessory" saveData={saveData} changeSaveData={changeSaveData} setLoading={setLoading} />} />

                <Route path="/tool" element={<InvenShop shopType="tool" saveData={saveData} changeSaveData={changeSaveData} setLoading={setLoading} />} />

                <Route path="/shipyard" element={<Shipyard saveData={saveData} changeSaveData={changeSaveData} setLoading={setLoading} />} />

                <Route path="/tradingPost" element={<TradingPost saveData={saveData} changeSaveData={changeSaveData} setLoading={setLoading} />} />

                <Route path="/map" element={<Sail saveData={saveData} changeSaveData={changeSaveData} setLoading={setLoading} />} />

                <Route path="/testSkill" element={<TestSkill />} saveData={saveData} />
              </Routes>
            </ContentContainer>
            <Loading gameData={gameData} lang={contextData.setting.lang} isVisible={isLoading} />
          </Wrapper>
        </RootContainer>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;

