export const items = {
    slotModifier:['','사파이어의','에메랄드의','루비의','다이아몬드의'],
    markModifier:['','','두마리','세마리','네마리'],
    item_point_light:['#ffdf8b','#00ff00','#d9e506','#ff00bf','#f00a36','#ed3b21','#ff6908','#ffc719','#ae9a64','#8ba753','#598c14','#dbe0e3','#fff','#FFD1D8','#FFFFD1','#FFE39B','#9CFFE6','#b0a696','#2dde98','#4a8594','#1fb3e0','#2e9df7'],
    item_point_dark:['#8e43e7','#52057f','#cd3292','#bf033b','#335238','#213e97','#003666','#051736','#706357'],
    item_point_color:['#8e43e7','#52057f','#cd3292','#ff00bf','#bf033b','#f00a36','#ed3b21','#ff6908','#ffc719','#ffdf8b','#d9e506','#ae9a64','#8ba753','#598c14','#335238','#2dde98','#00ff00','#4a8594','#1fb3e0','#2e9df7','#213e97','#003666','#051736','#706357','#b0a696','#dbe0e3','#fff','#FFD1D8','#FFFFD1','#FFE39B','#9CFFE6'],//아이템 포인트 컬러
    set_type:[//셋트아이템 효과
        //set_num 셋트갯수
        //part 부위
        {idx:0},
        {idx:1,na:'나무의 축복',part:[0,1,2,3,4],set_num:[5],eff:[{type:0,num:'500'}]},
        {idx:2,na:'철든 XX',part:[5,6,7,8,9],set_num:[5],eff:[{type:3,num:'100'},{type:0,num:'700'}]},
    ],
    equip:{//part 부위 head1, body2, weapon3, ring4, necklace5, baggage짐, 보석11, 업그레이드12, 기타13, 재료14
    //eff type(효과 dmg_type&buff_type) 체력HP(0), 행동력SP(1), 행동회복력RSP(2), 공격력ATK(3), 방어력DEF(4), 술법공격력MAK(5), 술법방어력MDF(6), 회복력RCV(7), 속도SPD(8), 행운LUK(9), 찌르기(10),할퀴기(11),물기(12),치기(13),누르기(14),던지기(15), 빛(20),어둠(21),물(22),불(23),바람(24),땅(25), 진형(100)
    //action 아이템 동작 아이디변경(1), 홀장착(9), 장비강화(10), 스킬제거(11), 골드변경(99), 랜덤뽑기(100)
    //display 이미지번호
    //grade 레어등급 (1일반normal, 2매직magic, 3레어rare, 4에픽epic, 5유니크unique, 6레전드legend, 7세트set)
    //upgrade 증가된등급
    //set 셋트번호 0없음
    //hole 홀장착
    //enhance 강화
        1:[
            {idx:0,part:1,grade:1,display:0,na:'터번',kg:0.1,price:100,color:["#fff","#000"],socket:2,txt:'머리에 둘둘 감고 다니는 천',eff:[{type:4,num:['5','50']},{type:4,num:['50','50','50']}],set:0},
            {idx:1,part:1,grade:1,display:1,na:'두정투',kg:3,price:1000,color:["#fff","#000","#e2ae37"],socket:3,txt:'頭釘鬪 가죽에 옻칠을 한 투구',eff:[{type:4,num:['50','250']}],set:0},
            {idx:2,part:1,grade:1,display:10,na:'스컬 캡',kg:3,price:400,color:["#fff","#000"],socket:2,txt:'Skull Cap 반구형 형태의 철제 투구',eff:[{type:4,num:['50','100']}],set:0},
            {idx:3,part:1,grade:1,display:2,na:'코니컬 헬름',kg:5,price:500,color:["#fff","#000"],socket:2,txt:'Conical Helm 원뿔형태의 철제 투구',eff:[{type:4,num:['100','150']}],set:0},
            {idx:4,part:1,grade:1,display:7,na:'풀 헬름',kg:7,price:700,color:["#fff","#000"],socket:3,txt:'Full helm 헬름을 강화시킨 투구',eff:[{type:4,num:['150','250']}],set:0},
            {idx:5,part:1,grade:1,display:9,na:'본 헬름',kg:6,price:400,color:["#fff","#58595B"],socket:4,txt:'Bone helm 짐승의 뼈로 만든 투구',eff:[{type:4,num:['100','300']}],set:0},
            {idx:6,part:1,grade:1,display:6,na:'헤럴드리 헬름',kg:14,price:1500,color:["#fff","#000"],socket:3,txt:'Heraldry Helm 폐쇠형 강철 투구',eff:[{type:3,num:['200','350']}],set:0},
            {idx:7,part:1,grade:1,display:8,na:'그레이트 헬름',kg:25,price:2000,color:["#fff","#000","#AF8C4F"],socket:4,txt:'Great Helm 우수한 방어효과 만큼 무거운 투구',eff:[{type:4,num:['350','500']}],set:0},
            // {idx:6,part:1,grade:1,display:3,na:'코니컬 헬름II',kg:4,price:200,color:["#fff","#000"],socket:3,txt:'Conical Helm II 원뿔형태에서 변형시킨 투구',eff:[{type:4,num:['130','180']}],set:0},
            // {idx:4,part:1,grade:1,display:5,na:'마스크드 헬름',kg:7,price:200,color:["#fff","#000"],socket:3,txt:'Masked helm 얼굴을 완벽히 보호되는 투구',eff:[{type:4,num:['150','300']}],set:0},
        ],
        2:[
            {idx:0,part:2,grade:1,display:20,na:'클로스 클로시즈',kg:1,price:100,color:["#F57E20"],socket:2,txt:'Cloth Clothes 천으로 만든 가벼운 옷, 천옷',eff:[{type:4,num:['5','50']}],set:0},
            {idx:1,part:2,grade:1,display:21,na:'퀄티드 아머',kg:5,price:300,color:["#FEC260"],socket:3,txt:'Quiled Armor 천을 기워 붙인 갑옷, 면갑',eff:[{type:4,num:['50','100']}],set:0},
            {idx:2,part:2,grade:1,display:22,na:'하이드 아머',kg:7,price:400,color:["#C16F2B"],socket:4,txt:'Hide Armor 조끼형태의 가죽 갑옷',eff:[{type:4,num:['30','120']}],set:0},
            {idx:3,part:2,grade:1,display:23,na:'레더 아머',kg:10,price:500,color:["#C16F2B"],socket:3,txt:'Lether Armor 가죽 갑옷',eff:[{type:4,num:['50','150']}],set:0},
            {idx:4,part:2,grade:1,display:24,na:'스터디드 레더 아머',kg:5,price:700,color:["#E4AF51"],socket:3,txt:'Studded Lether Armor 징박힌 가죽 갑옷',eff:[{type:3,num:['100','200']}],set:0},
            {idx:5,part:2,grade:1,display:25,na:'링 메일',kg:11,price:900,color:["#fff"],socket:3,txt:'Ring Mail 사슬 형태의 철제 갑옷',eff:[{type:4,num:['150','250']}],set:0},
            {idx:6,part:2,grade:1,display:26,na:'스케일 메일',kg:13,price:1000,color:["#E6E7E8"],socket:4,txt:'Scale Mail 금속조각을 붙힌 갑옷, 어린갑',eff:[{type:4,num:['170','270']}],set:0},
            {idx:7,part:2,grade:1,display:27,na:'체인 메일',kg:15,price:1000,color:["#fff"],socket:3,txt:'Chain Mail 메쉬형태로 금속링을 엮은 갑옷, 쇄자갑',eff:[{type:3,num:['200','300']}],set:0},
            {idx:8,part:2,grade:1,display:28,na:'스피린트 메일',kg:17,price:1100,color:["#9B8579"],socket:4,txt:'Splint Mail 천이나 가죽에 금속 스트립을 엮은 갑옷, 경번갑',eff:[{type:4,num:['250','400']}],set:0},
            {idx:9,part:2,grade:1,display:29,na:'브리간딘',kg:20,price:1200,color:["#D1D3D4"],socket:4,txt:'Brigandine 가죽 겉 감 안에 철판을 덧댄 갑옷,두정갑',eff:[{type:4,num:['300','450']}],set:0},
            {idx:10,part:2,grade:1,display:30,na:'플레이트 메일',kg:27,price:1500,color:["#000"],socket:5,txt:'Plate Mail 강철판으로 만든 갑옷, 판금갑',eff:[{type:4,num:['450','600']}],set:0},
            {idx:11,part:2,grade:1,display:31,na:'풀 플레이트',kg:35,price:2000,color:["#fff"],socket:5,txt:'Full Plate 전신을 강철판으로 만든 갑옷, 판금갑',eff:[{type:4,num:['600','1000']}],set:0},
        ]
        //두석린갑(豆錫鱗甲) : 황동, 붉은 칠한 황동, 검은 칠한 황동을 번갈아 사용한 의장용 갑옷
        //도금동엽갑(塗金銅葉甲) : 도금한 비늘을 사용한 의장용 황금 갑옷
        //사무라이갑
        // {idx:1,part:2,grade:2,display:1,na:'나무갑옷',price:200,txt:'나무로 만든 갑옷',eff:[{type:0,num:['5%','6%','10%']},{type:4,num:['100','100','100']}],set:1},
        // {idx:2,part:5,grade:1,display:2,na:'나무벳지',price:200,txt:'나무로 만든 벳지',eff:[{type:8,num:['1%','2%','5%']}],set:1},
        // {idx:3,part:3,grade:2,display:3,na:'나무손톱',price:300,txt:'나무로 만든 <i el el0>치기</i>무기',eff:[{type:3,num:['50','55','60']}],set:1},
        // {idx:4,part:3,grade:1,display:4,na:'나무껍질',price:300,txt:'나무로 만든 껍질방어구',eff:[{type:22,num:['100','125','150']}],set:1},
        // {idx:6,part:2,grade:2,display:6,na:'철갑옷',price:400,txt:'철로 만든 갑옷',eff:[{type:0,num:['8%','9%','12%']},{type:4,num:['150','150','150']}],set:2},
        // {idx:7,part:5,grade:1,display:7,na:'철벳지',price:400,txt:'철로 만든 벳지',eff:[{type:8,num:['3%','4%','7%']}],set:2},
        // {idx:8,part:3,grade:2,display:8,na:'철손톱',price:500,txt:'철로 만든 <i el el0>치기</i>무기',eff:[{type:3,num:['70','75','80']}],set:2},
        // {idx:9,part:3,grade:1,display:9,na:'철제판',price:300,txt:'철로 만든 방어구',eff:[{type:4,num:['150','175','200']}],set:2},
    },
    hole:[//홀 장착 아이템
        //type 장착 타입
        //stone 아이템창 색상
        {idx:0,grade:0,stone:'empty',display:0,na:'',price:0,action:9,eff:[]},//
        {idx:1,grade:1,stone:'w',display:1,na:'작은 흰돌',price:100,txt:'마력이 깃든 돌',action:9,eff:[{type:3,num:'10'}]},//
        {idx:2,grade:2,stone:'w',display:2,na:'흰돌',price:200,txt:'마력이 깃든 돌',action:9,eff:[{type:3,num:'30'}]},
        {idx:3,grade:3,stone:'w',display:3,na:'빛나는 흰돌',price:400,txt:'마력이 깃든 돌',action:9,eff:[{type:3,num:'60'}]},
        {idx:4,grade:4,stone:'w',display:4,na:'큰 흰돌',price:1000,txt:'마력이 깃든 돌',action:9,eff:[{type:3,num:'100'}]},
        {idx:5,grade:1,stone:'k',display:5,na:'작은 흑돌',price:100,txt:'마력이 깃든 돌',action:9,eff:[{type:4,num:'10'}]},//HP
        {idx:6,grade:2,stone:'k',display:6,na:'흑돌',price:200,txt:'마력이 깃든 돌',action:9,eff:[{type:4,num:'30'}]},
        {idx:7,grade:3,stone:'k',display:7,na:'빛나는 흑돌',price:400,txt:'마력이 깃든 돌',action:9,eff:[{type:4,num:'60'}]},
        {idx:8,grade:4,stone:'k',display:8,na:'큰 흑돌',price:1000,txt:'마력이 깃든 돌',action:9,eff:[{type:4,num:'100'}]},
        {idx:9,grade:1,stone:'r',display:9,na:'작은 적돌',price:100,txt:'마력이 깃든 돌',action:9,eff:[{type:4,num:'10'}]},//공
        {idx:10,grade:2,stone:'r',display:10,na:'적돌',price:200,txt:'마력이 깃든 돌',action:9,eff:[{type:4,num:'30'}]},
        {idx:11,grade:3,stone:'r',display:11,na:'빛나는 적돌',price:400,txt:'마력이 깃든 돌',action:9,eff:[{type:4,num:'60'}]},
        {idx:12,grade:4,stone:'r',display:12,na:'큰 적돌',price:1000,txt:'마력이 깃든 돌',action:9,eff:[{type:4,num:'100'}]},
        {idx:13,grade:1,stone:'b',display:13,na:'작은 청돌',price:100,txt:'마력이 깃든 돌',action:9,eff:[{type:4,num:'1'}]},//방
        {idx:14,grade:2,stone:'b',display:14,na:'청돌',price:200,txt:'마력이 깃든 돌',action:9,eff:[{type:4,num:'2'}]},
        {idx:15,grade:3,stone:'b',display:15,na:'빛나는 청돌',price:400,txt:'마력이 깃든 돌',action:9,eff:[{type:4,num:'2'}]},
        {idx:16,grade:4,stone:'b',display:16,na:'큰 청돌',price:1000,txt:'마력이 깃든 돌',action:9,eff:[{type:4,num:'100'}]},
        {idx:17,grade:1,stone:'y',display:17,na:'작은 황돌',price:100,txt:'마력이 깃든 돌',action:9,eff:[{type:4,num:'10'}]},//술공
        {idx:18,grade:2,stone:'y',display:18,na:'황돌',price:200,txt:'마력이 깃든 돌',action:9,eff:[{type:4,num:'30'}]},
        {idx:19,grade:3,stone:'y',display:19,na:'빛나는 황돌',price:400,txt:'마력이 깃든 돌',action:9,eff:[{type:4,num:'60'}]},
        {idx:20,grade:4,stone:'y',display:20,na:'큰 황돌',price:1000,txt:'마력이 깃든 돌',action:9,eff:[{type:4,num:'100'}]},
        {idx:21,grade:1,stone:'g',display:21,na:'작은 녹돌',price:100,txt:'마력이 깃든 돌',action:9,eff:[{type:4,num:'10'}]},//술방
        {idx:22,grade:2,stone:'g',display:22,na:'녹돌',price:200,txt:'마력이 깃든 돌',action:9,eff:[{type:4,num:'30'}]},
        {idx:23,grade:3,stone:'g',display:23,na:'빛나는 녹돌',price:400,txt:'마력이 깃든 돌',action:9,eff:[{type:4,num:'60'}]},
        {idx:24,grade:4,stone:'g',display:24,na:'큰 녹돌',price:1000,txt:'마력이 깃든 돌',action:9,eff:[{type:4,num:'100'}]},
    ],
    upgrade:[//업그레이드 아이템
        {idx:0,grade:1,display:0,na:'작은 강화의돌',price:50,
        action:10,txt:'장비강화 재료(매우 낮은 확률)',eff:[75,50,25,10,0.5,0.2,0.1]},
        {idx:1,grade:2,display:1,na:'강화의돌',price:100,
        action:10,txt:'장비강화 재료(낮은 확률)',eff:[75,75,50,25,10,0.5,0.2]},
        {idx:2,grade:3,display:2,na:'큰 강화의돌',price:300,
        action:10,txt:'장비강화 재료(보통 확률)',eff:[75,75,75,50,25,2,0.5]},
        {idx:3,grade:4,display:3,na:'아주 큰 강화의돌',price:500,
        action:10,txt:'장비강화 재료(높은 확률)',eff:[75,75,75,75,50,10,5]},
        {idx:4,grade:5,display:4,na:'완벽한 강화의돌',price:1000,
        action:10,txt:'장비강화 재료(높은 확률)',eff:[50,50,50,50,50,50,25]},
    ],
    material:[//재료
    ],
    etc:[
        {idx:0,grade:0,display:0,na:'동전더미(동)',price:1000,
        action:99,txt:'G조각 1000개로 판매할 수 있다.',eff:1000},
        {idx:1,grade:1,display:1,na:'동전더미(은)',price:5000,
        action:99,txt:'G조각 5000개로 판매할 수 있다.',eff:5000},
        {idx:2,grade:2,display:2,na:'동전더미(금)',price:10000,
        action:99,txt:'G조각 10000개로 판매할 수 있다.',eff:10000},
        {idx:3,grade:3,display:10,na:'경험의책I',price:100,
        action:98,txt:'100의 경험치를 획들 할 수 있다.',eff:100},
        {idx:4,grade:4,display:10,na:'경험의책II',price:100,
        action:98,txt:'1000의 경험치를 획들 할 수 있다.',eff:1000},
        {idx:5,grade:5,display:10,na:'경험의책III',price:100,
        action:98,txt:'10000의 경험치를 획들 할 수 있다.',eff:10000},
        {idx:6,grade:6,display:10,na:'경험의책IV',price:100,
        action:98,txt:'50000의 경험치를 획들 할 수 있다.',eff:50000},
        {idx:7,grade:7,display:10,na:'경험의책V',price:100,
        action:98,txt:'100000의 경험치를 획들 할 수 있다.',eff:100000},
        {idx:8,grade:0,display:0,na:'',txt:'',eff:[]},
        {idx:9,grade:0,display:0,na:'',txt:'',eff:[]},
        {idx:10,grade:0,display:10,na:'선물상자',price:100,action:100,txt:'무언가 나올 것 같은 기분좋은 상자',eff:['?']},
        {idx:11,grade:0,display:0,na:'',txt:'',eff:[]},
        {idx:12,grade:0,display:0,na:'',txt:'',eff:[]},
        {idx:13,grade:0,display:0,na:'',txt:'',eff:[]},
        {idx:14,grade:0,display:0,na:'',txt:'',eff:[]},
        {idx:15,grade:0,display:0,na:'',txt:'',eff:[]},
        {idx:16,grade:0,display:0,na:'',txt:'',eff:[]},
        {idx:17,grade:0,display:0,na:'',txt:'',eff:[]},
        {idx:18,grade:0,display:0,na:'',txt:'',eff:[]},
        {idx:19,grade:0,display:0,na:'',txt:'',eff:[]},
        {idx:20,grade:0,display:10,na:'ID교환권',price:100,action:1,txt:'ID를 변경할수 있다.',eff:['?']},
        {idx:21,grade:0,display:10,na:'스킬제거권',price:100,action:11,txt:'캐릭터의 스킬을 제거할수 있다.',eff:['?']},
    ]
}