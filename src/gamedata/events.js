
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
      title: "eventText16",
      list:[
      { name: "attack" },
      { name: "persuade" },
    ]},
    action1:{
      title: "eventText16_1",
      list:[
      { name: "attack" },
    ]},
  },
  eventProcess: [
    { idx: 0, action0: {
      title: "eventText0",
      list:[
        { name: "attack" },
        { name: "save" },
        { name: "run" },
    ]}, action1: {
      title: "eventText0_1",
      list:[
        { name: "attack" },
        { name: "run" },
    ]}, action2: {
      title: "eventText0_2",
      list:[
        { name: "next" },
    ]}, action3: {
      title: "eventText0_3",
      list:[
        { name: "attack" },
      ]
    }},
    { idx: 1, action0: {
      title: "eventText1",
      list:[
        { name: "attack" },
        { name: "run" },
    ]}, action1: {
      title: "eventText0_3",
      list:[
        { name: "attack" },
    ]}},
    { idx: 2, action0: {
      title: "eventText2",
      list:[
        { name: "getGold" },
    ]}},
    { idx: 3, action0: {
      title: "eventText3",
      list:[
        { name: 'getTreasure' },
    ]}},
    { idx: 4, action0: {
      title: "eventText4",
      list:[
        { name: "touchGrail" },
        { name: "putMoney" },
        { name: "putItem" },
        { name: "dont" },
    ]}},
    { idx: 5, action0: {
      title: "eventText5",
      list:[
        { name: "removeTrap" },
        { name: "ignore" },
    ]}, action1: {
      title: "eventText5_1",
      list:[
        { name: "next" },
    ]}, action2: {
      title: "eventText5_2",
      list:[
        { name: "ignore" },
    ]}},
    { idx: 6, action0: {
      title: "eventText6",
      list:[
        { name: "use" },
        { name: "ignore" },
    ]}},
    { idx: 7, action0: {
      title: "eventText7",
      list:[
        { name: "drink" },
        { name: "ignore" },
    ]}},
    { idx: 8, action0: {
      title: "eventText8",
      list:[
        { name: "drink" },
        { name: "ignore" },
    ]}},
    { idx: 9, action0: {
      title: "eventText9",
      list:[
        { name: "drink" },
        { name: "ignore" },
    ]}},
    { idx: 10, action0: {
      title: "eventText10",
      list:[
        { name: "knock" },
        { name: "steal" },
        { name: "ignore" },
    ]}, action1: {
      title: "eventText10_1",
      list:[
        { name: "steal" },
        { name: "ignore" },
    ]}, action2: {
      title: "eventText10_2",
      list:[
        { name: "ignore" },
    ]}, action3: {
      title: "eventText10_3",
      list:[
        { name: "attack" },
        { name: "run" },
    ]}, action4: {
      title: "eventText10_4",
      list:[
        { name: "next" },
    ]}},
    { idx: 11, action0: {
      title: "eventText11",
      list:[
      { name: "use" },
      { name: "steal" },
      { name: "ignore" },
    ]}, action1: {
      title: "eventText11_1",
      list:[
        { name: "attack" },
        { name: "run" },
    ]}, action2: {
      title: "eventText11_2",
      list:[
        { name: "attack" },
    ]}},
    { idx: 12, action0: {
      title: "eventText12",
      list:[ //경비병
        { name: "conversation" },
        { name: "attack" },
        { name: "steal" },
    ]}, action1: {
      title: "eventText12_1",
      list:[
        { name: "attack" },
        { name: "persuade" },
        { name: "run" },
    ]}, action2: {
      title: "eventText12_2",
      list:[
        { name: "attack" },
        { name: "run" },
    ]}, action3: {
      title: "eventText11_2",
      list:[
        { name: "attack" },
    ]}, action4: {
      title: "eventText12_3",
      list:[
        { name: "conversation0" },
        { name: "conversation1" },
        { name: "conversation2" },
    ]}},
    { idx: 13, action0: {
      title: "eventText13",
      list:[ //나그네
        { name: "conversation" },
        { name: "attack" },
        { name: "steal" },
    ]}, action1: {
      title: "eventText13_1",
      list:[
        { name: "attack" },
        { name: "persuade" },
        { name: "run" },
    ]}, action2: {
      title: "eventText13_1",
      list:[
        { name: "attack" },
        { name: "run" },
    ]}, action3: {
      title: "eventText11_2",
      list:[
        { name: "attack" },
    ]}, action4: {
      title: "eventText13_2",
      list:[
        { name: "conversation0" },
        { name: "conversation1" },
        { name: "conversation2" },
        { name: "conversation3" },
    ]}},
    { idx: 14, action0: {
      title: "eventText14",
      list:[ //주민
        { name: "conversation" },
        { name: "attack" },
        { name: "steal" },
    ]}, action1: {
      title: "eventText14_1",
      list:[
        { name: "attack" },
        { name: "persuade" },
        { name: "run" },
    ]}, action2: {
      title: "eventText12_3",
      list:[
        { name: "attack" },
        { name: "run" },
    ]}, action3: {
      title: "eventText11_2",
      list:[
        { name: "attack" },
    ]}, action4: {
      title: "eventText14_2",
      list:[
        { name: "conversation0" },
        { name: "conversation2" },
    ]}},
    { idx: 15, action0: {
      title: "eventText15",
      list:[ //수상한자
        { name: "conversation" },
        { name: "gamble" },
        { name: "attack" },
        { name: "steal" },
    ]}, action1: {
      title: "eventText15_1",
      list:[
      { name: "attack" },
      { name: "persuade" },
      { name: "run" },
    ]}, action2: {
      title: "eventText12_3",
      list:[
        { name: "attack" },
        { name: "run" },
    ]}, action3: {
      title: "eventText11_2",
      list:[
        { name: "attack" },
    ]}, action4: {
      title: "eventText15_2",
      list:[
      { name: "conversation1" },
      { name: "conversation3" },
    ]}, action5: {
      title: "eventText15_3",
      list:[
        { name: "left" },
        { name: "right" },
    ]}, action6: {
      title: "eventText15_4",
      list:[
        { name: "left" },
        { name: "right" },
    ]}, action7: {
      title: "eventText15_5",
      list:[
        { name: "left" },
        { name: "right" },
    ]}, action8: {
      title: "eventText15_6",
      list:[
        { name: "left" },
        { name: "right" },
    ]}, action9: {
      title: "eventText15_7",
      list:[
        { name: "left" },
        { name: "right" },
    ]}, action10: {
      title: "eventText15_8",
      list:[
        { name: "receiveGift" },
        { name: "receiveGold" },
        { name: "joinParty" },
    ]}, action11: {
      title: "eventText15_9",
      list:[
        { name: "attack" },
        { name: "next" },
    ]}},
  ]
};
