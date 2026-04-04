
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
    if (localStorage.getItem(key) === "undefined" || localStorage.getItem(key) === null) return {};
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
    history && history.shift();//첫 history 삭제
    if (history === null || history === undefined || history.length === 0 || history[1] === '') {
      navigate('/gameMain');
    } else {
      navigate(`/${history[0].location}`, {
        state: {
          ...history[0].state,
        }
      });
    }
    util.saveData('history', history);
  },
  getEnemyState: (enemyData, gameData) => {
    let battleState_ = [];
    let enemy = {};
    const itemEff = util.getItemEff('', enemyData, gameData.items, true);
    const gradeGap = gameData.addGradeBaseState[enemyData.grade - gameData.ch[enemyData.idx].grade] || 0;//등급 차이
    for (const idx of gameData.stateName.keys()) {
      const st = gameData.ch[enemyData.idx]['st' + idx] || 0;
      battleState_[idx] = st + gradeGap;
    }
    battleState_[7] = gameData.ch[enemyData.idx].st3 + gameData.ch[enemyData.idx].st5 + gameData.ch[enemyData.idx].st6; //속도
    battleState_[8] = Math.round(Math.random() * 200); //행운
    const battleState = util.getTotalState(battleState_);
    //등급에 따른 추가 능력치
    for (const [idx, bState] of battleState.entries()) {
      const _bState = idx === 0 ? bState + (bState * (enemyData.lv / 10)) : bState; //레벨에 따른 체력 가중치
      enemy = {
        ...enemy,
        ['bSt' + idx]: gameData.addLvState[idx] ? Math.round(_bState * (1 + (gameData.addLvArr * enemyData.lv))) : _bState,
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
        ['el' + idx]: gameData.animalType[gameData.ch[enemyData.idx].animal_type].element[idx],
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
    let saveChSlot = { ...(saveData.ch[saveSlot] || obj.newState) };
    const gradeGap = gameData.addGradeBaseState[obj.grade - gameData.ch[saveChSlot.idx].grade] || 0;//등급 차이
    for (const idx of gameData.stateName.keys()) {
      const st = gameData.ch[saveChSlot.idx]['st' + idx] || 0;
      saveChSlot['st' + idx] = st + gradeGap//현재능력치
      battleState_[idx] = st + gradeGap;
    }
    saveChSlot['st7'] = saveChSlot.stateLuk; //행운
    battleState_[7] = gameData.ch[saveChSlot.idx].st3 + gameData.ch[saveChSlot.idx].st5 + gameData.ch[saveChSlot.idx].st6; //속도
    battleState_[8] = saveChSlot.stateLuk; //행운
    //등급에 따른 추가 능력치
    const battleState = util.getTotalState(battleState_);
    for (const [idx, bState] of battleState.entries()) {
      const _bState = idx === 0 ? bState + (bState * ((saveChSlot.lv - 1) / 10)) : bState; //레벨에 따른 체력 가중치
      saveChSlot['bSt' + idx] = gameData.addLvState[idx] ? Math.round(_bState * (1 + (gameData.addLvArr * saveChSlot.lv))) : _bState;
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
        ['el' + idx]: gameData.animalType[gameData.ch[saveChSlot.idx].animal_type].element[idx],
      }
    }
    saveChSlot = {
      ...saveChSlot,
      itemEff: obj.itemEff,
      grade: obj.grade || gameData.ch[saveChSlot.idx].grade, //캐릭터 등급
    }
    return saveChSlot;
  },
  saveCharacter: ({gameData, saveData, chSlotIdx, changeSaveData}) => { //아이템 변경시 스텟저장
    let saveCh = [
      ...saveData.ch,
    ].map(ch => ({ ...ch, items: ch.items.map(item => ({ ...item })), animalSkill: ch.animalSkill.map(group => group.map(sk => ({ ...sk }))) }));

    if (typeof chSlotIdx === "number") { //슬롯설정이 되면 개별 캐릭만 실행
      const itemEff = util.getItemEff(chSlotIdx, saveCh, gameData.items);
      saveCh[chSlotIdx] = util.saveLvState(chSlotIdx, {
        itemEff: itemEff,
        grade: gameData.ch[saveCh[chSlotIdx].idx].grade,
        newState: {},
      }, { ...saveData, ch: saveCh }, gameData)
    } else if (chSlotIdx === "all") { //슬롯설정이 없으면 전체 캐릭 실행
      for (const idx of saveCh.keys()) {
        const itemEff = util.getItemEff(idx, saveCh, gameData.items);
        saveCh[idx] = util.saveLvState(idx, {
          itemEff: itemEff,
          grade: saveCh[idx].grade || gameData.ch[saveCh[idx].idx].grade,
          newState: {},
        }, { ...saveData, ch: saveCh }, gameData);
      }
    }
    changeSaveData({
      ...saveData,
      ch: saveCh,
    })
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
          console.log(eff);
          if (eff.baseEff) {//save baseEff
            const baseEff = eff.baseEff;
            for (const baseData of baseEff) {
              console.log(baseData);
              if (effData[baseData.type] === undefined) {
                effData[baseData.type] = {percent:0, number:0};
              }
              if (baseData.num.indexOf('%') > 0){
                effData[baseData.type].percent = effData[baseData.type].percent + parseInt(baseData.num);
              } else {
                effData[baseData.type].number = effData[baseData.type].number + parseInt(baseData.num);
              }
            }
          }
          if (eff.addEff) {//save addEff
            const addEff = eff.addEff;
            for (const addData of addEff) {
              console.log(addData);
              if (effData[addData.type] === undefined) {
                effData[addData.type] = {percent:0, number:0};
              }
              if (addData.num.indexOf('%') > 0){
                effData[addData.type].percent = effData[addData.type].percent + parseInt(addData.num);
              } else {
                effData[addData.type].number = effData[addData.type].number + parseInt(addData.num);
              }
            }
          }
          if(eff) {//gameData eff
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
  getLineupSt: ({lineupType, lineupGrade, ch, peopleLength, gameData}) => {
    let effArr = [];
    if (!ch) {
      effArr.push([[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]);
    } else {
      let arr = [0,0,0,0,0,0,0,0,0,0];
      const eff = gameData.lineup[lineupType].eff[lineupGrade];
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
  setLineupSt: ({
    isMoveEvent, lineupType, saveSlot, useList, leaderIdx, scenarioState,
    selectSave, lineupIdx, cloneUseList
  }, gameData, saveData) => {
    const lineupArea = gameData.lineup[lineupType];
    const saveSlotIdx = saveSlot;
    
    let peopleLength = 0;
    let lineNum = [];
    const currenSaveData = isMoveEvent ? 
      { ...saveData, 
        eventLineup: { ...saveData.eventLineup, save_slot: saveData.eventLineup.save_slot.map((slot, sIdx) => sIdx === selectSave ? { ...slot, no: lineupIdx, entry: [...cloneUseList] } : slot) } 
      } :
      { ...saveData,
        ...(scenarioState?.type === "scenario" ? {
          ch: saveData.ch.map((ch, chIdx) => chIdx === scenarioState?.slotIdx
            ? { 
                ...ch,
                scenario: ch.scenario.map((scenario, scenarioIdx) => scenarioIdx === scenarioState?.chScenarioIdx
                    ? { 
                      ...scenario,
                      stage: scenario.stage.map((stage, stageIdx) => stageIdx === scenarioState?.stageIdx
                        ? { 
                            ...stage,
                            lineup: {
                              ...stage.lineup,
                              slot: { 
                                ...stage.lineup.slot,
                                no: lineupIdx,
                                entry: [...cloneUseList],
                              }
                            }
                          }
                        : stage
                      )
                    }
                  : scenario
                )
              }
            : ch
          )
        } : {
          lineup: { ...saveData.lineup, save_slot: saveData.lineup.save_slot.map((slot, sIdx) => sIdx === selectSave ? { ...slot, no: lineupIdx, entry: [...cloneUseList] } : slot) } 
        })
      };
    if(leaderIdx !== "") {
      for (const [entry_idx, entry_data] of useList.entries()) {
        if (entry_data !== '') {
          let found = false;
          for (const [line_idx, line_data] of lineupArea.entry.entries()) {
            for (const lineData of line_data) {
              if (lineData === entry_idx) {
                peopleLength ++;
                lineNum.push(line_idx);
                found = true;
                break;
              }
            }
            if (found) break;
          }
          if (!found) lineNum.push('');
        } else {
          lineNum.push('');
        }
      }
    } else {
      lineNum = new Array(25).fill("");
    }

    let eff = [];
    lineNum.forEach((lGrade, lineupIdx) => {
      const chIdx = useList[lineupIdx];
      const ch = currenSaveData.ch[chIdx];
      eff.push(...util.getLineupSt({
        lineupType: lineupType,
        lineupGrade: lGrade,
        ch: ch,
        peopleLength: peopleLength,
        gameData: gameData,
      }));
    });
    const updateSlot = (slot, idx) => {
      if (idx === saveSlotIdx) {
        return {
          ...slot,
          no: lineupType,
          entry: [...useList],
          num: peopleLength,
          eff: eff,
          leader: leaderIdx,
        };
      }
      return slot;
    };
    if (isMoveEvent) {
      return {
        ...currenSaveData,
        eventLineup: {
          ...currenSaveData.eventLineup,
          save_slot: currenSaveData.eventLineup.save_slot.map(updateSlot)
        }
      };
    } else {
      if (scenarioState?.type === "scenario") {
        currenSaveData.ch[scenarioState.slotIdx].scenario[scenarioState.chScenarioIdx].stage[scenarioState.stageIdx].lineup.slot = {
          no: lineupType,
          entry: [...useList],
          num: peopleLength,
          eff: eff,
          leader: leaderIdx,
        };
        console.log(currenSaveData.ch[scenarioState.slotIdx].scenario[scenarioState.chScenarioIdx].stage[scenarioState.stageIdx].lineup.slot);
        return currenSaveData;
      } else {
        return {
          ...currenSaveData,
          lineup: {
            ...currenSaveData.lineup,
            save_slot: currenSaveData.lineup.save_slot.map(updateSlot)
          }
        };
      }
    }
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
  getTotalEff: ({saveItems, gameData, cate}) => {
    let totalEff = [];
    const grade = saveItems.hole ? saveItems.grade : 1;
    if (cate === "hole") {
      gameData.items[cate][saveItems.idx].eff.forEach((data, idx) => {
        if (totalEff[data.type] === undefined) {
          totalEff[data.type] = {type: data.type, base: 0, add:0, hole:0};
        }
        totalEff[data.type].hole += parseInt(data.num);
      });
    }
    saveItems.baseEff?.forEach((data, idx) => {
      if (totalEff[data.type] === undefined) {
        totalEff[data.type] = {type: data.type, base: 0, add:0, hole:0};
      }
      if (data.num.indexOf('~') >= 0) {
        totalEff[data.type].base = data.num;
      } else {
        totalEff[data.type].base += parseInt(data.num[grade - 1]);
      }
    });
    saveItems.addEff?.forEach((data, idx) => {
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
    if (saveItems.hole) {
      saveItems.hole.forEach((data, idx) => {
        if (data.baseEff) {//save baseEff
          data.baseEff.forEach((baseData, idx) => {
            if (totalEff[baseData.type] === undefined) {
              totalEff[baseData.type] = {type: baseData.type, base: 0, add:0, hole:0};
            }
            totalEff[baseData.type].hole += parseInt(baseData.num);
          });
        }
        if (data.addEff) {//save addEff
          data.addEff.forEach((addData, idx) => {
            if (totalEff[addData.type] === undefined) {
              totalEff[addData.type] = {type: addData.type, base: 0, add:0, hole:0};
            }
            totalEff[addData.type].hole += parseInt(addData.num);
          });
        }
        if (data) {//gameData eff
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
      {na:'AVD',ko:'회피',en:'Avoidance rate',jp:'回避率'},//39
      {na:'HRT',ko:'적중율',en:'Hit rate',jp:'命中率'},
      {na:'RHP',ko:'HP회복',en:'HP Recovery',jp:'HP回復'},
      {na:'RSP',ko:'SP회복',en:'SP Recovery',jp:'SP回復'},
      {na:'RHSP', ko:'HP,SP회복',en:'HP,SP Recovery',jp:'HP,SP回復'},
      {na:'REV',ko:'부활',en:'Revive',jp:'復活'},
      {na:'REH',ko:'부활후 HP회복',en:'HP Recovery after Revive',jp:'復活後のHP回復'},
      {},
      {na:'PS',ko:'위치상태',en:'Position State',jp:'位置状態'},
      {na:'IV',ko:'무적',en:'Invincible',jp:'無敵'},
      {na:'IM',ko:'면역',en:'Immunity',jp:'免疫'},//49
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
      {},{},{},{},{},{},{},{},{},
      {},{},{},{},{},{},{},{},{},{},
      {},{},{},{},{},{},{},{},{},{},
      {},{},{},{},{},{},{},{},{},{},
      {},{},{},{},{},{},{},{},{},{},
      {},{},{},{},{},{},{},{},{},{},
      {},{},{},{},{},{},{},{},{},{},
      {},{},{},{},{},{},{},{},{},{},
      {},{},{},{},{},{},{},{},{},{na:'FM',ko:'진형',en:'Formation',jp:'陣形'},
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
      animalSkill = gameData.animalType[chData.animal_type].skill,
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
  getAnimalCoin: ({
    slotIdx, saveData, luck, lv
  }) => {
    const coin = (lv % 10 === 0) ? 1 : (Math.random() < luck / 400) ? 1 : 0; //10레벨마다 획득, 행운치에 따라서 획득
    saveData.ch[slotIdx].mark = saveData.ch[slotIdx].mark + coin;
    saveData.ch[slotIdx].animalBadge = saveData.ch[slotIdx].animalBadge + coin;
    return coin === 0 ? false : true;
  },
  getSkill: ({
    gameData,
    slotIdx,
    saveData,
    luck,
    lv,
  }) => {
    const saveCh = saveData.ch[slotIdx];
    const intelligence = saveCh.st4; //지능
    const isGet = lv % 5 === 0 || Math.random() < (luck + intelligence) / 600; //5레벨마다 획득, 행운 + 지능에 따라서 획득
    if (!isGet) {
      return "";
    }
    const lvGroup = gameData.job[saveCh.job].skill[saveCh.lv === 50 ? "maxLv" : `lv${util.fnPercent([50,30,15,5])}`];
    const skillNum = Math.floor(Math.random() * lvGroup.length),
      skillIdx = lvGroup[skillNum];
    const lvExp = [100,50,25,25];
    let hasSkill = '';
    console.log(skillIdx, skillNum);
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
    if (skillIdx !== undefined) {
      if (!hasSkill) {
        saveData.ch[slotIdx].sk.push({
          idx: skillIdx,
          lv: 1,
          exp: 0,
        });
      }
    }
    return skillIdx;
  },
  effect: {
    lvUp: ({
      timeoutRef,
      rewardType,
      rewardText,
      setRewardText,
    }) => {
      const lvUpElement = document.getElementsByClassName('lvupEffect');
      Array.prototype.forEach.call(lvUpElement, (el) => {
        el.classList.remove("animate");
      });
      clearTimeout(timeoutRef.current[0]);
      timeoutRef.current[0] = setTimeout(() => {
        Array.prototype.forEach.call(lvUpElement, (el) => {
          el.classList.add("animate");
        });
        setTimeout(() => {
          Array.prototype.forEach.call(lvUpElement, (el) => {
            el.classList.remove("animate");
          });
        }, 800);
      }, 50);
      if (rewardType === "both") {
        setRewardText(rewardText);
        util.effect.lvUpReward({
          timeoutRef: timeoutRef,
          setRewardText: setRewardText,
        });
      } else if (rewardType === "skill") {
        setRewardText(rewardText);
        util.effect.lvUpReward({
          timeoutRef: timeoutRef,
          setRewardText: setRewardText,
        });
      } else if (rewardType === "animalCoin") {
        setRewardText(rewardText);
        util.effect.lvUpReward({
          timeoutRef: timeoutRef,
          setRewardText: setRewardText,
        });
      }
    },
    lvUpReward: ({
      timeoutRef,
      setRewardText,
    }) => {
      const container = document.getElementById('getLvReward');
      clearTimeout(timeoutRef.current[1]);
      container.classList.add("animate");
      timeoutRef.current[1] = setTimeout(() => {
        container.classList.remove("animate");
        setRewardText("");
      }, 1500);
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
  getHslColor: (colorType, opacity) => {
    const h = Math.round(Math.random() * 360);
    let s = 0;
    let l = 0;
    if (colorType === 0) {//point
      s = Math.round(Math.random() * 20 + 80);
      l = Math.round(Math.random() * 35 + 35);
    } else if (colorType === 1) {//light
      s = Math.round(Math.random() * 20 + 80);
      l = Math.round(Math.random() * 30 + 50);
    } else {//dark
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
  getIdxToRegion: (idx) => {
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
  getRegionToIdx: (region) => {
    switch(region) {
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
  getCountryToIdx: (country) => {
    switch(country) {
      case 'japan0':
      case 'japan1':
      case 'japan2':
        return 0;
      case 'korea0':
      case 'korea1':
      case 'korea2':
        return 1;
      case 'mongolia0':
      case 'mongolia1':
      case 'mongolia2':
      case 'mongolia3':
      case 'mongolia4':
        return 2;
      case 'china0':
      case 'china1':
      case 'china2':
      case 'china3':
      case 'china4':
      case 'china5':
      case 'china6':
      case 'china7':
        return 3;
      case 'saudiArabia0':
        return 4;
      case 'egypt0':
        return 5;
      case 'greece0':
        return 6;
      case 'italy0':
        return 7;
      case 'france0':
        return 8;
      case 'spain0':
        return 9;
      case 'portugal0':
        return 10;
      case 'unitedKingdom0':
      case 'unitedKingdom1':
        return 11;
      default:
        return '';
    }
  },
  getStringToCountryIdx: (country) => {
    switch(country) {
      case 'japan0':
      case 'japan1':
      case 'japan2':
      case 0:
      case 1:
      case 2:
        return 0;
      case 'korea0':
      case 'korea1':
      case 'korea2':
      case 3:
      case 4:
      case 5:
        return 1;
      case 'mongolia0':
      case 'mongolia1':
      case 'mongolia2':
      case 'mongolia3':
      case 'mongolia4':
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
        return 2;
      case 'china0':
      case 'china1':
      case 'china2':
      case 'china3':
      case 'china4':
      case 'china5':
      case 'china6':
      case 'china7':
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
        return 3;
      case 'saudiArabia0':
      case 19:
        return 4;
      case 'egypt0':
      case 20:
        return 5;
      case 'greece0':
      case 21:
        return 6;
      case 'italy0':
      case 22:
        return 7;
      case 'france0':
      case 23:
        return 8;
      case 'spain0':
      case 24:
        return 9;
      case 'portugal0':
      case 25:
        return 10;
      case 'unitedKingdom0':
      case 'unitedKingdom1':
      case 26:
      case 27:
        return 11;
      default:
        return '';
    }
  },
  getLocationToIdx: (country) => {
    switch(country) {
      case 'cardsList':
      case 'cards':
        return 0;
      case 'inven':
        return 1;
      case 'cardPlacement':
        return 2;
      case 'training':
        return 3;
      case 'blacksmith':
        return 4;
      case 'composite':
        return 5;
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
      } else if (itemPart === '5') {//5:목걸이
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
      } else { // 보석
        effType = Math.floor(Math.random() * effList.length);
        effType = effList[effType] ? effType : Math.round(Math.random() * 9);
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
    if (type === "hole") {
      itemData = gameData.items.hole[option.items];
      const id = Math.random().toString(36).substring(2, 11);
      const grade = (option.grade > 1 ? option.grade : util.getItemGrade()) || util.getItemGrade();
      if (option.sealed && Number(option.items) < 100) {
        const itemObj = {
          id: id,
          idx: itemData.idx,
          grade: grade,
          itemLv: itemLv,
          baseEff: [{
            type: itemData.eff[0].type,
            num: itemData.eff[0].num[0],
          }],
          addEff: [],
          modifier: {ko:'미확인',en:'unSealed',jp:'未確認'},
          sealed: true,
          favorite: 0,
        };
        save.items[type].unshift(itemObj);
        changeSaveData(save);
        return;
      }

      const addEff = [];
      //슬롯
      if (itemLv > 0) {
        if (grade === 2) {
          const addEffLength = Math.floor(itemLv / 25);
          for (let i = 0; i < addEffLength; ++i) {
            if (itemLv > 25) {
              itemLv -= 25;
              addEff.push(getAddEff(grade, "0"));
            } else {
              break;
            }
          }
        } else if (grade === 3) {
          const addEffLength = Math.floor(itemLv / 20);
          for (let i = 0; i < addEffLength; ++i) {
            if (itemLv > 20) {
              itemLv -= 20;
              addEff.push(getAddEff(grade, "0"));
            } else {
              break;
            }
          }
        } else if (grade === 4) {
          const addEffLength = Math.floor(itemLv / 15);
          for (let i = 0; i < addEffLength; ++i) {
            if (itemLv > 15) {
              itemLv -= 15;
              addEff.push(getAddEff(grade, "0"));
            } else {
              break;
            }
          }
        }
        addEff.sort((a, b) => {// type 순번 정렬
          return a.type - b.type;
        })
      }
      const itemObj = {
        id: id,
        idx: itemData.idx,
        grade: grade,
        itemLv: option.lv,
        baseEff: [{
          type: itemData.eff[0].type,
          num: itemData.eff[0].num[0],
        }],
        addEff: addEff,
        sealed: false,
        favorite: option.favorite || 0,
      }
      save.items[type].unshift(itemObj);
      changeSaveData(save);
    } else if (type === "equip") {
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
      const grade = (option.grade > 1 ? option.grade : util.getItemGrade()) || util.getItemGrade();
      if (option.sealed) {
        const itemObj = {
          id: id,
          idx: itemData.idx,
          part: itemData.part,
          grade: grade,
          itemLv: itemLv,
          slot: 0,//아이템 홀착용 갯수
          hole: [],
          color: "",
          baseEff: [{
            type: itemData.eff[0].type,
            num: itemData.eff[0].num[0] + ' ~ ' + itemData.eff[0].num[1],
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
      const color = util.getRgbColor();
      // const color = util.getHslColor(Math.floor(Math.random() * 3),1);
      const baseEff = itemData.eff.map((data) => {
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
  
      //슬롯
      const slotNum = (() => {
        if ((itemData.part === 4 || itemData.part === 5) && itemData.idx === 2) {//해골목걸이, 해골반지 경우 무조건 1개
          return 1;
        }
        if (grade === 1) {
          if (Math.random() < 0.3) {
            return Math.round(Math.random() * (itemData.socket - 1)) + 1;
          } else {
            return Math.round(Math.random() * itemData.socket);
          }
        } else {
          return Math.round(Math.random() * itemData.socket);
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
        `${mark !== '' ? gameData.animalType[mark].na.ko : ''}${gameData.items.markModifier.ko[markNum]}`,
        `${gameData.items.markModifier.en[markNum]} ${mark !== '' ? gameData.animalType[mark].na.en : ''}${markNum > 1 ? 's' : ''}`,
        `${mark !== '' ? gameData.animalType[mark].na.jp : ''}${gameData.items.markModifier.jp[markNum]}`,
      ];
      const modifier = {
        ko:gameData.items.slotModifier.ko[slotNum] + ' ' + animalModifier[0],
        en:gameData.items.slotModifier.en[slotNum] + ' ' + animalModifier[1],
        jp:gameData.items.slotModifier.jp[slotNum] + ' ' + animalModifier[2],
      };
      itemLv -= slotNum * 5;
      const itemObj = {
        id: id,
        idx: itemData.idx,
        part: itemData.part,
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
    } else {
      const itemObj = {
        idx: itemData.idx,
      }
      console.log("pgs", itemObj);
      save.items[type].unshift(itemObj);
      changeSaveData(save);
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
        const maxActionPoint = data.actionMax || 50;
        data.actionPoint = Math.min((data.actionPoint || 0) + Math.floor(timeGap / 5), maxActionPoint);
        data.pointTime -= timeGap;
      }
      changeSaveData(saveData);
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
    let sData = {
      ...dataObj.saveData,
      ch: dataObj.saveData.ch.map(ch => ({
        ...ch,
        items: ch.items.map(item => ({ ...item })),
        animalSkill: ch.animalSkill.map(group => group.map(sk => ({ ...sk })))
      })),
      items: Object.keys(dataObj.saveData.items).reduce((acc, key) => {
        acc[key] = dataObj.saveData.items[key].map(item => ({ ...item }));
        return acc;
      }, {}),
      info: { ...dataObj.saveData.info },
      ship: dataObj.saveData.ship.map(s => ({
        ...s,
        loadedItem: s.loadedItem.map(i => ({ ...i }))
      }))
    };

    if (dataObj.type === 'training') {

    } else if (dataObj.type === 'itemEquip') { //아이템 착용
      const invenPart = dataObj.data.saveItemData.part;
      let overlapCheck = true;
      const saveCh = sData.ch[dataObj.data.chSlotIdx];
      //아이템 무게 측정
      let currentKg = 0;
      let itemSubmit = false;
      const chGrade = saveCh.grade - gameData.ch[saveCh.idx].grade;
      const totalKg = Math.floor(gameData.ch[saveCh.idx].st1 / 0.3) / 10 * gameData.addGradeArr[chGrade + 1];
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
      if (!saveCh.possibleEquipment[dataObj.data.gameItem.part - 1][dataObj.data.gameItem.category]) {//직업 착용가능 확인 !dataObj.data.gameItem.limit[saveCh.job]
        dataObj.showMsg(true);
        dataObj.msgText(`<span caution>${gameData.msg.sentence.unpossibleJob[dataObj.lang]}</span>`);
        return;
      }
      for (const [itemSlot, item] of saveCh.items.entries()) {
        if (invenPart === gameData.animalType[chType].equip[itemSlot] && overlapCheck) {//해당파트와 같은파트인지? && 빈칸인지? && 같은파트가 비었을경우 한번만 발생하게 
          if (item.idx === undefined) { //해당 슬롯이 비었을 비었을 경우
            currentKg += dataObj.data.gameItem.kg
            if (currentKg > totalKg) { //가능 무게를 넘어 갈 경우
              dataObj.showMsg(true);
              dataObj.msgText(`<span caution>${gameData.msg.sentence.heavyKg[dataObj.lang]}</span>`);
            } else { //착용 가능 무게일 경우
              saveCh.items[itemSlot] = { ...sData.items['equip'][dataObj.data.itemSaveSlot] };//캐릭에 아이템 넣기
              if (dataObj.data.saveItemData.mark === gameData.ch[saveCh.idx].animal_type) {//동물 뱃지 수정
                saveCh.animalBadge += dataObj.data.saveItemData.markNum;
              }
              if (dataObj.data.gameItem.actionType !== '') {
                saveCh.newActionType = dataObj.data.gameItem.actionType;
              }
              sData.items['equip'].splice(dataObj.data.itemSaveSlot, 1);//인벤에서 아이템 제거
              overlapCheck = false;
              util.saveCharacter({//데이터 저장
                saveData: sData,
                chSlotIdx: dataObj.data.chSlotIdx,
                gameData: gameData,
                changeSaveData: dataObj.changeSaveData,
              });
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
      sData.items['equip'] = [...sData.items['equip'], dataObj.data.saveItemData];//인벤에 아이템 넣기
      saveCh.items[dataObj.data.itemSaveSlot] = {}; //아이템 삭제
      if (dataObj.data.saveItemData.mark === gameData.ch[saveCh.idx].animal_type) {//동물 뱃지 수정
        saveCh.animalBadge = util.getAnimalPoint(saveCh.items, gameData.ch[saveCh.idx].animal_type, saveCh.mark);
      }
      saveCh.animalSkill = saveCh.animalSkill.map((skGroup) => {//동물 스킬 초기화
        return skGroup.map((skData) => {
          if (Object.keys(skData).length !== 0) {
            return {
              idx: skData.idx,
              lv: 0,
            }
          } else {
            return {}
          }
        });
      });
      saveCh.newActionType = [saveCh.actionType];
      for (const [itemSlot, item] of saveCh.items.entries()) {
        const chType = gameData.ch[saveCh.idx].animal_type;
        if (gameData.animalType[chType].equip[itemSlot] === 3 && item.idx !== undefined) {
          const anotherWeaponActionType = gameData.items.equip[item.part][item.weaponType][0][item.idx].actionType;
          saveCh.newActionType = anotherWeaponActionType === '' ? [saveCh.actionType] : anotherWeaponActionType;
        }
      }
      util.saveCharacter({//데이터 저장
        saveData: sData,
        chSlotIdx: dataObj.data.chSlotIdx,
        gameData: gameData,
        changeSaveData: dataObj.changeSaveData,
      });
      dataObj.showPopup(false);
    } else if (dataObj.type === 'itemUse') { //아이템 사용
      const saveCh = sData.ch[dataObj.data.chSlotIdx];
      switch (dataObj.data.gameItem.action) {
        case 99: //골드 획득
          sData.info.money += dataObj.data.gameItem.price;//돈 계산
          break;
        case 98: //경험치 획득
          const hasMaxExp = gameData.hasMaxExp[saveCh.grade];
          saveCh.hasExp += dataObj.data.gameItem.eff;
          if (saveCh.hasExp > hasMaxExp) {
            saveCh.hasExp = hasMaxExp;
          }
          util.saveCharacter({//데이터 저장
            saveData: saveCh,
            chSlotIdx: dataObj.data.chSlotIdx,
            gameData: gameData,
            changeSaveData: dataObj.changeSaveData,
          });
          break;
        default:
          dataObj.showMsg(true);
          dataObj.msgText(`<span caution>${gameData.msg.sentence.none[dataObj.lang]}</span>`);
          break;
      } //사용 타입
      sData.items[dataObj.data.type].splice(dataObj.data.itemSaveSlot, 1);//인벤에서 아이템 제거
      dataObj.changeSaveData(sData);//데이터 저장
      dataObj.showPopup(false);
    } else if (dataObj.type === 'itemBuy') { //아이템 구입
      if (dataObj.data.actionChIdx === "") {
        dataObj.showMsg(true);
        dataObj.msgText(`<span caution>${gameData.msg.sentence.noneSelectCh[dataObj.lang]}</span>`);
      } else {
        if (sData.ch[dataObj.data.actionChIdx].actionPoint >= gameData.actionPoint.usePoint.itemBuy) {
          sData.ch[dataObj.data.actionChIdx].actionPoint -= gameData.actionPoint.usePoint.itemBuy;//행동력 지불
  
          if (dataObj.data.type === 'equip' || dataObj.data.type === 'hole') {
            sData.info.money -= dataObj.data.itemPrice;
            //아이템 추가
            sData.items[dataObj.data.type].push({...dataObj.data.saveItemData});
            dataObj.data.callback && dataObj.data.callback();
          } else {
            sData.info.money -= dataObj.data.itemPrice * (dataObj.data.num || 1);//돈 계산
            //아이템 갯수 추가
            const slotIdx = sData.items[dataObj.data.type].findIndex((data) => data.idx === dataObj.data.saveItemData.idx);
            if (slotIdx >= 0) {
              sData.items[dataObj.data.type][slotIdx].num = Number(sData.items[dataObj.data.type][slotIdx].num) + Number(dataObj.data.num);
            } else {
              sData.items[dataObj.data.type].push({...dataObj.data.saveItemData, num: dataObj.data.num});
            }
          }
          dataObj.changeSaveData(sData);//데이터 저장
          dataObj.showPopup(false);
        } else {
          dataObj.showMsg(true);
          dataObj.msgText(`<span caution>${gameData.msg.sentenceFn.lackActionPoint(dataObj.lang, gameData.ch[dataObj.data.actionChIdx].na1[dataObj.lang])}</span>`)
        }
      }
    } else if (dataObj.type === 'itemSell') { //아이템 판매
      if (dataObj.data.type === 'equip' || dataObj.data.type === 'hole') {
        //console.log(dataObj.data.gameItem.price, dataObj.data.gameItem.grade);
        sData.info.money += dataObj.data.gameItem.price * (dataObj.data.num || 1);//dataObj.data.gameItem.grade;//돈 계산
      } else {
        sData.info.money += dataObj.data.gameItem.price * (dataObj.data.num || 1);//돈 계산
      }
      const slotIdx = sData.items[dataObj.data.type].findIndex((data) => data.idx === dataObj.data.gameItem.idx);
      if (slotIdx >= 0) {
        if (sData.items[dataObj.data.type][slotIdx].num > dataObj.data.num) {
          sData.items[dataObj.data.type][slotIdx].num = Number(sData.items[dataObj.data.type][slotIdx].num) - Number(dataObj.data.num);
        } else {
          sData.items[dataObj.data.type].splice(slotIdx, 1);//인벤에서 아이템 제거
        }
      } else {
        sData.items[dataObj.data.type].splice(dataObj.data.itemSaveSlot, 1);//인벤에서 아이템 제거
      }
      dataObj.changeSaveData(sData);//데이터 저장
      dataObj.showPopup(false);
    } else if (dataObj.type === 'itemEvaluate') { //아이템 확인
      // sData.items[dataObj.data.type].splice(dataObj.data.itemSaveSlot,1);//인벤에서 아이템 제거
      const itemInfo = dataObj.data.saveItemData.part === 3 ? `${dataObj.data.saveItemData.part}-${dataObj.data.saveItemData.weaponType}-${dataObj.data.saveItemData.idx}` : `${dataObj.data.saveItemData.part}-${dataObj.data.saveItemData.idx}`;
      const option = {
        type: dataObj.data.type,
        items: dataObj.data.type === "hole" ? dataObj.data.saveItemData.idx : itemInfo,
        //아이템종류, 세부종류(검,단검), 매직등급
        grade: dataObj.data.saveItemData.grade,
        lv: dataObj.data.saveItemData.itemLv,
        sealed: false,
        evaluateSlot: dataObj.data.itemSaveSlot,
        favorite: dataObj.data.saveItemData.favorite
      }
      console.log("pgs", option);
      util.getItem({
        saveData: sData,
        gameData: gameData,
        changeSaveData: dataObj.changeSaveData,
        option: option,
        isSave: true,
        lang: dataObj.lang
      });
      dataObj.changeSaveData(sData);//데이터 저장
      dataObj.setItemPopup && dataObj.setItemPopup(false);//팝업 제거
      dataObj.data.setSelectItem(dataObj.data.selectItem.map((item_) => {
        if (dataObj.data.saveItemData.id !== item_.saveItemData.id) {
          return item_;
        } else {
          return {
            "saveItemData": {},
            "gameItem": {},
            "itemSaveSlot": "",
            "selectTab": "",
            "itemCate": "",
            "buttonType": [],
          };
        }
      }));
    } else if (dataObj.type === 'holeEquip') {
      dataObj.setItemPopup && dataObj.setItemPopup(false);
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
    if (!Array.isArray(arr) || arr.length === 0) throw new Error('arr is empty');

    // 누적합 만들기 + 유효성 검사
    const cumulative = [];
    let total = 0;

    for (let i = 0; i < arr.length; i++) {
      const w = Number(arr[i]);
      if (!Number.isFinite(w) || w < 0) {
        throw new Error(`arr[${i}] invalid weight: ${arr[i]}`);
      }
      total += w;
      cumulative.push({ idx: i, num: total });
    }

    if (total <= 0) return -1; // 전부 0이면 선택 불가

    const r = Math.random() * total; // [0, total)
    // filter[0] 대신 find로 즉시 찾기 (안전)
    const picked = cumulative.find(block => r < block.num);
    return picked ? picked.idx : cumulative[cumulative.length - 1].idx; // 부동소수 방어

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
    const muliplesText = `<span small>${lang === 'en' ? textFor[lang] + ' ' + animalType[type][lang] : animalType[type][lang] + textFor[lang]}</span> <b dmg>${buff}</b> <i icon ${updownText[upDown].tag}></i>`;//${updownText[upDown][lang]}
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
    const heal = {ko:'회복',en:'Heal',jp:'回復'};
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
    switch(cate) {
      case 2:
        return `
          <i ${elTag.type} ${elTag.type}${elTag.idx}>${elementArr[element][lang]}</i>
        `;
      case 13:
      case 14:
        return `
          <i ${elTag.type} ${elTag.type}${elTag.idx}>${elementArr[element][lang]}</i> ${heal[lang]}
        `;
      default:
        return `
          <i ${elTag.type} ${elTag.type}${elTag.idx}>${elementArr[element][lang]}</i> ${attack[atkCount][lang]}
        `;
    }
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
      {ko:'가로 2',en:'2 horizontal',jp:'横2'},
      {ko:'가로 3',en:'3 horizontal',jp:'横3'},
      {ko:'세로 2',en:'2 verticals',jp:'縦2'},
      {ko:'세로 3',en:'3 verticals',jp:'縦3'},
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
      {ko:'랜덤 5',en:'5 Random',jp:'ランダム5'},
      {ko:'랜덤 10',en:'10 Random',jp:'ランダム10'},
      {ko:'랜덤 15',en:'15 Random',jp:'ランダム15'},
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
      {ko:'랜덤 20',en:'Random 20',jp:'ランダム20'},
      {ko:'바깥 1줄',en:'1 Outer Row',jp:'外側1行'},
      {ko:'바깥 2줄',en:'2 Outer Row',jp:'外側2行'},//40
      {ko:'바깥 3줄',en:'3 Outer Row',jp:'外側3行'},
      {ko:'선택포함 랜덤 5',en:'Random 5 with selection included',jp:'オプションを含むランダム5'},
      {ko:'선택포함 랜덤 10',en:'Random 10 with selection included',jp:'オプションを含むランダム10'},
      {ko:'선택포함 랜덤 15',en:'Random 15 with selection included',jp:'オプションを含むランダム15'},
      {ko:'선택포함 랜덤 20',en:'Random 20 with selection included',jp:'オプションを含むランダム20'},
      {ko:'가로 4',en:'Horizontal 4',jp:'横4'},
      {ko:'세로 4',en:'Vertical 4',jp:'縦4'},
      {ko:'가로 3x2',en:'3x2 Wide',jp:'横3x2'},
      {ko:'세로 2x3',en:'2x3 Vertical',jp:'縦2x3'},
      {ko:'가로 4x2',en:'4x2 Wide',jp:'横4x2'},//50
      {ko:'세로 2x4',en:'2x4 Vertical',jp:'縦2x4'},
      {ko:'선택포함 랜덤 3',en:'Random 3 with selection included',jp:'オプションを含むランダム3'},
      {ko:'선택포함 랜덤 7',en:'Random 7 with selection included',jp:'オプションを含むランダム7'},
      {ko:'작은 └┐형태',en:'Small └┐ Shape',jp:'小さな└┐型'},
      {ko:'작은 ┌┘형태',en:'Small ┌┘ Shape',jp:'小さな┌┘型'},
      {ko:'정사각형 16',en:'Square 16',jp:'正方形16'},
      {ko:'마름모 라인 4',en:'Rhombus line 4',jp:'菱形ライン4'},
      {ko:'마름모 라인 8',en:'Rhombus line 8',jp:'菱形ライン8'},
      {ko:'사각형 라인 12',en:'Square line 12',jp:'長方形の線12'},
      {ko:'원형 라인 12',en:'Circular line 12',jp:'円形ライン12'},//60
      {},{},{},{},{},{},{},{},{},{},
      {},{},{},{},{},{},{},{},{},{},
      {},{},{},{},{},{},{},{},{},{},
      {},{},{},{},{},{},{},{},{},
      {ko:'고양이들',en:'Cats',jp:'猫'},//100
      {ko:'사자들',en:'Lions',jp:'ライオン'},
      {ko:'호랑이들',en:'Tigers',jp:'虎'},
      {ko:'개들',en:'Dogs',jp:'犬'},
      {ko:'늑대들',en:'Wolves',jp:'オオカミ'},
      {ko:'물개들',en:'Seals',jp:'シール'},
      {ko:'너구리들',en:'Raccoons',jp:'アライグマ'},
      {ko:'쥐들',en:'Rats',jp:'ラット'},
      {ko:'토끼들',en:'Rabbits',jp:'うさぎ'},
      {ko:'고릴라들',en:'Gorillas',jp:'ゴリラ'},//110
      {ko:'캥거루들',en:'Kangaroos',jp:'カンガルー'},
      {ko:'소들',en:'Cows',jp:'牛'},
      {ko:'곰들',en:'Bears',jp:'クマ'},
      {ko:'말들',en:'Horses',jp:'馬'},
      {ko:'사슴들',en:'Deers',jp:'鹿'},
      {ko:'코뿔소들',en:'Rhinos',jp:'サイ'},
      {ko:'코끼리들',en:'Elephants',jp:'象'},
      {ko:'기린들',en:'Giraffes',jp:'キリン'},
      {ko:'새들',en:'Birds',jp:'鳥'},
      {ko:'독수리들',en:'Eagles',jp:'イーグル'},//독수리
      {ko:'도마뱀들',en:'Lizards',jp:'トカゲ'},
      {ko:'거북이들',en:'Turtles',jp:'カメ'},
      {ko:'개구리들',en:'Frogs',jp:'カエル'},
      {ko:'돼지들',en:'Pigs',jp:'豚'},
      {ko:'양들',en:'Sheep',jp:'羊'},
      {ko:'하마들',en:'Hippos',jp:'カバ'},
      {ko:'악어들',en:'Alligators',jp:'ワニ'},
    ];
    const areaText = areaIdx !== 23 ? `<span co${scope}>${teamArr[scope][lang]}</span> ${areaArr[areaIdx][lang]}` : areaArr[areaIdx][lang];
    return (cate === 2 || cate === 30) ? `<u>${inBattle[lang]}</u> ${areaText}` : areaText;
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
    return `(${isAttack[lang]} ${effType[type][lang]} <b buff>${eff}</b> <i icon ${updownText[upDown].tag}></i>)`;//${updownText[upDown][lang]}
  },
  getSkillDmgLang: ({eff, cate, lang}) => {
    const dmg = {ko:'효과로',en:'with effect',jp:'効果で'};
    return `<b dmg>${eff}</b> ${dmg[lang]}`;
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
    const posistionText = [
      {},
      {ko:'비행',en:'Flight',jp:'飛ぶ'},
      {ko:'잠수',en:'Diving',jp:'ダイビング'},
      {ko:'위장',en:'Camouflage',jp:'偽装'},
    ];
    // const windText = [
    //   {ko:'',en:'',jp:''},
    // ];
    const changeText = {ko:'으로 변경',en:'Change to',jp:'に変更'}
    const upDown = typeof buff === "number" ? "" : `<i icon ${updownText[buff?.indexOf('-') >= 0 ? 1 : 0].tag}>`;
    return buff 
      ? type !== 110 
        ? `${util.getEffectType(type,lang)} <b buff>${type === 47 ? posistionText[buff][lang] : buff}</b> ${upDown}</i>`
        : `${util.getEffectType(type,lang)} <b buff>${lang === 'en' ? changeText[lang] + ' ' + weatherText[buff][lang] : weatherText[buff][lang] + ' ' + changeText[lang]}</b>`
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
    const turnText = {ko:'턴 동안',en:'during the turn',jp:'ターン中'},
      immediateText = {ko:'즉시',en:'Immediate',jp:'すぐに'};
    return buffCount === 0 ? immediateText[lang] : `${buffCount}${turnText[lang]}`;
  },
  getSkillBuffChanceLang: ({buffChance, lang}) => {
    const chanceText = {ko:'확률',en:'chance',jp:'確率'};
    return `<span chance>${buffChance}</span> ${chanceText[lang]}`;
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
    return `${possibleElement[element][lang]}`;
  },
  getSkillJobLang: ({jobIdx, lang}) => {
    const jobText = [
      {},
      {ko:'상점 아이템 구입 가능',en:'Can purchase items in the store',jp:'ショップでアイテム購入可能'},
      {ko:'지역간 빠른이동 가능',en:'Can move quickly between regions',jp:'地域間高速移動が可能'},
      {ko:'장비 강화/분해 가능',en:'Can strengthen/disassemble equipment',jp:'機器強化/分解可能'},
      {ko:'조각품 제작 가능',en:'Can craft statues',jp:'彫像製作可能'},
      {ko:'식물 재배 가능',en:'Can grow plants',jp:'植物栽培可能'},
      {ko:'아이템 합성 가능',en:'Items can be composited',jp:'アイテム合成可能'},
      {ko:'목걸이, 반지 강화/분해 가능',en:'Can strengthen/disassemble necklaces and rings',jp:'ネックレス、指輪強化/分解可能'},
      {ko:'동료를 찾을 확률 증가',en:'Increases the chance of finding a companion',jp:'仲間を確率アップ'},
      {ko:'예술품 제작 가능',en:'Can create art',jp:'アート作品制作可能'},
      {ko:'기습 공격 가능',en:'Surprise attack possible',jp:'奇襲攻撃可能'},
      {ko:'미확인 아이템 식별 가능',en:'Can identify unidentified items',jp:'未確認アイテム識別可能'},
      {ko:'저주받은 아이템 정화 가능',en:'Can purify cursed items',jp:'呪われたアイテム浄化可能'},
      {ko:'저주받은 카드 정화 가능',en:'Can purify cursed cards',jp:'呪われたカード浄化可能'},
    ];
    return jobText[jobIdx][lang];
  },
  getSkillChSpecialLang: ({chSpecialIdx, lang}) => {
    const chSpecialText = [
      {},
      {ko:'상황 판단능력이 좋음',en:'Good judgment skills',jp:'状況判断能​​力が良い'},
    ];
    return chSpecialText[chSpecialIdx][lang];
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
        if (idx < skill.buff.length - 1) {
          buffText += ", ";
        }
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
    if (skill.jobTxtIdx > 0) {//직업 스킬
      replaceText = replaceText.replace('<job>', util.getSkillJobLang({
        jobIdx: skill.jobTxtIdx,
        lang: lang,
      }));
    }
    if (skill.chSpecialIdx > 0) {//인물 스킬
      replaceText = replaceText.replace('<chSpecial>', util.getSkillChSpecialLang({
        jobIdx: skill.chSpecialIdx,
        lang: lang,
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
    if (skill.ta[lv]) {
      replaceText = replaceText.replace('<area>', util.getSkillAreaLang({//이펙트 범위
        scope:skill.ta_,
        areaIdx:skill.ta[lv],
        cate:skill.cate,
        lang:lang,
      }));
    }
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
  isCondition: (type, category, itemIdx) => {
    const saveData = util.loadData('saveData');
    const idx = saveData[type][category].findIndex((v, i) => {
      return v.idx === itemIdx;
    });
    if (idx >= 0) {
      return saveData[type][category][idx]?.num ?? 1;
    } else {
      return 0;
    }
  },
  deleteItems: ({saveData, itemObj, num}) => {
    const cloneSaveData = {...saveData};
    const removeIdx = cloneSaveData[itemObj.type][itemObj.cate].findIndex((item, idx) => {
      return item.idx === itemObj.idx;
    });
    if (removeIdx >= 0) {
      cloneSaveData[itemObj.type][itemObj.cate][removeIdx].num -= num;
    }
    return cloneSaveData;
  },
  typeToStartIdx: (type) => {
    switch(type) {
      case 'equip':
        return '';
      case 'etc':
      case 'material':
        return 0;
      case 'hole':
        return 10;
      case 'upgrade':
        return 22;
      default:
        break;
    }
  },
  iconToStartIdx: (type) => {
    if (!type) {
      return 0;
    }
    switch(type) {
      case 'menu':
      case 'enemies':
      case 'elementBack':
      case 'land':
      case 'moveEventFinish':
      case 'eventBack':
      case 'worldMap':
      case 'etc':
        return 0;
      case 'lv':
      case 'quickMenu':
        return 1;
      case 'commonBtn':
      case 'map':
      case 'elementBack2':
        return 2;
      case 'item':
      case 'moveEventReward':
        return 3;
      case 'cardBack':
      case 'areaBackMoveRegion':
      case 'commonIcon':
        return 4;
      case 'scenario':
        return 5;
      case 'hunting':
        return 6;
      case 'mutate':
      case 'elevation':
      case 'shop':
      case 'pattern':
        return 7;
      case 'skillType':
      case 'battleState':
        return 8;
      case 'skillBack':
        return 9;
      case 'star':
      case 'hole':
        return 10;
      case 'star1':
        return 11;
      case 'star2':
        return 12;
      case 'star3':
        return 13;
      case 'job':
        return 15;
      case 'job1':
        return 18;
      case 'job2':
        return 21;
      case 'upgrade':
        return 22;
      case 'job3':
      case 'flag':
        return 24;
      case 'material':
        return 26;
      case 'animalType':
      case 'moveEventBlock':
        return 27;
      case 'moveEventBlockHead':
        return 28;
      case 'moveEventBlockType':
        return 29;
      case 'animalType1':
        return 31;
      case 'animalType2':
        return 35;
      case 'animalType3':
        return 39; 
      case 'animalCoin1':
        return 10;
      case 'animalCoin2':
        return 14;
      case 'animalCoin3':
        return 18;
      case 'cardRing':
        return 22;
      case 'animalMark':
        return 20;
      case 'element':
        return 43;
      case 'element1':
        return 45;
      case 'element2':
        return 47;
      case 'element3':
        return 49;
      case 'state':
        return 51;
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
      case 'img400':
        return [10, 5];
      case 'country':
      case 'areaBack':
        return [8,5];
      case 'img800':
        return [10,8];
      case 'icon100':
        return [10, 60];
      case 'icon150':
        return [10, 10];
      case 'icon200':
        return [10, 32];
      case 'map800':
        return [5, 8];
      case 'itemEtc':
        return [10, 32];
      case 'material':
        return [10, 16];
      case 'skill':
        return [20, 30];
      case 'shop':
        return [10, 2];
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
  getMoveBigEvent: (eventIdx) => {
    switch(eventIdx) {
      case 0:
        return {
          name: "chest",
        };
      case 1:
        return {
          name: "card",
        };
      case 2:
        return {
          name: "helm",
        };
      case 3:
        return {
          name: "armor",
        };
      case 4:
        return {
          name: "dagger",
        };
      case 5:
        return {
          name: "sword",
        };
      case 6:
        return {
          name: "twoSword",
        };
      case 7:
        return {
          name: "shield",
        };
      case 8:
        return {
          name: "axe",
        };
      case 9:
        return {
          name: "spear",
        };
      case 10:
        return {
          name: "bow",
        };
      case 11:
        return {
          name: "mace",
        };
      case 12:
        return {
          name: "fist",
        };
      case 13:
        return {
          name: "accessary",
        };
      case 14:
        return {
          name: "gold",
        };
      case 15:
        return {
          name: "empty",
        };
      default:
        return {};
    }
  },
  getMoveEvent: (eventIdx) => {
    switch(eventIdx) {
      case 0:
        return {
          name: "enemy",
        };
      case 1:
        return {
          name: "sEnemy",
        };
      case 2:
        return {
          name: "gold",
        };
      case 3:
        return {
          name: "treasure",
        };
      case 4:
        return {
          name: "holyGrail",
        };
      case 5:
        return {
          name: "trap",
        };
      case 6:
        return {
          name: "warp",
        };
      case 7:
        return {
          name: "well1",
        };
      case 8:
        return {
          name: "well2",
        };
      case 9:
        return {
          name: "well3",
        };
      case 10:
        return {
          name: "house",
        };
      case 11:
        return {
          name: "shop",
        };
      case 12:
        return {
          name: "guard",
        };
      case 13:
        return {
          name: "wayfarer",
        };
      case 14:
        return {
          name: "people",
        };
      case 15:
        return {
          name: "suspiciousPerson",
        };
      default:
        return {};
    }
  },
  battleEnemyNum: (num) => {
    const diffCount = Math.random();
    if (diffCount < 0.03) {//1~25
      return Math.round(Math.random() * 24 + 1);
    } else if (diffCount < 0.1) {//7~12
      return Math.round(Math.random() * 5 + (num + 4));
    } else if (diffCount < 0.5) {//4~7
      return Math.round(Math.random() * 3 + (num + 1));
    } else {//3~5
      return Math.round(Math.random() * 2 + num);
    }
  },
  battlePenalty: () => {
    const penaltyCoun = Math.random();
    if (penaltyCoun < 0.01) {
      return {
        type: "hp",
        num: "-30%",
      }
    } else if (penaltyCoun < 0.05) {
      return {
        type: "hp",
        num: "-20%",
      }
    } else if (penaltyCoun < 0.1) {
      return {
        type: "hp",
        num: "-10%",
      }
    } else if (penaltyCoun < 0.15) {
      return {
        type: "petrification",
      }
    } else if (penaltyCoun < 0.2) {
      return {
        type: "stun",
      }
    } else if (penaltyCoun < 0.25) {
      return {
        type: "freezing",
      }
    } else {
      return "";
    }
  },
  appearedLv1Hero: (battleType) => {
    const num = Math.random();
    switch (battleType) {
      case "moveEvent":
        if (num < 0.01) {
          return 2;
        } else if (num < 0.1) {
          return 1;
        } else {
          return 0;
        }
      case "scenarioRegion":
        if (num < 0.01) {
          return 2;
        } else if (num < 0.2) {
          return 1;
        } else {
          return 0;
        }
      case "exploring":
        if (num < 0.01) {
          return 2;
        } else if (num < 0.3) {
          return 1;
        } else {
          return 0;
        }
      default:
        return 0;
    }
  },
  updateScenarioHeroNum: ({gameData, saveData}) => {
    const updatedScenario = saveData.scenario || {};
    saveData.ch.forEach((chData) => {
      const chScenario = gameData.ch?.[chData.idx]?.scenarioRegion;
      if (chScenario && chScenario !== '') { //인물 전기가 있다면
        chScenario.forEach((scenarioData) => {
          if (!scenarioData) return;
          const chScenarioInfo = scenarioData.split("-");
          if (chScenarioInfo.length < 3) return;
          const category = chScenarioInfo[0].replace(/[0-9]/g, "");
          const regionIdx = chScenarioInfo[1];
          const scenarioIdx = chScenarioInfo[2];

          if (updatedScenario[category]?.[regionIdx]) {
            updatedScenario[category][regionIdx].scenarioList = (updatedScenario[category][regionIdx].scenarioList || []).map((s, si) => 
              si === Number(scenarioIdx) ? { ...s, heroNum: (s.heroNum || 0) + 1 } : s
            );
          }
        });
      }
    });
    saveData.scenario = updatedScenario;
    return saveData;
  },
  getHasSkillLv: ({saveData, slotIdx, skillIdx}) => {
    if (slotIdx === "") return 0;
    const chData = saveData.ch[slotIdx];
    const skillLv = chData.sk.find((v, i) => {
      return v.idx === skillIdx ? v.lv : 0;
    });
    return skillLv ? skillLv.lv : 0;
  },
  itemPrice: ({gameItem, saveItemData, skill, isBuy, skLv}) => {
    const discount = isBuy ? -1 : 1,
      itemGrade = saveItemData.grade || gameItem.grade,
      isSellPrice = isBuy ? gameItem.price * 2 : gameItem.price * 0.5;
    const price = isSellPrice + Math.round(isSellPrice * (skLv === "" ? 1 : Number(skill.eff[0].num[skLv]) / 100) * discount);
    return {
      str: `₩${util.comma(price * itemGrade)}`,
      num: price * itemGrade,
    };
  },
  makeCard: ({
    heroArr, //영웅분류
    gachaNum, //가챠횟수
    heroIdxArr, //영웅인덱스
    gachaType, //가챠종류
    isStart, //최초여부
    gameData, 
    saveData,
  }) => {
    const getCardIdx = (gradeNum) => {
      const chOfGrade = heroArr.grade;//등급별
      const gradeNum_ = chOfGrade[gradeNum] ? gradeNum : chOfGrade[gradeNum + 1] ? gradeNum + 1 : gradeNum - 1;//없는 등급그룹이 있을 경우 등급그룹 + 1
      const length = chOfGrade[gradeNum_]?.length,
            ran = Math.floor(Math.random() * length);
      return chOfGrade[gradeNum_][ran];
    }
    const getGrade = (n, type) => {
      let ch_arr = [];
      if (isStart) {
        if (isStart && gachaType === "fix") {
          ch_arr = Array.from({length: heroIdxArr.length}, () => 4);
        } else {
          ch_arr = heroIdxArr;
        }
      } else {
        const arr = type === 'p' ? [1,5,10,30] : [0.1,1,5,10,20,30]; // 다이아 & 골드 등급 나올확률값
        for(let i = 0 ; i < n ; ++i){
          const ranCount = Math.random()*100;
          let resultGrade = 0;
          if (gachaType === 'p') {
            if (ranCount < arr[0]){//7등급
              resultGrade = 6;
            }else if(ranCount < arr[1]){//6등급
              resultGrade = 5;
            }else if(ranCount < arr[2]){//5등급
              resultGrade = 4;
            }else if(ranCount < arr[3]){//4등급
              resultGrade = 3;
            }else{//3등급
              resultGrade = 2;
            }
          } else {
            if (ranCount < arr[0]){//7등급
              resultGrade = 6;
            }else if(ranCount < arr[1]){//6등급
              resultGrade = 5;
            }else if(ranCount < arr[2]){//5등급
              resultGrade = 4;
            }else if(ranCount < arr[3]){//4등급
              resultGrade = 3;
            }else if(ranCount < arr[4]){//3등급
              resultGrade = 2;
            }else if(ranCount < arr[5]){//2등급
              resultGrade = 1;
            }else{//1등급
              resultGrade = 0;
            }
          }
          ch_arr.push(resultGrade);
        }
      }
      console.log(ch_arr);
      const cloneArr = ch_arr.slice();
      const maxGrade = ch_arr.sort((a,b)=>b-a)[0];
      return {
        arr: cloneArr,
        maxGrade: maxGrade < 3 ? 3 : maxGrade //최고 높은 등급 확인
      };
    }
    let chArr = [];
    let chDataArr = [];
    const cardGrade = getGrade(gachaNum, gachaType);
    for (let i = 0; i < gachaNum; ++i) {
      const newIdx = gachaType === "fix" ? heroIdxArr[i] : getCardIdx(cardGrade.arr[i]);		
      const addGrade = Math.random();
      let luckyGradePoint = 0;
      if (cardGrade.arr[i] === 1) {
        if (addGrade < .005) {
          luckyGradePoint = 5;
        } else if (addGrade < .01) {
          luckyGradePoint = 4;
        } else if (addGrade < .05) {
          luckyGradePoint = 3;
        } else if (addGrade < .1) {
          luckyGradePoint = 2;
        } else if (addGrade < .3) {
          luckyGradePoint = 1;
        }
      } else if (cardGrade.arr[i] === 2) {
        if (addGrade < .005) {
          luckyGradePoint = 4;
        } else if (addGrade < .01) {
          luckyGradePoint = 3;
        } else if (addGrade < .05) {
          luckyGradePoint = 2;
        } else if (addGrade < .1) {
          luckyGradePoint = 1;
        }
      } else if (cardGrade.arr[i] === 3) {
        if (addGrade < .005) {
          luckyGradePoint = 3;
        } else if (addGrade < .01) {
          luckyGradePoint = 2;
        } else if (addGrade < .05) {
          luckyGradePoint = 1;
        }
      } else if (cardGrade.arr[i] === 4) {
        if (addGrade < .005) {
          luckyGradePoint = 2;
        } else if (addGrade < .01) {
          luckyGradePoint = 1;
        }
      }
      const cardG = cardGrade.arr[i] + luckyGradePoint;
      const animalAction = gameData.animalType[gameData.ch[newIdx].animal_type].actionType,
        actionType = animalAction[Math.floor(Math.random() * animalAction.length)];//공격타입
      const jobs = gameData.ch[newIdx].job,
        job = jobs[Math.floor(Math.random() * jobs.length)];//직업
      
      const kgData = gameData.animal_size.kg[gameData.ch[newIdx].animal_type],
        kg = Math.round((Math.random() < 0.1 ? Math.random() * (kgData[2] - kgData[0]) + kgData[0] : Math.random() * (kgData[1] - kgData[0]) + kgData[0]) * 10) / 10;
      chArr.push({
        idx: newIdx,
        grade: cardG,
        gradeMax: gameData.ch[newIdx].maxGrade,
        chSlotIdx: saveData.ch.length + i,
      });
      //시나리오 heroNum 증가
      const sData = util.updateScenarioHeroNum({
        gameData: gameData,
        saveData: saveData,
      });
      if (sData.hasHeroNum[newIdx]) {
        sData.hasHeroNum[newIdx] += 1;
      } else {
        sData.hasHeroNum[newIdx] = 1;
      }
      saveData = sData;
      const chScenario = gameData.ch[newIdx].scenarioRegion;
      const jobElementType = job === 1 ? Math.floor(Math.random() * 4) : job === 6 ? Math.floor(Math.random() * 2) : "";//특정 직업의 속성 설정(마법사, 도사)
      const skill = [{idx: 0, lv: 1, exp: 0}, {idx: 1, lv: 1, exp: 0}, {idx: 2, lv: 1, exp: 0}, ...gameData.ch[newIdx].sk.map((v) => ({idx: v.idx, lv: v.lv, exp: 0}))];//기본 스킬 + 캐릭터 스킬
      gameData.job[job].skill.basic.forEach((v)=>{//직업 추가되는 스킬
        if (v < 3) {
          skill[v].lv += 1;
        } else {
          skill.push({idx: v, lv: 1, exp: 0});
        }
      });

      //랜덤스킬 획득
      const skillLvGroup = gameData.job[job].skill[`lv${util.fnPercent(gameData.percent.getBaseSkill)}`],
        getRandomSkillIdx = skillLvGroup[Math.floor(Math.random() * skillLvGroup.length)];
      const skillTarget = skill.find(s => s.idx === getRandomSkillIdx);
      if (skillTarget) {
        skillTarget.lv += 1;
      } else {
        skill.push({ idx: getRandomSkillIdx, lv: 1, exp: 0 });
      }
      //동물뱃지 획득
      const animalBadge = Math.floor(Math.random()*2);
      //장비가능한 부위
      const possibleEquipment = [...gameData.job[job].possibleEquipment];
      gameData.ch[newIdx].possibleEquipment?.forEach((v, i) => {
        const vIdx = v.split("-");
        possibleEquipment[vIdx[0]][vIdx[1]] = 1;
      });
      chDataArr.push(util.saveLvState('', {
        itemEff: util.getItemEff(),
        grade: cardG,
        newState: {
          nickName: "",
          actionPoint: 25,
          actionMax: Math.floor(gameData.ch[newIdx].st1 / 3 + gameData.ch[newIdx].st6 / 3),
          pointTime: 25*5*60,//5분, 초단위로 변환
          stateLuk: Math.round(Math.random() * 200),
          element: gameData.ch[newIdx].element,
          actionType: actionType,
          newActionType : [actionType],
          job: job,
          ...(typeof jobElementType === "number" ? {jobElement: jobElementType} : {}),
          kg: kg,
          hasExp: 500,
          battleBadge: [0,0,0,0],
          animalBadge: animalBadge,//총 보유 동물뱃지
          grade: cardG,
          gradeMax: gameData.ch[newIdx].maxGrade,
          gradeUp: 0,
          mark: animalBadge,//동물뱃지 추가보유여부(상점에서 exp로 구입가능)
          idx: newIdx,
          items: [{}, {}, {}, {}, {}, {}, {}, {}],
          lv: 1,
          sk: skill,
          possibleEquipment: possibleEquipment,
          animalSkill: util.makeSkillTree({
            gameData: gameData,
            idx: newIdx,
            jobIdx: job,
            jobElementType: typeof jobElementType === "number" ? jobElementType : "",
          }),
          hasSkill: skill.map((v) => {
            return {
              idx: v.idx,
              lv: v.lv,
              exp: v.exp,
            }
          }),
          scenario: chScenario ? chScenario.map((v) => {
            const scenarioList = v.split("-");
            return {
              currentStage: 0,
              stage: Array.from({length: gameData.scenario[scenarioList[0]][scenarioList[1]].scenarioList[scenarioList[2]].stage.length}, (v) => ({
                first:true,
                clear:[false,false,false,false],
                select:0,
                lineup:{
                  select:0,
                  slot:{
                    no: 0,
                    leader: "",
                    entry: Array.from({length: 25}, () => ""),
                    eff: Array.from({length: 25}, () => Array.from({length: 10}, () => [0, 0])),
                    num: 0
                  }
                },
              })),
            }
          }) : "",
        },
      }, saveData, gameData));
    };
    return {
      chArr: chArr,
      chDataArr: chDataArr,
      maxCard: cardGrade.maxGrade,
    };
  },
  makeSkillTree: ({gameData, idx, jobIdx, jobElementType}) => {
    const cloneAnimal = {...gameData.animalType[gameData.ch[idx].animal_type]};
    const limitLvArr = Array.from({length: 4}, (v, idx) => idx * (Math.floor(Math.random() * 10 - 5) + 15));
    const emptySkillArr = Array.from({length: 4}, () => ([])).map((v, skLineIdx) => {
      return Array.from({length: 4}, (sk, skIdx) => {
        const skill = cloneAnimal.skill[`lv${skLineIdx}`];
        if (skill.length === 0) {
          return {idx: ""};
        }
        const randomSkillCount = Math.floor(Math.random() * skill.length),
          skillIdx = skill[randomSkillCount];
        skill.splice(randomSkillCount, 1);
        const hasSkill = Math.random() < (0.6 - 0.1 * skLineIdx);
        return hasSkill ? {
          idx: Array.isArray(skillIdx) ? skillIdx[jobElementType] : skillIdx,
          lv: 0,
          lvLimit: limitLvArr[skLineIdx],
        } : {idx: ""}
      })
    });
    return emptySkillArr;
  },
  chIdxToGroup: (num) => {
    return Math.floor(num / 60);
  },
  mergeConcat: (obj1, obj2) => {
    const result = {};
    const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

    for (const key of keys) {
      const v1 = Array.isArray(obj1[key]) ? obj1[key] : [];
      const v2 = Array.isArray(obj2[key]) ? obj2[key] : [];
      result[key] = v1.concat(v2);
    }
    return result;
  },
  mergeConcatAll:(objects) => {
    return objects.reduce((acc, obj) => {
      if (!obj || typeof obj !== "object") return acc;

      for (const [key, value] of Object.entries(obj)) {
        const arr = Array.isArray(value) ? value : [];
        if (!acc[key]) acc[key] = key !== "money" ? [] : 0;
        key === "money" ? acc[key] += value : acc[key].push(...arr); // concat과 동일 효과
      }
      return acc;
    }, {});
  },
  itemTypeToIdx: (type) => {
    switch (type) {
      case "head":
        return "1";
      case "armor":
        return "2";
      case "weapon":
        return "3";
      case "ring":
        return "4";
      case "amulet":
        return "5";
    }
  },
  isEquipment: (type) => {
    return ["head", "armor", "weapon", "ring", "amulet"].includes(type);
  },
  selectDropItemType: (dropList) => {
    const num = Math.random();
    const typeList = ["head", "armor", "weapon", "ring", "amulet", "hole", "upgrade", "material", "etc", "money"];
    const dropItemType = (dropList, idx) => {
      if (idx === typeList.length - 1) {
        return "money";
      } else {
        if (dropList[typeList[idx]].length > 0) {
          return typeList[idx];
        } else {
          return dropItemType(dropList, idx + 1);
        }
      }
    }
    if (num < 0.05) {
      return dropItemType(dropList, 0);
    } else if (num < 0.1) {
      return dropItemType(dropList, 1);
    } else if (num < 0.15) {
      return dropItemType(dropList, 2);
    } else if (num < 0.2) {
      return dropItemType(dropList, 3);
    } else if (num < 0.25) {
      return dropItemType(dropList, 4);
    } else if (num < 0.35) {
      return dropItemType(dropList, 5);
    } else if (num < 0.55) {
      return dropItemType(dropList, 6);
    } else if (num < 0.75) {
      return dropItemType(dropList, 7);
    } else if (num < 0.95) {
      return dropItemType(dropList, 8);
    } else {
      return "money";
    }
  },
  exploreArea: {
    checkStep: (data) => {
      if (!data) return 0;
      if (Object.keys(data.map).length !== 0) {
        return 3;
      }
      if (Object.keys(data.lv).length !== 0) {
        return 2;
      }
      if (Object.keys(data.add).length !== 0) {
        return 1;
      }
      return 0;
    },
    stepName: (idx) => {
      switch (idx) {
        case 0:
          return "add";
        case 1:
          return "lv";
        case 2:
          return "map";
        case 3:
          return "base";
        default:
          return "";
      }
    }
  }
}
