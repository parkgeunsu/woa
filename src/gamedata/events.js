
export const events = {
  blockHead: [
    { idx: 0, name: "grassland" },
    { idx: 1, name: "grass" },
    { idx: 2, name: "hay" },
    { idx: 3, name: "rock" },
    { idx: 4, name: "stone1" },
    { idx: 5, name: "stone2" },
    { idx: 6, name: "mud" },
    { idx: 7, name: "sea" },
  ],
  blockType: [
    { idx: 0, name: "battle" },
    { idx: 1, name: "traps" },
    { idx: 2, name: "treasure" },
    { idx: 3, name: "ruins" },
    { idx: 4, name: "talk" },
    { idx: 5, name: "town" },
    { idx: 6, name: "shop" },
  ],
  lastEvent: {
    action0: {
      picIdx: 54, 
      title: "eventText16",
      list:[
      { name: "attack" },
      { name: "persuade" },
    ]},
    action1:{
      picIdx: 55, 
      title: "eventText16_1",
      list:[
      { name: "attack" },
    ]},
  },
  eventProcess: [
    { idx: 0, action0: {
      picIdx: 0, 
      title: "eventText0",
      list:[
        { name: "attack" },
        { name: "save" },
        { name: "run" },
    ]}, action1: {
      picIdx: 1, 
      title: "eventText0_1",
      list:[
        { name: "attack" },
        { name: "run" },
    ]}, action2: {
      picIdx: 2, 
      title: "eventText0_2",
      list:[
        { name: "next" },
    ]}, action3: {
      picIdx: 3, 
      title: "eventText0_3",
      list:[
        { name: "attack" },
      ]
    }},
    { idx: 1, action0: {
      picIdx: 4, 
      title: "eventText1",
      list:[
        { name: "attack" },
        { name: "run" },
    ]}, action1: {
      picIdx: 5, 
      title: "eventText1_1",
      list:[
        { name: "attack" },
    ]}},
    { idx: 2, action0: {
      picIdx: 6, 
      title: "eventText2",
      list:[
        { name: "getGold" },
    ]}},
    { idx: 3, action0: {
      picIdx: 7, 
      title: "eventText3",
      list:[
        { name: 'getTreasure' },
    ]}},
    { idx: 4, action0: {
      picIdx: 8, 
      title: "eventText4",
      list:[
        { name: "touchGrail" },
        { name: "putMoney" },
        { name: "putItem" },
        { name: "dont" },
    ]}},
    { idx: 5, action0: {
      picIdx: 9, 
      title: "eventText5",
      list:[
        { name: "removeTrap" },
        { name: "ignore" },
    ]}, action1: {
      picIdx: 10, 
      title: "eventText5_1",
      list:[
        { name: "next" },
    ]}, action2: {
      picIdx: 11, 
      title: "eventText5_2",
      list:[
        { name: "ignore" },
    ]}},
    { idx: 6, action0: {
      picIdx: 12, 
      title: "eventText6",
      list:[
        { name: "use" },
        { name: "ignore" },
    ]}},
    { idx: 7, action0: {
      picIdx: 13, 
      title: "eventText7",
      list:[
        { name: "drink" },
        { name: "ignore" },
    ]}},
    { idx: 8, action0: {
      picIdx: 14, 
      title: "eventText8",
      list:[
        { name: "drink" },
        { name: "ignore" },
    ]}},
    { idx: 9, action0: {
      picIdx: 15, 
      title: "eventText9",
      list:[
        { name: "drink" },
        { name: "ignore" },
    ]}},
    { idx: 10, action0: {
      picIdx: 16, 
      title: "eventText10",
      list:[
        { name: "knock" },
        { name: "steal" },
        { name: "ignore" },
    ]}, action1: {
      picIdx: 17, 
      title: "eventText10_1",
      list:[
        { name: "steal" },
        { name: "ignore" },
    ]}, action2: {
      picIdx: 18, 
      title: "eventText10_2",
      list:[
        { name: "ignore" },
    ]}, action3: {
      picIdx: 19, 
      title: "eventText10_3",
      list:[
        { name: "attack" },
        { name: "run" },
    ]}, action4: {
      picIdx: 17, 
      title: "eventText10_4",
      list:[
        { name: "next" },
    ]}},
    { idx: 11, action0: {
      picIdx: 20, 
      title: "eventText11",
      list:[
      { name: "use" },
      { name: "steal" },
      { name: "ignore" },
    ]}, action1: {
      picIdx: 21, 
      title: "eventText11_1",
      list:[
        { name: "attack" },
        { name: "run" },
    ]}, action2: {
      picIdx: 22, 
      title: "eventText11_2",
      list:[
        { name: "attack" },
    ]}},
    { idx: 12, action0: {
      picIdx: 23, 
      title: "eventText12",
      list:[ //경비병
        { name: "conversation" },
        { name: "attack" },
        { name: "steal" },
    ]}, action1: {
      picIdx: 24, 
      title: "eventText12_1",
      list:[
        { name: "attack" },
        { name: "persuade" },
        { name: "run" },
    ]}, action2: {
      picIdx: 25, 
      title: "eventText12_2",
      list:[
        { name: "attack" },
        { name: "run" },
    ]}, action3: {
      picIdx: 26, 
      title: "eventText12_3",
      list:[
        { name: "attack" },
    ]}, action4: {
      picIdx: 27, 
      title: "eventText12_4",
      list:[
        { name: "conversation0" },
        { name: "conversation1" },
        { name: "conversation2" },
    ]}},
    { idx: 13, action0: {
      picIdx: 28, 
      title: "eventText13",
      list:[ //여행자
        { name: "conversation" },
        { name: "attack" },
        { name: "steal" },
    ]}, action1: {
      picIdx: 29, 
      title: "eventText13_1",
      list:[
        { name: "attack" },
        { name: "persuade" },
        { name: "run" },
    ]}, action2: {
      picIdx: 30, 
      title: "eventText13_2",
      list:[
        { name: "attack" },
        { name: "run" },
    ]}, action3: {
      picIdx: 31, 
      title: "eventText13_3",
      list:[
        { name: "attack" },
    ]}, action4: {
      picIdx: 32, 
      title: "eventText13_4",
      list:[
        { name: "conversation0" },
        { name: "conversation1" },
        { name: "conversation2" },
        { name: "conversation3" },
    ]}},
    { idx: 14, action0: {
      picIdx: 33, 
      title: "eventText14", 
      list:[ //주민
        { name: "conversation" },
        { name: "attack" },
        { name: "steal" },
    ]}, action1: {
      picIdx: 34, 
      title: "eventText14_1",
      list:[
        { name: "attack" },
        { name: "persuade" },
        { name: "run" },
    ]}, action2: {
      picIdx: 35, 
      title: "eventText14_2",
      list:[
        { name: "attack" },
        { name: "run" },
    ]}, action3: {
      picIdx: 36, 
      title: "eventText14_3",
      list:[
        { name: "attack" },
    ]}, action4: {
      picIdx: 37, 
      title: "eventText14_4",
      list:[
        { name: "conversation0" },
        { name: "conversation2" },
    ]}},
    { idx: 15, action0: {
      picIdx: 38, 
      title: "eventText15",
      list:[ //수상한자
        { name: "conversation" },
        { name: "gamble" },
        { name: "attack" },
        { name: "steal" },
    ]}, action1: {
      picIdx: 39, 
      title: "eventText15_1",
      list:[
      { name: "attack" },
      { name: "persuade" },
      { name: "run" },
    ]}, action2: {
      picIdx: 40, 
      title: "eventText15_2",
      list:[
        { name: "attack" },
        { name: "run" },
    ]}, action3: {
      picIdx: 41, 
      title: "eventText15_3",
      list:[
        { name: "attack" },
    ]}, action4: {
      picIdx: 42, 
      title: "eventText15_4",
      list:[
      { name: "conversation1" },
      { name: "conversation3" },
    ]}, action5: {
      picIdx: 43, 
      title: "eventText15_5",
      list:[
        { name: "yes" },
        { name: "no" },
    ]}, action6: {
      picIdx: 44, 
      title: "eventText15_6",
      list:[
        { name: "apple1" },
        { name: "apple2" },
    ]}, action7: {
      picIdx: 45, 
      title: "eventText15_7",
      list:[
        { name: "stone1" },
        { name: "stone2" },
    ]}, action8: {
      picIdx: 46, 
      title: "eventTex t15_8",
      list:[
        { name: "weapon1" },
        { name: "weapon2" },
    ]}, action9: {
      picIdx: 47, 
      title: "eventText15_9",
      list:[
        { name: "drop1" },
        { name: "drop2" },
    ]}, action10: {
      picIdx: 48, 
      title: "eventText15_10",
      list:[
        { name: "coin1" },
        { name: "coin2" },
    ]}, action11: {
      picIdx: 49, 
      title: "eventText15_11",
      list:[
        { name: "no" },
        { name: "yes" },
    ]}, action12: {
      picIdx: 50, 
      title: "eventText15_12",
      list:[
        { name: "baby1" },
        { name: "baby2" },
    ]}, action13: {
      picIdx: 51, 
      title: "eventText15_13",
      list:[
        { name: "receiveGift" },
        { name: "receiveGold" },
    ]}, action14: {
      picIdx: 52, 
      title: "eventText15_14",
      list:[
        { name: "attack" },
        { name: "next" },
    ]}, action15: {
      picIdx: 53, 
      title: "eventText15_15",
      list:[
        { name: "receiveGift" },
        { name: "receiveGold" },
        { name: "joinParty" },
    ]}},
  ]
};
