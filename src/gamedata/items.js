export const items = {
    enhance_n:[3,3,5,5,7,7],//아이템 등급별 최대강화
    grade_up:[],//등급업시 능력치 업 단계당 10%증가
    set_type:[//셋트아이템 효과
        //set_num 셋트갯수
        //part 부위
        {idx:0},
        {idx:1,na:'나무의 축복',part:[0,1,2,3,4],set_num:[5],eff:[{type:0,num:'500'}]},
        {idx:2,na:'철든 XX',part:[5,6,7,8,9],set_num:[5],eff:[{type:3,num:'100'},{type:0,num:'700'}]},
    ],
    equip:[//part 부위 head1, armor2, weapon3, ring4, necklace5, baggage짐, 보석11, 업그레이드12, 기타13, 재료14
    //eff type(효과 dmg_type&buff_type) 체력HP(0), 행동력SP(1), 행동회복력RSP(2), 공격력ATK(3), 방어력DEF(4), 술법공격력MAK(5), 술법방어력MDF(6), 회복력RCV(7), 속도SPD(8), 행운LUK(9), 찌르기(10),할퀴기(11),물기(12),치기(13),누르기(14), 명(20),암(21),수(22),화(23),풍(24),지(25), 진형(100)
    //action 아이템 동작 아이디변경(1), 홀장착(9), 장비강화(10), 스킬제거(11), 골드변경(99), 랜덤뽑기(100)
    //display 이미지번호
    //grade 레어등급 (1일반normal, 2매직magic, 3레어rare, 4에픽epic, 5유니크unique, 6레전드legend)
    //upgrade 증가된등급
    //set 셋트번호 0없음
    //hole 홀장착
    //enhance 강화
        {idx:0,part:1,grade:1,display:0,na:'나무투구',color:["#fff","#000"],price:100,txt:'나무로 만든 투구',eff:[{type:0,num:['2%','3%','5%']},{type:4,num:['50','50','50']}],set:0},
        {idx:1,part:1,grade:1,display:1,na:'철투구',color:["#fff","#000","#E2AE36"],price:200,txt:'철로 만든 투구',eff:[{type:0,num:['4%','5%','7%']},{type:4,num:['100','100','100']}],set:0},
        // {idx:1,part:2,grade:2,display:1,na:'나무갑옷',price:200,txt:'나무로 만든 갑옷',eff:[{type:0,num:['5%','6%','10%']},{type:4,num:['100','100','100']}],set:1},
        // {idx:2,part:5,grade:1,display:2,na:'나무벳지',price:200,txt:'나무로 만든 벳지',eff:[{type:8,num:['1%','2%','5%']}],set:1},
        // {idx:3,part:3,grade:2,display:3,na:'나무손톱',price:300,txt:'나무로 만든 <i el el0>치기</i>무기',eff:[{type:3,num:['50','55','60']}],set:1},
        // {idx:4,part:3,grade:1,display:4,na:'나무껍질',price:300,txt:'나무로 만든 껍질방어구',eff:[{type:22,num:['100','125','150']}],set:1},
        // {idx:6,part:2,grade:2,display:6,na:'철갑옷',price:400,txt:'철로 만든 갑옷',eff:[{type:0,num:['8%','9%','12%']},{type:4,num:['150','150','150']}],set:2},
        // {idx:7,part:5,grade:1,display:7,na:'철벳지',price:400,txt:'철로 만든 벳지',eff:[{type:8,num:['3%','4%','7%']}],set:2},
        // {idx:8,part:3,grade:2,display:8,na:'철손톱',price:500,txt:'철로 만든 <i el el0>치기</i>무기',eff:[{type:3,num:['70','75','80']}],set:2},
        // {idx:9,part:3,grade:1,display:9,na:'철제판',price:300,txt:'철로 만든 방어구',eff:[{type:4,num:['150','175','200']}],set:2},
        // {idx:9,part:3,grade:5,display:10,na:'김세존발톱',price:300,txt:'전설의 김세존의 새끼발톱',eff:[{type:4,num:['150','175','200']}],set:0},
        // {idx:9,part:3,grade:5,display:11,na:'김세존이빨',price:300,txt:'전설의 김세존의 어금니',eff:[{type:4,num:['150','175','200']}],set:0},
        // {idx:9,part:3,grade:5,display:12,na:'김세존부리',price:300,txt:'전설의 김세존의 부리',eff:[{type:4,num:['150','175','200']}],set:0},
    ],
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