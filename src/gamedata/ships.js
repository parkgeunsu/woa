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
    woodColor:[
        ['#d6a477','#703d18','#914d2c','#9e5f35','#c17b40'],
        ['#ff8939','#442510','#5b3217','#723c1e','#894727'],
        ['#ffc476','#a8752a','#bc8235','#d6974c','#eaa75e'],
        ['#ffe6c7','#a58c6a','#bc9f7d','#d3b292','#efccaf'],
    ],
    wood:[//목재
        {idx:0,na:{ko:'편백나무',en:'Cypress'},woodColor:3},
        {idx:1,na:{ko:'티크나무',en:'Teak'},woodColor:0},
        {idx:2,na:{ko:'삼나무',en:'Cedar'},woodColor:3},
        {idx:3,na:{ko:'마호가니',en:'Mahogany'},woodColor:2},
        {idx:4,na:{ko:'로즈우드',en:'Rosewood'},woodColor:1},
        {idx:5,na:{ko:'레드파인',en:'Red Pine'},woodColor:3},
        {idx:6,na:{ko:'떡갈나무',en:'Oak'},woodColor:2},
        {idx:7,na:{ko:'느티나무',en:'Zelkova'},woodColor:0},
        {idx:8,na:{ko:'느릅나무',en:'Elm'},woodColor:1},
        {idx:9,na:{ko:'너도밤나무',en:'Beech'},woodColor:3},
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
        [//normal,magic,rare,epic
            {idx:0,grade:1,display:0,na:{ko:'작은 사각돛',en:'Small Square Sail'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'사각돛',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
            {idx:1,grade:1,display:1,na:{ko:'큰 사각돛',en:'Big Square Sail'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'사각돛',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
            {idx:2,grade:1,display:2,na:{ko:'작은 이중 사각돛',en:'Small Double Square Sail'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'사각돛',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
            {idx:3,grade:1,display:3,na:{ko:'이중 사각돛',en:'Double Square Sail'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'사각돛',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
            {idx:4,grade:1,display:4,na:{ko:'큰 이중 사각돛',en:'Big Double Square Sail'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'사각돛',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
            {idx:5,grade:1,display:5,na:{ko:'넓은 이중 사각돛',en:'Wide Double Square Sail'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'사각돛',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
            {idx:6,grade:1,display:6,na:{ko:'삼각돛',en:'Triangular Sail'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'사각돛',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
            {idx:7,grade:1,display:7,na:{ko:'이중 삼각돛',en:'Double Triangular Sail'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'사각돛',en:''},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,set:0},
        ],
        [//unique

        ],
        [//legend

        ]
    ],
    figurehead:[//조각상
        [//normal,magic,rare,epic
            {idx:0,grade:1,display:0,na:{ko:'새',en:'Makiri'},kg:0.5,price:400,color:["#ffffff,#987E2E"],txt:{ko:'나무로 만든 새 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
            {idx:0,grade:1,display:0,na:{ko:'나무새',en:'Makiri'},kg:0.5,price:400,color:["#ffffff,#987E2E"],txt:{ko:'나무로 만든 새 조각상',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],set:0},
        ],
        [//unique

        ],
        [//legend

        ]
    ],
    aa:[//
        [//normal,magic,rare,epic
            {idx:0,part:4,grade:1,display:501,na:{ko:'반지',en:'Ring'},kg:0.1,price:1000,color:["#F9B919"],socket:1,txt:{ko:'손가락에 끼는 악세사리.',en:''},eff:[],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],set:0},
            {idx:1,part:4,grade:1,display:502,na:{ko:'진주반지',en:'Pearl Ring'},kg:0.1,price:1000,color:["#F9B919","#000000"],socket:1,txt:{ko:'손가락에 끼우는 악세사리. 진주로 장식되어 있음',en:''},eff:[],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],set:0},
        ],
        [//unique
        ],
        [//legend
        ]
    ],
    bb:[//
        [//normal,magic,rare,epic
            {idx:0,part:5,grade:1,display:551,na:{ko:'목걸이',en:'Necklace'},kg:0.1,price:1000,color:["#F9B919","#ffffff"],socket:1,txt:{ko:'목에 착용하는 악세사리.',en:''},eff:[],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],set:0},
        ],
        [//unique
        ],
        [//legend
        ]
    ],
}