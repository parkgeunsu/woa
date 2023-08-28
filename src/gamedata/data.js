import { animals } from 'gamedata/animals';
import { city } from 'gamedata/city';
import { colorSvg } from 'gamedata/colorSvg';
import { effect } from 'gamedata/effect';
import { exp } from 'gamedata/exp';
import { guide } from 'gamedata/guide';
import { ch } from 'gamedata/heros';
import { items } from 'gamedata/items';
import { itemsSvg } from 'gamedata/itemsSvg';
import { job } from 'gamedata/job';
import { lineup } from 'gamedata/lineup';
import { msg } from 'gamedata/msg';
import { actionPoint, prices } from 'gamedata/prices';
import { recipe } from 'gamedata/recipe';
import { relation } from 'gamedata/relation';
import { scenario } from 'gamedata/scenario';
import { cannonSvg, figureSvg, sailSvg, shipSvg } from 'gamedata/shipSvg';
import { ships } from 'gamedata/ships';
import { skill } from 'gamedata/skill';

export const version = "0.1";
export const gameData = {
    itemType: [{ko:'',en:''},{ko:'투구',en:'Helm'},{ko:'갑옷',en:'Armor'},{ko:'무기',en:'Weapon'},{ko:'반지',en:'Ring'},{ko:'목걸이',en:'Necklace'}],
    stateName: ["통솔", "체력", "완력", "민첩", "지력", "정신", "매력","행운"],
    addGradeArr: [1,1.2,1.3,1.4,1.5,1.6,1.8],//등급에 따른 추가 능력치
    possibleStageNum: [1,3,5,10],//시나리오 난이도 진행 가능한 카드영웅 갯수
    animal_type:animals,//'독0','빛1','암2','물3','불4','바람5','땅6'
    ch:ch,//face_d 얼굴방향, stateType 성장타입, awaken 각성속성
    job:job,//직업
    items:items,
    ships:ships,
    //grade (0하급poor, 1일반normal, 2매직magic, 3레어rare, 4에픽epic, 5유니크unique, 6레전드legend)
    itemGrade:{//'#999'
      txt_e:['Poor','Normal','Magic','Rare','Epic','Unique','Legend'],
      txt_k:['하급','일반','매직','레어','에픽','세트','유니크','레전드'],
      color:['#999','#fff','#0090ff','#ffcc15','#a800ff','#00a90c','#ff8800','#ff2a00']
    },
    chGradeColor:['#999','#fff','#00a90c','#0090ff','#ffcc15','#a800ff','#ff8000','#ff2a00'],
    stateMax:[150,240,240,120,240,120,120,200],//능력치 최대치(통,체,완,순,지,정,매,운) 150,200,200,100,200,100,100,200
    hasMaxExp:[0,50000,80000,120000,150000,200000,250000,300000],
    exp:exp,
    stateType:[
      {na:'후반전',arr:[2,4,6,8,10,12,14,16,18,20,20.5,21,21.5,22,22.5,23.5,24.5,25.5,26.5,27.5,29,30.5,32,33.5,35,37,39,41,43,45,47.5,50,52.5,55,57.5,60.5,63.5,66.5,69.5,72.5,76,79.5,83,86.5,90,94,98,102,106,110]},
      {na:'전반전',arr:[2,4,6,8,10,12,14,16,18,20,23.5,27,30.5,34,37.5,40.5,43.5,46.5,49.5,52.5,55,57.5,60,62.5,65,67,69,71,73,75,76,77,78,79,80,80.7,81.4,82.1,82.8,83.5,84,84.5,85,85.5,86,87,88,89,91,95]},
      {na:'표준성장',arr:[2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100]},
      {na:'예측불허',arr:[2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,105]}
    ],
    gradeUp:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,10,10,10,10,10,20,20,20,20,20,25,25,25,30,40],//인물 초월시재료
    element:[{ko:'찌르기',en:'Sting'},{ko:'할퀴기',en:'Claw'},{ko:'물기',en:'Bite'},{ko:'치기',en:'Hit'},{ko:'누르기',en:'Crush'},{ko:'던지기',en:'Throw'},{ko:'빛',en:'Light'},{ko:'어둠',en:'Darkness'},{ko:'물',en:'Water'},{ko:'불',en:'Fire'},{ko:'바람',en:'Wind'},{ko:'땅',en:'Earth'}],
    roulette:[
      {idx: 0, type: 'enemies', amount: 3},
      {idx: 1, type: 'enemies', amount: 4},
      {idx: 2, type: 'enemies', amount: 5},
      {idx: 3, type: 'enemies', amount: 6},
      {idx: 4, type: 'lv', amount: 0},
      {idx: 5, type: 'lv', amount: 0},
      {idx: 6, type: 'lv', amount: 10},
      {idx: 7, type: 'lv', amount: -10},
      {idx: 8, type: 'lv', amount: 20},
      {idx: 9, type: 'lv', amount: -20},
      {idx: 10, type: 'lv', amount: 30},
      {idx: 11, type: 'lv', amount: -30},
      {idx: 12, type: 'map', amount: 'fire'},
      {idx: 13, type: 'map', amount: 'city'},
      {idx: 14, type: 'map', amount: 'water'},
      {idx: 15, type: 'map', amount: 'land'},
    ],
    lineup:lineup,
    skill:skill,
    relation:relation,
    scenario:scenario,
    effect:effect,
    itemsSvg:itemsSvg,
    colorSvg:colorSvg,
    shipSvg:shipSvg,
    sailSvg:sailSvg,
    cannonSvg:cannonSvg,
    figureSvg:figureSvg,
    prices:prices,
    actionPoint:actionPoint,
    guide:guide,
    recipe:recipe,
    msg:msg,
    city:city,
  }