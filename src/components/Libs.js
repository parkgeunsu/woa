
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
  saveHistory: (callback) => {
    const history = util.loadData('history') || [];
    setTimeout(() => {
      const currentLocation = window.location.pathname.split('/')[1],
        prevLocation = history.length > 0 ? util.loadData('history')[0] : '';
      if (currentLocation !== prevLocation) {
        history.unshift(currentLocation);
        util.saveData('history', history);
      }
      callback && callback();
    }, 100);
  },
  historyBack: (navigate) => {
    const history = util.loadData('history');
    if (history === null || history === undefined || history.length === 0 || history[0] === '') {
      navigate('/');
    } else {
      navigate(`../${history[0]}`);
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
    battleState_[8] = Math.round(Math.random()*200); //행운
    const battleState = util.getTotalState(battleState_);
    //등급에 따른 추가 능력치
    let addGradePercent = 1;
    for (let i = gameData.ch[enemyData.idx].grade; i < enemyData.grade; ++i) {
      addGradePercent *= gameData.addGradeArr[i];
    }
    for (const [idx, bState] of battleState.entries()) {
      const iSt = util.compileState(bState, itemEff[idx]);
      enemy = {
        ...enemy,
        ['iSt' + idx]: iSt,
        ['bSt' + idx]: (idx !== 1 && idx !== 2 && idx !== 8 && idx !== 9) ? Math.round(bState * addGradePercent) : bState,
      }
    }
    for (let i = 0; i < 12; ++i) {//아이템 능력치
      const iSt = util.compileState(enemy[`el${i}`], itemEff[i+15]);
      enemy['iSt' + (i+15)] = iSt;
    }
    for (const idx of gameData.element.keys()) {
      enemy = {
        ...enemy,
        ['el' + idx]: gameData.animal_type[gameData.ch[enemyData.idx].animal_type].element[idx],
      }
    }
    const element = enemyData.element || gameData.ch[enemyData.idx].element;
    for (const elData of element) {
      if (elData === 6) { //빛속성 경우
        enemy = {
          ...enemy,
          el7: Math.round(enemy.el7 - 50 * (enemyData.grade / 5)),
        }
      } else if (elData === 7) { //암속성 경우
        enemy = {
          ...enemy,
          el6: Math.round(enemy.el6 - 50 * (enemyData.grade / 5)),
        }
      } else if (elData === 8) { //수속성 경우
        enemy = {
          ...enemy,
          el8: Math.round(enemy.el8 + 20 * (enemyData.grade / 5)),
          el9: Math.round(enemy.el9 + 50 * (enemyData.grade / 5)),
        }
      } else if (elData === 9) { //화속성 경우
        enemy = {
          ...enemy,
          el9: Math.round(enemy.el9 + 20 * (enemyData.grade / 5)),
          el10: Math.round(enemy.el10 + 50 * (enemyData.grade / 5)),
        }
      } else if (elData === 10) { //바람속성 경우
        enemy = {
          ...enemy,
          el10: Math.round(enemy.el10 + 20 * (enemyData.grade / 5)),
          el11: Math.round(enemy.el11 + 50 * (enemyData.grade / 5)),
        }
      } else if (elData === 11) { //땅속성 경우
        enemy = {
          ...enemy,
          el11: Math.round(enemy.el11 + 20 * (enemyData.grade / 5)),
          el8: Math.round(enemy.el8 + 50 * (enemyData.grade / 5)),
        }
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
      const iSt = util.compileState(bState, obj.itemEff[idx]);
      saveChSlot['iSt' + idx] = iSt;
      saveChSlot['bSt' + idx] = (idx !== 1 && idx !== 2 && idx !== 8 && idx !== 9) ? Math.round(bState * addGradePercent) : bState;
    }

    for (let i = 0; i < 12; ++i) {//아이템 능력치
      const iSt = util.compileState(saveChSlot[`el${i}`], obj.itemEff[i+15]);
      saveChSlot['iSt' + (i+15)] = iSt;
    }
    for (const idx of gameData.element.keys()) {
      saveChSlot = {
        ...saveChSlot,
        ['el' + idx]: gameData.animal_type[gameData.ch[saveChSlot.idx].animal_type].element[idx],
      }
    }
    const element = saveChSlot.element || gameData.ch[saveChSlot.idx].element;
    for (const elData of element) {
      if (elData === 6) { //빛속성 경우
        saveChSlot = {
          ...saveChSlot,
          el7: Math.round(saveChSlot.el7 - 50 * (obj.grade / 5)),
        }
      } else if (elData === 7) { //암속성 경우
        saveChSlot = {
          ...saveChSlot,
          el6: Math.round(saveChSlot.el6 - 50 * (obj.grade / 5)),
        }
      } else if (elData === 8) { //수속성 경우
        saveChSlot = {
          ...saveChSlot,
          el8: Math.round(saveChSlot.el8 + 20 * (obj.grade / 5)),
          el9: Math.round(saveChSlot.el9 + 50 * (obj.grade / 5)),
        }
      } else if (elData === 9) { //화속성 경우
        saveChSlot = {
          ...saveChSlot,
          el9: Math.round(saveChSlot.el9 + 20 * (obj.grade / 5)),
          el10: Math.round(saveChSlot.el10 + 50 * (obj.grade / 5)),
        }
      } else if (elData === 10) { //바람속성 경우
        saveChSlot = {
          ...saveChSlot,
          el10: Math.round(saveChSlot.el10 + 20 * (obj.grade / 5)),
          el11: Math.round(saveChSlot.el11 + 50 * (obj.grade / 5)),
        }
      } else if (elData === 11) { //땅속성 경우
        saveChSlot = {
          ...saveChSlot,
          el11: Math.round(saveChSlot.el11 + 20 * (obj.grade / 5)),
          el8: Math.round(saveChSlot.el8 + 50 * (obj.grade / 5)),
        }
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
    if (typeof dataObj.slotIdx === "number") { //슬롯설정이 되면 개별 캐릭만 실행
      const itemEff = util.getItemEff(dataObj.slotIdx, saveCh, gameItem);
      saveCh[dataObj.slotIdx] = util.saveLvState(dataObj.slotIdx, {
        itemEff: itemEff,
        grade: gameData.ch[saveCh[dataObj.slotIdx].idx].grade,
        newState: {},
      }, saveData, gameData)
    } else if (dataObj.slotIdx === "all") { //슬롯설정이 없으면 전체 캐릭 실행
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
  getItemEff: (idx, saveCh, gameItem, enemy) => {
    let saveItems = {};
    if (enemy) {
      saveItems = saveCh.items;
    } else {
      saveItems = typeof idx === 'number' ? saveCh[idx].items : [{}, {}, {}, {}, {}, {}, {}, {}];
    }
    //eff type(효과 dmg_type&buff_type) 체력HP(0), 행동SP(1), 행동회복RSP(2), 공ATK(3), 방DEF(4), 술공MAK(5), 술방MDF(6), 회복RCV(7), 속도SPD(8), 쪼기(10),할퀴기(11),물기(12),치기(13),누르기(14), 명(21),암(22),수(23),화(24),풍(25),지(26), 진형(100)
    let effData = [];
    for (const item of saveItems) {
      if(Object.keys(item).length !== 0){
        for (const eff of item.baseEff) {
          if (effData[eff.type] === undefined) {
            effData[eff.type] = {percent:0, number:0};
          }
          if (eff.num[item.grade - 1].indexOf('%') > 0) {
            effData[eff.type].percent = effData[eff.type].percent + parseInt(eff.num[item.grade - 1]);
          } else {
            effData[eff.type].number = effData[eff.type].number + parseInt(eff.num[item.grade - 1]);
          }
        }
        for (const eff of item.addEff) {
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
    if (itemState !== undefined && itemState !== null) {
      if(itemState.percent !== 0){
        return Math.round(currentState * (itemState.percent / 100));
      }else{
        return itemState.number;
      }
    } else {
      return 0;
    }
  },
  getPercentColor: (max, num) => { //능력치 높고낮음 처리컬러
    const co = num/max*765;
    if(co < 255){
      return 'rgb('+co+',0,0)';
    } else if (co < 510) {
      return 'rgb(255,'+co%255+',0)';
    }else{
      return 'rgb(255,255,'+co%510+')';
    }
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
        totalEff[data.type] = {type: data.type, base: 0, add:0, hole:0};
      }
      totalEff[data.type].add += parseInt(data.num[0]);
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
  getEffectType: (num, type) => {
    //eff type(효과 dmg_type&buff_type) 쪼기(0),할퀴기(1),물기(2),치기(3),누르기(4),독(11),명(12),암(13),수(14),화(15),풍(16),지(17), 공(21),방(22),술공(23),술방(24),HP(25),SP(26),RSP(27),속도(28),명중(29),진형(100)
    let arr = ['체력(HP)','행동력(SP)','행동회복력(RSP)','공격력(ATK)','방어력(DEF)','술법공격력(MAK)','술법방어력(MDF)','회복력(RCV)','속도(SPD)','행운(LUK)','쪼기','할퀴기','물기','치기','누르기','던지기','','','','','',
    '빛','어둠','물','불','바람','땅','빛 강화','어둠 강화','물 강화','불 강화',
    '바람 강화','땅 강화','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','진형'];
    let arr_ko = ['체력','행동력','행동회복력','공격력','방어력','술법공격력','술법방어력','회복력','속도','행운','쪼기','할퀴기','물기','치기','누르기','던지기','','','','','',
    '빛','어둠','물','불','바람','땅','어둠 강화','물 강화','불 강화',
    '바람 강화','땅 강화','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','진형'];
    let arr_en = ['HP','SP','RSP','ATK','DEF','MAK','MDF','RCV','SPD','LUK','Sting','Claw','Bite','Hit','Crush','Throw','','','','','',
    'Light','Darkness','Water','Fire','Wind','Earth','Enhancement Light','Enhancement Darkness','Enhancement Water','Enhancement Fire',
    'Enhancement Wind','Enhancement Earth','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','Formation'];

    //eff type(효과 dmg_type&buff_type) 체력HP(0), 행동SP(1), 행동회복RSP(2), 공ATK(3), 방DEF(4), 술공MAK(5), 술방MDF(6), 회복RCV(7), 속도SPD(8), 쪼기(10),할퀴기(11),물기(12),치기(13),누르기(14), 명(20),암(21),수(22),화(23),풍(24),지(25), 진형(100)
  
    if (type === 'en') {
      return arr_en[num];
    } else if (type === 'ko') {
      return arr_ko[num];
    } else {
      return arr[num];
    }
  },
  getEnemySkill: (data, gameData) => {
    const chData = gameData.ch[data.idx],
      animalSkill = gameData.animal_type[chData.animal_type].skill0,
      jobSkill = gameData.job[chData.job[0]].skill,
      skillArr = [2, ...animalSkill, ...jobSkill];
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
        return 'throw';
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
      case 50:
        return 'bleeding';
      case 51:
        return 'addicted';
      case 52:
        return 'petrification';
      case 53:
        return 'confusion';
      case 54:
        return 'faint';
      case 55:
        return 'transform';
      case 100:
        return 'formation';
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
  getDistanceToEvent: (arr1, arr2, baseNum) => {//지도 거리 대비 이벤트 갯수
    if (!arr1 || !arr2) return '';
    baseNum = baseNum ?? 0;
    return Math.round(Math.sqrt(Math.pow(arr1[0] - arr2[0], 2) + Math.pow(arr1[1] - arr2[1], 2))) + baseNum;
  },
  getEffectArea: (type, n) => {//type: 효과타입, n: 사용위치(0~24)
    let num = [];
    switch(type){
      case 1: // .1 단일
        num = [n];
        break;
      case 2: // ─2 가로2
        if(n%5 === 4){
          num = [n,n-1];
        }else{
          num = [n,n+1];
        }
        break;
      case 3:// ─3 가로3
        if(n%5 === 3){
          num = [n,n+1,n-1];
        }else if(n%5 === 4){
          num = [n,n-1,n-2];
        }else{
          num = [n,n+1,n+2];
        }
        break;
      case 4: // ┃2 세로2
        if(n > 19){
          num = [n,n-5];
        }else{
          num = [n,n+5];
        }
        break;
      case 5:// ┃3 세로3
        if(n > 19){
          num = [n,n-5,n-10];
        }else if(n > 14){
          num = [n,n+5,n-5];
        }else{
          num = [n,n+5,n+10];
        }
        break;
      case 6: // ─5 가로행
        if(n < 5){
          num = [0,1,2,3,4];
        }else if(n < 10){
          num = [5,6,7,8,9];
        }else if(n < 15){
          num = [10,11,12,13,14];
        }else if(n < 20){
          num = [15,16,17,18,19];
        }else{
          num = [20,21,22,23,24];
        }
        break;
      case 7: // ┃5 세로열
        if(n%5 === 0){
          num = [0,5,10,15,20];
        }else if(n%5 === 1){
          num = [1,6,11,16,21];
        }else if(n%5 === 2){
          num = [2,7,12,17,22];
        }else if(n%5 === 3){
          num = [3,8,13,18,23];
        }else{
          num = [4,9,14,19,24];
        }
        break;
      case 8: // ┼5 십자5
        if(n<5){
          if(n === 0){
            num = [n,n+1,n+5];
          }else if(n === 4){
            num = [n,n-1,n+5];
          }else{
            num = [n,n-1,n+1,n+5];
          }
        }else if(n>19){
          if(n === 20){
            num = [n,n+1,n-5];
          }else if(n === 24){
            num = [n,n-1,n-5];
          }else{
            num = [n,n-1,n+1,n-5];
          }
        }else{
          if(n%5 === 0){
            num = [n,n-5,n+5,n+1];
          }else if(n%5 === 4){
            num = [n,n-5,n+5,n-1];
          }else{
            num = [n,n-5,n+5,n+1,n-1];
          }
        }
        num = []
        break;
      case 9: // ┼9 십자9
        num = [12,2,7,10,11,13,14,17,22];
        break;
      case 10: // /5 대각선
        if(n === 0 || n === 6 || n === 12 || n === 18 || n === 24){
          num = [0,6,12,18,24];
        }else if(n === 1 || n === 7 || n === 13 || n === 19){
          num = [1,7,13,19];
        }else if(n === 5 || n === 11 || n === 17 || n === 23){
          num = [5,11,17,23];
        }else if(n === 2 || n === 8 || n === 14){
          num = [2,8,14];
        }else if(n === 10 || n === 16 || n === 22){
          num = [10,16,22];
        }else if(n === 3 || n === 9){
          num = [3,9];
        }else if(n === 15 || n === 21){
          num = [15,21];
        }else if(n === 4){
          num = [4];
        }else{
          num = [20];
        }
        break;
      case 11: // \5 반대 대각선
        if(n === 4 || n === 8 || n === 12 || n === 16 || n === 20){
          num = [4,8,12,16,20];
        }else if(n === 3 || n === 7 || n === 11 || n === 15){
          num = [3,7,11,15];
        }else if(n === 9 || n === 13 || n === 17 || n === 21){
          num = [9,13,17,21];
        }else if(n === 2 || n === 6 || n === 10){
          num = [2,6,10];
        }else if(n === 14 || n === 18 || n === 22){
          num = [14,18,22];
        }else if(n === 1 || n === 5){
          num = [1,5];
        }else if(n === 19 || n === 23){
          num = [19,23];
        }else if(n === 0){
          num = [0];
        }else{
          num = [24];
        }
        break;
      case 15: //└┐9
        num = [0,5,10,11,12,13,14,19,24];
        break;
      case 16: //┌┘9
        num = [4,9,14,13,12,11,10,15,20];
        break;
      case 17: //卍17
        num = [0,1,2,4,7,9,11,12,13,14,15,17,20,22,23,24];
        break;
      case 20: //▦25 전체
        num = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
        break;
      case 21: //□9 정사각형9
        if(n === 0 || n === 1 || n === 2 || n === 5 || n === 10){
          num = [0,1,2,5,6,7,10,11,12];
        }else if(n === 3 || n === 4 || n === 9 || n === 14){
          num = [2,3,4,7,8,9,12,13,14];
        }else if(n === 6 || n === 7 || n === 8 || n === 11 || n === 12 || n === 13 || n === 16 || n === 17 || n === 18){
          num = [6,7,8,11,12,13,16,17,18];
        }else if(n === 15 || n === 20 || n === 21 || n === 22){
          num = [10,11,12,15,16,17,20,21,22];
        }else{
          num = [12,13,14,17,18,19,22,23,24];
        }
        break;
      case 22: //ㅁ4 정사각형4
        if(n === 0 || n === 1 || n === 5 || n === 6){
          num = [0,1,5,6];
        }else if(n === 2 || n === 7){
          num = [1,2,6,7];
        }else if(n === 3 || n === 8){
          num = [2,3,7,8];
        }else if(n === 4 || n === 9){
          num = [3,4,8,9];
        }else if(n === 10 || n === 11){
          num = [5,6,10,11];
        }else if(n === 12){
          num = [6,7,11,12];
        }else if(n === 13){
          num = [7,8,12,13];
        }else if(n === 14){
          num = [8,9,13,14];
        }else if(n === 15 || n === 16){
          num = [10,11,15,16];
        }else if(n === 17){
          num = [11,12,16,17];
        }else if(n === 18){
          num = [12,13,17,18];
        }else if(n === 19){
          num = [13,14,18,19];
        }else if(n === 20 || n === 21){
          num = [15,16,20,21];
        }else if(n === 22){
          num = [16,17,21,22];
        }else if(n === 23){
          num = [17,18,22,23];
        }else{
          num = [18,19,23,24];
        }
        break;
      case 23: //자신
        num = [n];
        break;
      default:
        break;
    }
    return num;
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
    } else if (gradeNum < 0.7) { //매직등급
      return 2;
    } else {
      return 1;
    }
  },
  getIdxToCountry: (idx) => {
    switch(idx) {
      case 0:
        return 'korea';
      case 1:
        return 'japan';
      case 2:
        return 'china';
      case 3:
        return 'mongolia';
      case 4:
        return 'saudiArabia';
      case 5:
        return 'egypt';
      case 6:
        return 'greece';
      case 7:
        return 'italy';
      case 8:
        return 'unitedKingdom';
      case 9:
        return 'france';
      case 10:
        return 'spain';
      case 11:
        return 'portugal';
      default:
        return '';
    }
  },
  getCountryToIdx: (country) => {
    switch(country) {
      case 'korea':
        return 0;
      case 'japan':
        return 1;
      case 'china':
        return 2;
      case 'mongolia':
        return 3;
      case 'saudiArabia':
        return 4;
      case 'egypt':
        return 5;
      case 'greece':
        return 6;
      case 'italy':
        return 7;
      case 'unitedKingdom':
        return 8;
      case 'france':
        return 9;
      case 'spain':
        return 10;
      case 'portugal':
        return 11;
      default:
        return '';
    }
  },
  getItem: (saveData, gameData, changeSaveData, option, Save, lang) => {
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
        id:id,
        idx:selectItem.idx,
        part:selectItem.part,
        grade:grade,
        itemLv:option.lv,
        slot:0,//아이템 홀착용 갯수
        hole:[],
        color:selectItem.color,
        baseEff:[{
          type:selectItem.eff[0].type,
          num:selectItem.eff[0].num[0] + ' ~ ' + selectItem.eff[0].num[1],
        }],
        addEff:[],
        mark:'',
        markNum:0,
        modifier:{ko:'미확인',en:'unSealed',jp:'未確認'},
        weaponType:weaponType,
        sealed:true,
        favorite:0,
      }
      save.items[type].unshift(itemObj);
      changeSaveData(save);
      return;
    }
    const slotNum = Math.round(Math.random() * selectItem.socket);
    let hole = new Array(slotNum).fill(0);
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
    const getAddEff = (grade) => {
      const effList = [// 레어, 에픽, 매직
        [[100,200],[200,400],[100,1000]], //체력
        [[1,10],[10,20],[1,30]], //행동력
        [[1,3],[3,6],[1,15]], //행동회복력
        [[50,100],[100,200],[50,400]], //공격력
        [[50,100],[100,200],[50,400]], //방어력
        [[50,100],[100,200],[50,400]], //술공
        [[50,100],[100,200],[50,400]], //술방
        [[10,30],[30,60],[10,100]], //회복력
        [[1,10],[10,25],[1,40]], //속도
        [[10,20],[20,50],[10,100]], //행운
        [[1,15],[5,15],[1,20]], //쪼기
        [[1,15],[5,15],[1,20]], //할퀴기
        [[1,15],[5,15],[1,20]], //물기
        [[1,15],[5,15],[1,20]], //치기
        [[1,15],[5,15],[1,20]], //누르기
        [[1,15],[5,15],[1,20]], //던지기
        [[1,15],[5,15],[1,20]], //빛
        [[1,15],[5,15],[1,20]], //어둠
        [[1,15],[5,15],[1,20]], //물
        [[1,15],[5,15],[1,20]], //불
        [[1,15],[5,15],[1,20]], //바람
        [[1,15],[5,15],[1,20]], //땅
        [[1,10],[5,10],[1,15]], //빛 강화
        [[1,10],[5,10],[1,15]], //어둠 강화
        [[1,10],[5,10],[1,15]], //물 강화
        [[1,10],[5,10],[1,15]], //불 강화
        [[1,10],[5,10],[1,15]], //바람 강화
        [[1,10],[5,10],[1,15]], //땅 강화
      ]
      const effType = Math.round(Math.random()*(Math.random() < .3 ? 27 : 21));//마법 강화 확률 30퍼센트 이하
      let effRandomNum = [];
      if (grade === 2) {
        effRandomNum = effList[effType][2];
      } else if (grade === 3) {
        effRandomNum = effList[effType][0];
      } else if (grade === 4) {
        effRandomNum = effList[effType][1];
      }
      const effNum = Math.floor(Math.random()*(effRandomNum[1] - effRandomNum[0])) + effRandomNum[0];
      return {
        type: effType > 15 ? effType + 5 : effType,
        num: [String(effNum)],
      }
    }
    if (grade === 2) {
      const addEffLength = Math.floor(itemLv / 30);
      for (let i = 0; i < addEffLength; ++i) {
        if (itemLv > 30) {
          itemLv -= 30;
          addEff.push(getAddEff(grade));
        } else {
          break;
        }
      }
    } else if (grade === 3) {
      const addEffLength = Math.floor(itemLv / 20);
      for (let i = 0; i < addEffLength; ++i) {
        if (itemLv > 20) {
          itemLv -= 20;
          addEff.push(getAddEff(grade));
        } else {
          break;
        }
      }
    } else if (grade === 4) {
      const addEffLength = Math.floor(itemLv / 15);
      for (let i = 0; i < addEffLength; ++i) {
        if (itemLv > 15) {
          itemLv -= 15;
          addEff.push(getAddEff(grade));
        } else {
          break;
        }
      }
    }
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
      id:id,
      idx:selectItem.idx,
      part:selectItem.part,
      grade:grade,
      slot:slotNum,//아이템 홀착용 갯수
      hole:hole,
      color:color,
      baseEff:baseEff,
      addEff:addEff,
      mark:mark,
      markNum:markNum,
      modifier:modifier,
      weaponType:weaponType,
      sealed:false,
      favorite:option.favorite || 0,
    }
    if (Save) {
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
  buttonEvent: (dataObj) => {
    dataObj.event.stopPropagation();
    console.log(dataObj);
    const gameData = dataObj.gameData;
    let sData = {...dataObj.saveData};
    if (dataObj.type === 'enhancingStickers') {

    } else if (dataObj.type === 'itemEquip') { //아이템 착용
      const invenPart = dataObj.data.saveItemData.part;
      let overlapCheck = true;
      const saveCh = sData.ch[dataObj.data.slotIdx];
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
                slotIdx: dataObj.data.slotIdx,
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
      const saveCh = sData.ch[dataObj.data.slotIdx];
      sData.items['equip'].push(dataObj.data.saveItemData);//인벤에 아이템 넣기
      sData.ch[dataObj.data.slotIdx].items[dataObj.data.itemSaveSlot] = {}; //아이템 삭제
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
        slotIdx: dataObj.data.slotIdx,
        gameData: gameData,
      }));
      dataObj.showPopup(false);
    } else if (dataObj.type === 'itemUse') { //아이템 사용
      const saveCh = sData.ch[dataObj.data.slotIdx];
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
              slotIdx: dataObj.data.slotIdx,
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
                  util.getSkill(gameData, ch, dataObj.data.slotIdx, dataObj.saveData, dataObj.changeSaveData);
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
    }else if (dataObj.type === 'itemSell') { //아이템 판매
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
      util.getItem(sData, gameData, dataObj.changeSaveData, option, true, dataObj.lang);
      //dataObj.changeSaveData(sData);//데이터 저장
      // dataObj.showPopup(false);
    } else if (dataObj.type === 'holeEquip') {
      dataObj.showPopup(false);
    }
  },
  getColorant:(colorSet, gameData) => {
    const dataIdx = colorSet.split('_');
    return gameData.items.colorant[dataIdx[0]][dataIdx[1]];
  },
  comma:(result) => {
    result = String(result);
    return result.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
  getSkillText: (skillObj) => { //스킬 텍스트 전환 $(0), $<0>
    const {skill, lv, lang} = skillObj;
    const cate = skill.cate[0];
    const replaceArr = skill.txt[lang].match(/[$][(]\d[)]*/g) || [];
    const replaceArr_ = skill.txt[lang].match(/[$][<]\d[>]*/g) || [];
    const skillType = skill.element_type;
    let replaceText = skill.txt[lang];
    replaceArr.forEach((data, idx) => {
      replaceText = replaceText.replace(data, skill.eff[idx].num[lv >= 0 ? lv : 0]);
    });
    replaceArr_.forEach((data, idx) => {
      replaceText = replaceText.replace(data, skill.buff[idx].num[lv >= 0 ? lv : 0]);
    });
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
        return 7;
      case 'job':
      case 'skillBack':
        return 9;
      case 'star':
        return 12;
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