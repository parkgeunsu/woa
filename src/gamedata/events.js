
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
  eventProcess: [
    { idx: 0, action: [
      { name: 'attack' },
      { name: 'save' },
      { name: 'run' },
    ]},
    { idx: 1, action: [
      { name: 'attack' },
      { name: 'save' },
      { name: 'run' },
    ]},
    { idx: 2, action: [
      { name: 'getGold' },
    ]},
    { idx: 3, action: [
      { name: 'getTreasure' },
    ]},
    { idx: 4, action: [
      { name: 'touchGrail' },
      { name: 'putMoney' },
      { name: 'putItem' },
      { name: 'dont' },
    ]},
    { idx: 5, action: [
      { name: 'removeTrap' },
      { name: 'ignore' },
    ]},
    { idx: 6, action: [
      { name: 'use' },
      { name: 'ignore' },
    ]},
    { idx: 7, action: [
      { name: 'drink' },
      { name: 'ignore' },
    ]},
    { idx: 8, action: [
      { name: 'drink' },
      { name: 'ignore' },
    ]},
    { idx: 9, action: [
      { name: 'drink' },
      { name: 'ignore' },
    ]},
    { idx: 10, action: [
      { name: 'knock' },
      { name: 'steal' },
      { name: 'ignore' },
    ]},
    { idx: 11, action: [
      { name: 'use' },
      { name: 'steal' },
      { name: 'ignore' },
    ]},
    { idx: 12, action: [ //경비병
      { name: 'conversation' },
      { name: 'attack' },
      { name: 'steal' },
    ], action1: [
      { name: 'attack' },
      { name: 'persuade' },
      { name: 'run' },
    ], conversation: [
      { name: 'conversation0'},
      { name: 'conversation2'},
    ]},
    { idx: 13, action: [ //나그네
      { name: 'conversation' },
      { name: 'attack' },
      { name: 'steal' },
    ], action1: [
      { name: 'attack' },
      { name: 'persuade' },
      { name: 'run' },
    ], conversation: [
      { name: 'conversation0'},
      { name: 'conversation2'},
    ]},
    { idx: 14, action: [ //주민
      { name: 'conversation' },
      { name: 'attack' },
      { name: 'steal' },
    ], action1: [
      { name: 'attack' },
      { name: 'persuade' },
      { name: 'run' },
    ], conversation: [
      { name: 'conversation0'},
      { name: 'conversation2'},
    ]},
    { idx: 15, action: [ //수상한자
      { name: 'conversation' },
      { name: 'gamble' },
      { name: 'attack' },
      { name: 'steal' },
    ], action1: [
      { name: 'attack' },
      { name: 'persuade' },
      { name: 'run' },
    ], conversation: [
      { name: 'conversation0'},
      { name: 'conversation2'},
    ]},
  ]
};
