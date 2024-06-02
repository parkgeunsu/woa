
export const fn = { //this.el = {};this.set_element();this.prototype();
  canvas: () => {
    CanvasRenderingContext2D.prototype.roundedRectangle = function(x, y, width, height, rounded) {
      // const radiansInCircle = 2 * Math.PI
      const halfRadians = (2 * Math.PI)/2
      const quarterRadians = (2 * Math.PI)/4  
      
      // top left arc
      this.arc(rounded + x, rounded + y, rounded, -quarterRadians, halfRadians, true)
      
      // line from top left to bottom left
      this.lineTo(x, y + height - rounded)
    
      // bottom left arc  
      this.arc(rounded + x, height - rounded + y, rounded, halfRadians, quarterRadians, true)  
      
      // line from bottom left to bottom right
      this.lineTo(x + width - rounded, y + height)
    
      // bottom right arc
      this.arc(x + width - rounded, y + height - rounded, rounded, quarterRadians, 0, true)  
      
      // line from bottom right to top right
      this.lineTo(x + width, y + rounded)  
    
      // top right arc
      this.arc(x + width - rounded, y + rounded, rounded, 0, -quarterRadians, true)  
      
      // line from top right to top left
      this.lineTo(x + rounded, y)  
    }
  },
  
  // changeId: (id) => {
  //   awb.data.userData.info.id = id;
  //   awb.data.save_data();
  //   awb.header.set_info();
  //   awb.ch.display();
  //   this.el.modal.classList.remove('on');
  // },
  // gacha: (n,type) => {
  //   awb.gacha.startGacha(n,type);
  //   this.el.modal.classList.remove('on');
  // }
}

export const util = { //this.loadImage();
  saveData: (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  },
  loadData: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
  removeData: (key) => {
    localStorage.removeItem(key);
  },
  saveHistory: ({location, navigate, callback, isNavigate, state}) => {
    let history = isNavigate ? util.loadData('history') || [] : [];
    setTimeout(() => {
      const prevLocation = history.length > 0 ? history[0] : '';
      if (location !== prevLocation.location) {
        history.unshift({
          location: location,
          state: state ? {
            ...state,
          } : '',
        });
        util.saveData('history', history);
      }
      callback && callback();
      navigate(`../${location}`, {state: state ? state : ''});
    }, 100);
  },
  historyBack: (navigate) => {
    const history = util.loadData('history');
    if (history === null || history === undefined || history.length === 0 || history[1] === '') {
      navigate('/');
    } else {
      navigate(`../${history[0].location}`, {
        state: {
          ...history[0].state,
        }
      });
      history.shift();//첫 history 삭제
      util.saveData('history', history);
    }
  },
  getEnemyState: (enemyData, gameData) => {
    let battleState_ = [];
    let enemy = {};
    const itemEff = util.getItemEff('', enemyData, gameData.items, true);
    for (const idx of gameData.stateName.keys()) {
      const st = gameData.ch[enemyData.idx]['st' + idx] || 0;
      battleState_[idx] = st;
    }
    battleState_[7] = gameData.ch[enemyData.idx].st3 + gameData.ch[enemyData.idx].st5 + gameData.ch[enemyData.idx].st6; //속도
    battleState_[8] = Math.round(Math.random() * 200); //행운
    const battleState = util.getTotalState(battleState_);
    //등급에 따른 추가 능력치
    let addGradePercent = 1;
    for (let i = gameData.ch[enemyData.idx].grade; i < enemyData.grade; ++i) {
      addGradePercent *= gameData.addGradeArr[i];
    }
    for (const [idx, bState] of battleState.entries()) {
      enemy = {
        ...enemy,
        ['bSt' + idx]: (idx !== 1 && idx !== 2 && idx !== 8 && idx !== 9) ? Math.round(bState * addGradePercent) : bState,
      }
    }
    for (let i = 0; i <= 100; ++i) {//아이템 능력치
      if (i < 10) {
        enemy['iSt' + i] = util.compileState(enemy['bSt' + i], itemEff[i]);
      } else if (i > 10 && i < 35) {//물리 공격
        enemy['iSt' + i] = util.compileState(0, itemEff[i]);
      } else if ((i > 37 && i < 41) || (i > 49 && i < 58) || (i > 59 && i < 68) || (i > 69 && i < 78)) {
        enemy['iSt' + i] = util.compileState(0, itemEff[i]);
      } else if (i === 100) {
        enemy['iSt' + i] = itemEff[i];
      }
    }
    for (const idx of gameData.element.keys()) {
      enemy = {
        ...enemy,
        ['el' + idx]: gameData.animal_type[gameData.ch[enemyData.idx].animal_type].element[idx],
      }
    }
    enemy = {
      ...enemy,
      stateLuk: battleState_[8],
    }
    return enemy;
  },
  saveLvState: (saveSlot, obj, saveData, gameData) => {//카드 획득시 레벨당 능력치 저장(캐릭터 저장된 슬롯번호, {카드등급, 아이템 이펙트등...})
    let battleState_ = [];
    let saveChSlot = saveData.ch[saveSlot] || obj.newState;
    for (const idx of gameData.stateName.keys()) {
      const st = gameData.ch[saveChSlot.idx]['st' + idx] || 0;
      saveChSlot['st' + idx] = st//현재능력치
      battleState_[idx] = st;
    }
    saveChSlot['st7'] = saveChSlot.stateLuk; //행운
    battleState_[7] = gameData.ch[saveChSlot.idx].st3 + gameData.ch[saveChSlot.idx].st5 + gameData.ch[saveChSlot.idx].st6; //속도
    battleState_[8] = saveChSlot.stateLuk; //행운
    //등급에 따른 추가 능력치
    let addGradePercent = 1;
    for (let i = gameData.ch[saveChSlot.idx].grade; i < obj.grade; ++i) {
      addGradePercent *= gameData.addGradeArr[i];
    }
    const battleState = util.getTotalState(battleState_);
    for (const [idx, bState] of battleState.entries()) {
      saveChSlot['bSt' + idx] = (idx !== 1 && idx !== 2 && idx !== 8 && idx !== 9) ? Math.round(bState * addGradePercent) : bState;
    }
    for (let i = 0; i <= 100; ++i) {//아이템 능력치
      if (i < 10) {
        saveChSlot['iSt' + i] = util.compileState(saveChSlot['bSt' + i], obj.itemEff[i]);
      } else if (i > 10 && i < 35) {//물리 공격
        saveChSlot['iSt' + i] = util.compileState(0, obj.itemEff[i]);
      } else if ((i > 37 && i < 41) || (i > 49 && i < 58) || (i > 59 && i < 68) || (i > 69 && i < 78)) {
        saveChSlot['iSt' + i] = util.compileState(0, obj.itemEff[i]);
      } else if (i === 100) {
        saveChSlot['iSt' + i] = obj.itemEff[i];
      }
    }
    for (const idx of gameData.element.keys()) {
      saveChSlot = {
        ...saveChSlot,
        ['el' + idx]: gameData.animal_type[gameData.ch[saveChSlot.idx].animal_type].element[idx],
      }
    }
    saveChSlot = {
      ...saveChSlot,
      itemEff: obj.itemEff,
      grade: obj.grade || gameData.ch[saveChSlot.idx].grade, //캐릭터 등급
    }
    return saveChSlot;
  },
  saveCharacter: (dataObj) => { //아이템 변경시 스텟저장
    // console.log(dataObj);
    const gameData = dataObj.gameData;
    const saveData = dataObj.saveData;
    const gameItem = dataObj.gameData.items;
    let saveCh = [
      ...dataObj.saveData.ch,
    ];
    if (typeof dataObj.chSlotIdx === "number") { //슬롯설정이 되면 개별 캐릭만 실행
      const itemEff = util.getItemEff(dataObj.chSlotIdx, saveCh, gameItem);
      saveCh[dataObj.chSlotIdx] = util.saveLvState(dataObj.chSlotIdx, {
        itemEff: itemEff,
        grade: gameData.ch[saveCh[dataObj.chSlotIdx].idx].grade,
        newState: {},
      }, saveData, gameData)
    } else if (dataObj.chSlotIdx === "all") { //슬롯설정이 없으면 전체 캐릭 실행
      for (const idx of saveCh.keys()) {
        const itemEff = util.getItemEff(idx, saveCh, gameItem);
        saveCh[idx] = util.saveLvState(idx, {
          itemEff: itemEff,
          grade: saveCh[idx].grade || gameData.ch[saveCh[idx].idx].grade,
          newState: {},
        }, saveData, gameData);
      }
    }
    return {
      ...saveData,
      ch: saveCh,
    }
  },
  getNonOverlappingNumber: (arr, num, n) => {
    let newArr = [],
      numArr = [...arr];
    for (let i = 0; i < num; ++i) {
      const newCount = Math.floor(Math.random() * numArr.length);
      newArr.push(numArr[newCount]);
      numArr.splice(newCount, 1);
    }
    if (typeof n === 'number') {
      newArr.push(n);
    }
    newArr.sort((a,b) => a-b);
    return newArr;
  },
  getLineNumber: (isVertical, lineNum) => {
    let newArr = [],
      line = isVertical ? [0,1,2,3,4] : [0,5,10,15,20];
    const selectLine = util.getNonOverlappingNumber(line, lineNum);
    selectLine.forEach((num) => {
      newArr = isVertical ? newArr.concat([num,num+5,num+10,num+15,num+20]) : newArr.concat([num,num+1,num+2,num+3,num+4]);
    });
    return newArr;
  },
  getItemEff: (idx, saveCh, gameItem, enemy) => {
    let saveItems = {};
    if (enemy) {
      saveItems = saveCh.items;
    } else {
      saveItems = typeof idx === 'number' ? saveCh[idx].items : [{}, {}, {}, {}, {}, {}, {}, {}];
    }
    let effData = [];
    for (const item of saveItems) {
      if(Object.keys(item).length !== 0){
        for (const eff of item.baseEff) {
          if (effData[eff.type] === undefined) {
            effData[eff.type] = eff.type === 100 ? {skList:[]} : {percent:0, number:0};
          }
          if (eff.type === 100) {
            effData[eff.type].skList.push({
              skIdx: eff.skIsx,
              skLv: eff.skLv,
            });
          } else {
            if (eff.num[item.grade - 1].indexOf('%') > 0) {
              effData[eff.type].percent = effData[eff.type].percent + parseInt(eff.num[item.grade - 1]);
            } else {
              effData[eff.type].number = effData[eff.type].number + parseInt(eff.num[item.grade - 1]);
            }
          }
        }
        for (const eff of item.addEff) {
          if (effData[eff.type] === undefined) {
            effData[eff.type] = eff.type === 100 ? {skList:[]} : {percent:0, number:0};
          }
          if (eff.type === 100) {
            effData[eff.type].skList.push({
              skIdx: eff.skIsx,
              skLv: eff.skLv,
            });
          } else {
            if (eff.num.indexOf('%') > 0) {
              effData[eff.type].percent = effData[eff.type].percent + parseInt(eff.num);
            } else {
              effData[eff.type].number = effData[eff.type].number + parseInt(eff.num);
            }
          }
        }
      }
      if(item.hole){
        for (const eff of item.hole) {
          if(eff) {
            const holeItem = gameItem.hole[eff.idx].eff;
            for (const holeData of holeItem) {
              if (effData[holeData.type] === undefined) {
                effData[holeData.type] = {percent:0, number:0};
              }
              if (holeData.num.indexOf('%') > 0){
                effData[holeData.type].percent = effData[holeData.type].percent + parseInt(holeData.num);
              } else {
                effData[holeData.type].number = effData[holeData.type].number + parseInt(holeData.num);
              }
            }
          }
        }
      }
      if (item.colorEff) {
        for (const eff of item.colorEff) {
          if (effData[eff.type] === undefined) {
            effData[eff.type] = {percent:0, number:0};
          }
          if (eff.num.indexOf('%') > 0) {
            effData[eff.type].percent = effData[eff.type].percent + parseInt(eff.num);
          } else {
            effData[eff.type].number = effData[eff.type].number + parseInt(eff.num);
          }
        }
      }
    }
    return effData;
  },
  getTotalState: (state) => {
    let stateArr = [];
    for ( let i = 0; i < 10; ++i ) {
      let num = 0;
      switch(i){
        case 0://HP
          num = state[1]*5+state[0]*3;
          break;
        case 1://SP
          num = state[7]*.2;
          break;
        case 2://RSP
          num = (state[7]*.2+2)*.2;
          break;
        case 3://ATK
          num = state[2]*3+state[0]*1.5;
          break;
        case 4://DEF
          num = state[0]*2+state[3]*2;
          break;
        case 5://MAK
          num = state[4]*2.5+state[5];
          break;
        case 6://MDF
          num = state[5]*2+state[3]*2;
          break;
        case 7://RCV
          num = state[6]+(state[0]*1.5+state[5]*1.5)*.2;
          break;
        case 8://SPD
          num = state[3]+state[0]*.3;
          break;
        case 9://LUK
          num = state[8];
          break;
        default:
          break;  
      }
      stateArr[i] = Math.round(num);
    }
    return stateArr;
  },
  getLineupSt: (lineupType, lineupNum, ch, peopleLength, gameData) => {
    let effArr = [];
    if (!ch) {
      effArr.push([[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]);
    } else {
      let arr = [0,0,0,0,0,0,0,0,0,0];
      const eff = gameData.lineup[lineupType].eff[lineupNum];
      const peopleNum = peopleLength - 1 < 0 ? 0 : peopleLength - 1;
      for(let v in eff){
        switch(v){
          case 'HP':
            arr[0] += eff[v][peopleNum];
            break;
          case 'SP':
            arr[1] += eff[v][peopleNum];
            break;
          case 'RSP':
            arr[3] += eff[v][peopleNum];
            break;
          case 'ATK':
            arr[3] += eff[v][peopleNum];
            break;
          case 'DEF':
            arr[4] += eff[v][peopleNum];
            break;
          case 'MAK':
            arr[5] += eff[v][peopleNum];
            break;
          case 'MDF':
            arr[6] += eff[v][peopleNum];
            break;
          case 'RCV':
            arr[7] += eff[v][peopleNum];
            break;
          case 'SPD':
            arr[8] += eff[v][peopleNum];
            break;
          case 'LUK':
            arr[9] += eff[v][peopleNum];
            break;
          default:
            break;
        }
      }
      let effNum = [];
      for (const [idx, effData] of arr.entries()) {
        effNum[idx] = [[], []];
        effNum[idx][0] = effData;
        effNum[idx][1] = effData * ((ch['bSt' + idx] + ch['iSt' + idx]) / 100);
        if(effData === isNaN()) {
          console.log('pgs');
        }
      }
      effArr.push(effNum);
    }
    return effArr;
  },
  setLineupSt: (dataObj, gameData, saveData, changeSaveData) => {
    let save = {...saveData};
    save.lineup.save_slot[dataObj.saveSlot].no = dataObj.lineupType;
    save.lineup.save_slot[dataObj.saveSlot].entry = dataObj.useList;
    let peopleLength = [0,0,0,0,0,0,0,0];
    const ConvertlineupStIdx = save.lineup.save_slot.map((data, idx) => { // 슬롯당 lineup eff번호
      const lineSlot = data.no;
      const lineupArea = gameData.lineup[lineSlot];
      let lineNum = [];
      for (const [entry_idx, entry_data] of data.entry.entries()) {
        if (entry_data !== '') {
          let line = '';
          for (const [line_idx, line_data] of lineupArea.entry.entries()) {
            for (const lineData of line_data) {
              if (lineData === entry_idx) {
                line = line_idx;
                break;
              }
            }
          }//엔트리 라인 확인
          lineNum.push(line);
          peopleLength[idx] ++;
        } else {
          lineNum.push('');
        }
      }
      return lineNum;
    });
    //lineupSt 저장
    let saveLineupSlot = [
      ...save.lineup.save_slot,
    ];
    ConvertlineupStIdx.forEach((data, idx) => {
      save.lineup.save_slot[idx].num = peopleLength[idx];
      const lineupType = save.lineup.save_slot[idx].no;
      saveLineupSlot[idx].eff = [];
      data.forEach((lineupData, lineupIdx) => {
        const chIdx = save.lineup.save_slot[idx].entry[lineupIdx];
        const ch = save.ch[chIdx];
        saveLineupSlot[idx].eff.push(...util.getLineupSt(lineupType, lineupData, ch, peopleLength[idx], gameData));
      });
    });
    save.lineup.save_slot = saveLineupSlot;
    changeSaveData(save);//라인업 캐릭 능력치 저장
  },
  compileState: (currentState, itemState) => {
    let num = 0;
    if (itemState !== undefined && itemState !== null) {
      if (itemState.percent !== 0) {
        num = Math.round(currentState * (itemState.percent / 100));
      }
      num += itemState.number;
      return num;
    } else {
      return 0;
    }
  },
  getPercentColor: (max, num) => { //능력치 높고낮음 처리컬러
    const percent = num / max,
      co = percent * 150;
    const gradeText = [
      {ko:'최저',en:'LT',jp:'最低'},
      {ko:'저',en:'L',jp:'低'},
      {ko:'중',en:'M',jp:'中'},
      {ko:'고',en:'H',jp:'高'},
      {ko:'최고',en:'HT',jp:'最高'},
    ];
    const percentNum = (() => {
      const co = percent * 100;
      if (co < 20) {
        return 0;
      } else if (co < 40) {
        return 1;
      } else if (co < 60) {
        return 2;
      } else if (co < 80) {
        return 3;
      } else {
        return 4;
      }
    })();
    return {
      stateColor: `hsl(${150 - co}deg 100% 50%)`,
      gradeText : gradeText[percentNum],
    };
  },
  getPercent: (total, current) => { //퍼센트 계산
    if(current === 0){
      return 0;
    }else{
        return Math.round(current/total*100);
    }
  },
  getTotalEff: (saveItems, gameData, socketEff) => {
    let totalEff = [];
    const grade = saveItems.hole ? saveItems.grade : 1;
    saveItems.baseEff.forEach((data, idx) => {
      if (totalEff[data.type] === undefined) {
        totalEff[data.type] = {type: data.type, base: 0, add:0, hole:0};
      }
      if (data.num.indexOf('~') >= 0) {
        totalEff[data.type].base = data.num;
      } else {
        totalEff[data.type].base += parseInt(data.num[grade - 1]);
      }
    });
    saveItems.addEff.forEach((data, idx) => {
      if (totalEff[data.type] === undefined) {
        totalEff[data.type] = data.type === 100 ? {type: data.type, skList: []} : {type: data.type, base: 0, add:0, hole:0};
      }
      if (data.type === 100) {
        totalEff[data.type].skList.push({
          lv: data.skLv[0],
          idx: data.skIdx,
        });
      } else {
        totalEff[data.type].add += parseInt(data.num[0]);
      }
    });
    if (socketEff) {
      socketEff.save.forEach((data, idx) => {
        if (data) {
          const holeItem = gameData.items.hole[data.idx].eff;
          holeItem.forEach((holeData, idx) => {
            if (totalEff[holeData.type] === undefined) {
              totalEff[holeData.type] = {type: holeData.type, base: 0, add:0, hole:0};
            }
            totalEff[holeData.type].hole += parseInt(holeData.num);
          });
        }
      });
    } else if (saveItems.hole) {
      saveItems.hole.forEach((data, idx) => {
        if (data) {
          const holeItem = gameData.items.hole[data.idx].eff;
          holeItem.forEach((holeData, idx) => {
            if (totalEff[holeData.type] === undefined) {
              totalEff[holeData.type] = {type: holeData.type, base: 0, add:0, hole:0};
            }
            totalEff[holeData.type].hole += parseInt(holeData.num);
          });
        }
      });
    }
    if (saveItems.colorEff) {
      saveItems.colorEff.forEach((data, idx) => {
        if (totalEff[data.type] === undefined) {
          totalEff[data.type] = {type: data.type, base: 0, add:0, hole:0};
        }
        totalEff[data.type].hole += parseInt(data.num[0]);
      });
    }
    return totalEff;
  },
  getEffectType: (type, lang) => {
    const nameLang = [
      {na:'HP',ko:'체력',en:'Health Point',jp:'体力'},
      {na:'SP',ko:'행동력',en:'Spcial Point',jp:'行動力'},
      {na:'RSP',ko:'행동회복',en:'Recover SP',jp:'行動回復'},
      {na:'ATK',ko:'공격력',en:'Attack',jp:'攻撃力'},
      {na:'DEF',ko:'방어력',en:'Defense',jp:'防御力'},
      {na:'MAK',ko:'술법공격력',en:'Magic Attack',jp:'術法攻撃力'},
      {na:'MDF',ko:'술법방어력',en:'Magic Defense',jp:'術法防御力'},
      {na:'RCV',ko:'회복력',en:'Recover HP',jp:'回復力'},
      {na:'SPD',ko:'속도',en:'Speed',jp:'速度'},
      {na:'LUK',ko:'행운',en:'Luck',jp:'幸運'},
      {na:'CATK',ko:'반격',en:'Counter ATK',jp:'カウンター'},
      {na:'PEK',ko:'쪼기',en:'Peck',jp:'ピグテール'},//11
      {na:'CLW',ko:'할퀴기',en:'Claw',jp:'掻き分け'},
      {na:'BIT',ko:'물기',en:'Bite',jp:'噛むこと'},
      {na:'HIT',ko:'치기',en:'Hit',jp:'打撃'},
      {na:'CRH',ko:'누르기',en:'Crush',jp:'押す'},
      {na:'THW',ko:'던지기',en:'Throw',jp:'投げる'},
      {na:'LT',ko:'빛속성',en:'Light Element',jp:'光属性'},//17
      {na:'DK',ko:'어둠속성',en:'Darkness Element',jp:'闇属性'},
      {na:'WT',ko:'물속성',en:'Water Element',jp:'水属性'},
      {na:'FR',ko:'불속성',en:'Fire Element',jp:'火属性'},
      {na:'WD',ko:'바람속성',en:'Wind Element',jp:'風属性'},
      {na:'EH',ko:'땅속성',en:'Earth Element',jp:'地属性'},
      {na:'ⓡPEK',ko:'쪼기저항',en:'Peck Resist',jp:'ピグテール抵抗'},//23
      {na:'ⓡCLW',ko:'할퀴기저항',en:'Claw Resist',jp:'掻き分け抵抗'},
      {na:'ⓡBIT',ko:'물기저항',en:'Bite Resist',jp:'噛むこと抵抗'},
      {na:'ⓡHIT',ko:'치기저항',en:'Hit Resist',jp:'打撃抵抗'},
      {na:'ⓡCRH',ko:'누르기저항',en:'Crush Resist',jp:'押す抵抗'},
      {na:'ⓡTHW',ko:'던지기저항',en:'Throw Resist',jp:'投げる抵抗'},
      {na:'ⓡLT',ko:'빛속성저항',en:'Light Element Resist',jp:'光属性抵抗'},//29
      {na:'ⓡDK',ko:'어둠속성저항',en:'Darkness Element Resist',jp:'闇属性抵抗'},
      {na:'ⓡWT',ko:'물속성저항',en:'Water Element Resist',jp:'水属性抵抗'},
      {na:'ⓡFR',ko:'불속성저항',en:'Fire Element Resist',jp:'火属性抵抗'},
      {na:'ⓡWD',ko:'바람속성저항',en:'Wind Element Resist',jp:'風属性抵抗'},
      {na:'ⓡEH',ko:'땅속성저항',en:'Earth Element Resist',jp:'地属性抵抗'},
      {},{},{},
      {na:'CRI',ko:'치명타',en:'Critical',jp:'クリティカル'},
      {na:'AVD',ko:'회피',en:'Avoidance rate',jp:'回避率'},
      {na:'HRT',ko:'적중율',en:'Hit rate',jp:'命中率'},
      {na:'RHP',ko:'HP회복',en:'HP Recovery',jp:'HP回復'},
      {na:'RSP',ko:'SP회복',en:'SP Recovery',jp:'SP回復'},
      {na:'RHSP', ko:'HP,SP회복',en:'HP,SP Recovery',jp:'HP,SP回復'},
      {na:'REV',ko:'부활',en:'Revive',jp:'復活'},
      {na:'REH',ko:'부활후 HP회복',en:'HP Recovery after Revive',jp:'復活後のHP回復'},
      {},
      {na:'PS',ko:'위치상태',en:'Position State',jp:'位置状態'},
      {na:'IV',ko:'무적',en:'Invincible',jp:'無敵'},
      {na:'IM',ko:'면역',en:'Immunity',jp:'免疫'},
      {na:'BD',ko:'출혈',en:'Bleeding',jp:'出血'},
      {na:'AC',ko:'중독',en:'Addicted',jp:'中毒'},
      {na:'PF',ko:'석화',en:'Petrification',jp:'石化'},
      {na:'CF',ko:'혼란',en:'Confusion',jp:'混乱'},
      {na:'ST',ko:'기절',en:'Stun',jp:'気絶'},
      {na:'TF',ko:'변이',en:'Transform',jp:'変異'},
      {na:'DT',ko:'즉사',en:'Immediate death',jp:'即死'},
      {na:'FZ',ko:'빙결',en:'Freezing',jp:'氷結'},
      {},{},
      {na:'ⓡBD',ko:'출혈저항',en:'Bleeding Resist',jp:'出血抵抗'},
      {na:'ⓡAC',ko:'중독저항',en:'Addicted Resist',jp:'中毒抵抗'},
      {na:'ⓡPF',ko:'석화저항',en:'Petrification Resist',jp:'石化抵抗'},
      {na:'ⓡCF',ko:'혼란저항',en:'Confusion Resist',jp:'混乱抵抗'},
      {na:'ⓡST',ko:'기절저항',en:'Stun Resist',jp:'気絶抵抗'},
      {na:'ⓡTF',ko:'변이저항',en:'Transform Resist',jp:'変異抵抗'},
      {na:'ⓡDT',ko:'즉사저항',en:'Immediate death Resist',jp:'即死抵抗'},
      {na:'ⓡFZ',ko:'빙결저항',en:'Freezing Resist',jp:'氷結抵抗'},
      {},{},
      {na:'ⓘBD',ko:'출혈면역',en:'Bleeding immunity',jp:'出血免疫'},
      {na:'ⓘAC',ko:'중독면역',en:'Addicted immunity',jp:'中毒免疫'},
      {na:'ⓘPF',ko:'석화면역',en:'Petrification immunity',jp:'石化免疫'},
      {na:'ⓘCF',ko:'혼란면역',en:'Confusion immunity',jp:'混乱免疫'},
      {na:'ⓘST',ko:'기절면역',en:'Stun immunity',jp:'気絶免疫'},
      {na:'ⓘTF',ko:'변이면역',en:'Transform immunity',jp:'変異免疫'},
      {na:'ⓘDT',ko:'즉사면역',en:'Immediate death',jp:'即死免疫'},
      {na:'ⓘFZ',ko:'빙결면역',en:'Freezing immunity',jp:'氷結免疫'},
      {},{},
      {na:'ⓤBD',ko:'출혈해제',en:'Unbleed',jp:'出血解除'},
      {na:'ⓤAC',ko:'중독해제',en:'De-Addiction',jp:'中毒解除'},
      {na:'ⓤPF',ko:'석화해제',en:'De-petrification immunity',jp:'石化解除'},
      {na:'ⓤCF',ko:'혼란해제',en:'De-clutter',jp:'混乱解除'},
      {na:'ⓤST',ko:'기절해제',en:'Unstun',jp:'気絶解除'},
      {na:'ⓤTF',ko:'변이해제',en:'Unmutate',jp:'変異解除'},
      {},
      {na:'ⓤFZ',ko:'빙결해제',en:'Unfreeze',jp:'氷結解除'},
      {na:'ⓤALL',ko:'상태이상해제',en:'Clear anomaly',jp:'状態異常解除'},
      {},{},
      {},{},{},{},{},{},{},{},{},
      {na:'SK',ko:'스킬',en:'Skill',jp:'スキル'},
      {},{},{},{},{},{},{},{},{},
      {na:'WT',ko:'날씨',en:'Weather',jp:'天気'},
      {na:'WD',ko:'풍향',en:'Wind direction',jp:'風向き'},
    ]
    // let arr = ['체력(HP)','행동력(SP)','행동회복력(RSP)','공격력(ATK)','방어력(DEF)','술법공격력(MAK)','술법방어력(MDF)','회복력(RCV)','속도(SPD)','행운(LUK)','쪼기','할퀴기','물기','치기','누르기','던지기','','','','','',
    // '빛','어둠','물','불','바람','땅','빛 강화','어둠 강화','물 강화','불 강화',
    // '바람 강화','땅 강화','','','','','','','','',
    // '','','','','','','','','','',
    // '','','','','','','','','','',
    // '','','','','','','','','','',
    // '','','','','','','','','','',
    // '','','','','','','','','','',
    // '','','','','','','','','','진형'];
    // let arr_ko = ['체력','행동력','행동회복력','공격력','방어력','술법공격력','술법방어력','회복력','속도','행운','쪼기','할퀴기','물기','치기','누르기','던지기','','','','','',
    // '빛','어둠','물','불','바람','땅','빛 강화','어둠 강화','물 강화','불 강화',
    // '바람 강화','땅 강화','','','','','','','','',
    // '','','','','','','','','','',
    // '','','','','','','','','','',
    // '','','','','','','','','','',
    // '','','','','','','','','','',
    // '','','','','','','','','','',
    // '','','','','','','','','','진형'];
    // let arr_en = ['HP','SP','RSP','ATK','DEF','MAK','MDF','RCV','SPD','LUK','Sting','Claw','Bite','Hit','Crush','Throw','','','','','',
    // 'Light','Darkness','Water','Fire','Wind','Earth','Enhancement Light','Enhancement Darkness','Enhancement Water','Enhancement Fire',
    // 'Enhancement Wind','Enhancement Earth','','','','','','','','',
    // '','','','','','','','','','',
    // '','','','','','','','','','',
    // '','','','','','','','','','',
    // '','','','','','','','','','',
    // '','','','','','','','','','',
    // '','','','','','','','','','Formation'];
  
    // if (lang === 'en') {
    //   return arr_en[num];
    // } else if (lang === 'ko') {
    //   return arr_ko[num];
    // } else {
    //   return arr[num];
    // }
    return nameLang[type][lang ? lang : 'na'];
  },
  getEnemySkill: (data, gameData) => {
    const chData = gameData.ch[data.idx],
      animalSkill = gameData.animal_type[chData.animal_type].skill,
      jobSkill = gameData.job[chData.job[0]].skill,
      skillArr = [1, 2, ...animalSkill.lv0, ...jobSkill.lv0];//lv0 수정해야함
    const skillNums = [3,6,9,12,15],
      skillLength = skillNums[Math.floor(data.lv / 10) - 1];
    let skill = [{idx:1,lv:1,},{idx:2,lv:1,}]; //공격, 방어 기본 장착
    for(let i = 0; i < skillLength; ++i) {
      const Num = Math.floor(Math.random() * skillArr.length),
      skillIdx = skillArr[Num];
      let hasSkill = '';
      skill.forEach((data, idx) => {
        if (data.idx === skillIdx) {
          data.lv += 1;
          data.lv = data.lv > 5 ? 5 : data.lv;
          hasSkill = data;
          return;
        }
      });
      if (!hasSkill) {
        skill.push({
          idx: skillIdx,
          lv: 1,
        });
      }
    }
    return skill;
  },
  getSkill: (gameData, ch, slotIdx, saveData, changeSaveData) => {
    const chData = gameData.ch[ch.idx],
      animalSkill = gameData.animal_type[chData.animal_type].skill,
      jobSkill = gameData.job[chData.job].skill,
      skillArr = [...animalSkill, ...jobSkill];
    const skillNum = Math.floor(Math.random() * skillArr.length),
      skillIdx = skillArr[skillNum];
    const lvExp = [100,50,25,25];
    let hasSkill = '';
    saveData.ch[slotIdx].sk.forEach((data, idx) => {
      if (data.idx === skillIdx) {
        data.exp += lvExp[data.lv - 1];
        if (data.exp >= 100) {
          data.exp -= 100;
          data.lv += 1;
        }
        hasSkill = data;
        return;
      }
    });
    util.effect.skill(gameData.skill[skillIdx], hasSkill);
    if (!hasSkill) {
      saveData.ch[slotIdx].sk.push({
        idx: skillIdx,
        lv: 1,
        exp: 0,
      });
    }
    changeSaveData(saveData);
  },
  effect: {
    lvUp: () => {
      const lvUpContainer = document.getElementsByClassName('ch_card')[0];
      const lvElement = document.createElement('div');
      lvElement.setAttribute('class', 'lvEffect');
      if (lvUpContainer) {
        lvUpContainer.appendChild(lvElement);
        lvElement.innerHTML = '<span></span><span></span><span></span><span></span><span></span><span></span><span></span>';
      };
      setTimeout(() => {
        lvElement.classList.add("on");
        setTimeout(() => {
          const element = document.getElementsByClassName('lvEffect')[0];
          if(element) {
            element.remove();
          }
        }, 1600);
      }, 200);
    },
    skill: (skill, hasSkill) => {
      const skillContainer = document.getElementsByClassName('content')[0];
      const skillElement = document.createElement('div');
      skillElement.setAttribute('class', `skillEffect effect${skill.element_type}`);
      if (skillContainer) {
        skillContainer.appendChild(skillElement);
        if(!hasSkill){
          skillElement.innerHTML = `<div class="skillName newName1">${skill.na || '나몰라'} 획득</div><div class="skillName newName2">${skill.na || '나몰라'} 획득</div>`;
          setTimeout(() => {
            skillElement.classList.add("on");
            setTimeout(() => {
              skillElement.classList.add("fadeOut");
              setTimeout(() => {
                const element = document.getElementsByClassName('skillEffect')[0];
                if(element) {
                  element.remove();
                }
              }, 1000);
            }, 1200);
          }, 200);
        } else {
          skillElement.innerHTML = `<div class="skillName oldName">LV.${hasSkill.lv} ${skill.na || '나몰라'}<div class="skillExp"><em class="gradient_dark" style="width:${hasSkill.exp}%"></em></div></div>`;
          setTimeout(() => {
            skillElement.classList.add("fadeIn");
            setTimeout(() => {
              skillElement.classList.add("fadeOut");
              setTimeout(() => {
                const element = document.getElementsByClassName('skillEffect')[0];
                if(element) {
                  element.remove();
                }
              }, 1000);
            }, 1200);
          }, 200);
        }
      }
    }
  },
  // setNumber: (n) => {
  //   const sn = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
  //   return sn;
  // },
  // getBattleLineup: (n) => {
  //   return n;
  // },
  getStateName: (type) => {
    switch (type) {
      case 0:
        return 'hp';
      case 1:
        return 'sp';
      case 2:
        return 'rsp';
      case 3:
        return 'atk';
      case 4:
        return 'def';
      case 5:
        return 'mak';
      case 6:
        return 'mdf';
      case 7:
        return 'rcv';
      case 8:
        return 'spd';
      case 9:
        return 'luk';
      case 11:
        return 'peck';
      case 12:
        return 'claw';
      case 13:
        return 'bite';
      case 14:
        return 'hit';
      case 15:
        return 'press';
      case 16:
        return 'toss';
      case 17:
        return 'light';
      case 18:
        return 'dark';
      case 19:
        return 'water';
      case 20:
        return 'fire';
      case 21:
        return 'wind';
      case 22:
        return 'earth';
      case 23:
        return 'peckR';
      case 24:
        return 'clawR';
      case 25:
        return 'biteR';
      case 26:
        return 'hitR';
      case 27:
        return 'pressR';
      case 28:
        return 'tossR';
      case 29:
        return 'lightR';
      case 30:
        return 'darkR';
      case 31:
        return 'waterR';
      case 32:
        return 'fireR';
      case 33:
        return 'windR';
      case 34:
        return 'earthR';
      case 38:
        return 'critical';
      case 39:
        return 'avoid';
      case 40:
        return 'hit';
      case 41:
        return 'hp';//hp 회복
      case 42:
        return 'sp';//sp 회복
      case 43:
        return 'rhsp';//hp,sp 회복
      case 44:
        return 'hp';//부활
      case 45:
        return 'hp';//부활 회복
      case 47:
        return 'elevation';//높이상태
      case 48:
        return 'invincible';//무적
      case 49:
        return 'immunity';//면역
      case 50:
        return 'bleeding';//출혈
      case 51:
        return 'addicted';//중독
      case 52:
        return 'petrification';//석화
      case 53:
        return 'confusion';//혼란
      case 54:
        return 'stun';//기절
      case 55:
        return 'mutate';//변이
      case 56:
        return 'immediateDeath';//즉사
      case 57:
        return 'freezing';//빙결
      case 60:
        return 'bleedingR';//출혈
      case 61:
        return 'addictedR';//중독
      case 62:
        return 'petrificationR';//석화
      case 63:
        return 'confusionR';//혼란
      case 64:
        return 'stunR';//기절
      case 65:
        return 'mutateR';//변이
      case 66:
        return 'immediateDeathR';//즉사
      case 67:
        return 'freezingR';//빌결
      case 70:
        return 'bleedingI';//출혈
      case 71:
        return 'addictedI';//중독
      case 72:
        return 'petrificationI';//석화
      case 73:
        return 'confusionI';//혼란
      case 74:
        return 'stunI';//기절
      case 75:
        return 'mutateI';//변이
      case 76:
        return 'immediateDeathI';//즉사
      case 77:
        return 'freezingI';//빙결
      case 80:
        return 'bleedingR';//출혈해제
      case 81:
        return 'addictedR';//중독해제
      case 82:
        return 'petrificationR';//석화해제
      case 83:
        return 'confusionR';//혼란해제
      case 84:
        return 'stunR';//기절해제
      case 85:
        return 'mutateR';//변이해제
      case 87:
        return 'freezingR';//빙결해제
      case 88:
        return 'anomaliesR';//상태이상해제
      case 100:
        return 'skill';//스킬
      case 110:
        return 'weather';//날씨
      case 111:
        return 'windDirection';//풍향
      default:
        return type;
    }
  },
  getPercentNumber: (plusNum, nowNum) => {
    if (plusNum.indexOf('%') > 0) {
      return nowNum * (parseInt(plusNum) / 100);
    } else {
      return nowNum + plusNum;
    }
  },
  getEffectArea: ({
    isEnemy,
    type,
    n,
    allyPos,
    battleAlly,
    enemyPos,
    battleEnemy,
  }) => {//type: 효과타입, n: 사용위치(0~24)
    if (type > 100) {
      const unit = isEnemy ? battleEnemy : battleAlly,
        unitPos = isEnemy ? enemyPos : allyPos;
      let unitArr = [];
      unit.forEach((unitData, idx) => {
        if (unitData.animal_type === (type - 100)) {
          unitArr.push(unitPos[idx].pos);
        }
      });
      return unitArr.length === 0 ? [n] : unitArr;
    } else {
      switch (type) {
        case 1: // 단일
          return [n];
        case 2: // 가로2
          if (n%5 === 4) {
            return [n,n-1];
          } else {
            return  [n,n+1];
          }
        case 3:// 가로3
          if (n%5 === 0) {
            return [n,n+1,n+2];
          } else if (n%5 === 4){
            return [n,n-1,n-2];
          } else {
            return [n-1,n,n+1];
          }
        case 4: // 세로2
          if (n > 19) {
            return [n,n-5];
          } else {
            return [n,n+5];
          }
        case 5:// 세로3
          if (n < 5) {
            return [n,n+5,n+10];
          } else if (n > 19){
            return [n,n-5,n-10];
          } else {
            return [n-5,n,n+5];
          }
        case 6: // 가로행
          if (n < 5) {
            return [0,1,2,3,4];
          } else if (n < 10){
            return [5,6,7,8,9];
          } else if (n < 15){
            return [10,11,12,13,14];
          } else if (n < 20){
            return [15,16,17,18,19];
          } else {
            return [20,21,22,23,24];
          }
        case 7: // 세로열
          if (n%5 === 0) {
            return [0,5,10,15,20];
          } else if (n%5 === 1){
            return [1,6,11,16,21];
          } else if (n%5 === 2){
            return [2,7,12,17,22];
          } else if (n%5 === 3){
            return [3,8,13,18,23];
          } else {
            return [4,9,14,19,24];
          }
        case 8: // ┼ 십자5
          if (n<5) {
            if (n === 0) {
              return [n,n+1,n+5];
            } else if (n === 4){
              return [n,n-1,n+5];
            } else {
              return [n,n-1,n+1,n+5];
            }
          } else if (n>19) {
            if (n === 20) {
              return [n,n+1,n-5];
            } else if (n === 24){
              return [n,n-1,n-5];
            } else {
              return [n,n-1,n+1,n-5];
            }
          } else {
            if (n%5 === 0) {
              return [n,n-5,n+5,n+1];
            } else if (n%5 === 4){
              return [n,n-5,n+5,n-1];
            } else {
              return [n,n-5,n+5,n+1,n-1];
            }
          }
        case 9: // ┼ 십자9
          if (n < 5) {
            const line = [0,1,2,3,4];
            return new Set(line.concat([n,n+5,n+10,n+15,n+20]));
          } else if (n < 10) {
            const line = [5,6,7,8,9];
            return new Set(line.concat([n-5,n,n+5,n+10,n+15]));
          } else if (n < 15) {
            const line = [10,11,12,13,14];
            return new Set(line.concat([n-10,n-5,n,n+5,n+10]));
          } else if (n < 20) {
            const line = [15,16,17,18,19];
            return new Set(line.concat([n-15,n-10,n-5,n,n+5]));
          } else {
            const line = [20,21,22,23,24];
            return new Set(line.concat([n-20,n-15,n-10,n-5,n]));
          }
        case 10: // /5 대각선
          if (n === 0 || n === 6 || n === 12 || n === 18 || n === 24) {
            return [0,6,12,18,24];
          } else if (n === 1 || n === 7 || n === 13 || n === 19) {
            return [1,7,13,19];
          } else if (n === 5 || n === 11 || n === 17 || n === 23) {
            return [5,11,17,23];
          } else if (n === 2 || n === 8 || n === 14) {
            return [2,8,14];
          } else if (n === 10 || n === 16 || n === 22) {
            return [10,16,22];
          } else if (n === 3 || n === 9) {
            return [3,9];
          } else if (n === 15 || n === 21) {
            return [15,21];
          } else if (n === 4) {
            return [4];
          } else {
            return [20];
          }
        case 11: // \ 역 대각선5
          if (n === 4 || n === 8 || n === 12 || n === 16 || n === 20) {
            return [4,8,12,16,20];
          } else if (n === 3 || n === 7 || n === 11 || n === 15) {
            return [3,7,11,15];
          } else if (n === 9 || n === 13 || n === 17 || n === 21) {
            return [9,13,17,21];
          } else if (n === 2 || n === 6 || n === 10) {
            return [2,6,10];
          } else if (n === 14 || n === 18 || n === 22) {
            return [14,18,22];
          } else if (n === 1 || n === 5) {
            return [1,5];
          } else if (n === 19 || n === 23) {
            return [19,23];
          } else if (n === 0) {
            return [0];
          } else {
            return [24];
          }
        case 12: //세로열2줄 20
          if (n%5 === 0) {
            return [0,1,5,6,10,11,15,16,20,21];
          } else if (n%5 === 1){
            return [1,2,6,7,11,12,16,17,21,22];
          } else if (n%5 === 2){
            return [2,3,7,8,12,13,17,18,22,23];
          } else {
            return [3,4,8,9,13,14,18,19,23,24];
          }
        case 13: //세로열3줄 30
          if (n%5 === 0 || n%5 === 1) {
            return [0,1,2,5,6,7,10,11,12,15,16,17,20,21,22];
          } else if (n%5 === 2 || n%5 === 3){
            return [1,2,3,6,7,8,11,12,13,16,17,18,21,22,23];
          } else {
            return [2,3,4,7,8,9,12,13,14,17,18,19,22,23,24];
          }
        case 14: //⏊ 4
          if (n === 0) {
            return [0,1,2];
          } else if (n === 4) {
            return [2,3,4];
          } else if (n === 20) {
            return [16,20,21,22];
          } else if (n === 24) {
            return [18,22,23,24];
          } else if (n === 1 || n === 2 || n === 3) {
            return [n-1,n,n+1];
          } else if (n === 5 || n === 10 || n === 15) {
            return [n-5,n,n+1];
          } else if (n === 9 || n === 14 || n === 19) {
            return [n-5,n-1,n];
          } else {
            return [n-5,n-1,n,n+1];
          }
        case 15: //└┐7
          if (n%5 === 0) {
            if (n < 15) {
              return [0,5,10,11,12,17,22];
            } else {
              return [10,15,20];
            }
          } else if (n%5 === 1) {
            if (n < 15) {
              return [1,6,11,12,13,18,23];
            } else {
              return [10,11,16,21];
            }
          } else if (n%5 === 2) {
            if (n < 15) {
              return [2,7,12,13,14,19,24];
            } else {
              return [0,5,10,11,12,17,22];
            }
          } else if (n%5 === 3) {
            if (n < 15) {
              return [3,8,13,14];
            } else {
              return [1,6,11,12,13,18,23];
            }
          } else {
            if (n < 15) {
              return [4,9,14];
            } else {
              return [2,7,12,13,14,19,24];
            }
          }
        case 16: //┌┘7
          if (n%5 === 0) {
            if (n < 15) {
              return [0,5,10];
            } else {
              return [2,7,10,11,12,15,20];
            }
          } else if (n%5 === 1) {
            if (n < 15) {
              return [1,6,10,11];
            } else {
              return [3,8,11,12,13,16,21];
            }
          } else if (n%5 === 2) {
            if (n < 15) {
              return [2,7,10,11,12,15,20];
            } else {
              return [4,9,12,13,14,17,22];
            }
          } else if (n%5 === 3) {
            if (n < 15) {
              return [3,8,11,12,13,16,21];
            } else {
              return [13,14,18,23];
            }
          } else {
            if (n < 15) {
              return [4,9,12,13,14,17,22];
            } else {
              return [14,19,24];
            }
          }
        case 17: //卍17
          return [0,1,2,4,7,9,10,11,12,13,14,15,17,20,22,23,24];
        case 18: //가로행2줄 20
          if (n < 5) {
            return [0,1,2,3,4,5,6,7,8,9];
          } else if (n < 10){
            return [5,6,7,8,9,10,11,12,13,14];
          } else if (n < 15){
            return [10,11,12,13,14,15,16,17,18,19];
          } else {
            return [15,16,17,18,19,20,21,22,23,24];
          }
        case 19: //가로행3줄 30
          if (n < 10) {
            return [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
          } else if (n < 20){
            return [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
          } else {
            return [10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
          }
        case 20: //▦25 전체
          return [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
        case 21: //□9 정사각형9
          if (n === 0 || n === 1 || n === 2 || n === 5 || n === 10) {
            return [0,1,2,5,6,7,10,11,12];
          } else if (n === 3 || n === 4 || n === 9 || n === 14) {
            return [2,3,4,7,8,9,12,13,14];
          } else if (n === 6 || n === 7 || n === 8 || n === 11 || n === 12 || n === 13 || n === 16 || n === 17 || n === 18) {
            return [6,7,8,11,12,13,16,17,18];
          } else if (n === 15 || n === 20 || n === 21 || n === 22) {
            return [10,11,12,15,16,17,20,21,22];
          } else {
            return [12,13,14,17,18,19,22,23,24];
          }
        case 22: //ㅁ4 정사각형4
          if (n === 0 || n === 1 || n === 5 || n === 6) {
            return [0,1,5,6];
          } else if (n === 2 || n === 7) {
            return [1,2,6,7];
          } else if (n === 3 || n === 8) {
            return [2,3,7,8];
          } else if (n === 4 || n === 9) {
            return [3,4,8,9];
          } else if (n === 10 || n === 11) {
            return [5,6,10,11];
          } else if (n === 12) {
            return [6,7,11,12];
          } else if (n === 13) {
            return [7,8,12,13];
          } else if (n === 14) {
            return [8,9,13,14];
          } else if (n === 15 || n === 16) {
            return [10,11,15,16];
          } else if (n === 17) {
            return [11,12,16,17];
          } else if (n === 18) {
            return [12,13,17,18];
          } else if (n === 19) {
            return [13,14,18,19];
          } else if (n === 20 || n === 21) {
            return [15,16,20,21];
          } else if (n === 22) {
            return [16,17,21,22];
          } else if (n === 23) {
            return [17,18,22,23];
          } else {
            return [18,19,23,24];
          }
        case 23: //자신
          return [n];
        case 24: //원
          return [1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,21,22,23];
        case 25: //랜덤 5
          return util.getNonOverlappingNumber([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24], 5);
        case 26: //랜덤 10
          return util.getNonOverlappingNumber([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24], 10);
        case 27: //랜덤 15
          return util.getNonOverlappingNumber([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24], 15);
        case 28: //작은 마름모
          if (n === 0) {
            return [0,1,5];
          } else if (n === 4) {
            return [3,4,9];
          } else if (n === 20) {
            return [15,20,21];
          } else if (n === 24) {
            return [19,23,24];
          } else if (n === 1 || n === 2 || n === 3) {
            return [n-1,n,n+1,n+5];
          } else if (n === 5 || n === 10 || n === 15) {
            return [n-5,n,n+1,n+5];
          } else if (n === 9 || n === 14 || n === 19) {
            return [n-5,n-1,n,n+5];
          } else if (n === 21 || n === 22 || n === 23) {
            return [n-5,n-1,n,n+1];
          } else {
            return [n-5,n-1,n,n+1,n+5];
          }
        case 29: //큰 마름모
          if (n === 0 || n === 1 || n === 5) {
            return [0,1,2,5,6,7,8,10,11,12,16];
          } else if (n === 3 || n === 4 || n === 9) {
            return [2,3,4,6,7,8,9,12,13,14,18];
          } else if (n === 15 || n === 16 || n === 20) {
            return [6,10,11,12,15,16,17,18,20,21,22];
          } else if (n === 19 || n === 23 || n === 24) {
            return [8,12,13,14,16,17,18,19,22,23,24];
          } else {
            return [2,6,7,8,10,11,12,13,14,16,17,18,22];
          }
        case 30: //큰 링
          return [1,2,3,5,9,10,14,15,19,21,22,23];
        case 31: //랜덤 세로 2열
          return util.getLineNumber(true, 2);
        case 32: //랜덤 세로 3열
          return util.getLineNumber(true, 3);
        case 33: //랜덤 가로 2행
          return util.getLineNumber(false, 2);
        case 34: //랜덤 가로 3행
          return util.getLineNumber(false, 3);
        case 35: //x 5
          if (n === 0 || n === 2) {
            return [0,2,6,10,12];
          } else if (n === 4 || n === 14) {
            return [2,4,8,12,14];
          } else if (n === 20 || n === 10) {
            return [10,12,16,20,22];
          } else if (n === 24 || n === 22) {
            return [12,14,18,22,24];
          } else if (n === 1 || n === 3) {
            return [1,3,7,11,13];
          } else if (n === 5 || n === 15) {
            return [5,7,11,15,17];
          } else if (n === 9 || n === 19) {
            return [7,9,13,17,19];
          } else if (n === 21 || n === 23) {
            return [11,13,17,21,23];
          } else {
            return [n-6,n-4,n,n+4,n+6];
          }
        case 36: //x 9
          if (n === 0 || n === 24) {
            return [0,6,12,18,24];
          } else if (n === 1) {
            return [1,5,7,13,19];
          } else if (n === 2) {
            return [2,6,8,10,14];
          } else if (n === 3) {
            return [3,7,9,11,15];
          } else if (n === 4 || n === 20) {
            return [4,8,12,16,20];
          } else if (n === 5) {
            return [1,5,11,17,23];
          } else if (n === 6) {
            return [0,2,6,10,12,18,24];
          } else if (n === 7) {
            return [1,3,7,11,13,15,19];
          } else if (n === 8) {
            return [2,4,8,12,14,16,20];
          } else if (n === 9) {
            return [3,9,13,17,21];
          } else if (n === 10) {
            return [2,6,10,16,22];
          } else if (n === 11) {
            return [3,5,7,11,15,17,23];
          } else if (n === 12) {
            return [0,4,6,8,12,16,18,20,24];
          } else if (n === 13) {
            return [1,7,9,13,17,19,21];
          } else if (n === 14) {
            return [2,8,14,18,22];
          } else if (n === 15) {
            return [3,7,11,15,21];
          } else if (n === 16) {
            return [4,8,10,12,16,20,22];
          } else if (n === 17) {
            return [5,9,11,13,17,21,23];
          } else if (n === 18) {
            return [0,6,12,14,18,22,24];
          } else if (n === 19) {
            return [1,7,13,19,23];
          } else if (n === 21) {
            return [9,13,15,17,21];
          } else if (n === 22) {
            return [10,14,16,18,22];
          } else {//23
            return [5,11,17,19,23];
          }
        case 37: //ㅜ 4
          if (n === 0) {
            return [0,1,2,6];
          } else if (n === 4) {
            return [2,3,4,8];
          } else if (n === 20) {
            return [20,21,22];
          } else if (n === 24) {
            return [22,23,24];
          } else if (n === 1 || n === 2 || n === 3) {
            return [n-1,n,n+1,n+5];
          } else if (n === 5 || n === 10 || n === 15) {
            return [n,n+1,n+5];
          } else if (n === 9 || n === 14 || n === 19) {
            return [n-1,n,n+5];
          } else {
            return [n-1,n,n+1,n+5];
          }
        case 38: //랜덤 20
          return util.getNonOverlappingNumber([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24], 20);
        case 39: //바깥 1줄
          if (n === 10 || n === 11 || n === 15 || n === 16 || n === 20 || n  === 21) {
            return [0,5,10,15,20];
          } else if (n === 17 || n === 18 || n === 19 || n === 22 || n === 23 || n === 24) {
            return [20,21,22,23,24];
          } else if (n === 3 || n === 4 || n === 8 || n === 9 || n === 13 || n === 14) {
            return [4,9,14,19,24];
          } else {
            return [0,1,2,3,4];
          }
        case 40: //바깥 2줄
          if (n === 10 || n === 11 || n === 15 || n === 16 || n === 20 || n  === 21) {
            return [0,1,5,6,10,11,15,16,20,21];
          } else if (n === 17 || n === 18 || n === 19 || n === 22 || n === 23 || n === 24) {
            return [15,16,17,18,19,20,21,22,23,24];
          } else if (n === 3 || n === 4 || n === 8 || n === 9 || n === 13 || n === 14) {
            return [3,4,8,9,13,14,18,19,23,24];
          } else {
            return [0,1,2,3,4,5,6,7,8,9];
          }
        case 41: //바깥 3줄
          if (n === 10 || n === 11 || n === 15 || n === 16 || n === 20 || n  === 21) {
            return [0,1,2,5,6,7,10,11,12,15,16,17,20,21,22];
          } else if (n === 17 || n === 18 || n === 19 || n === 22 || n === 23 || n === 24) {
            return [10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
          } else if (n === 3 || n === 4 || n === 8 || n === 9 || n === 13 || n === 14) {
            return [2,3,4,7,8,9,12,13,14,17,18,19,22,23,24];
          } else {
            return [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
          }
        case 42: //n포함 랜덤 5
          return util.getNonOverlappingNumber([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24], 4, n);
        case 43: //n포함 랜덤 10
          return util.getNonOverlappingNumber([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24], 9, n);
        case 44: //n포함 랜덤 15
          return util.getNonOverlappingNumber([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24], 14, n);
        case 45: //n포함 랜덤 20
          return util.getNonOverlappingNumber([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24], 19, n);
        case 46:// 가로4
          if (n%5 === 3 || n%5 === 4) {
            if (n < 5) {
              return [1,2,3,4];
            } else if (n < 10) {
              return [6,7,8,9];
            } else if (n < 15) {
              return [11,12,13,14];
            } else if (n < 20) {
              return [16,17,18,19];
            } else {
              return [21,22,23,24];
            }
          } else {
            if (n < 5) {
              return [0,1,2,3];
            } else if (n < 10) {
              return [5,6,7,8];
            } else if (n < 15) {
              return [10,11,12,13];
            } else if (n < 20) {
              return [15,16,17,18];
            } else {
              return [20,21,22,23];
            }
          }
        case 47:// 세로4
          if (n%5 === 0) {
            if (n < 15) {
              return [0,5,10,15];
            } else {
              return [5,10,15,20];
            }
          } else if (n%5 === 1) {
            if (n < 15) {
              return [1,6,11,16];
            } else {
              return [6,11,16,21];
            }
          } else if (n%5 === 2) {
            if (n < 15) {
              return [2,7,12,17];
            } else {
              return [7,12,17,22];
            }
          } else if (n%5 === 3) {
            if (n < 15) {
              return [3,8,13,18];
            } else {
              return [8,13,18,23];
            }
          } else {
            if (n < 15) {
              return [4,9,14,19];
            } else {
              return [9,14,19,24];
            }
          }
        case 48:// 가로3x2
          if (n%5 === 0) {
            if (n < 5) {
              return [n,n+1,n+2,n+5,n+6,n+7];
            } else {
              return [n-5,n-4,n-3,n,n+1,n+2];
            }
          } else if (n%5 === 4){
            if (n < 5) {
              return [n,n-1,n-2,n+3,n+4,n+5];
            } else {
              return [n,n-1,n-2,n-5,n-6,n-7];
            }
          } else {
            if (n < 5) {
              return [n-1,n,n+1,n+4,n+5,n+6];
            } else {
              return [n-6,n-5,n-4,n-1,n,n+1];
            }
          }
        case 49:// 세로2x3
          if (n < 5) {
            if (n === 4) {
              return [3,4,8,9,13,14];
            } else {
              return [n,n+1,n+5,n+6,n+10,n+11];
            }
          } else if (n > 19){
            if (n === 24) {
              return [13,14,18,19,23,24];
            } else {
              return [n,n+1,n-4,n-5,n-9,n-10];
            }
          } else {
            if (n%5 === 4) {
              return [n-6,n-5,n-1,n,n+4,n+5];
            } else {
              return [n-5,n-4,n,n+1,n+5,n+6];
            }
          }
        case 50:// 가로4x2
          if (n%5 > 2) {
            if (n < 5) {
              return [1,2,3,4,6,7,8,9];
            } else if (n < 10) {
              return [6,7,8,9,11,12,13,14];
            } else if (n < 15) {
              return [11,12,13,14,16,17,18,19];
            } else {
              return [16,17,18,19,21,22,23,24];
            }
          } else {
            if (n < 5) {
              return [0,1,2,3,5,6,7,8];
            } else if (n < 10) {
              return [5,6,7,8,10,11,12,13];
            } else if (n < 15) {
              return [10,11,12,13,15,16,17,18];
            } else {
              return [15,16,17,18,20,21,22,23];
            }
          }
        case 51:// 세로2x4
          if (n < 5) {
            if (n%5 === 0) {
              return [0,1,5,6,10,11,15,16];
            } else if (n%5 === 1) {
              return [1,2,6,7,11,12,16,17];
            } else if (n%5 === 2) {
              return [2,3,7,8,12,13,17,18];
            } else {
              return [3,4,8,9,13,14,18,19];
            }
          } else {
            if (n%5 === 0) {
              return [5,6,10,11,15,16,20,21];
            } else if (n%5 === 1) {
              return [6,7,11,12,16,17,21,22];
            } else if (n%5 === 2) {
              return [7,8,12,13,17,18,22,23];
            } else {
              return [8,9,13,14,18,19,23,24];
            }
          }
        case 52: //n포함 랜덤 3
          return util.getNonOverlappingNumber([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24], 2, n);
        case 53: //n포함 랜덤 7
          return util.getNonOverlappingNumber([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24], 6, n);
        case 54: //작은└┐ 4
          if (n%5 === 0) {
            return [n,n+5,n+6,n+11];
          } else {
            return [n-6,n-1,n,n+5];
          }
        case 55: //작은┌┘ 4
          if (n%5 === 4) {
            return [n,n+4,n+5,n+9];
          } else {
            return [n-4,n,n+1,n+5];
          }
        case 56: //□9 정사각형16
          if (n === 0 || n === 1 || n === 2 || n === 5 || n === 6 || n === 7 || n === 10 || n === 11 || n === 12) {
            return [0,1,2,3,5,6,7,8,10,11,12,13,15,16,17,18];
          } else if (n === 3 || n === 4 || n === 8 || n === 9 || n === 13 || n === 14) {
            return [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19];
          } else if (n === 15 || n === 16 || n === 17 || n === 20 || n === 21 || n === 22) {
            return [5,6,7,8,10,11,12,13,15,16,17,18,20,21,22,23];
          } else {
            return [6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24];
          }
        case 57: //마름모라인 4
          if (n === 0) {
            return [1,5];
          } else if (n === 4) {
            return [3,9];
          } else if (n === 20) {
            return [15,21];
          } else if (n === 24) {
            return [19,23];
          } else if (n === 1 || n === 2 || n === 3) {
            return [n-1,n+1,n+5];
          } else if (n === 5 || n === 10 || n === 15) {
            return [n-5,n+1,n+5];
          } else if (n === 9 || n === 14 || n === 19) {
            return [n-5,n-1,n+5];
          } else if (n === 21 || n === 22 || n === 23) {
            return [n-5,n-1,n+1];
          } else {
            return [n-5,n-1,n+1,n+5];
          }
        case 58: //작은사각형라인 8
          if (n === 0 || n === 1 || n === 2 || n === 5 || n === 10) {
            return [0,1,2,5,7,10,11,12];
          } else if (n === 3 || n === 4 || n === 9 || n === 14) {
            return [2,3,4,7,9,12,13,14];
          } else if (n === 6 || n === 7 || n === 8 || n === 11 || n === 12 || n === 13 || n === 16 || n === 17 || n === 18) {
            return [6,7,8,11,13,16,17,18];
          } else if (n === 15 || n === 20 || n === 21 || n === 22) {
            return [10,11,12,15,17,20,21,22];
          } else {
            return [12,13,14,17,19,22,23,24];
          }
        case 59: //큰사각형라인 12
          if (n === 0 || n === 1 || n === 2 || n === 5 || n === 10 || n === 16 || n === 17) {
            return [0,1,2,3,5,8,10,13,15,16,17,18];
          } else if (n === 3 || n === 4 || n === 9 || n === 14 || n === 18) {
            return [1,2,3,4,6,9,11,14,16,17,18,19];
          } else if (n === 6 || n === 7 || n === 11 || n === 19 || n === 23 || n === 24) {
            return [6,7,8,9,11,14,16,19,21,22,23,24];
          } else if (n === 8 || n === 13 || n === 15 || n === 20 || n === 21 || n === 22) {
            return [5,6,7,8,10,13,15,18,20,21,22,23];
          } else {
            return [0,1,2,7,12,15,16,17];
          }
        case 60: //원형라인 12
          return [1,2,3,5,9,10,14,15,19,21,22,23];
        default:
          break;
      }
    }
  },
  setItemColor: (svgData, colorSet, id) => {
    let svg = svgData;
    const idPattern = new RegExp("==id==","g");
    svg = svg.replace(idPattern, id);
    for (const [idx, data] of colorSet.entries()) {
      const pattern = new RegExp("=="+idx+"==","g");
      svg = svg.replace(pattern, data);
    }
    return svg;
  },
  setShipColor: (svgData, wood, colorSet, id, sail, sailColor, cannon) => {
    let svg = svgData;
    const idPattern = new RegExp("==id==","g"),
      woodPattern = new RegExp("==wood==","g");
    svg = svg.replace(woodPattern, wood);
    for (const [idx, data] of sail.entries()) {
      const pattern = new RegExp("==sail"+idx+"==","g");
      svg = svg.replace(pattern, data);
    }
    for (const [idx, data] of cannon.entries()) {
      const pattern = new RegExp("==cannon"+idx+"==","g");
      svg = svg.replace(pattern, data);
    }
    for (const [idx, data] of colorSet.entries()) {
      const pattern = new RegExp("==w"+idx+"==","g");
      svg = svg.replace(pattern, data);
    }
    for (const [idx, data] of sailColor.entries()) {
      const pattern = new RegExp("==sColor"+idx+"==","g");
      svg = svg.replace(pattern, data);
    }
    svg = svg.replace(idPattern, id);
    return svg;
  },
  setFigureColor: (svgData, colorSet, color) => {
    let svg = svgData;
    if (typeof color === 'number') {
      for (const [idx, data] of colorSet[color].entries()) {
        const pattern = new RegExp("=="+idx+"==","g");
        svg = svg.replace(pattern, data);
      }
    } else {
      for (const [idx, data] of color.entries()) {
        const pattern = new RegExp("=="+idx+"==","g");
        svg = svg.replace(pattern, data);
      }
    }
    return svg;
  },
  getRgbColor: () => {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
  },
  getHslColor: (colorLight, opacity) => {
    const h = Math.round(Math.random() * 360);
    let s = 0;
    let l = 0;
    if (colorLight === "point") {
      s = Math.round(Math.random() * 20 + 80);
      l = Math.round(Math.random() * 35 + 35);
    } else if (colorLight === "light") {
      s = Math.round(Math.random() * 20 + 80);
      l = Math.round(Math.random() * 30 + 50);
    } else {
      s = Math.round(Math.random() * 20 + 80);
      l = Math.round(Math.random() * 30 + 20);
    }
    return `hsla(${h},${s}%,${l}%,${opacity})`;
  },
  getHslaToRgba: (hslaType) => {
    let hsla = hslaType.replace( /[hsla\(\)]| /gi, "" ); 
    hsla = hsla.split( "," ); 

    let H = parseFloat( hsla[0] ),
      S = parseFloat( hsla[1] ), 
      L = parseFloat( hsla[2] ),
      A = 0;

    if (hsla.length === 4) {
      A = parseFloat( hsla[ 3 ] ); 
    }

    const hueToRgb = (m1, m2, h) => { 
      h = (h < 0) ? h + 1 : (h > 1) ? h - 1 : h; 
      if (h * 6 < 1) {
        return m1 + (m2 - m1) * h * 6;
      }
      if (h * 2 < 1) {
        return m2;
      }
      if (h * 3 < 2) {
        return m1 + (m2 - m1) * (2 / 3 - h) * 6; 
      }
      return m1; 
    } 
    H = H / 360; 
    S = S / 100; 
    L = L / 100; 

    const m2 = (L <= 0.5) ? L * (S + 1) : L + S - L * S, 
      m1 = L * 2 - m2; 

    let R = hueToRgb(m1, m2, H + 1 / 3),
      G = hueToRgb(m1, m2, H ),
      B = hueToRgb(m1, m2, H - 1 / 3);
    R = parseInt(R * 255 , 10); 
    G = parseInt(G * 255 , 10); 
    B = parseInt(B * 255 , 10); 

    let rgbaType = (isNaN(A)) ? "rgb(" : "rgba("; 
    rgbaType += R + ", " + G + ", " + B; 
    rgbaType += (isNaN(A)) ? ")" : ", " + A + ")"; 

    return rgbaType; 
  },
  getRgbaToHsla: ( rgbaType ) =>{
    let rgba = rgbaType.replace( /[rgba\(\)]| /gi, "" ).split( "," ); 
    if (rgbaType.indexOf( "%" ) > -1 ){ 
      for (let i = 0; i < 3; i ++) {
        rgba[i] = Math.round(parseFloat(rgba[i]) * 2.55);
      }
    } 

    let R = parseInt(rgba[0] , 10),
      G = parseInt(rgba[1] , 10),
      B = parseInt(rgba[2] , 10),
      A = 0,
      S = 0,
      H = 0;

    if (rgba.length === 4) {
      A = parseFloat(rgba[3]);
    } 
    R = (R + 1) / 256; 
    G = (G + 1) / 256; 
    B = (B + 1) / 256; 

    const min = Math.min(R, G, B),
      max = Math.max(R, G, B),
      chroma = max - min;

    let L = ( max + min ) / 2; 

    if ( chroma !== 0 ) { 
      S = 1 - Math.abs(2 * L - 1); 
      S = chroma / S; 
      switch (max) { 
        case R: 
          H = ( (G - B) / chroma) % 6; 
          break;
        case G: 
          H = (B - R) / chroma + 2; 
          break;
        case B: 
          H = (R - G) / chroma + 4; 
          break;
        default:
          break;
      }
      H = H * 60; 
      if (H < 0) {
        H += 360; 
      }
    } 
    S = S * 100; 
    L = L * 100; 

    // 소수점 이하 둘째자리까지 구하기. 
    H = parseFloat(H.toFixed(2)); 
    S = parseFloat(S.toFixed(2)); 
    L = parseFloat(L.toFixed(2)); 

    let hslaType = (isNaN(A)) ? "hsl(" : "hsla("; 
    hslaType += H + ", " + S + "%, " + L + "%"; 
    hslaType += (isNaN(A)) ? ")" : ", " + A + ")"; 

    return hslaType; 
  },
  getItemGrade: () => {
    const gradeNum = Math.random();
    if (gradeNum < 0.05) { //에픽등급
      return 4;
    } else if (gradeNum < 0.2) { //레어등급
      return 3;
    } else if (gradeNum < 0.6) { //매직등급
      return 2;
    } else {
      return 1;
    }
  },
  getDistanceToEvent: (arr1, arr2, baseNum) => {//지도 거리 대비 이벤트 갯수
    if (!arr1 || !arr2) return '';
    baseNum = baseNum ?? 0;
    return Math.round(Math.sqrt(Math.pow(arr1[0] - arr2[0], 2) + Math.pow(arr1[1] - arr2[1], 2))) + baseNum;
  },
  getIdxToCountry: (idx) => {
    switch(idx) {
      case 0:
        return 'japan0';
      case 1:
        return 'japan1';
      case 2:
        return 'japan2';
      case 3:
        return 'korea0';
      case 4:
        return 'korea1';
      case 5:
        return 'korea2';
      case 6:
        return 'mongolia0';
      case 7:
        return 'mongolia1';
      case 8:
        return 'mongolia2';
      case 9:
        return 'mongolia3';
      case 10:
        return 'mongolia4';
      case 11:
        return 'china0';
      case 12:
        return 'china1';
      case 13:
        return 'china2';
      case 14:
        return 'china3';
      case 15:
        return 'china4';
      case 16:
        return 'china5';
      case 17:
        return 'china6';
      case 18:
        return 'china7';
      case 19:
        return 'saudiArabia0';
      case 20:
        return 'egypt0';
      case 21:
        return 'greece0';
      case 22:
        return 'italy0';
      case 23:
        return 'france0';
      case 24:
        return 'spain0';
      case 25:
        return 'portugal0';
      case 26:
        return 'unitedKingdom0';
      case 27:
        return 'unitedKingdom1';
      default:
        return '';
    }
  },
  getCountryToIdx: (country) => {
    switch(country) {
      case 'japan0':
        return 0;
      case 'japan1':
        return 1;
      case 'japan2':
        return 2;
      case 'korea0':
        return 3;
      case 'korea1':
        return 4;
      case 'korea2':
        return 5;
      case 'mongolia0':
        return 6;
      case 'mongolia1':
        return 7;
      case 'mongolia2':
        return 8;
      case 'mongolia3':
        return 9;
      case 'mongolia4':
        return 10;
      case 'china0':
        return 11;
      case 'china1':
        return 12;
      case 'china2':
        return 13;
      case 'china3':
        return 14;
      case 'china4':
        return 15;
      case 'china5':
        return 16;
      case 'china6':
        return 17;
      case 'china7':
        return 18;
      case 'saudiArabia0':
        return 19;
      case 'egypt0':
        return 20;
      case 'greece0':
        return 21;
      case 'italy0':
        return 22;
      case 'france0':
        return 23;
      case 'spain0':
        return 24;
      case 'portugal0':
        return 25;
      case 'unitedKingdom0':
        return 26;
      case 'unitedKingdom1':
        return 27;
      default:
        return '';
    }
  },
  getItem: ({
    saveData, gameData, changeSaveData, option, isSave, lang
  }) => {
    // console.log('option', option);
    let save = {...saveData};//장비 아이템 복사
    let itemLv = option.lv;
    const type = option.type || 'equip';
    let item = '',
      itemData = {},
      itemLength = 0,
      weaponType = 0;
    if (typeof option.items === 'object') {//object["3-4-3","3-4-8"]
      item = option.items[Math.floor(Math.random() * option.items.length)];
      if (type === 'equip') {
        const items = item.split('-');
        itemData = items[0] === "3" ? gameData.items[type][items[0]][items[1]][0][items[2]] : gameData.items[type][items[0]][0][0][items[1]];
        if (items[0] === "3") {
          weaponType = items[1];
        }
      } else {
        itemData = gameData.items[type][item];
      }
    } else if (typeof option.items === 'string'){//string"3-4-3"
      item = option.items;
      if (type === 'equip') {
        const items = item.split('-');
        itemData = items[0] === "3" ? gameData.items[type][items[0]][items[1]][0][items[2]] : gameData.items[type][items[0]][0][0][items[1]];
        if (items[0] === "3") {
          weaponType = items[1];
        }
      } else {
        itemData = gameData.items[type][item];
      }
    } else {//number(그룹중 선택)34
      if (type === 'equip') {//장비일 경우
        const cate = String(option.items);
        if (cate.length > 1) {
          if(cate[0] === "3") {//무기일 경우
            itemLength = gameData.items[type][cate[0]][cate[1]][0].length;
            itemData = gameData.items[type][cate[0]][cate[1]][0][Math.floor(Math.random() * itemLength)];
            weaponType = cate[1];
          } else {//무기가 아닐 경우
            itemLength = gameData.items[type][option.items][0].length;
            itemData = gameData.items[type][option.items][0][Math.floor(Math.random() * itemLength)];
          }
        } else {
          const itemTypeLength = gameData.items[type][cate].length,
            itemType = String(Math.floor(Math.random() * itemTypeLength));
          if(cate === "3") {//무기일 경우
            itemLength = gameData.items[type][cate][itemType][0].length;
            itemData = gameData.items[type][cate][itemType][0][Math.floor(Math.random() * itemLength)];
            weaponType = itemType;
          } else {
            itemLength = gameData.items[type][cate][0][0].length;
            itemData = gameData.items[type][cate][0][0][Math.floor(Math.random() * itemLength)];
            weaponType = itemType;
          }
        }
      } else {//장비가 아닐 경우
        itemLength = gameData.items[type].length;
        itemData = gameData.items[type][Math.floor(Math.random() * itemLength)];
      }
    }
    itemData = itemData ? itemData : gameData.items.equip[3][0][0][0];//보조아이템이 없을 경우 예외처리
    // if (type === 'equip') {
    //   const items = item.split('-');//아이템 부위(장비만 해당)
    //   itemData = items[0] === 3 ? gameData.items[type][items[0]][0][items[1]][items[2]] : gameData.items[type][items[0]][0][0][items[1]];
    // } else {
    //   item = option.items;
    // }
    // const itemIdx = Math.floor(Math.random() * item.length),//아이템 번호
    //const selectItem = item[itemIdx];
    const id = Math.random().toString(36).substring(2, 11);
    const selectItem = itemData;
    const grade = (option.grade > 1 ? option.grade : util.getItemGrade()) || util.getItemGrade();
    if (option.sealed) {
      const itemObj = {
        id: id,
        idx: selectItem.idx,
        part: selectItem.part,
        grade: grade,
        itemLv: itemLv,
        slot: 0,//아이템 홀착용 갯수
        hole: [],
        color: selectItem.color,
        baseEff: [{
          type: selectItem.eff[0].type,
          num: selectItem.eff[0].num[0] + ' ~ ' + selectItem.eff[0].num[1],
        }],
        addEff: [],
        mark: '',
        markNum: 0,
        modifier: {ko:'미확인',en:'unSealed',jp:'未確認'},
        weaponType: weaponType,
        sealed: true,
        favorite: 0,
      }
      save.items[type].unshift(itemObj);
      changeSaveData(save);
      return;
    }
    const darkColor = util.getHslColor('dark',1),
      lightColor = util.getHslColor('light',1);
    let colorArr = Math.random() < .5 ? [lightColor, darkColor] : [darkColor, lightColor];
    const color = selectItem.color.map((data, idx) => {
      if (idx < 2) {
        return colorArr[idx];
      } else {
        return util.getHslColor('point',1);
      }
    });
    const baseEff = selectItem.eff.map((data) => {
      let num = [];
      num[0] = String(Math.round(Math.random() * (Number(data.num[1]) - Number(data.num[0]))) + (Number(data.num[1]) - Number(data.num[0])));
      for (let i = 1; i < 4; ++i) {
        num[i] = String(Number(num[i - 1]) + Math.round(Number(data.num[0]) * 0.25 + Math.random() * (Number(data.num[0]) * .25)));
      }
      return {
        type: data.type,
        num: num,
      }
    });
    const addEff = [];
    const getAddEff = (grade, itemPart) => {
      const effList = [// 레어, 에픽, 매직
        [[100,200],[200,400],[100,1000]], //체력
        [[1,5],[5,10],[1,15]], //행동력
        [[1,3],[3,6],[1,10]], //행동회복력
        [[50,100],[100,200],[50,400]], //공격력
        [[50,100],[100,200],[50,400]], //방어력
        [[50,100],[100,200],[50,400]], //술공
        [[50,100],[100,200],[50,400]], //술방
        [[10,30],[30,60],[10,100]], //회복력
        [[1,5],[5,10],[1,15]], //속도
        [[10,20],[20,40],[10,60]], //행운
        [[1,10],[5,20],[1,30]], //반격 10
        //Math.round(Math.random() * 9) 일반능력치
        [[1,3],[2,7],[1,10]], //쪼기
        [[1,3],[2,7],[1,10]], //할퀴기
        [[1,3],[2,7],[1,10]], //물기
        [[1,3],[2,7],[1,10]], //치기
        [[1,3],[2,7],[1,10]], //누르기
        [[1,3],[2,7],[1,10]], //던지기
        [[1,5],[3,10],[1,13]], //쪼기 저항
        [[1,5],[3,10],[1,13]], //할퀴기 저항
        [[1,5],[3,10],[1,13]], //물기 저항
        [[1,5],[3,10],[1,13]], //치기 저항 20
        [[1,5],[3,10],[1,13]], //누르기 저항
        [[1,5],[3,10],[1,13]], //던지기 저항
        [[1,3],[2,7],[1,10]], //빛
        [[1,3],[2,7],[1,10]], //어둠
        [[1,3],[2,7],[1,10]], //물
        [[1,3],[2,7],[1,10]], //불
        [[1,3],[2,7],[1,10]], //바람
        [[1,3],[2,7],[1,10]], //땅
        [[1,5],[3,10],[1,13]], //빛 저항
        [[1,5],[3,10],[1,13]], //어둠 저항 30
        [[1,5],[3,10],[1,13]], //물 저항
        [[1,5],[3,10],[1,13]], //불 저항
        [[1,5],[3,10],[1,13]], //바람 저항
        [[1,5],[3,10],[1,13]], //땅 저항
        //Math.round(Math.random() * 5) + 11, Math.round(Math.random() * 5) + 23 물리,마법 타입
        //Math.round(Math.random() * 5) + 17, Math.round(Math.random() * 5) + 29 물리,마법 저항타입
        [],[],[],
        [[1,5],[3,10],[1,15]],//치명타 38
        [[1,5],[3,10],[1,15]],//회피
        [[1,5],[3,10],[1,15]],//적중률
        //Math.round(Math.random() * 2) + 38 or 10 치,회,적,반격 타입 
        [],[],[],[],[],[],[],[],[],
        [[1,10],[5,10],[1,15]],//출혈 50
        [[1,10],[5,10],[1,15]],//중독
        [[1,10],[5,10],[1,15]],//석화
        [[1,10],[5,10],[1,15]],//혼란
        [[1,10],[5,10],[1,15]],//기절
        [[1,10],[5,10],[1,15]],//변이
        [[1,10],[5,10],[1,15]],//즉사
        [[1,10],[5,10],[1,15]],//빙결
        [],[],
        [[1,10],[5,10],[1,15]],//출혈저항 60
        [[1,10],[5,10],[1,15]],//중독저항
        [[1,10],[5,10],[1,15]],//석화저항
        [[1,10],[5,10],[1,15]],//혼란저항
        [[1,10],[5,10],[1,15]],//기절저항
        [[1,10],[5,10],[1,15]],//변이저항
        [[1,10],[5,10],[1,15]],//즉사저항
        [[1,10],[5,10],[1,15]],//빙결저항
        //Math.round(Math.random() * 7) + 60 상태 저항타입
        [],[],
        [[0,1],[0,1],[0,1]],//출혈면역 70
        [[0,1],[0,1],[0,1]],//중독면역
        [[0,1],[0,1],[0,1]],//석화면역
        [[0,1],[0,1],[0,1]],//혼란면역
        [[0,1],[0,1],[0,1]],//기절면역
        [[0,1],[0,1],[0,1]],//변이면역
        [[0,1],[0,1],[0,1]],//즉사면역
        [[0,1],[0,1],[0,1]],//빙결면역
        //Math.round(Math.random() * 7) + 70 상태 면역타입
        [],[],[],
        [],[],[],[],[],[],[],[],[],[],
        [],[],[],[],[],[],[],[],[],
        [[1,2],[1,3],[1,1]],//스킬장착 100
      ];

      let effType = 0;
      const chance1 = Math.random();
      const armorEff = [0,4,6],
        weaponEff = [3,5],
        accEff = [1,2,7,8,9],
        etcEff = [0,8,9],
        skillEff = [278,279,280,281,287,289];
      //Math.round(Math.random() * 9) 일반능력치
      //Math.round(Math.random() * 7) + 60 상태 저항타입
      //Math.round(Math.random() * 5) + 17, Math.round(Math.random() * 5) + 29 물리,마법 저항타입
      //Math.round(Math.random() * 2) + 38 or 10 치,회,적,반격 타입
      //Math.round(Math.random() * 7) + 70 상태 면역타입
      //Math.round(Math.random() * 5) + 11, Math.round(Math.random() * 5) + 23 물리,마법 타입
      if (itemPart === '1') {//1:투구
        if (chance1 < 0.025) {//5% 물리,마법 공격 타입
          effType = Math.round(Math.random() * 5) + 11;
        } else if (chance1 < 0.05) {
          effType = Math.round(Math.random() * 5) + 23;
        } else if (chance1 < 0.12) {//10% 치,회,적,반격 타입
          effType = Math.round(Math.random() * 2) + 38;
        } else if (chance1 < 0.15){
          effType = 10;
        } else if (chance1 < 0.35) {//20% 상태 저항타입
          effType = Math.round(Math.random() * 7) + 60;
        } else if (chance1 < 0.55) {//40% 물리,마법 저항타입
          effType = Math.round(Math.random() * 5) + 17;
        } else if (chance1 < 0.75) {
          effType = Math.round(Math.random() * 5) + 29;
        } else if (chance1 < 0.995) {//20% 방어이펙트타입
          const chanceIdx = Math.floor(Math.random() * armorEff.length);
          effType = armorEff[chanceIdx];
        } else {//0.5% 스킬 아이템
          effType = 100;
        }
      } else if (itemPart === '2') {//2:갑옷
        if (chance1 < 0.025) {//5% 물리,마법 공격 타입
          effType = Math.round(Math.random() * 5) + 11;
        } else if (chance1 < 0.05) {
          effType = Math.round(Math.random() * 5) + 23;
        } else if (chance1 < 0.25) {//20% 상태 저항타입
          effType = Math.round(Math.random() * 7) + 60;
        } else if (chance1 < 0.4) {//30% 물리,마법 저항타입
          effType = Math.round(Math.random() * 5) + 17;
        } else if (chance1 < 0.55) {
          effType = Math.round(Math.random() * 5) + 29;
        } else if (chance1 < 0.8) {//45% 방어이펙트타입
          const chanceIdx = Math.floor(Math.random() * armorEff.length);
          effType = armorEff[chanceIdx];
        } else if (chance1 < 0.995) {
          const chanceIdx = Math.floor(Math.random() * etcEff.length);
          effType = etcEff[chanceIdx];
        } else {//0.5% 스킬 아이템
          effType = 100;
        }
      } else if (itemPart === '3') {//3:무기
        if (chance1 < 0.2) {//40% 물리,마법 공격 타입
          effType = Math.round(Math.random() * 5) + 11;
        } else if (chance1 < 0.4) {
          effType = Math.round(Math.random() * 5) + 23;
        } else if (chance1 < 0.6) {//25% 치,회,적,반격 타입
          effType = Math.round(Math.random() * 2) + 38;
        } else if (chance1 < 0.65) {
          effType = 10;
        } else if (chance1 < 0.7) {//10% 물리,마법 저항타입
          effType = Math.round(Math.random() * 5) + 17;
        } else if (chance1 < 0.75) {
          effType = Math.round(Math.random() * 5) + 29;
        } else if (chance1 < 0.99) {//25% 무기이펙트타입
          const chanceIdx = Math.floor(Math.random() * weaponEff.length);
          effType = weaponEff[chanceIdx];
        } else  {//1% 스킬 아이템
          effType = 100;
        }
      } else if (itemPart === '4') {//4:반지
        if (chance1 < 0.15) {//20% 치,회,적,반격 타입
          effType = Math.round(Math.random() * 2) + 38;
        } else if (chance1 < 0.2){
          effType = 10;
        } else if (chance1 < 0.35) {//15% 상태 저항타입
          effType = Math.round(Math.random() * 7) + 60;
        } else if (chance1 < 0.5) {//30% 물리,마법 저항타입
          effType = Math.round(Math.random() * 5) + 17;
        } else if (chance1 < 0.65) {
          effType = Math.round(Math.random() * 5) + 29;
        } else if (chance1 < 0.825) {//35% 악세사리이펙트타입
          const chanceIdx = Math.floor(Math.random() * etcEff.length);
          effType = etcEff[chanceIdx];
        } else if (chance1 < 0.97) {
          const chanceIdx = Math.floor(Math.random() * accEff.length);
          effType = accEff[chanceIdx];
        } else {//3% 스킬 아이템
          effType = 100;
        }
      } else {//5:목걸이
        if (chance1 < 0.1) {//10% 상태 면역타입
          effType = Math.round(Math.random() * 7) + 70;
        } else if (chance1 < 0.3) {//40% 물리,마법 저항타입
          effType = Math.round(Math.random() * 5) + 17;
        } else if (chance1 < 0.5) {
          effType = Math.round(Math.random() * 5) + 29;
        } else if (chance1 < 0.75) {//50% 악세사리이펙트타입
          const chanceIdx = Math.floor(Math.random() * etcEff.length);
          effType = etcEff[chanceIdx];
        } else if (chance1 < 0.97) {
          const chanceIdx = Math.floor(Math.random() * accEff.length);
          effType = accEff[chanceIdx];
        } else {//3% 스킬 아이템
          effType = 100;
        }
      }

      let effRandomNum = [];
      if (grade === 2) {
        effRandomNum = effList[effType][2];
      } else if (grade === 3) {
        effRandomNum = effList[effType][0];
      } else if (grade === 4) {
        effRandomNum = effList[effType][1];
      }
      const effNum = Math.floor(Math.random()*(effRandomNum[1] - effRandomNum[0])) + effRandomNum[0];
      if (effType === 100) {
        const skillIdx = Math.floor(Math.random() * skillEff.length);
        return {
          type: effType,
          skIdx: skillEff[skillIdx],
          skLv: [String(effNum)],
        }
      } else {
        return {
          type: effType,//effType > 15 ? effType + 5 : effType,
          num: [String(effNum)],
        }
      }
    }

    //슬롯
    const slotNum = (() => {
      if (grade === 1) {
        if (Math.random() < 0.3) {
          return Math.round(Math.random() * (selectItem.socket - 1)) + 1;
        } else {
          return Math.round(Math.random() * selectItem.socket);
        }
      } else {
        return Math.round(Math.random() * selectItem.socket);
      }
    })();
    itemLv -= slotNum * 10;
    if (itemLv > 0) {
      const itemPart = String(option.items)[0];
      if (grade === 2) {
        const addEffLength = Math.floor(itemLv / 20);
        for (let i = 0; i < addEffLength; ++i) {
          if (itemLv > 20) {
            itemLv -= 20;
            addEff.push(getAddEff(grade, itemPart));
          } else {
            break;
          }
        }
      } else if (grade === 3) {
        const addEffLength = Math.floor(itemLv / 15);
        for (let i = 0; i < addEffLength; ++i) {
          if (itemLv > 15) {
            itemLv -= 15;
            addEff.push(getAddEff(grade, itemPart));
          } else {
            break;
          }
        }
      } else if (grade === 4) {
        const addEffLength = Math.floor(itemLv / 12);
        for (let i = 0; i < addEffLength; ++i) {
          if (itemLv > 12) {
            itemLv -= 12;
            addEff.push(getAddEff(grade, itemPart));
          } else {
            break;
          }
        }
      }
    }
    //동물벳지
    const mark = Math.random() < .8 ? Math.round(Math.random() * 24) : '';
    const markNum = mark === '' ? 0 : (() => {
      const randomCount = Math.random();
      if (randomCount < .1) {
        return 4;
      } else if (randomCount < .3) {
        return 3;
      } else if (randomCount < .6) {
        return 2;
      } else {
        return 1;
      }
    })();
    const animalModifier = [
      `${mark !== '' ? gameData.animal_type[mark].na.ko : ''}${gameData.items.markModifier.ko[markNum]}`,
      `${gameData.items.markModifier.en[markNum]} ${mark !== '' ? gameData.animal_type[mark].na.en : ''}${markNum > 1 ? 's' : ''}`,
      `${mark !== '' ? gameData.animal_type[mark].na.jp : ''}${gameData.items.markModifier.jp[markNum]}`,
    ];
    const modifier = {
      ko:gameData.items.slotModifier.ko[slotNum] + ' ' + animalModifier[0],
      en:gameData.items.slotModifier.en[slotNum] + ' ' + animalModifier[1],
      jp:gameData.items.slotModifier.jp[slotNum] + ' ' + animalModifier[2],
    };
    itemLv -= slotNum * 5;
    const itemObj = {
      id: id,
      idx: selectItem.idx,
      part: selectItem.part,
      grade: grade,
      itemLv: option.lv,
      slot: slotNum,//아이템 홀착용 갯수
      hole: new Array(slotNum).fill(0),
      color: color,
      baseEff: baseEff,
      addEff: addEff,
      mark: mark,
      markNum: markNum,
      modifier: modifier,
      weaponType: weaponType,
      sealed: false,
      favorite: option.favorite || 0,
    }
    if (isSave) {
      if (typeof option.evaluateSlot === 'number') {
        save.items[type].splice(option.evaluateSlot,1,itemObj);
      } else {
        save.items[type].unshift(itemObj);
      }
      changeSaveData(save);
    } else {
      return itemObj;
    }
  },
  getAnimalPoint: (items, animal, addMark) => {
    let mark = 0;
    for (const item of items) {
      if (Object.keys(item).length !== 0 && animal === item.mark) {
        mark += item.markNum;
      }
    }
    return mark + addMark;
  },
  getTimeGap: (saveData, changeSaveData) => {
    const time = new Date();
    if (localStorage.getItem('closeTime')) {
      const timeGap = Math.floor((time.getTime() - new Date(localStorage.getItem('closeTime')).getTime())/1000);//마지막 접속시간과 현재시간과 차이
      for (const data of saveData.ch) {
        data.actionPoint += Math.floor(timeGap / 50);
        data.pointTime -= timeGap;
      }
      changeSaveData(saveData);
      console.log(saveData, timeGap);
      localStorage.setItem('closeTime', time);
    } else {
      localStorage.setItem('closeTime', time);
    }
  },
  getAnimalSkill: () => {
    
  },
  buttonEvent: (dataObj, callback) => {
    dataObj.event.stopPropagation();
    const gameData = dataObj.gameData;
    let sData = {...dataObj.saveData};
    if (dataObj.type === 'enhancingStickers') {

    } else if (dataObj.type === 'itemEquip') { //아이템 착용
      const invenPart = dataObj.data.saveItemData.part;
      let overlapCheck = true;
      const saveCh = sData.ch[dataObj.data.chSlotIdx];
      //아이템 무게 측정
      let currentKg = 0;
      let itemSubmit = false;
      const totalKg = Math.floor(gameData.ch[saveCh.idx].st1 / 0.3)/10;
      for (const item of saveCh.items) {
        if (Object.keys(item).length !== 0) {
          const itemsGrade = item.grade < 5 ? 0 : item.grade - 5;
          currentKg += item.part === 3 ? gameData.items.equip[item.part][item.weaponType][itemsGrade][item.idx].kg : gameData.items.equip[item.part][0][itemsGrade][item.idx].kg;
        }
      }
      const chType = gameData.ch[saveCh.idx].animal_type;
      if (dataObj.data.saveItemData.sealed) { //개봉된 아이템인지 확인
        dataObj.showMsg(true);
        dataObj.msgText(`<span caution>${gameData.msg.sentence.evaluateItem[dataObj.lang]}</span>`);
        return;
      }
      if (!dataObj.data.gameItem.limit[saveCh.job]) { //직업 착용가능 확인
        dataObj.showMsg(true);
        dataObj.msgText(`<span caution>${gameData.msg.sentence.unpossibleJob[dataObj.lang]}</span>`);
        return;
      }
      for (const [itemSlot, item] of saveCh.items.entries()) {
        if (invenPart === gameData.animal_type[chType].equip[itemSlot] && overlapCheck) {//해당파트와 같은파트인지? && 빈칸인지? && 같은파트가 비었을경우 한번만 발생하게 
          if (item.idx === undefined) { //해당 슬롯이 비었을 비었을 경우
            currentKg += dataObj.data.gameItem.kg
            if (currentKg > totalKg) { //가능 무게를 넘어 갈 경우
              dataObj.showMsg(true);
              dataObj.msgText(`<span caution>${gameData.msg.sentence.heavyKg[dataObj.lang]}</span>`);
            } else { //착용 가능 무게일 경우
              saveCh.items[itemSlot] = {...dataObj.saveData.items['equip'][dataObj.data.itemSaveSlot]};//캐릭에 아이템 넣기
              if (dataObj.data.saveItemData.mark === gameData.ch[saveCh.idx].animal_type) {//동물 뱃지 수정
                saveCh.animalBeige += dataObj.data.saveItemData.markNum;
              }
              if (dataObj.data.gameItem.actionType !== '') {
                saveCh.newActionType = dataObj.data.gameItem.actionType;
              }
              sData.items['equip'].splice(dataObj.data.itemSaveSlot, 1);//인벤에서 아이템 제거
              overlapCheck = false;
              dataObj.changeSaveData(util.saveCharacter({//데이터 저장
                saveData: sData,
                chSlotIdx: dataObj.data.chSlotIdx,
                gameData: gameData,
              }));
              dataObj.showPopup(false);
              itemSubmit = true;
              break;
            }
          }
        }
      }
      if (!itemSubmit) { //해당 슬롯에 아이템이 있을 경우, 아이템 다른부위로 적용된 경우 파악
        dataObj.showMsg(true);
        dataObj.msgText(`<span caution>${gameData.msg.sentence.nonePart[dataObj.lang]}</span>`);
      }
    } else if (dataObj.type === 'itemRelease') { //아이템 해제
      const saveCh = sData.ch[dataObj.data.chSlotIdx];
      sData.items['equip'].push(dataObj.data.saveItemData);//인벤에 아이템 넣기
      sData.ch[dataObj.data.chSlotIdx].items[dataObj.data.itemSaveSlot] = {}; //아이템 삭제
      if (dataObj.data.saveItemData.mark === gameData.ch[saveCh.idx].animal_type) {//동물 뱃지 수정
        saveCh.animalBeige = util.getAnimalPoint(saveCh.items, gameData.ch[saveCh.idx].animal_type, saveCh.mark);
      }
      saveCh.animalSkill = saveCh.animalSkill.map((skGroup) => {//동물 스킬 초기화
        return skGroup.map((skData) => {
          if (Object.keys(skData).length !== 0) {
            return {
              idx:skData.idx,
              lv:0,
            }
          } else {
            return {}
          }
        });
      });
      saveCh.newActionType = [saveCh.actionType];
      for (const [itemSlot, item] of saveCh.items.entries()) {
        const chType = gameData.ch[saveCh.idx].animal_type;
        if (gameData.animal_type[chType].equip[itemSlot] === 3 && item.idx !== undefined) {
          const anotherWeaponActionType = gameData.items.equip[item.part][item.weaponType][0][item.idx].actionType;
          saveCh.newActionType = anotherWeaponActionType === '' ? [saveCh.actionType] : anotherWeaponActionType;
        }
      }
      dataObj.changeSaveData(util.saveCharacter({//데이터 저장
        saveData: sData,
        chSlotIdx: dataObj.data.chSlotIdx,
        gameData: gameData,
      }));
      dataObj.showPopup(false);
    } else if (dataObj.type === 'itemUse') { //아이템 사용
      const saveCh = sData.ch[dataObj.data.chSlotIdx];
      switch (dataObj.data.gameItem.action) {
        case 99: //골드 획득
          sData.info.money += dataObj.data.gameItem.price;//돈 계산
          break;
        case 98: //경험치 획득
          if(saveCh.lv >= 50) {
            const hasMaxExp = gameData.hasMaxExp[saveCh.grade];
            saveCh.hasExp += dataObj.data.gameItem.eff;
            saveCh.hasExp += saveCh.exp;
            saveCh.lv = 50;
            saveCh.exp = 0;
            if (saveCh.hasExp > hasMaxExp) {
              saveCh.hasExp = hasMaxExp;
            }
          } else {
            saveCh.exp += dataObj.data.gameItem.eff;
          }
          const lvUp = (ch, dataObj) => {
            const maxExp = gameData.exp['grade'+ch.grade][ch.lv-1];
            dataObj.changeSaveData(util.saveCharacter({//데이터 저장
              saveData: sData,
              chSlotIdx: dataObj.data.chSlotIdx,
              gameData: gameData,
            }));
            if (ch.exp >= maxExp) { //레벨업
              util.effect.lvUp();
              if (ch.lv <= 50) {
                ch.lv += 1;
                ch.exp -= maxExp;
                setTimeout(() => {
                  lvUp(ch, dataObj);
                }, 300);
                if(ch.lv % 10 === 0) {
                  util.getSkill(gameData, ch, dataObj.data.chSlotIdx, dataObj.saveData, dataObj.changeSaveData);
                }
              }
            }
          }
          lvUp(saveCh, dataObj);
          break;
        default:
          break;
      } //사용 타입
      sData.items[dataObj.data.type].splice(dataObj.data.itemSaveSlot,1);//인벤에서 아이템 제거
      dataObj.changeSaveData(sData);//데이터 저장
      dataObj.showPopup(false);
    } else if (dataObj.type === 'itemBuy') { //아이템 구입
      if (dataObj.data.type.indexOf('ship') >= 0) {//배 물품 구입
        let overlapIdx = '';
        sData.ship[dataObj.data.type.split('ship')[1]].loadedItem.filter((data, idx) => {
          if (data.idx === dataObj.data.saveItemData.idx) {
            overlapIdx = idx;
          }
          return idx;
        });
        if (typeof overlapIdx === 'number') { //같은 상품이 있으면
          sData.ship[dataObj.data.type.split('ship')[1]].loadedItem[overlapIdx].num += dataObj.data.num;
        } else { //같은 상품이 없으면
          sData.ship[dataObj.data.type.split('ship')[1]].loadedItem.push({
            idx:dataObj.data.saveItemData.idx,
            num:dataObj.data.num,
          });
        }
        //배 저장소 측정
        sData.info.money -= dataObj.data.gameItem.price * dataObj.data.num;//돈 계산
      } else {
        if (dataObj.data.type === 'equip') {
          sData.info.money -= (dataObj.data.gameItem.price < 1000 ? 1000 : dataObj.data.gameItem.price) * 2 * dataObj.data.gameItem.grade;
        } else if (dataObj.data.type === 'hole') {
          sData.info.money -= dataObj.data.gameItem.price * 2;
        } else {
          sData.info.money -= dataObj.data.gameItem.price;//돈 계산
        }
        sData.items[dataObj.data.type].push(dataObj.data.saveItemData);//아이템 추가
      }
      dataObj.changeSaveData(sData);//데이터 저장
      dataObj.showPopup(false);
    } else if (dataObj.type === 'itemSell') { //아이템 판매
      if (dataObj.data.type.indexOf('ship') >= 0) {//배 물품 판매
        const num = sData.ship[dataObj.data.type.split('ship')[1]].loadedItem[dataObj.data.itemSaveSlot].num;
        if (dataObj.data.num < num) { //일부만 팔경우
          sData.ship[dataObj.data.type.split('ship')[1]].loadedItem[dataObj.data.itemSaveSlot].num -= dataObj.data.num;
        } else { //전체 팔경우
          sData.ship[dataObj.data.type.split('ship')[1]].loadedItem.splice(dataObj.data.itemSaveSlot,1);
        }
        sData.info.money += dataObj.data.gameItem.price * dataObj.data.num;//돈 계산
      } else {
        if (dataObj.data.type === 'equip' || dataObj.data.type === 'hole') {
          //console.log(dataObj.data.gameItem.price, dataObj.data.gameItem.grade);
          sData.info.money += dataObj.data.gameItem.price * dataObj.data.gameItem.grade;//돈 계산
        } else {
          sData.info.money += dataObj.data.gameItem.price;//돈 계산
        }
        console.log(dataObj.data);
        sData.items[dataObj.data.type].splice(dataObj.data.itemSaveSlot,1);//인벤에서 아이템 제거
      }
      dataObj.changeSaveData(sData);//데이터 저장
      dataObj.showPopup(false);
    } else if (dataObj.type === 'itemEvaluate') { //아이템 확인
      //sData.items[dataObj.data.type].splice(dataObj.data.itemSaveSlot,1);//인벤에서 아이템 제거
      const itemInfo = dataObj.data.saveItemData.part === 3 ? `${dataObj.data.saveItemData.part}-${dataObj.data.saveItemData.weaponType}-${dataObj.data.saveItemData.idx}` : `${dataObj.data.saveItemData.part}-${dataObj.data.saveItemData.idx}`;
      const option = {
        type:'equip',
        items:itemInfo,
        //아이템종류, 세부종류(검,단검), 매직등급
        grade:dataObj.data.saveItemData.grade,
        lv:dataObj.data.saveItemData.itemLv,
        sealed:false,
        evaluateSlot:dataObj.data.itemSaveSlot,
        favorite:dataObj.data.saveItemData.favorite
      }
      util.getItem({
        saveData: sData,
        gameData: gameData,
        changeSaveData: dataObj.changeSaveData,
        option: option,
        isSave: true,
        lang: dataObj.lang
      });
      //dataObj.changeSaveData(sData);//데이터 저장
      // dataObj.showPopup(false);
    } else if (dataObj.type === 'holeEquip') {
      dataObj.showPopup(false);
    }
    callback && callback();
  },
  getColorant:(colorSet, gameData) => {
    const dataIdx = colorSet.split('_');
    return gameData.items.colorant[dataIdx[0]][dataIdx[1]];
  },
  comma:(result) => {
    result = String(result);
    return result.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  removeComma:(num) => {
    return num.replace(/,/g, "");
  },
  fnPercent: (arr) => { //확률 연산
    let blockPercent = [{idx:0, num:arr[0]}],
      idx = 1;
    const percent = Math.random() * 100;
    arr.reduce((a, b) => {
      const per = (a + b);
      blockPercent.push({idx: idx, num:per});
      ++idx;
      return per;
    });
    return blockPercent.filter((block) => percent < block.num)[0].idx;
  },
  getSkillMultiplesLang: ({buff, type, lang}) => {
    const textFor = {ko:'에 대한 데미지',en:'Damage to',jp:'へのダメージ'}
    const updownText = [
      {ko:'증가',en:'increase',jp:'増加',tag:'up'},
      {ko:'감소',en:'reduction',jp:'減少',tag:'down'},
    ];
    const animalType = [
      {ko:'고양이',en:'Cat',jp:'猫'},
      {ko:'사자',en:'Lion',jp:'ライオン'},
      {ko:'호랑이',en:'Tiger',jp:'タイガー'},
      {ko:'개',en:'Dog',jp:'犬'},
      {ko:'늑대',en:'Wolf',jp:'オオカミ'},
      {ko:'물개',en:'Seal',jp:'シール'},
      {ko:'너구리',en:'Raccoon',jp:'アライグマ'},
      {ko:'쥐',en:'Rat',jp:'ラット'},
      {ko:'토끼',en:'Rabbit',jp:'ウサギ'},
      {ko:'원숭이',en:'Monkey',jp:'サル'},
      {ko:'고릴라',en:'Gorilla',jp:'ゴリラ'},
      {ko:'캥거루',en:'Kangaroo',jp:'カンガルー'},
      {ko:'소',en:'Cow',jp:'牛'},
      {ko:'곰',en:'Bear',jp:'クマ'},
      {ko:'말',en:'Horse',jp:'馬'},
      {ko:'사슴',en:'Deer',jp:'鹿'},
      {ko:'코뿔소',en:'Rhinoceros',jp:'サイ'},
      {ko:'코끼리',en:'Elephant',jp:'象'},
      {ko:'기린',en:'Giraffe',jp:'キリン'},
      {ko:'새',en:'Bird',jp:'鳥'},
      {ko:'독수리',en:'Eagle',jp:'イーグル'},
      {ko:'뱀',en:'Snake',jp:'ヘビ'},
      {ko:'도마뱀',en:'Lizard',jp:'トカゲ'},
      {ko:'거북이',en:'Turtle',jp:'カメ'},
      {ko:'개구리',en:'Frog',jp:'カエル'},
      {ko:'돼지',en:'Pig',jp:'豚'},
      {},{},{},{},{},
      {},{},{},{},{},{},{},{},{},{},
      {},{},{},
      {ko:'소형동물',en:'Small Animals',jp:'小型動物'},
      {ko:'중형동물',en:'Medium Animals',jp:'中型動物'},
      {ko:'대형동물',en:'Large Animals',jp:'大型動物'},
      {ko:'소,중형동물',en:'Small and medium Animals',jp:'小・中型動物'},
      {ko:'소,대형동물',en:'Small and large Animals',jp:'小・大型動物'},
      {ko:'중,대형동물',en:'Medium and large Animals',jp:'中・大型動物'},
      {ko:'모든동물',en:'All Animals',jp:'すべての動物'},
    ];
    const upDown = buff.indexOf('-') >= 0 ? 1 : 0;
    const muliplesText = `<br/><span small>${lang === 'en' ? textFor[lang] + ' ' + animalType[type][lang] : animalType[type][lang] + textFor[lang]}</span> <b dmg>${buff}</b> <i icon ${updownText[upDown].tag}></i>`;//${updownText[upDown][lang]}
    return muliplesText;
  },
  getSkillElementLang: ({element, cate, atkCount, lang}) => {
    const attack = [
      {},
      {ko:'공격',en:'Attack',jp:'攻撃'},
      {ko:'두번 공격',en:'Double Attack',jp:'2回攻撃'},
      {ko:'세번 공격',en:'Triple Attack',jp:'3回攻撃'},
      {ko:'네번 공격',en:'Four attacks',jp:'4回攻撃'},
    ];
    const elementTag = [
      {type:'ac',idx:0},
      {type:'ac',idx:1},
      {type:'ac',idx:2},
      {type:'ac',idx:3},
      {type:'ac',idx:4},
      {type:'ac',idx:5},
      {type:'ac',idx:6},
      {type:'el',idx:2},
      {type:'el',idx:3},
      {type:'el',idx:4},
      {type:'el',idx:5},
      {type:'el',idx:6},
      {type:'el',idx:7},
    ]
    const elementArr = [
      {ko:'통상',en:'Normal',jp:'通常'},
      {ko:'쪼기',en:'Peck',jp:'ピグテール'},
      {ko:'할퀴기',en:'Claw',jp:'掻き分け'},
      {ko:'물기',en:'Bite',jp:'噛むこと'},
      {ko:'치기',en:'Hit',jp:'打撃'},
      {ko:'누르기',en:'Crush',jp:'押す'},
      {ko:'던지기',en:'Throw',jp:'投げる'},
      {ko:'빛속성',en:'Light Element',jp:'光属性'},
      {ko:'어둠속성',en:'Darkness Element',jp:'闇属性'},
      {ko:'물속성',en:'Water Element',jp:'水属性'},
      {ko:'불속성',en:'Fire Element',jp:'火属性'},
      {ko:'바람속성',en:'Wind Element',jp:'風属性'},
      {ko:'땅속성',en:'Earth Element',jp:'地属性'},
      {},{},{},{},{},{},{},{},
    ];
    const elTag = elementTag[element];
    return cate !== 2 ? `<i ${elTag.type} ${elTag.type}${elTag.idx}>${elementArr[element][lang]}</i> ${attack[atkCount][lang]}` : `<i ${elTag.type} ${elTag.type}${elTag.idx}>${elementArr[element][lang]}</i>`;
  },
  getSkillAreaLang: ({scope, areaIdx, cate, lang}) => {
    const teamArr = [
      {ko:'아군',en:'Ally',jp:'味方'},
      {ko:'적군',en:'Enemy',jp:'敵軍'},
      {ko:'전지역',en:'All regions',jp:'全地域'},
    ];
    const inBattle = {ko:'전투 참여시',en:'in battle',jp:'戦闘参加時'};
    const areaArr = [
      {},
      {ko:'단일',en:'Single',jp:'単一'},
      {ko:'가로 2마리',en:'2 horizontal',jp:'横2匹'},
      {ko:'가로 3마리',en:'3 horizontal',jp:'横3匹'},
      {ko:'세로 2마리',en:'2 verticals',jp:'縦2匹'},
      {ko:'세로 3마리',en:'3 verticals',jp:'縦3匹'},
      {ko:'가로 행',en:'Horizontal rows',jp:'横列'},
      {ko:'세로 열',en:'Vertical columns',jp:'縦列'},
      {ko:'작은 십자 형태',en:'Small cross',jp:'小さな十字形'},
      {ko:'큰 십자 형태',en:'Large cross',jp:'大きな十字形'},
      {ko:'대각선 형태',en:'Diagonal shape',jp:'斜めの形'},//10
      {ko:'역대각선 형태',en:'Inverted Diagonal shape',jp:'逆斜めの形'},
      {ko:'고정 세로2열',en:'Fixed Vertical2 columns',jp:'固定縦2列'},
      {ko:'고정 세로3열',en:'Fixed Vertical3 columns',jp:'固定縦3列'},
      {ko:'⏊ 형태',en:'⏊ Shape',jp:'形 ⏊形状'},
      {ko:'└┐ 형태',en:'└┐ Shape',jp:'形 └┐形状'},
      {ko:'┌┘ 형태',en:'┌┘ Shape',jp:'形 ┌┘形状'},
      {ko:'卍 형태',en:'卍 Shape',jp:'形 卍形状'},
      {ko:'고정 가로2행',en:'Fixed horizontal2 rows',jp:'固定横2行'},
      {ko:'고정 가로3행',en:'Fixed horizontal3 rows',jp:'固定横3行'},
      {ko:'전체',en:'All',jp:'全体'},//20
      {ko:'큰 사각형 형태',en:'Large rectangle shape',jp:'大きな四角形'},
      {ko:'작은 사각형 형태',en:'Small rectangle shape',jp:'小さな四角形'},
      {ko:'자신',en:'Self',jp:'自己'},
      {ko:'원 형태',en:'Circle shape',jp:'円形'},
      {ko:'랜덤 5마리',en:'5 Random',jp:'ランダム5匹'},
      {ko:'랜덤 10마리',en:'10 Random',jp:'ランダム10匹'},
      {ko:'랜덤 15마리',en:'15 Random',jp:'ランダム15匹'},
      {ko:'작은 마름모 형태',en:'Small rhombus shape',jp:'小さな菱形の形'},
      {ko:'큰 마름모 형태',en:'Large rhombus shape',jp:'大きな菱形の形'},
      {ko:'큰 링',en:'Large ring',jp:'大きなリング'},//30
      {ko:'랜덤 세로 2열',en:'Random Vertical 2 columns',jp:'ランダム縦2列'},
      {ko:'랜덤 세로 3열',en:'Random Vertical 3 columns',jp:'ランダム縦3列'},
      {ko:'랜덤 가로 2행',en:'Random horizontal 2 rows',jp:'ランダム横2行'},
      {ko:'랜덤 가로 3행',en:'Random horizontal 3 rows',jp:'ランダム横3行'},
      {ko:'작은 x 형태',en:'Small X shape',jp:'小さいxの形'},
      {ko:'큰 x 형태',en:'Large X shape',jp:'大きいxの形'},
      {ko:'⏉ 형태',en:'⏉ Shape',jp:'形 ⏉形状'},
    ];
    const areaText = areaIdx !== 23 ? `<span co${scope}>${teamArr[scope][lang]}</span> ${areaArr[areaIdx][lang]}` : areaArr[areaIdx][lang];
    return cate === 2 ? `<u>${inBattle[lang]}</u> ${areaText}` : areaText;
  },
  getSkillAtkEffLang: ({eff, type, lang}) => {
    const isAttack = {ko:'공격시',en:'On attack',jp:'攻撃時'}
    const effType = [
      {ko:'치명타',en:'Critical',jp:'クリティカル'},
      {ko:'적중율',en:'Hit rate',jp:'命中率'},
      {ko:'체력회복',en:'Recover HP',jp:'体力回復'},
      {ko:'행동회복',en:'Recover SP',jp:'行動回復'},
    ];
    const updownText = [
      {ko:'증가',en:'increase',jp:'増加',tag:'up'},
      {ko:'감소',en:'reduction',jp:'減少',tag:'down'},
    ];
    const upDown = eff.indexOf('-') >= 0 ? 1 : 0;
    return `<br/>(${isAttack[lang]} ${effType[type][lang]} <b buff>${eff}</b> <i icon ${updownText[upDown].tag}></i>)`;//${updownText[upDown][lang]}
  },
  getSkillDmgLang: ({eff, lang}) => {
    const dmg = {ko:'데미지',en:'damage',jp:'ダメージ'};
    return `<br/><b dmg>${eff}</b> ${dmg[lang]}`;
  },
  getSkillBuffLang: ({buff, type, lang}) => {
    const updownText = [
      {ko:'증가',en:'increase',jp:'増加',tag:'up'},
      {ko:'감소',en:'reduction',jp:'減少',tag:'down'},
    ];
    const weatherText = [
      {ko:'맑은날의 밤',en:'Clear Night',jp:'晴れた日の夜'},
      {ko:'흐린날의 밤',en:'Cloudy Night',jp:'曇りの日の夜'},
      {ko:'비오는날의 밤',en:'Rainy Night',jp:'雨の日の夜'},
      {ko:'천둥치는날의 밤',en:'Thunderstorm Night',jp:'雷雨の日の夜'},
      {ko:'눈오는날의 밤',en:'Snowy Night',jp:'雪の日の夜'},
      {ko:'맑은날의 낮',en:'Sunny Day',jp:'晴れた日の昼間'},
      {ko:'흐린날의 낮',en:'Cloudy Day',jp:'曇りの日の昼間'},
      {ko:'비오는날의 낮',en:'Rainy Day',jp:'雨の日の昼間'},
      {ko:'천둥치는날의 낮',en:'Thunderstorm Day',jp:'雷雨の日の昼間'},
      {ko:'눈오는날의 낮',en:'Snowy Day',jp:'雪の日の昼間'},
    ]
    const windText = [
      {ko:'',en:'',jp:''},
    ];
    const changeText = {ko:'으로 변경',en:'Change to',jp:'に変更'}
    const upDown = buff.indexOf('-') >= 0 ? 1 : 0;
    return buff 
      ? type !== 110 
        ? `<br/>${util.getEffectType(type,lang)} <b buff>${buff}</b> <i icon ${updownText[upDown].tag}></i>`
        : `<br/>${util.getEffectType(type,lang)} <b buff>${lang === 'en' ? changeText[lang] + ' ' + weatherText[buff][lang] : weatherText[buff][lang] + ' ' + changeText[lang]}</b>`
      : util.getEffectType(type,lang);//${updownText[upDown][lang]}
  },
  getSkillConditionBuffLang: ({condition, lang}) => {
    const conditionType = [
      {},
      {ko:'밤',en:'Night',jp:'夜',tag:'night'},
    ];
    return `<span ${conditionType[condition].tag}>${conditionType[condition][lang]}</span>`;
  },
  getSkillBuffCountLang: ({buffCount, lang}) => {
    const turnText = {ko:'턴',en:'turn',jp:'ターン'},
      immediateText = {ko:'즉시',en:'Immediate',jp:'すぐに'};
    return buffCount === 0 ? immediateText[lang] : `${buffCount}${turnText[lang]}`;
  },
  getSkillBuffChanceLang: ({buffChance, lang}) => {
    const chanceText = {ko:'확률',en:'chance',jp:'確率'};
    return `<br/><span chance>${buffChance}</span> ${chanceText[lang]}`;
  },
  getSkillPossibleLang: ({element, lang}) => {
    const possibleElement = [
      {},
      {ko:'',en:'',jp:''},
      {ko:'',en:'',jp:''},
      {ko:'',en:'',jp:''},
      {ko:'',en:'',jp:''},
      {ko:'',en:'',jp:''},
      {ko:'',en:'',jp:''},
      {ko:'빛속성의 스킬 사용 가능',en:'Ability to use skills with the Light Element',jp:'光属性のスキル使用可能'},
      {ko:'어둠속성의 스킬 사용 가능',en:'Ability to use skills with the Darkness Element',jp:'闇属性のスキル使用可能'},
      {ko:'물속성의 스킬 사용 가능',en:'Ability to use skills with the Water Element',jp:'水属性のスキル使用可能'},
      {ko:'불속성의 스킬 사용 가능',en:'Ability to use skills with the Fire Element',jp:'火属性のスキル使用可能'},
      {ko:'바람속성의 스킬 사용 가능',en:'Ability to use skills with the Wind Element',jp:'風属性のスキル使用可能'},
      {ko:'땅속성의 스킬 사용 가능',en:'Ability to use skills with the Earth Element',jp:'地属性のスキル使用可能'},
    ]
    return `${possibleElement[element][lang]}<br/>`;
  },
  getSkillJobLang: ({jobIdx, lang}) => {
    const jobText = [
      {},
      {ko:'상점에서 가격흥정 가능',en:'Negotiate prices in your store',jp:'ショップで価格交渉可能'},
      {ko:'선박 제작/분해 가능',en:'Can build/disassemble ships',jp:'船舶製作/分解可能'},
      {ko:'장비 제작/분해 가능',en:'Can build/disassemble equipment',jp:'機器製作/分解可能'},
      {ko:'조각상 제작 가능',en:'Statues can be crafted',jp:'彫像製作可能'},
      {ko:'식물 재배 가능',en:'Can grow plants',jp:'植物栽培可能'},
      {ko:'아이템 합성 가능',en:'Items can be composited',jp:'アイテム合成可能'},
      {ko:'목걸이, 반지 제작/분해 가능',en:'Can create/disassemble necklaces and rings',jp:'ネックレス、指輪製作/分解可能'},
      {ko:'고급 등급의 동물 찾을 확률 증가',en:'Increased chance of finding an advanced ranked animal',jp:'高級ランクの動物が見つかる確率アップ'},
      {ko:'예술품 제작 가능',en:'Can create art',jp:'アート作品制作可能'},
    ];
    return jobText[jobIdx][lang];
  },
  getSkillText: (skillObj) => { //스킬 텍스트 전환 $(0), $<0>
    const {skill, lv, lang} = skillObj;
    const cate = skill.cate;
    const skillType = skill.element_type;
    let replaceText = skill.txt;
    // const replaceUpDownArr = replaceText.match(/[<]up[>]|[<]down[>]*/g) || [];
    if (skill.attackEff?.length > 0) {//공격 버프(크리티컬, 적중율)
      let effText = '';
      skill.attackEff.forEach((data, idx) => {
        effText += util.getSkillAtkEffLang({
          eff: data.num[lv],
          type: data.type,
          lang: lang,
        });
      });
      replaceText = replaceText.replace('<atkEff>', effText);
    }
    if (skill.eff?.length > 0) {//데미지
      replaceText = replaceText.replace('<dmg>', util.getSkillDmgLang({
        eff:skill.eff[0].num[lv],
        lang:lang,
      }));
    }
    if (skill.buff?.length > 0) {//버프 이름 및 효과
      let buffText = '';
      skill.buff.forEach((data, idx) => {
        buffText += util.getSkillBuffLang({
          buff: data.num[lv],
          type: data.type,
          lang: lang,
        });
      });
      replaceText = replaceText.replace('<buff>', buffText);
    }
    if (skill.buffCount?.length > 0) {//버프 유지 턴
      replaceText = replaceText.replace('<turn>', util.getSkillBuffCountLang({
        buffCount:skill.buffCount[lv],
        lang:lang,
      }));
    }
    if (skill.condition > 0) {//조건 버프
      replaceText = replaceText.replace('<condition>', util.getSkillConditionBuffLang({
        condition:skill.condition,
        lang:lang,
      }));
    }
    if (skill.buffChance?.length > 0) {//버프 확률
      replaceText = replaceText.replace('<chance>', util.getSkillBuffChanceLang({
        buffChance:skill.buffChance[lv],
        lang:lang,
      }));
    }
    if (skill.job > 0) {//직업 스킬
      replaceText = replaceText.replace('<job>', util.getSkillJobLang({
        jobIdx:skill.job,
        lang:lang,
      }));
    }
    // replaceUpDownArr.forEach((data, idx) => {//효과 up, down 아이콘
    //   if (data.indexOf('up') >= 0) {
    //     replaceText = replaceText.replace(data, util.getSkillUpDownLang({
    //       type:'up',
    //       lang:lang,
    //     }));
    //   } else {
    //     replaceText = replaceText.replace(data, util.getSkillUpDownLang({
    //       type:'down',
    //       lang:lang,
    //     }));
    //   }
    // });
    replaceText = replaceText.replace('<area>', util.getSkillAreaLang({//이펙트 범위
      scope:skill.ta_,
      areaIdx:skill.ta[lv],
      cate:skill.cate,
      lang:lang,
    }));
    if (skill.multiplesAttack?.length > 0) {//배수 공격
      let multiplesText = '';
      skill.multiplesAttack.forEach((data, idx) => {
        multiplesText += util.getSkillMultiplesLang({
          buff: data.num[lv],
          type: data.type,
          lang: lang,
        });
      });
      replaceText = replaceText.replace('<multiples>', multiplesText);
    }
    if (replaceText.match('<el>')?.index > -1) {//기술 속성
      replaceText = replaceText.replace('<el>', util.getSkillElementLang({
        element:skill.element_type,
        cate:skill.cate,
        atkCount:skill.atkCount[0],
        lang:lang,
      }));
    }
    if (replaceText.match('<possible>')?.index > -1) {//기술 사용가능 텍스트
      replaceText = replaceText.replace('<possible>', util.getSkillPossibleLang({
        element:skill.element_type,
        lang:lang,
      }));
    }
    return {
      skillText: replaceText,
      skillType: skillType,
      skillCate: cate,
    }
  },
  typeToStartIdx: (type) => {
    switch(type) {
      case 'equip':
        return '';
      case 'etc':
        return 0;
      case 'hole':
        return 10;
      case 'upgrade':
        return 30;
      case 'material':
        return 40;
      default:
        break;
    }
  },
  iconToStartIdx: (type) => {
    switch(type) {
      case 'menu':
      case 'enemies':
      case 'elementBack':
      case 'land':
        return 0;
      case 'element':
      case 'lv':
        return 1;
      case 'map':
      case 'elementBack2':
        return 2;
      case 'quickMenu':
        return 3;
      case 'commonBtn':
      case 'cardBack':
        return 4;
      case 'item':
        return 5;
      case 'scenario':
      case 'mutate':
        return 7;
      case 'battleState':
        return 8;
      case 'job':
      case 'skillBack':
        return 9;
      case 'star':
        return 12;
      case 'elevation':
        return 13;
      default:
        return 0;
    }
  },
  iconHNum: (type) => {
    switch(type) {
      case 'animalType':
        return [10, 3];
      case 'card':
      case 'card_s':
        return [10, 6];
      case 'cardRing':
      case 'cardRing_s':
        return [5, 5];
      case 'ch':
      case 'ch_s':
        return [10, 6];
      case 'icon100':
        return [10, 20];
      case 'icon150':
        return [10, 10];
      case 'icon200':
        return [10, 10];
      case 'itemEtc':
        return [10, 50];
      case 'itemTicket':
        return [12, 1];
      case 'moveEvent':
        return [12, 5];
      case 'moveEventCountry':
        return [14, 1];
      case 'skill':
        return [10, 30];
      default:
        break;
    }
  },
  idxToSkillBack: (cateIdx) => {
    switch(cateIdx) {
      case 2: //passive
        return 4;
      case 3: //active
        return 1;
      case 4: //defence
        return 0;
      case 5: //buff
        return 2;
      case 7: //active + debuff & buff
      case 8:
      case 9:
        return 6;
      case 6: //debuff
        return 5;
      default: //job, weather
        return 3;
    }
  },
}