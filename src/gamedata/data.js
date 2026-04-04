import { animals } from 'gamedata/animals';
import { city } from 'gamedata/city';
import { country } from 'gamedata/country';
import { drop } from 'gamedata/drop';
import { events } from 'gamedata/events';
import { exp } from 'gamedata/exp';
import { guide } from 'gamedata/guide';
import { ch } from 'gamedata/heros';
import { items } from 'gamedata/items';
import { job } from 'gamedata/job';
import { lineup } from 'gamedata/lineup';
import { msg } from 'gamedata/msg';
import { percent } from 'gamedata/percent';
import { actionPoint, prices } from 'gamedata/prices';
import { recipe } from 'gamedata/recipe';
import { relation } from 'gamedata/relation';
import { scenario } from 'gamedata/scenario';
import { ships } from 'gamedata/ships';
import { shop } from 'gamedata/shop';
import { mutateSkill, skill } from 'gamedata/skill';
import { timeDelay } from 'gamedata/timeDelay';
//etc 0, hole 100, colorance 200, upgrade 300, material 400
export const version = "0.1";
export const gameData = {
    itemType: [{ko:'',en:''},{ko:'투구',en:'Helm'},{ko:'갑옷',en:'Armor'},{ko:'무기',en:'Weapon'},{ko:'반지',en:'Ring'},{ko:'목걸이',en:'Necklace'}],
    stateName: ['lds', 'sta', 'str', 'spd', 'int', 'men', 'chr', 'luk'],
    battleStateName: ['hp','sp','rsp','atk','def','mak','mdf','rcv','spd','luk'],
    chMenu: ['display', 'state', 'animalSkill', 'skill', 'relation', 'item'],
    startCardArr: [
      {fix: [21], arr: [2,2], gold: 5000}, 
      {fix: [], arr: [5], gold: 10000}, 
      {fix: [], arr: [4,2,1], gold: 20000}, 
      {fix: [], arr: [3,3,2,1], gold: 30000}
    ], //시작 카드, 돈
    startMorality: 100, //도덕성
    country: country,
    countryEventsNum : 4, //지역이동시 기본 이벤트 값 4
    events: events,
    eventsHead: [0,1,6,6,2,2,3,3,4,5,7,7], //이벤트 지형 타입
    percent: percent,
    //레벨업시 체력 증가
    addGradeArr: [0, 1, 1.3, 1.6, 1.9, 2.2, 2.5, 2.8],//등급에 따른 추가 능력치
    addGradeState: [true,true,true,false,false,false,false,true,false,false],//등급가중치가 적용되는 전투스텟(체력, 행동, 행동회복, 공격, 방어, 술법공격, 술법방어, 체력회복, 속도, 행운), kg증가
    addLvArr: 0.01, //레벨당 능력치 증가
    addLvState: [true,false,false,false,false,false,false,true,false,false],//레벨업시 적용되는 전투스텟(체력, 행동, 행동회복, 공격, 방어, 술법공격, 술법방어, 체력회복, 속도, 행운), kg증가
    addGradeBaseState: [0,2,5,7,10,12,15],//등급차이에 따른 능력치 +
    possibleStageNum: [1,3,5,10],//시나리오 난이도 진행 가능한 카드영웅 갯수
    animalType: animals,
    animal_size: {//[최소, 최대, 극최대]
      kg:[
        [2,9,20],//고양이
        [100,200,300],//사자
        [90,310,400],//호랑이
        [2,40,110],//개
        [25,45,100],//늑대
        [20,200,1500],//물개
        [4,10,20],//너구리
        [0.1,2,90],//쥐
        [2,6,25],//토끼
        [10,40,50],//원숭이
        [70,270,400],//고릴라
        [25,70,100],//캥거루
        [200,500,1400],//소
        [200,650,2000],//곰
        [300,1000,1500],//말
        [300,450,800],//사슴
        [1500,2500,4000],//코뿔소
        [2500,6000,10000],//코끼리
        [700,1500,2500],//기린
        [0.1,2,5],//새
        [2,10,15],//독수리
        [5,20,500],//뱀
        [0.1,5,200],//도마뱀
        [200,500,1000],//거북이
        [0.1,1,5],//개구리
        [100,300,1000],//돼지
        [45,160,250],//양
        [1000,4500,6000],//하마
        [150,1000,1500],//악어
        [30,60,100],//하이에나
      ],
      size:[80,500],//[소,중]
    },
    ch: ch,
    job: job,//직업
    items: items,
    ships: ships,
    shop: shop,
    shopName: ['home','equipment','tool','accessory','composite','training','tradingPost','blacksmith','church','temple','mystery','shipyard','port','townHall','guild','tavern'],
    //grade (0하급poor, 1일반normal, 2매직magic, 3레어rare, 4에픽epic, 5유니크unique, 6레전드legend)
    itemGrade: {//'#999'
      txt_e: ['','Poor','Normal','Magic','Rare','Epic','Unique','Legend'],
      txt_k: ['','일반','매직','레어','에픽','세트','유니크','레전드'],
      color: ['','#fff','#0090ff','#ffcc15','#a800ff','#00a90c','#ff2a00','#ff8800']
    },
    chGradeColor:['#fff','#00a90c','#0090ff','#a800ff','#ffcc15','#ff2a00','#ff8000'],
    stateMax:[150,200,200,100,200,100,100,200],//능력치 최대치(통,체,완,순,지,정,매,운) 150,200,200,100,200,100,100,200
    hasMaxExp: [0,50000,80000,120000,150000,200000,250000,300000],
    exp: exp,
    gradeUp: [0,1,2,4,8,15,20],//인물 초월시재료
    element: [{ko:'쪼기',en:'Peck',jp:'ピグテール'},{ko:'할퀴기',en:'Claw',jp:'掻き分け'},{ko:'물기',en:'Bite',jp:'噛むこと'},{ko:'치기',en:'Hit',jp:'打撃'},{ko:'누르기',en:'Crush',jp:'押す'},{ko:'던지기',en:'Throw',jp:'投げる'},{ko:'빛',en:'Light',jp:'光'},{ko:'어둠',en:'Darkness',jp:'暗'},{ko:'물',en:'Water',jp:'水'},{ko:'불',en:'Fire',jp:'火'},{ko:'바람',en:'Wind',jp:'風'},{ko:'땅',en:'Earth',jp:'地'}],
    roulette: [
      {idx: 0, cardIdx: 0, type: 'enemies', amount: 3},
      {idx: 1, cardIdx: 1, type: 'enemies', amount: 4},
      {idx: 2, cardIdx: 2, type: 'enemies', amount: 5},
      {idx: 3, cardIdx: 3, type: 'enemies', amount: 6},
      {idx: 4, cardIdx: 0, type: 'lv', amount: 0},
      {idx: 5, cardIdx: 1, type: 'lv', amount: 0},
      {idx: 6, cardIdx: 2, type: 'lv', amount: 10},
      {idx: 7, cardIdx: 3, type: 'lv', amount: -10},
      {idx: 8, cardIdx: 4, type: 'lv', amount: 20},
      {idx: 9, cardIdx: 5, type: 'lv', amount: -20},
      {idx: 10, cardIdx: 6, type: 'lv', amount: 30},
      {idx: 11, cardIdx: 7, type: 'lv', amount: -30},
      {idx: 12, cardIdx: 0, type: 'map', amount: 'fire'},
      {idx: 13, cardIdx: 1, type: 'map', amount: 'city'},
      {idx: 14, cardIdx: 2, type: 'map', amount: 'water'},
      {idx: 15, cardIdx: 3, type: 'map', amount: 'forest'},
    ],
    lineup: lineup,
    skill: skill,
    mutateSkill: mutateSkill,
    relation: relation,
    scenario: scenario,
    prices: prices,
    actionPoint: actionPoint,
    guide: guide,
    recipe: recipe,
    msg: msg,
    city: city,
    drop: drop,
    timeDelay: timeDelay,
  }