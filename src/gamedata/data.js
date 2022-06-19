import { animals } from 'gamedata/animals';
import { exp } from 'gamedata/exp';
import { ch } from 'gamedata/heros';
import { items } from 'gamedata/items';
import { job } from 'gamedata/job';
import { lineup } from 'gamedata/lineup';
import { relation } from 'gamedata/relation';
import { skill } from 'gamedata/skill';
import { scenario } from 'gamedata/scenario';
import { effect, effFrame } from 'gamedata/effect';

export const version = "0.1";
export const gameData = {
    stateName: ["통솔", "체력", "완력", "민첩", "지력", "정신", "매력"],
    animal_type:animals,//'독0','빛1','암2','물3','불4','바람5','땅6'
    ch:ch,//face_d 얼굴방향, stateType 성장타입, awaken 각성속성
    job:job,//직업
    items:items,
    //grade (0하급poor, 1일반normal, 2매직magic, 3레어rare, 4에픽epic, 5유니크unique, 6레전드legend)
    itemGrade:{//'#999'
      txt_e:['Poor','Normal','Magic','Rare','Epic','Unique','Legend'],
      txt_k:['하급','일반','매직','레어','에픽','유니크','레전드'],
      color:['#999','#fff','#0090ff','#f4ea19','#a800ff','#ff8800','#ff2a00']
    },
    chGradeColor:['#999','#fff','#00a90c','#0090ff','#f4ea19','#a800ff','#ff8000','#ff2a00'],
    stateMax:[150,240,240,120,240,120,120,30],//능력치 최대치
    hasMaxExp:[0,50000,80000,120000,150000,200000,250000,300000],
    exp:exp,
    stateType:[
      {na:'후반전',arr:[2,4,6,8,10,12,14,16,18,20,20.5,21,21.5,22,22.5,23.5,24.5,25.5,26.5,27.5,29,30.5,32,33.5,35,37,39,41,43,45,47.5,50,52.5,55,57.5,60.5,63.5,66.5,69.5,72.5,76,79.5,83,86.5,90,94,98,102,106,110]},
      {na:'전반전',arr:[2,4,6,8,10,12,14,16,18,20,23.5,27,30.5,34,37.5,40.5,43.5,46.5,49.5,52.5,55,57.5,60,62.5,65,67,69,71,73,75,76,77,78,79,80,80.7,81.4,82.1,82.8,83.5,84,84.5,85,85.5,86,87,88,89,91,95]},
      {na:'표준성장',arr:[2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100]},
      {na:'예측불허',arr:[2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,105]}
    ],
    gradeUp:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,10,10,10,10,10,20,20,20,20,20,25,25,25,30,40],//인물 초월시재료
    element_dmg:['일반',"쪼기","할퀴기","물기","때리기","누르기",'독','빛','암','물','불','바람','땅'],
    lineup:lineup,
    skill:skill,
    relation:relation,
    scenario:scenario,
    effect:effect,
  }