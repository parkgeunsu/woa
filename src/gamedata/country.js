export const country = {
  regions: [
    {
      id:'japan0',
      pos:[1336,160.5],
      movePossible:['japan1'],
      sailPossible:[],
      distancePosition: [4, 7],
      name: {
        ko:'일본 동부',
        en:'Eastern Japan',
        jp:'日本東部',
      },
    },
    {
      id:'japan1',
      pos:[1325.5,195.5],
      movePossible:['japan0','japan2'],
      sailPossible:[],
      distancePosition: [4, 7],
      name: {
        ko:'일본 중부',
        en:'Central Japan',
        jp:'日本中部',
      },
    },
    {
      id:'japan2',
      pos:[1310,220],
      movePossible:['japan1'],
      sailPossible:[],
      distancePosition: [4, 7],
      name: {
        ko:'일본 서부',
        en:'Western Japan',
        jp:'日本西部',
      },
    },
    {
      id:'korea0',
      pos:[1267,169.5],
      movePossible:['mongolia1','korea1','korea2'],
      sailPossible:[],
      distancePosition: [5, 7],
      name: {
        ko:'한국 북부',
        en:'North Korea',
        jp:'韓国北部',
      },
    },
    {
      id:'korea1',
      pos:[1280.5,192.5],
      movePossible:['korea0','korea2'],
      sailPossible:[],
      distancePosition: [5, 7],
      name: {
        ko:'한국 동부',
        en:'Eastern Korea',
        jp:'韓国東部',
      },
    },
    {
      id:'korea2',
      pos:[1271,201],
      movePossible:['korea0','korea1'],
      sailPossible:[],
      distancePosition: [5, 7],
      name: {
        ko:'한국 서부',
        en:'Western Korea',
        jp:'韓国西部',
      },
    },
    {
      id:'mongolia0',
      pos:[1172.5,104.5],
      movePossible:['mongolia1','mongolia2','mongolia3','china1','china2'],
      sailPossible:[],
      distancePosition: [9, 5],
      name: {
        ko:'몽골 동북부',
        en:'Northeast Mongolia',
        jp:'モンゴル北東部',
      },
    },
    {
      id:'mongolia1',
      pos:[1238.5,148],
      movePossible:['korea0','china0','china1','mongolia0'],
      sailPossible:[],
      distancePosition: [9, 5],
      name: {
        ko:'몽골 동남부',
        en:'Southeast Mongolia',
        jp:'モンゴル南東部',
      },
    },
    {
      id:'mongolia2',
      pos:[988,152],
      movePossible:['mongolia0','mongolia3','mongolia4','china2'],
      sailPossible:[],
      distancePosition: [9, 5],
      name: {
        ko:'몽골 중부',
        en:'Central Mongolia',
        jp:'モンゴル中部',
      },
    },
    {
      id:'mongolia3',
      pos:[862,101],
      movePossible:['mongolia0','mongolia2','mongolia4'],
      sailPossible:[],
      distancePosition: [9, 5],
      name: {
        ko:'몽골 서북부',
        en:'Northwest Mongolia',
        jp:'モンゴル西北部',
      },
    },
    {
      id:'mongolia4',
      pos:[842.5,208],
      movePossible:['mongolia2','mongolia3'],
      sailPossible:[],
      distancePosition: [9, 5],
      name: {
        ko:'몽골 서남부',
        en:'Southwest Mongolia',
        jp:'モンゴル西南部',
      },
    },
    {
      id:'china0',
      pos:[1220.5,189],
      movePossible:['mongolia1','china1','china3','china4'],
      sailPossible:[],
      distancePosition: [9, 7],
      name: {
        ko:'중국 동북부',
        en:'Northeast China',
        jp:'中国東北部',
      },
    },
    {
      id:'china1',
      pos:[1158.5,189],
      movePossible:['mongolia0','mongolia1','china0','china2','china4','china5'],
      sailPossible:[],
      distancePosition: [9, 7],
      name: {
        ko:'중국 북부',
        en:'North China',
        jp:'中国北部',
      },
    },
    {
      id:'china2',
      pos:[1088.5,218.5],
      movePossible:['mongolia0','mongolia2','china1','china5'],
      sailPossible:[],
      distancePosition: [9, 7],
      name: {
        ko:'중국 서북부',
        en:'Northwest China',
        jp:'中国西北部',
      },
    },
    {
      id:'china3',
      pos:[1235,212.5],
      movePossible:['china0','china4','china6'],
      sailPossible:[],
      distancePosition: [9, 7],
      name: {
        ko:'중국 동부',
        en:'Eastern China',
        jp:'中国東部',
      },
    },
    {
      id:'china4',
      pos:[1209,243],
      movePossible:['china0','china1','china3','china5','china6','china7'],
      sailPossible:[],
      distancePosition: [9, 7],
      name: {
        ko:'중국 중부',
        en:'Central China',
        jp:'中国中部',
      },
    },
    {
      id:'china5',
      pos:[1167,243],
      movePossible:['china1','china2','china4','china7'],
      sailPossible:[],
      distancePosition: [9, 7],
      name: {
        ko:'중국 서부',
        en:'Western China',
        jp:'中国西部',
      },
    },
    {
      id:'china6',
      pos:[1247.5,255.5],
      movePossible:['china3','china4','china7'],
      sailPossible:[],
      distancePosition: [9, 7],
      name: {
        ko:'중국 동남부',
        en:'Southeast China',
        jp:'中国南東部',
      },
    },
    {
      id:'china7',
      pos:[1208.5,292],
      movePossible:['china4','china5','china6'],
      sailPossible:[],
      distancePosition: [9, 7],
      name: {
        ko:'중국 남부',
        en:'Southern China',
        jp:'中国南部',
      },
    },
    {
      id:'saudiArabia0',
      pos:[828.5,283],
      movePossible:['egypt0','mongolia4'],
      sailPossible:[],
      distancePosition: [17, 8],
      name: {
        ko:'사우디 아라비아',
        en:'Saudi Arabia',
        jp:'サウジアラビア',
      },
    },
    {
      id:'egypt0',
      pos:[746,263],
      movePossible:['saudiArabia0'],
      sailPossible:[],
      distancePosition: [18, 8],
      name: {
        ko:'이집트',
        en:'Egypt',
        jp:'エジプト',
      },
    },
    {
      id:'greece0',
      pos:[702.5,183.5],
      movePossible:['mongolia4','italy0'],
      sailPossible:[],
      distancePosition: [19, 7],
      name: {
        ko:'그리스',
        en:'Greece',
        jp:'ギリシャ',
      },
    },
    {
      id:'italy0',
      pos:[644.5,160],
      movePossible:['greece0','france0'],
      sailPossible:[],
      distancePosition: [20, 7],
      name: {
        ko:'이탈리아',
        en:'Italy',
        jp:'イタリア',
      },
    },
    {
      id:'france0',
      pos:[582.5,129.5],
      movePossible:['italy0','unitedKingdom0','spain0'],
      sailPossible:[],
      distancePosition: [21, 6],
      name: {
        ko:'프랑스',
        en:'France',
        jp:'フランス',
      },
    },
    {
      id:'spain0',
      pos:[555.5,169],
      movePossible:['france0','portugal0'],
      sailPossible:[],
      distancePosition: [21, 7],
      name: {
        ko:'스페인',
        en:'Spain',
        jp:'スペイン',
      },
    },
    {
      id:'portugal0',
      pos:[531.5,169],
      movePossible:['spain0'],
      sailPossible:[],
      distancePosition: [22, 7],
      name: {
        ko:'포루투갈',
        en:'Portugal',
        jp:'ポルトガル',
      },
    },
    {
      id:'unitedKingdom0',
      pos:[561,74.5],
      movePossible:['france0','unitedKingdom1'],
      sailPossible:[],
      distancePosition: [21, 5],
      name: {
        ko:'영국 동부',
        en:'Eastern United Kingdom',
        jp:'イギリス東部',
      },
    },
    {
      id:'unitedKingdom1',
      pos:[539,83],
      movePossible:['unitedKingdom0'],
      sailPossible:[],
      distancePosition: [21, 5],
      name: {
        ko:'영국 서부',
        en:'Western United Kingdom',
        jp:'イギリス西部',
      },
    }
  ],
}