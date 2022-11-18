export const ships = {
    slotModifier:{ko:['','사파이어의','에메랄드의','루비의','다이아몬드의'],en:['','Sapphire\'s','Emerald\'s','Ruby\'s','Diamond\'s']},
    markModifier:{ko:['','','두마리','세마리','네마리'],en:['','a','two','three','four']},
    set_type:[//셋트아이템 효과
        //set_num 셋트갯수
        //part 부위
        {idx:0},
        {idx:1,na:{ko:'나무의 축복',en:''},part:[0,1,2,3,4],set_num:[5],eff:[{type:0,num:'500'}]},
        {idx:2,na:{ko:'철든 XX',en:''},part:[5,6,7,8,9],set_num:[5],eff:[{type:3,num:'100'},{type:0,num:'700'}]},
    ],
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
    wood:[//목재
        {idx:0,na:{ko:'편백나무',en:'Cypress'},display:0,txt:{ko:'편백나무',en:'Cypress'},price:1000,woodColor:3},
        {idx:1,na:{ko:'티크나무',en:'Teak'},display:1,txt:{ko:'티크나무',en:'Teak'},price:1000,woodColor:0},
        {idx:2,na:{ko:'삼나무',en:'Cedar'},display:2,txt:{ko:'삼나무',en:'Cedar'},price:1000,woodColor:3},
        {idx:3,na:{ko:'마호가니',en:'Mahogany'},display:3,txt:{ko:'마호가니',en:'Mahogany'},price:1000,woodColor:2},
        {idx:4,na:{ko:'로즈우드',en:'Rosewood'},display:4,txt:{ko:'로즈우드',en:'Rosewood'},price:1000,woodColor:1},
        {idx:5,na:{ko:'레드파인',en:'Red Pine'},display:5,txt:{ko:'레드파인',en:'Red Pine'},price:1000,woodColor:3},
        {idx:6,na:{ko:'떡갈나무',en:'Oak'},display:6,txt:{ko:'떡갈나무',en:'Oak'},price:1000,woodColor:2},
        {idx:7,na:{ko:'느티나무',en:'Zelkova'},display:7,txt:{ko:'느티나무',en:'Zelkova'},price:1000,woodColor:0},
        {idx:8,na:{ko:'느릅나무',en:'Elm'},display:8,txt:{ko:'느릅나무',en:'Elm'},price:1000,woodColor:1},
        {idx:9,na:{ko:'너도밤나무',en:'Beech'},display:9,txt:{ko:'너도밤나무',en:'Beech'},price:1000,woodColor:3},
    ],
    ship:[//배
    //eff type(효과 dmg_type&buff_type) 체력HP(0), 행동력SP(1), 행동회복력RSP(2), 공격력ATK(3), 방어력DEF(4), 술법공격력MAK(5), 술법방어력MDF(6), 회복력RCV(7), 속도SPD(8), 행운LUK(9), 찌르기(10),할퀴기(11),물기(12),치기(13),누르기(14),던지기(15), 빛(21),어둠(22),물(23),불(24),바람(25),땅(26), 진형(100)
    //action 아이템 동작 아이디변경(1), 홀장착(9), 장비강화(10), 스킬제거(11), 골드변경(99), 랜덤뽑기(100)
    //display 이미지번호
    //grade 레어등급 (1일반normal, 2매직magic, 3레어rare, 4에픽epic, 5유니크unique, 6레전드legend, 7세트set)
    //requiredSlot 아이템착용시 필요슬롯
    //actionType 찌르기0, 할퀴기1, 물기2, 치기3, 누르기4, 던지기5
    //upgrade 증가된등급
    //set 셋트번호 0없음
    //hole 홀장착
    //enhance 강화
        [//normal,magic,rare,epic
            {idx:0,grade:1,display:0,na:{ko:'발사',en:'Balsa'},price:100,socket:2,txt:{ko:'발사',en:'Balsa'},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','10']}],requiredSlot:1,set:0},
            {idx:8,grade:1,display:0,na:{ko:'갤리온',en:'Galleon'},price:100,socket:2,txt:{ko:'갤리온',en:'Galleon'},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','10']}],requiredSlot:1,set:0},
        ],
        [//unique

        ],
        [//legend

        ]
            
            // {idx:6,part:1,grade:1,display:3,na:'코니컬 헬름II',kg:4,price:200,color:["#fff","#000"],socket:3,txt:'Conical Helm II 원뿔형태에서 변형시킨 투구',eff:[{type:4,num:['130','180']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true],set:0},
            // {idx:4,part:1,grade:1,display:5,na:'마스크드 헬름',kg:7,price:200,color:["#fff","#000"],socket:3,txt:'Masked helm 얼굴을 완벽히 보호되는 투구',eff:[{type:4,num:['150','300']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true],set:0},
    ],
    sail:[//돛
        {idx:0,grade:1,display:0,na:{ko:'작은 사각돛',en:'Small Square Sail'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'사각돛',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
        {idx:1,grade:1,display:1,na:{ko:'큰 사각돛',en:'Big Square Sail'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'사각돛',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
        {idx:2,grade:1,display:2,na:{ko:'이중 사각돛',en:'Double Square Sail'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'사각돛',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
        {idx:3,grade:1,display:3,na:{ko:'큰 이중 사각돛',en:'Big Double Square Sail'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'사각돛',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
        {idx:4,grade:1,display:4,na:{ko:'넓은 이중 사각돛',en:'Wide Double Square Sail'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'사각돛',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
        {idx:5,grade:1,display:5,na:{ko:'삼각돛',en:'Triangular Sail'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'사각돛',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
        {idx:6,grade:1,display:6,na:{ko:'이중 삼각돛',en:'Double Triangular Sail'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'사각돛',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
    ],
    figurehead:[//조각상
        {idx:0,grade:1,display:0,na:{ko:'나무 비둘기 조각상',en:'Wodden Dove Statue'},kg:0.5,price:400,color:1,txt:{ko:'나무로 만든 비둘기 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:1,grade:2,display:0,na:{ko:'은 비둘기 조각상',en:'Silver Dove Statue'},kg:0.5,price:400,color:1,txt:{ko:'은으로 만든 비둘기 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:2,grade:3,display:0,na:{ko:'금 비둘기 조각상',en:'Gold Dove Statue'},kg:0.5,price:400,color:2,txt:{ko:'금으로 만든 비둘기 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:3,grade:1,display:1,na:{ko:'나무 매 조각상',en:'Wodden Hawk Statue'},kg:0.5,price:400,color:0,txt:{ko:'나무로 만든 매 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:4,grade:2,display:1,na:{ko:'은 매 조각상',en:'Silver Hawk Statue'},kg:0.5,price:400,color:1,txt:{ko:'은으로 만든 매 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:5,grade:3,display:1,na:{ko:'금 매 조각상',en:'Gold Hawk Statue'},kg:0.5,price:400,color:2,txt:{ko:'금으로 만든 매 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:6,grade:1,display:2,na:{ko:'나무 독수리 조각상',en:'Wodden Eagle Statue'},kg:0.5,price:400,color:0,txt:{ko:'나무로 만든 독수리 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:7,grade:2,display:2,na:{ko:'은 독수리 조각상',en:'Silver Eagle Statue'},kg:0.5,price:400,color:1,txt:{ko:'은으로 만든 독수리 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:8,grade:3,display:2,na:{ko:'금 독수리 조각상',en:'Gold Eagle Statue'},kg:0.5,price:400,color:2,txt:{ko:'금으로 만든 독수리 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:9,grade:1,display:3,na:{ko:'나무 돌고래 조각상',en:'Wodden Dolphin Statue'},kg:0.5,price:400,color:0,txt:{ko:'나무로 만든 돌고래 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:10,grade:2,display:3,na:{ko:'은 돌고래 조각상',en:'Silver Dolphin Statue'},kg:0.5,price:400,color:1,txt:{ko:'은으로 만든 돌고래 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:11,grade:3,display:3,na:{ko:'금 돌고래 조각상',en:'Gold Dolphin Statue'},kg:0.5,price:400,color:2,txt:{ko:'금으로 만든 돌고래 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:12,grade:1,display:4,na:{ko:'나무 거북이 조각상',en:'Wodden Turtle Statue'},kg:0.5,price:400,color:0,txt:{ko:'나무로 만든 거북이 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:13,grade:2,display:4,na:{ko:'은 거북이 조각상',en:'Silver Turtle Statue'},kg:0.5,price:400,color:1,txt:{ko:'은으로 만든 거북이 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:14,grade:3,display:4,na:{ko:'금 거북이 조각상',en:'Gold Turtle Statue'},kg:0.5,price:400,color:2,txt:{ko:'금으로 만든 거북이 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:15,grade:1,display:5,na:{ko:'나무 범고래 조각상',en:'Wodden Killer whale Statue'},kg:0.5,price:400,color:0,txt:{ko:'나무로 만든 범고래 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:16,grade:2,display:5,na:{ko:'은 범고래 조각상',en:'Silver Killer whale Statue'},kg:0.5,price:400,color:1,txt:{ko:'은으로 만든 범고래 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:17,grade:3,display:5,na:{ko:'금 범고래 조각상',en:'Gold Killer whale Statue'},kg:0.5,price:400,color:2,txt:{ko:'금으로 만든 범고래 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:18,grade:1,display:6,na:{ko:'나무 호랑이 조각상',en:'Wodden Tiger Statue'},kg:0.5,price:400,color:0,txt:{ko:'나무로 만든 호랑이 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:19,grade:2,display:6,na:{ko:'은 호랑이 조각상',en:'Silver Tiger Statue'},kg:0.5,price:400,color:1,txt:{ko:'은으로 만든 호랑이 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:20,grade:3,display:6,na:{ko:'금 호랑이 조각상',en:'Gold Tiger Statue'},kg:0.5,price:400,color:2,txt:{ko:'금으로 만든 호랑이 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:21,grade:1,display:7,na:{ko:'나무 사자 조각상',en:'Wodden Lion Statue'},kg:0.5,price:400,color:0,txt:{ko:'나무로 만든 사자 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:22,grade:2,display:7,na:{ko:'은 사자 조각상',en:'Silver Lion Statue'},kg:0.5,price:400,color:1,txt:{ko:'은으로 만든 사자 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:23,grade:3,display:7,na:{ko:'금 사자 조각상',en:'Gold Lion Statue'},kg:0.5,price:400,color:2,txt:{ko:'금으로 만든 사자 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:24,grade:1,display:8,na:{ko:'나무 기사 조각상',en:'Wodden Knight Statue'},kg:0.5,price:400,color:0,txt:{ko:'나무로 만든 기사 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:25,grade:2,display:8,na:{ko:'은 기사 조각상',en:'Silver Knight Statue'},kg:0.5,price:400,color:1,txt:{ko:'은으로 만든 기사 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:26,grade:3,display:8,na:{ko:'금 기사 조각상',en:'Gold Knight Statue'},kg:0.5,price:400,color:2,txt:{ko:'금으로 만든 기사 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:27,grade:1,display:9,na:{ko:'나무 소녀 조각상',en:'Wodden Girl Statue'},kg:0.5,price:400,color:0,txt:{ko:'나무로 만든 소녀 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:28,grade:2,display:9,na:{ko:'은 소녀 조각상',en:'Silver Girl Statue'},kg:0.5,price:400,color:1,txt:{ko:'은으로 만든 소녀 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:29,grade:3,display:9,na:{ko:'금 소녀 조각상',en:'Gold Girl Statue'},kg:0.5,price:400,color:2,txt:{ko:'금으로 만든 소녀 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:30,grade:1,display:10,na:{ko:'나무 마법사 조각상',en:'Wodden Wizard Statue'},kg:0.5,price:400,color:0,txt:{ko:'나무로 만든 마법사 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:31,grade:2,display:10,na:{ko:'은 마법사 조각상',en:'Silver Wizard Statue'},kg:0.5,price:400,color:1,txt:{ko:'은으로 만든 마법사 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:32,grade:3,display:10,na:{ko:'금 마법사 조각상',en:'Gold Wizard Statue'},kg:0.5,price:400,color:2,txt:{ko:'금으로 만든 마법사 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:33,grade:1,display:11,na:{ko:'나무 성녀 조각상',en:'Wodden Saint Statue'},kg:0.5,price:400,color:0,txt:{ko:'나무로 만든 성녀 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:34,grade:2,display:11,na:{ko:'은 성녀 조각상',en:'Silver Saint Statue'},kg:0.5,price:400,color:1,txt:{ko:'은으로 만든 성녀 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:35,grade:3,display:11,na:{ko:'금 성녀 조각상',en:'Gold Saint Statue'},kg:0.5,price:400,color:2,txt:{ko:'금으로 만든 성녀 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:36,grade:1,display:12,na:{ko:'나무 황제 조각상',en:'Wodden Emperor Statue'},kg:0.5,price:400,color:0,txt:{ko:'나무로 만든 황제 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:37,grade:2,display:12,na:{ko:'은 황제 조각상',en:'Silver Emperor Statue'},kg:0.5,price:400,color:1,txt:{ko:'은으로 만든 황제 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:38,grade:3,display:12,na:{ko:'금 황제 조각상',en:'Gold Emperor Statue'},kg:0.5,price:400,color:2,txt:{ko:'금으로 만든 황제 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:39,grade:1,display:13,na:{ko:'나무 천사 조각상',en:'Wodden Angel Statue'},kg:0.5,price:400,color:0,txt:{ko:'나무로 만든 천사 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:40,grade:2,display:13,na:{ko:'은 천사 조각상',en:'Silver Angel Statue'},kg:0.5,price:400,color:1,txt:{ko:'은으로 만든 천사 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:41,grade:3,display:13,na:{ko:'금 천사 조각상',en:'Gold Angel Statue'},kg:0.5,price:400,color:2,txt:{ko:'금으로 만든 천사 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:42,grade:1,display:14,na:{ko:'나무 이무기 조각상',en:'Wodden Monster Serpent Statue'},kg:0.5,price:400,color:0,txt:{ko:'나무로 만든 이무기 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:43,grade:2,display:14,na:{ko:'은 이무기 조각상',en:'Silver Monster Serpent Statue'},kg:0.5,price:400,color:1,txt:{ko:'은으로 만든 이무기 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:44,grade:3,display:14,na:{ko:'금 이무기 조각상',en:'Gold Monster Serpent Statue'},kg:0.5,price:400,color:2,txt:{ko:'금으로 만든 이무기 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:45,grade:2,display:15,na:{ko:'나무 용 조각상',en:'Wodden Dragon Statue'},kg:0.5,price:400,color:0,txt:{ko:'나무로 만든 용 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:46,grade:3,display:15,na:{ko:'은 용 조각상',en:'Silver Dragon Statue'},kg:0.5,price:400,color:1,txt:{ko:'은으로 만든 용 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:47,grade:4,display:15,na:{ko:'금 용 조각상',en:'Gold Dragon Statue'},kg:0.5,price:400,color:2,txt:{ko:'금으로 만든 용 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:48,grade:2,display:16,na:{ko:'나무 용기사 조각상',en:'Wodden Dragon Knight Statue'},kg:0.5,price:400,color:0,txt:{ko:'나무로 만든 용기사 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:49,grade:3,display:16,na:{ko:'은 용기사 조각상',en:'Silver Dragon Knight Statue'},kg:0.5,price:400,color:1,txt:{ko:'은으로 만든 용기사 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        {idx:50,grade:4,display:16,na:{ko:'금 용기사 조각상',en:'Gold Dragon Knight Statue'},kg:0.5,price:400,color:2,txt:{ko:'금으로 만든 용기사 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
    ],
    anchor:[// 닻
        {idx:0,grade:1,display:0,na:{ko:'작은 나무 닻',en:'Small Wooden Anchor'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'작은 나무 닻',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
        {idx:1,grade:2,display:1,na:{ko:'작은 쇠 닻',en:'Small Iron Anchor'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'작은 쇠 닻',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
        {idx:2,grade:2,display:2,na:{ko:'작은 강철 닻',en:'Small Steel Anchor'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'작은 강철 닻',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
        {idx:3,grade:3,display:3,na:{ko:'작은 은 닻',en:'Small Silver Anchor'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'작은 은 닻',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
        {idx:4,grade:4,display:4,na:{ko:'작은 금 닻',en:'Small Gold Anchor'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'작은 금 닻',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
        {idx:5,grade:1,display:5,na:{ko:'큰 나무 닻',en:'Big Wooden Anchor'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'큰 나무 닻',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
        {idx:6,grade:2,display:6,na:{ko:'큰 쇠 닻',en:'Big Iron Anchor'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'큰 쇠 닻',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
        {idx:7,grade:2,display:7,na:{ko:'큰 강철 닻',en:'Big Steel Anchor'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'큰 강철 닻',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
        {idx:8,grade:3,display:8,na:{ko:'큰 은 닻',en:'Big Silver Anchor'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'큰 은 닻',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
        {idx:9,grade:4,display:9,na:{ko:'큰 금 닻',en:'Big Gold Anchor'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'큰 금 닻',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
    ],
    cannon:[//대포
        {idx:0,grade:1,display:0,na:{ko:'팔코네트',en:'Falconet'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'팔코네트',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
        {idx:1,grade:1,display:1,na:{ko:'미니온',en:'Minion'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'미니온',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
        {idx:2,grade:1,display:2,na:{ko:'세이커',en:'Saker'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'세이커',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
        {idx:3,grade:1,display:3,na:{ko:'데미캘버린',en:'Demi Culverin'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'데미캘버린',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
        {idx:4,grade:1,display:4,na:{ko:'캘버린',en:'Culverin'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'캘버린',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
        {idx:5,grade:1,display:5,na:{ko:'데미캐넌',en:'Demi Cannon'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'데미캐넌',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
        {idx:6,grade:1,display:6,na:{ko:'캐러네이드',en:'Carronade'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'캐러네이드',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
    ],
}