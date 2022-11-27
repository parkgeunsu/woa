export const ships = {
    slotModifier:{ko:['','사파이어의','에메랄드의','루비의','다이아몬드의'],en:['','Sapphire\'s','Emerald\'s','Ruby\'s','Diamond\'s']},
    markModifier:{ko:['','','두마리','세마리','네마리'],en:['','a','two','three','four']},
    figureColor:[
        ['#AA6826','#77481E','#E28844'],
        ['#999999','#757575','#D1D1D1'],
        ['#FFB000','#FF8800','#FFEC00'],
    ],
    woodColor:[
        ['#d6a477','#703d18','#914d2c','#9e5f35','#c17b40'],
        ['#ff8939','#442510','#5b3217','#723c1e','#894727'],
        ['#ffc476','#a8752a','#bc8235','#d6974c','#eaa75e'],
        ['#ffe6c7','#a58c6a','#bc9f7d','#d3b292','#efccaf'],
        ['rgba(0,0,0,.2)','rgba(255,255,255,.5)','rgba(0,0,0,.2)','rgba(0,0,0,.2)','rgba(0,0,0,.2)'],
    ],
    wood:[//목재: 내구도,속도
        {idx:0,na:{ko:'편백나무',en:'Cypress'},display:0,txt:{ko:'편백나무',en:'Cypress'},factor:['110%','','','',''],price:'150%',woodColor:3},//510, 6360
        {idx:1,na:{ko:'느릅나무',en:'Elm'},display:1,txt:{ko:'느릅나무',en:'Elm'},factor:['120%','','-0.5','',''],price:'160%',woodColor:1},//830, 5520
        {idx:2,na:{ko:'마호가니',en:'Mahogany'},display:2,txt:{ko:'마호가니',en:'Mahogany'},factor:['130%','','-1','',''],price:'170%',woodColor:2},//830, 6460
        {idx:3,na:{ko:'레드파인',en:'Red Pine'},display:3,txt:{ko:'레드파인',en:'Red Pine'},factor:['140%','','-1','',''],price:'180%',woodColor:3},//870, 8470
        {idx:4,na:{ko:'삼나무',en:'Cedar'},display:4,txt:{ko:'삼나무',en:'Cedar'},factor:['150%','','-1.5','',''],price:'190%',woodColor:3},//900, 6020
        {idx:5,na:{ko:'느티나무',en:'Zelkova'},display:5,txt:{ko:'느티나무',en:'Zelkova'},factor:['160%','','-2','',''],price:'200%',woodColor:0},//959 6500
        {idx:6,na:{ko:'티크나무',en:'Teak'},display:6,txt:{ko:'티크나무',en:'Teak'},factor:['170%','','-3','',''],price:'210%',woodColor:0},//1000, 8410
        {idx:7,na:{ko:'너도밤나무',en:'Beech'},display:7,txt:{ko:'너도밤나무',en:'Beech'},factor:['180%','','-3','',''],price:'230%',woodColor:3},//1300, 7300
        {idx:8,na:{ko:'떡갈나무',en:'Oak'},display:8,txt:{ko:'떡갈나무',en:'Oak'},factor:['200%','','-4','',''],price:'250%',woodColor:2},//1360, 7440
        {idx:9,na:{ko:'로즈우드',en:'Rosewood'},display:9,txt:{ko:'로즈우드',en:'Rosewood'},factor:['250%','','-5','',''],price:'280%',woodColor:1},//3170, 9220
    ],
    ship:[//배
    //eff type(효과 dmg_type&buff_type) 체력HP(0), 행동력SP(1), 행동회복력RSP(2), 공격력ATK(3), 방어력DEF(4), 술법공격력MAK(5), 술법방어력MDF(6), 회복력RCV(7), 속도SPD(8), 행운LUK(9), 찌르기(10),할퀴기(11),물기(12),치기(13),누르기(14),던지기(15), 빛(21),어둠(22),물(23),불(24),바람(25),땅(26), 진형(100)
    //action 아이템 동작 아이디변경(1), 홀장착(9), 장비강화(10), 스킬제거(11), 골드변경(99), 랜덤뽑기(100)
    //display 이미지번호
    //grade 레어등급 (1일반normal, 2매직magic, 3레어rare, 4에픽epic, 5유니크unique, 6레전드legend, 7세트set)

    // 매직 1.2
    // 레어 1.5
    // 에픽 2

    // 사이즈 계수 1, 1.5, 2 factor

    // 내구도 5000~50000 durability
    // 적재량 500~5000 loadage
    // 속도 7노트~20노트 knot
    // 가치 price
    // 공간 space
    // 휨강도 압축강도 전단강도(방사)
    // 잣나무 0.45 2.82 7.41 772 425 94
    // 스트로브잣나무 0.40 2.26 6.33 611 310 102
    // 리기다소나무 0.53 5.77 8.53 910 470 101
    // 테다소나무 0.47 3.43 4.52 524 234 77
    // 리기테다소나무 0.50 2.79 4.82 672 242 84
    // 버지니아소나무 0.56 5.54 7.53 829 369 124
    // 해송 0.54 4.39 8.33 994 571 132
    // 소나무 0.47 4.88 9.11 747 430 97
    // 낙엽송 0.61 4.67 8.44 986 532 113
    // 전나무 0.40 5.72 12.26 520 371 113
    // 삼나무 0.45 2.53 7.96 612 374 104
    // 편백 0.49 3.91 6.80 913 547 142
    // 화백 0.39 3.11 5.24 588 378 70
    // 현사시 0.44 3.03 8.81 855 421 96
    // 이태리포플러 0.35 2.49 7.58 656 317 82
    // 양황철나무 0.37 2.69 6.80 423 293 68
    // 수원포플러 0.40 2.21 6.15 402 313 66
    // 수양버들 0.50 4.80 13.64 573 299 104
    // 가래나무 0.53 5.27 7.45 1,167 499 139
    // 거제수나무 0.67 6.59 9.31 1,546 1,071 150
    // 사스래나무 0.65 5.27 7.73 1,582 1,068 164
    // 박달나무 0.93 5.95 6.88 1,320 1,246 191
    // 물박달나무 0.73 5.72 9.35 1,191 973 132
    // 오리나무 0.55 3.32 7.79 607 376 101
    // 물오리나무 0.56 4.51 8.97 675 480 136
    // 물갬나무 0.56 3.87 9.05 745 445 106
    // 사방오리 0.68 3.51 7.62 979 511 151
    // 까치박달 0.68 3.97 9.06 1,075 531 147
    // 개서어나무 0.72 5.53 12.45 1,064 566 181
    // 서어나무 0.73 6.13 13.58 979 627 160
    // 밤나무 0.57 3.46 6.40 852 339 124
    // 상수리나무 0.82 5.76 11.27 1,270 625 214
    // 굴참나무 0.88 6.85 12.20 1,291 626 222
    // 떡갈나무 0.88 7.02 10.99 1,076 590 211
    // 갈참나무 0.84 6.22 10.81 1,296 581 181
    // 신갈나무 0.82 5.97 9.48 1,019 534 184
    // 졸참나무 0.81 5.74 11.64 1,208 662 192
    // 느릅나무 0.69 5.08 10.16 910 434 151
    // 느티나무 0.69 4.25 7.76 959 382 158
    // 풍게나무 0.68 4.61 9.09 847 340 186
    // 양버즘나무 0.59 4.92 10.23 739 318 143
    // 귀룽나무 0.56 3.91 8.94 704 317 95
    // 산벚나무 0.63 3.74 8.51 794 377 121
    // 다릅나무 0.57 2.93 6.27 1,027 416 138
    // 아까시나무 0.74 5.05 8.44 1,212 661 206
    // 가중나무 0.65 3.92 9.99 1,151 420 142
    // 참죽나무 0.68 3.86 7.18 1,033 529 182
    // 고로쇠나무 0.70 4.72 8.94 914 443 145
    // 복자기 0.78 4.59 9.72 990 448 156
    // 피나무 0.38 5.30 9.21 1,009 283 94
    // 음나무 0.61 4.68 8.64 767 344 103
    // 층층나무 0.60 5.79 9.07 879 414 151
    // 감나무 0.75 3.02 8.18 940 390 186
    // 들메나무 0.73 4.88 11.83 1,139 508 189
    // 물푸레나무 0.75 4.30 8.91 1,192 581 195
    // 참오동나무 0.24 1.38 4.46 446 155 50

    // 대포 분사형 단일형 데미지
        [//normal,magic
            {idx:0,grade:1,display:0,na:{ko:'소형 선박 No.1',en:'Small Ship No.1'},durability:5000,loadage:500,price:30000,knot:15,space:2,txt:{ko:'크기가 작은 선박이다.',en:'It\'s a small ship.'},eff:[]},
            {idx:1,grade:1,display:1,na:{ko:'소형 선박 No.2',en:'Small Ship No.2'},durability:7000,loadage:800,price:40000,knot:13,space:3,txt:{ko:'크기가 작은 선박이다.',en:'It\'s a small ship.'},eff:[]},
            {idx:2,grade:1,display:2,na:{ko:'소형 선박 No.3',en:'Small Ship No.3'},durability:7500,loadage:1000,price:50000,knot:13,space:3,txt:{ko:'크기가 작은 선박이다.',en:'It\'s a small ship.'},eff:[]},
            {idx:3,grade:1,display:3,na:{ko:'중형 선박 No.1',en:'Medium-sized Ship No.1'},durability:12500,loadage:1500,price:80000,knot:12,space:3,txt:{ko:'중형 크기의 선박이다.',en:'It\'s a medium-sized ship.'},eff:[]},
            {idx:4,grade:1,display:4,na:{ko:'중형 선박 No.2',en:'Medium-sized Ship No.2'},durability:15000,loadage:2000,price:100000,knot:10,space:4,txt:{ko:'중형 크기의 선박이다.',en:'It\'s a medium-sized ship.'},eff:[]},
            {idx:5,grade:1,display:5,na:{ko:'중형 선박 No.3',en:'Medium-sized Ship No.3'},durability:15000,loadage:2000,price:110000,knot:10,space:4,txt:{ko:'중형 크기의 선박이다.',en:'It\'s a medium-sized ship.'},eff:[]},
            {idx:6,grade:1,display:6,na:{ko:'중형 선박 No.4',en:'Medium-sized Ship No.4'},durability:17000,loadage:2500,price:150000,knot:10,space:5,txt:{ko:'중형 크기의 선박이다.',en:'It\'s a medium-sized ship.'},eff:[]},
            {idx:7,grade:1,display:7,na:{ko:'중형 선박 No.5',en:'Medium-sized Ship No.5'},durability:20000,loadage:1500,price:100000,knot:12,space:3,txt:{ko:'중형 크기의 선박이다.',en:'It\'s a medium-sized ship.'},eff:[]},
            {idx:8,grade:1,display:8,na:{ko:'대형 선박 No.1',en:'Large Ship No.1'},durability:18000,loadage:2700,price:170000,knot:9,space:5,txt:{ko:'대형 크기의 선박이다.',en:'It\'s a large sized ship.'},eff:[]},
            {idx:9,grade:1,display:9,na:{ko:'대형 선박 No.2',en:'Large Ship No.2'},durability:20000,loadage:3000,price:180000,knot:9,space:6,txt:{ko:'대형 크기의 선박이다.',en:'It\'s a large sized ship.'},eff:[]},
            {idx:10,grade:1,display:10,na:{ko:'대형 선박 No.3',en:'Large Ship No.3'},durability:21000,loadage:3200,price:190000,knot:8,space:6,txt:{ko:'대형 크기의 선박이다.',en:'It\'s a large sized ship.'},eff:[]},
            {idx:11,grade:1,display:11,na:{ko:'대형 선박 No.4',en:'Large Ship No.4'},durability:25000,loadage:3500,price:250000,knot:8,space:7,txt:{ko:'대형 크기의 선박이다.',en:'It\'s a large sized ship.'},eff:[]},
            {idx:12,grade:1,display:12,na:{ko:'대형 선박 No.5',en:'Large Ship No.5'},durability:30000,loadage:2500,price:200000,knot:12,space:5,txt:{ko:'대형 크기의 선박이다.',en:'It\'s a large sized ship.'},eff:[]},
        ],
        [//rare,epic
            {idx:0,grade:1,display:0,na:{ko:'발사',en:'Balsa'},price:1000,space:2,txt:{ko:'개인용 어선으로 최대 30미터 정도이다.',en:''},eff:[],requiredSlot:1,set:0},
            {idx:1,grade:1,display:0,na:{ko:'다우',en:'Dhow'},price:1000,space:2,txt:{ko:'홍해와 인도양에서 널리 사용되던 전통 선박이다.',en:''},eff:[],requiredSlot:1,set:0},
            {idx:2,grade:1,display:1,na:{ko:'코그',en:'Kogge'},price:1000,space:2,txt:{ko:'바이킹의 배로 보이는 클링커 이음을 계승한 배이다.',en:''},eff:[],requiredSlot:1,set:0},
            {idx:2,grade:1,display:2,na:{ko:'카라벨라',en:'Caravela'},price:1000,space:2,txt:{ko:'포르투갈에서 서아프리카 해안을 탐험하기 위해 개발한 고기동성 소형 범선이다.',en:''},eff:[],requiredSlot:1,set:0},
            {idx:3,grade:1,display:2,na:{ko:'핀네이스',en:'Pinasse'},price:1000,space:2,txt:{ko:'',en:''},eff:[],requiredSlot:1,set:0},
            {idx:4,grade:1,display:2,na:{ko:'라레알',en:'Pinasse'},price:1000,space:2,txt:{ko:'',en:''},eff:[],requiredSlot:1,set:0},
            {idx:5,grade:1,display:4,na:{ko:'카락',en:'Carrack'},price:1000,space:2,txt:{ko:'카락은 원양 항해를 전제로 개발되었고 스페인에서는 나오(Nao), 포르투칼에서는 나우(Nau)라고 부른다.',en:''},eff:[],requiredSlot:1,set:0},
            {idx:6,grade:1,display:3,na:{ko:'지벡',en:'Xebec'},price:1000,space:2,txt:{ko:'무역용으로 많이 사용된 지중해의 범선이다.',en:''},eff:[],requiredSlot:1,set:0},
            {idx:7,grade:1,display:0,na:{ko:'프리깃',en:'Frigate'},price:1000,space:2,txt:{ko:'갤리온',en:'Galleon'},eff:[],requiredSlot:1,set:0},
            {idx:8,grade:1,display:0,na:{ko:'안택선',en:'安宅船'},price:1000,space:2,txt:{ko:'대표적인 화선으로 "집이 달린 배"라는 뜻이다.',en:'Galleon'},eff:[],requiredSlot:1,set:0},
            {idx:9,grade:1,display:0,na:{ko:'갤리온',en:'Galleon'},price:1000,space:2,txt:{ko:'갤리온',en:'Galleon'},eff:[],requiredSlot:1,set:0},
            {idx:10,grade:1,display:0,na:{ko:'베네치안 갤리어스',en:'Venetian Galleass'},price:1000,space:2,txt:{ko:'갤리선의 종류로 16세기 베네치아의 범선과 갤리선이 하나로 합쳐진 만능선박이다.',en:'Galleon'},eff:[],requiredSlot:1,set:0},
            //베르간틴, 프란다스 갈레이, 판옥선
        ],
        [//legend
            //콜럼버스 산타마리아호(카락)
            //거북선(철갑선)
        ]
    ],
    sail:[//돛: 속도, 가치
        {idx:0,grade:1,display:0,na:{ko:'작은 사각돛',en:'Small Square Sail'},kg:1,factor:['','','1','',''],price:3000,color:["#F57E20"],socket:2,txt:{ko:'사각돛',en:''}},
        {idx:1,grade:1,display:1,na:{ko:'큰 사각돛',en:'Big Square Sail'},kg:1,factor:['','','2','',''],price:5000,color:["#F57E20"],socket:2,txt:{ko:'사각돛',en:''}},
        {idx:2,grade:1,display:2,na:{ko:'이중 사각돛',en:'Double Square Sail'},kg:1,factor:['','','3','',''],price:8000,color:["#F57E20"],socket:2,txt:{ko:'사각돛',en:''}},
        {idx:3,grade:1,display:3,na:{ko:'큰 이중 사각돛',en:'Big Double Square Sail'},kg:1,factor:['','','4','',''],price:11000,color:["#F57E20"],socket:2,txt:{ko:'사각돛',en:''}},
        {idx:4,grade:1,display:4,na:{ko:'넓은 이중 사각돛',en:'Wide Double Square Sail'},kg:1,factor:['','','5','',''],price:15000,color:["#F57E20"],socket:2,txt:{ko:'사각돛',en:''}},
        {idx:5,grade:1,display:5,na:{ko:'삼각돛',en:'Triangular Sail'},kg:1,factor:['','','15%','',''],price:4000,color:["#F57E20"],socket:2,txt:{ko:'사각돛',en:''}},
        {idx:6,grade:1,display:6,na:{ko:'이중 삼각돛',en:'Double Triangular Sail'},kg:1,factor:['','','25%','',''],price:7000,color:["#F57E20"],socket:2,txt:{ko:'사각돛',en:''}},
    ],
    figurehead:[//조각상, 내구도, 적재량, 속도, 공간, 데미지
        {idx:0,grade:1,display:0,na:{ko:'나무 비둘기 조각상',en:'Wodden Dove Statue'},kg:0.5,factor:['','','3','',''],price:3000,color:0,txt:{ko:'나무로 만든 비둘기 조각상',en:''}},
        {idx:1,grade:2,display:0,na:{ko:'은 비둘기 조각상',en:'Silver Dove Statue'},kg:0.5,factor:['','','3','',''],price:13000,color:1,txt:{ko:'은으로 만든 비둘기 조각상',en:''}},
        {idx:2,grade:3,display:0,na:{ko:'금 비둘기 조각상',en:'Gold Dove Statue'},kg:0.5,factor:['','','3','',''],price:23000,color:2,txt:{ko:'금으로 만든 비둘기 조각상',en:''}},
        {idx:3,grade:1,display:1,na:{ko:'나무 매 조각상',en:'Wodden Hawk Statue'},kg:0.5,factor:['','','4','',''],price:4000,color:0,txt:{ko:'나무로 만든 매 조각상',en:''}},
        {idx:4,grade:2,display:1,na:{ko:'은 매 조각상',en:'Silver Hawk Statue'},kg:0.5,factor:['','','4','',''],price:14000,color:1,txt:{ko:'은으로 만든 매 조각상',en:''}},
        {idx:5,grade:3,display:1,na:{ko:'금 매 조각상',en:'Gold Hawk Statue'},kg:0.5,factor:['','','4','',''],price:24000,color:2,txt:{ko:'금으로 만든 매 조각상',en:''}},
        {idx:6,grade:1,display:2,na:{ko:'나무 독수리 조각상',en:'Wodden Eagle Statue'},kg:0.5,factor:['','','5','',''],price:5000,color:0,txt:{ko:'나무로 만든 독수리 조각상',en:''}},
        {idx:7,grade:2,display:2,na:{ko:'은 독수리 조각상',en:'Silver Eagle Statue'},kg:0.5,factor:['','','5','',''],price:15000,color:1,txt:{ko:'은으로 만든 독수리 조각상',en:''}},
        {idx:8,grade:3,display:2,na:{ko:'금 독수리 조각상',en:'Gold Eagle Statue'},kg:0.5,factor:['','','5','',''],price:25000,color:2,txt:{ko:'금으로 만든 독수리 조각상',en:''}},
        {idx:9,grade:1,display:3,na:{ko:'나무 돌고래 조각상',en:'Wodden Dolphin Statue'},kg:0.5,factor:['','','20%','',''],price:3000,color:0,txt:{ko:'나무로 만든 돌고래 조각상',en:''}},
        {idx:10,grade:2,display:3,na:{ko:'은 돌고래 조각상',en:'Silver Dolphin Statue'},kg:0.5,factor:['','','20%','',''],price:13000,color:1,txt:{ko:'은으로 만든 돌고래 조각상',en:''}},
        {idx:11,grade:3,display:3,na:{ko:'금 돌고래 조각상',en:'Gold Dolphin Statue'},kg:0.5,factor:['','','20%','',''],price:23000,color:2,txt:{ko:'금으로 만든 돌고래 조각상',en:''}},
        {idx:12,grade:1,display:4,na:{ko:'나무 거북이 조각상',en:'Wodden Turtle Statue'},kg:0.5,factor:['','','40%','',''],price:4000,color:0,txt:{ko:'나무로 만든 거북이 조각상',en:''}},
        {idx:13,grade:2,display:4,na:{ko:'은 거북이 조각상',en:'Silver Turtle Statue'},kg:0.5,factor:['','','40%','',''],price:14000,color:1,txt:{ko:'은으로 만든 거북이 조각상',en:''}},
        {idx:14,grade:3,display:4,na:{ko:'금 거북이 조각상',en:'Gold Turtle Statue'},kg:0.5,factor:['','','40%','',''],price:24000,color:2,txt:{ko:'금으로 만든 거북이 조각상',en:''}},
        {idx:15,grade:1,display:5,na:{ko:'나무 범고래 조각상',en:'Wodden Killer whale Statue'},kg:0.5,factor:['','','60%','',''],price:5000,color:0,txt:{ko:'나무로 만든 범고래 조각상',en:''}},
        {idx:16,grade:2,display:5,na:{ko:'은 범고래 조각상',en:'Silver Killer whale Statue'},kg:0.5,factor:['','','60%','',''],price:15000,color:1,txt:{ko:'은으로 만든 범고래 조각상',en:''}},
        {idx:17,grade:3,display:5,na:{ko:'금 범고래 조각상',en:'Gold Killer whale Statue'},kg:0.5,factor:['','','60%','',''],price:25000,color:2,txt:{ko:'금으로 만든 범고래 조각상',en:''}},
        {idx:18,grade:1,display:6,na:{ko:'나무 호랑이 조각상',en:'Wodden Tiger Statue'},kg:0.5,factor:['','','','','500'],price:6000,color:0,txt:{ko:'나무로 만든 호랑이 조각상',en:''}},
        {idx:19,grade:2,display:6,na:{ko:'은 호랑이 조각상',en:'Silver Tiger Statue'},kg:0.5,factor:['','','','','500'],price:16000,color:1,txt:{ko:'은으로 만든 호랑이 조각상',en:''}},
        {idx:20,grade:3,display:6,na:{ko:'금 호랑이 조각상',en:'Gold Tiger Statue'},kg:0.5,factor:['','','','','500'],price:26000,color:2,txt:{ko:'금으로 만든 호랑이 조각상',en:''}},
        {idx:21,grade:1,display:7,na:{ko:'나무 사자 조각상',en:'Wodden Lion Statue'},kg:0.5,factor:['','','','','200%'],price:6000,color:0,txt:{ko:'나무로 만든 사자 조각상',en:''}},
        {idx:22,grade:2,display:7,na:{ko:'은 사자 조각상',en:'Silver Lion Statue'},kg:0.5,factor:['','','','','200%'],price:16000,color:1,txt:{ko:'은으로 만든 사자 조각상',en:''}},
        {idx:23,grade:3,display:7,na:{ko:'금 사자 조각상',en:'Gold Lion Statue'},kg:0.5,factor:['','','','','','200%'],price:26000,color:2,txt:{ko:'금으로 만든 사자 조각상',en:''}},
        {idx:24,grade:1,display:8,na:{ko:'나무 기사 조각상',en:'Wodden Knight Statue'},kg:0.5,factor:['','500','','',''],price:3000,color:0,txt:{ko:'나무로 만든 기사 조각상',en:''}},
        {idx:25,grade:2,display:8,na:{ko:'은 기사 조각상',en:'Silver Knight Statue'},kg:0.5,factor:['','500','','',''],price:13000,color:1,txt:{ko:'은으로 만든 기사 조각상',en:''}},
        {idx:26,grade:3,display:8,na:{ko:'금 기사 조각상',en:'Gold Knight Statue'},kg:0.5,factor:['','500','','',''],price:23000,color:2,txt:{ko:'금으로 만든 기사 조각상',en:''}},
        {idx:27,grade:1,display:9,na:{ko:'나무 소녀 조각상',en:'Wodden Girl Statue'},kg:0.5,factor:['','700','','',''],price:4000,color:0,txt:{ko:'나무로 만든 소녀 조각상',en:''}},
        {idx:28,grade:2,display:9,na:{ko:'은 소녀 조각상',en:'Silver Girl Statue'},kg:0.5,factor:['','700','','',''],price:14000,color:1,txt:{ko:'은으로 만든 소녀 조각상',en:''}},
        {idx:29,grade:3,display:9,na:{ko:'금 소녀 조각상',en:'Gold Girl Statue'},kg:0.5,factor:['','700','','',''],price:24000,color:2,txt:{ko:'금으로 만든 소녀 조각상',en:''}},
        {idx:30,grade:1,display:10,na:{ko:'나무 마법사 조각상',en:'Wodden Wizard Statue'},kg:0.5,factor:['','1000','','',''],price:5000,color:0,txt:{ko:'나무로 만든 마법사 조각상',en:''}},
        {idx:31,grade:2,display:10,na:{ko:'은 마법사 조각상',en:'Silver Wizard Statue'},kg:0.5,factor:['','1000','','',''],price:15000,color:1,txt:{ko:'은으로 만든 마법사 조각상',en:''}},
        {idx:32,grade:3,display:10,na:{ko:'금 마법사 조각상',en:'Gold Wizard Statue'},kg:0.5,factor:['','1000','','',''],price:25000,color:2,txt:{ko:'금으로 만든 마법사 조각상',en:''}},
        {idx:33,grade:1,display:11,na:{ko:'나무 성녀 조각상',en:'Wodden Saint Statue'},kg:0.5,factor:['','1200','','',''],price:6000,color:0,txt:{ko:'나무로 만든 성녀 조각상',en:''}},
        {idx:34,grade:2,display:11,na:{ko:'은 성녀 조각상',en:'Silver Saint Statue'},kg:0.5,factor:['','1200','','',''],price:16000,color:1,txt:{ko:'은으로 만든 성녀 조각상',en:''}},
        {idx:35,grade:3,display:11,na:{ko:'금 성녀 조각상',en:'Gold Saint Statue'},kg:0.5,factor:['','1200','','',''],price:26000,color:2,txt:{ko:'금으로 만든 성녀 조각상',en:''}},
        {idx:36,grade:1,display:12,na:{ko:'나무 황제 조각상',en:'Wodden Emperor Statue'},kg:0.5,factor:['','1500','','1','100'],price:7000,color:0,txt:{ko:'나무로 만든 황제 조각상',en:''}},
        {idx:37,grade:2,display:12,na:{ko:'은 황제 조각상',en:'Silver Emperor Statue'},kg:0.5,factor:['','1500','','1','200'],price:17000,color:1,txt:{ko:'은으로 만든 황제 조각상',en:''}},
        {idx:38,grade:3,display:12,na:{ko:'금 황제 조각상',en:'Gold Emperor Statue'},kg:0.5,factor:['','1500','','1',''],price:27000,color:2,txt:{ko:'금으로 만든 황제 조각상',en:'300'}},
        {idx:39,grade:1,display:13,na:{ko:'나무 천사 조각상',en:'Wodden Angel Statue'},kg:0.5,factor:['3000','1800','','',''],price:8000,color:0,txt:{ko:'나무로 만든 천사 조각상',en:''}},
        {idx:40,grade:2,display:13,na:{ko:'은 천사 조각상',en:'Silver Angel Statue'},kg:0.5,factor:['6000','1800','','',''],price:18000,color:1,txt:{ko:'은으로 만든 천사 조각상',en:''}},
        {idx:41,grade:3,display:13,na:{ko:'금 천사 조각상',en:'Gold Angel Statue'},kg:0.5,factor:['9000','1800','','',''],price:28000,color:2,txt:{ko:'금으로 만든 천사 조각상',en:''}},
        {idx:42,grade:1,display:14,na:{ko:'나무 이무기 조각상',en:'Wodden Monster Serpent Statue'},kg:0.5,factor:['','','','1',''],price:10000,color:0,txt:{ko:'나무로 만든 이무기 조각상',en:''}},
        {idx:43,grade:2,display:14,na:{ko:'은 이무기 조각상',en:'Silver Monster Serpent Statue'},kg:0.5,factor:['','','','1',''],price:20000,color:1,txt:{ko:'은으로 만든 이무기 조각상',en:''}},
        {idx:44,grade:3,display:14,na:{ko:'금 이무기 조각상',en:'Gold Monster Serpent Statue'},kg:0.5,factor:['','','','1',''],price:30000,color:2,txt:{ko:'금으로 만든 이무기 조각상',en:''}},
        {idx:45,grade:2,display:15,na:{ko:'나무 용 조각상',en:'Wodden Dragon Statue'},kg:0.5,factor:['','','','2',''],price:40000,color:0,txt:{ko:'나무로 만든 용 조각상',en:''}},
        {idx:46,grade:3,display:15,na:{ko:'은 용 조각상',en:'Silver Dragon Statue'},kg:0.5,factor:['','','','2',''],price:50000,color:1,txt:{ko:'은으로 만든 용 조각상',en:''}},
        {idx:47,grade:4,display:15,na:{ko:'금 용 조각상',en:'Gold Dragon Statue'},kg:0.5,factor:['','','','2',''],price:60000,color:2,txt:{ko:'금으로 만든 용 조각상',en:''}},
        {idx:48,grade:2,display:16,na:{ko:'나무 용기사 조각상',en:'Wodden Dragon Knight Statue'},kg:0.5,factor:['','','','3',''],price:70000,color:0,txt:{ko:'나무로 만든 용기사 조각상',en:''}},
        {idx:49,grade:3,display:16,na:{ko:'은 용기사 조각상',en:'Silver Dragon Knight Statue'},kg:0.5,factor:['','','','3',''],price:80000,color:1,txt:{ko:'은으로 만든 용기사 조각상',en:''}},
        {idx:50,grade:4,display:16,na:{ko:'금 용기사 조각상',en:'Gold Dragon Knight Statue'},kg:0.5,factor:['','','','3',''],price:90000,color:2,txt:{ko:'금으로 만든 용기사 조각상',en:''}},
    ],
    anchor:[// 닻:가치
        {idx:0,grade:1,display:0,na:{ko:'작은 나무 닻',en:'Small Wooden Anchor'},kg:1,factor:['','','','',''],price:3000,color:["#F57E20"],txt:{ko:'작은 나무 닻',en:''}},
        {idx:1,grade:2,display:1,na:{ko:'작은 쇠 닻',en:'Small Iron Anchor'},kg:1,factor:['','','','',''],price:5000,color:["#F57E20"],txt:{ko:'작은 쇠 닻',en:''}},
        {idx:2,grade:2,display:2,na:{ko:'작은 강철 닻',en:'Small Steel Anchor'},kg:1,factor:['','','','',''],price:7000,color:["#F57E20"],txt:{ko:'작은 강철 닻',en:''}},
        {idx:3,grade:3,display:3,na:{ko:'작은 은 닻',en:'Small Silver Anchor'},kg:1,factor:['','','','',''],price:9000,color:["#F57E20"],txt:{ko:'작은 은 닻',en:''}},
        {idx:4,grade:4,display:4,na:{ko:'작은 금 닻',en:'Small Gold Anchor'},kg:1,factor:['','','','',''],price:13000,color:["#F57E20"],txt:{ko:'작은 금 닻',en:''}},
        {idx:5,grade:1,display:5,na:{ko:'큰 나무 닻',en:'Big Wooden Anchor'},kg:1,factor:['','','','',''],price:6000,color:["#F57E20"],txt:{ko:'큰 나무 닻',en:''}},
        {idx:6,grade:2,display:6,na:{ko:'큰 쇠 닻',en:'Big Iron Anchor'},kg:1,factor:['','','','',''],price:10000,color:["#F57E20"],txt:{ko:'큰 쇠 닻',en:''}},
        {idx:7,grade:2,display:7,na:{ko:'큰 강철 닻',en:'Big Steel Anchor'},kg:1,factor:['','','','',''],price:14000,color:["#F57E20"],txt:{ko:'큰 강철 닻',en:''}},
        {idx:8,grade:3,display:8,na:{ko:'큰 은 닻',en:'Big Silver Anchor'},kg:1,factor:['','','','',''],price:18000,color:["#F57E20"],txt:{ko:'큰 은 닻',en:''}},
        {idx:9,grade:4,display:9,na:{ko:'큰 금 닻',en:'Big Gold Anchor'},kg:1,factor:['','','','',''],price:26000,color:["#F57E20"],txt:{ko:'큰 금 닻',en:''}},
    ],
    cannon:[//대포: 가치,속도,공격
        {idx:0,grade:1,display:0,na:{ko:'팔코넷',en:'Falconet'},kg:1,price:2000,txt:{ko:'15세기에 개발된 소형 캐넌으로 위력은 그다지 없었다.',en:'It was a small cannon developed in the 15th century and was not very powerful.'},eff:{power:70, distance:160,type:3}},
        {idx:1,grade:1,display:1,na:{ko:'세이커',en:'Saker'},kg:1,price:2500,txt:{ko:'16세기 경 중세 유럽에서 사용된 대포로 팔코넷보다 크고 캘버린보다 작다.',en:'A cannon used in medieval Europe around the 16th century, larger than Falconet and smaller than Calverin.'},eff:{power:150, distance:160,type:5}},
        {idx:2,grade:1,display:4,na:{ko:'바실리스크',en:'Basilisk'},kg:1,price:3000,txt:{ko:'중세에 사용되었던 대포의 한 종류로, 포신의 무게 약 1,800kg, 구경 약 13cm 정도의 매우 크고 무거운 청동제 대포이다.',en:'A type of cannon used in the Middle Ages, a very large and heavy bronze cannon weighing about 1,800 kg and about 13 cm in diameter.'},eff:{power:100, distance:140,type:20}},
        {idx:3,grade:1,display:3,na:{ko:'캘버린',en:'Culverin'},kg:1,price:5000,txt:{ko:'15~17세기 유럽에서 널리 사용되던 대포의 일종이다.',en:'It was a type of cannon widely used in Europe in the 15th and 17th centuries.'},eff:{power:250, distance:150,type:3}},
        {idx:4,grade:1,display:5,na:{ko:'데미캐넌',en:'Demi Cannon'},kg:1,price:6000,txt:{ko:'17세기 초에 개발된 컬버린보다 크고 캐넌보다는 작은 중형 대포이다.',en:'It is a medium-sized cannon larger than Culverine and smaller than Cannon, developed in the early 17th century.'},eff:{power:350, distance:150,type:1}},
        {idx:5,grade:1,display:7,na:{ko:'캐넌',en:'Cannon'},kg:1,price:8000,txt:{ko:'대포의 한 형태로, 보통 외관이 거대하며 길고, 화약을 발사하는 대포를 지칭한다.',en:'A type of cannon, usually large in appearance and long in appearance, refers to a cannon that fires gunpowder.'},eff:{power:500, distance:160,type:1}},
        {idx:6,grade:1,display:8,na:{ko:'강화 캐넌',en:'Reinforced Cannon'},kg:1,price:10000,txt:{ko:'캐넌의 사거리와 화력을 강화시킨 대포이다.',en:'It is a cannon that strengthens Cannon\'s range and firepower.'},eff:{power:300, distance:200,type:6}},
        {idx:7,grade:1,display:6,na:{ko:'캐러네이드',en:'Carronade'},kg:1,price:12000,txt:{ko:'주철로 만든 단포신 활강식 캐넌이다.',en:'It is a cast iron monoflag cannon.'},eff:{power:300, distance:230,type:7}},
    ],
}