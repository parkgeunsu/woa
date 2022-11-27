export const items = {
    slotModifier:{ko:['','사파이어의','에메랄드의','루비의','다이아몬드의'],en:['','Sapphire\'s','Emerald\'s','Ruby\'s','Diamond\'s']},
    markModifier:{ko:['','','두마리','세마리','네마리'],en:['','a','two','three','four']},
    item_point_light:['#ffdf8b','#00ff00','#d9e506','#ff00bf','#f00a36','#ed3b21','#ff6908','#ffc719','#ae9a64','#8ba753','#598c14','#dbe0e3','#fff','#FFD1D8','#FFFFD1','#FFE39B','#9CFFE6','#b0a696','#2dde98','#4a8594','#1fb3e0','#2e9df7'],
    item_point_dark:['#8e43e7','#52057f','#cd3292','#bf033b','#335238','#213e97','#003666','#051736','#706357'],
    item_point_color:['#8e43e7','#52057f','#cd3292','#ff00bf','#bf033b','#f00a36','#ed3b21','#ff6908','#ffc719','#ffdf8b','#d9e506','#ae9a64','#8ba753','#598c14','#335238','#2dde98','#00ff00','#4a8594','#1fb3e0','#2e9df7','#213e97','#003666','#051736','#706357','#b0a696','#dbe0e3','#fff','#FFD1D8','#FFFFD1','#FFE39B','#9CFFE6'],//아이템 포인트 컬러
    set_type:[//셋트아이템 효과
        //set_num 셋트갯수
        //part 부위
        {idx:0},
        {idx:1,na:{ko:'나무의 축복',en:''},part:[0,1,2,3,4],set_num:[5],eff:[{type:0,num:'500'}]},
        {idx:2,na:{ko:'철든 XX',en:''},part:[5,6,7,8,9],set_num:[5],eff:[{type:3,num:'100'},{type:0,num:'700'}]},
    ],
    colorant:{//색료조합 아이템
        2:[
            {idx:0,na:{ko:'흑백',en:'Black and white'},socket:['000','fff'],eff:[{type:5,num:['300']}],color:['#888'],svgColor:''},
        ],
        3:[],
        4:[
            {idx:0,na:{ko:'피로 물든',en:'Stained with Blood'},socket:['f00','f00','f00','f00'],eff:[{type:5,num:['300']}],color:['#f00'],svgColor:''},
            {idx:1,na:{ko:'채식주의자',en:'Vegetarian'},socket:['080','080','080','080'],eff:[{type:0,num:['1000']}],color:['#080'],svgColor:''}
        ],
        5:[
            {idx:0,na:{ko:'무지개',en:'Rainbow'},socket:['f00','f80','ff0','080','00f'],eff:[{type:5,num:['300']}],color:['#fff'],svgColor:'linear_rainbow'},
            {idx:1,na:{ko:'얼룩덜룩',en:'Mottled'},socket:['000','fff','000','fff','000'],eff:[{type:4,num:['300']}],color:['#000'],svgColor:'Mottled'},
        ],
    },
    equip:{//part 부위 head1, body2, weapon3, ring4, necklace5, baggage짐, 보석11, 업그레이드12, 기타13, 재료14
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
        1:[//모자
            [
                [//normal,magic,rare,epic
                    {idx:0,part:1,grade:1,display:0,na:{ko:'터번',en:'Turban'},kg:0.1,price:100,color:["#fff"],socket:2,txt:{ko:'머리에 둘둘 감고 다니는 천',en:'A cloth wrapped around one\'s head'},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','10']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],set:0},
                    {idx:1,part:1,grade:1,display:1,na:{ko:'두정투',en:'\'Doojung\' Helm'},kg:3,price:1000,color:["#fff","#e2ae37"],socket:3,txt:{ko:'頭釘鬪, 가죽에 옻칠을 한 투구',en:'頭釘鬪, A leather-lacquered helmet'},eff:[{type:4,num:['50','200']},{type:6,num:['50','250']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],set:0},
                    {idx:2,part:1,grade:1,display:10,na:{ko:'스컬 캡',en:'Skull Cap'},kg:3,price:500,color:["#fff"],socket:2,txt:{ko:'반구 형태의 철제 투구',en:'A hemispherical iron helmet'},eff:[{type:4,num:['50','100']},{type:6,num:['100','200']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true,false,true,true,true,true],set:0},
                    {idx:3,part:1,grade:1,display:2,na:{ko:'코니컬 헬름',en:'Conical Helm'},kg:5,price:500,color:["#fff"],socket:2,txt:{ko:'원뿔형태의 철제 투구',en:'A conical iron helmet'},eff:[{type:4,num:['100','150']},{type:6,num:['50','200']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,false,true,false,false,false,true,true,true,false,true,true,true,true],set:0},
                    {idx:4,part:1,grade:1,display:7,na:{ko:'풀 헬름',en:'Full Helm'},kg:7,price:700,color:["#fff"],socket:3,txt:{ko:'헬름을 강화시킨 투구',en:'A helmet reinforced with Helm'},eff:[{type:4,num:['150','250']},{type:6,num:['100','200']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,false,true,false,false,false,true,true,true,false,true,true,true,true],set:0},
                    {idx:5,part:1,grade:1,display:9,na:{ko:'본 헬름',en:'Bone Helm'},kg:6,price:700,color:["#fff"],socket:4,txt:{ko:'짐승의 뼈로 만든 투구',en:'A helmet made of animal bones'},eff:[{type:4,num:['100','300']},{type:6,num:['150','300']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,false,true,false,false,false,true,true,true,false,true,true,true,true],set:0},
                    {idx:6,part:1,grade:1,display:6,na:{ko:'헤럴드리 헬름',en:'Heraldry Helm'},kg:14,price:1500,color:["#fff"],socket:3,txt:{ko:'폐쇄형 강철 투구',en:'A closed steel helmet'},eff:[{type:4,num:['200','350']},{type:6,num:['200','300']}],actionType:"",requiredSlot:1,limit:[true,false,false,true,false,false,false,false,false,false,true,false,false,true,false,false,false],set:0},
                    {idx:7,part:1,grade:1,display:8,na:{ko:'그레이트 헬름',en:'Great Helm'},kg:25,price:2000,color:["#fff","#AF8C4F"],socket:4,txt:{ko:'우수한 방어효과 만큼 무거운 투구',en:'Helm as heavy as a good defense'},eff:[{type:4,num:['350','500']},{type:6,num:['200','350']}],actionType:"",requiredSlot:1,limit:[true,false,false,true,false,false,false,false,false,false,true,false,false,true,false,false,false],set:0},
                ],
                [//unique

                ],
                [//legend

                ]
            ]
            
            // {idx:6,part:1,grade:1,display:3,na:'코니컬 헬름II',kg:4,price:200,color:["#fff","#000"],socket:3,txt:'Conical Helm II 원뿔형태에서 변형시킨 투구',eff:[{type:4,num:['130','180']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true],set:0},
            // {idx:4,part:1,grade:1,display:5,na:'마스크드 헬름',kg:7,price:200,color:["#fff","#000"],socket:3,txt:'Masked helm 얼굴을 완벽히 보호되는 투구',eff:[{type:4,num:['150','300']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true],set:0},
        ],
        2:[//갑옷
            [
                [//normal,magic,rare,epic
                    {idx:0,part:2,grade:1,display:20,na:{ko:'클로스 클로시즈',en:'Cloth Clothes'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'천으로 만든 가벼운 옷, 천옷',en:'Light clothes made of cloth'},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],set:0},
                    {idx:1,part:2,grade:1,display:21,na:{ko:'퀄티드 아머',en:'Quiled Armor'},kg:5,price:300,color:["#FEC260"],socket:3,txt:{ko:'천을 기워 붙인 갑옷, 면갑',en:'A cloth armour'},eff:[{type:4,num:['50','100']},{type:6,num:['100','200']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],set:0},
                    {idx:2,part:2,grade:1,display:22,na:{ko:'하이드 아머',en:'Hide Armor'},kg:7,price:400,color:["#C16F2B"],socket:4,txt:{ko:'조끼형태의 가죽 갑옷',en:'Leather armor in the form of a vest'},eff:[{type:4,num:['30','120']},{type:6,num:['50','150']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,false,false,true,true,true,true,true,true,true,true,true],set:0},
                    {idx:3,part:2,grade:1,display:23,na:{ko:'레더 아머',en:'Lether Armor'},kg:10,price:500,color:["#C16F2B"],socket:3,txt:{ko:'가죽으로 만든 갑옷',en:'Armor made of leather'},eff:[{type:4,num:['50','150']},{type:6,num:['150','200']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,false,false,true,true,true,true,true,true,true,true,true],set:0},
                    {idx:4,part:2,grade:1,display:24,na:{ko:'스터디드 레더 아머',en:'Studded Lether Armor'},kg:5,price:700,color:["#E4AF51"],socket:3,txt:{ko:'징박힌 가죽 갑옷',en:'Armor covered with dozens of metal projections in leather'},eff:[{type:4,num:['100','200']},{type:6,num:['180','220']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,false,false,true,true,true,true,true,true,true,true,true],set:0},
                    {idx:5,part:2,grade:1,display:25,na:{ko:'링 메일',en:'Ring Mail'},kg:11,price:1000,color:["#fff"],socket:3,txt:{ko:'사슬 형태의 철제 갑옷',en:'A chain of iron armor'},eff:[{type:4,num:['150','250']},{type:6,num:['100','250']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,false,false,false,false,false,true,true,true,false,true,true,false,true],set:0},
                    {idx:6,part:2,grade:1,display:26,na:{ko:'스케일 메일',en:'Scale Mail'},kg:13,price:1500,color:["#E6E7E8"],socket:4,txt:{ko:'금속조각을 붙힌 갑옷, 어린갑',en:'A piece of metal armor'},eff:[{type:4,num:['170','270']},{type:6,num:['200','300']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,false,false,false,false,false,true,true,true,false,true,true,false,true],set:0},
                    {idx:7,part:2,grade:1,display:27,na:{ko:'체인 메일',en:'Chain Mail'},kg:15,price:1200,color:["#fff"],socket:3,txt:{ko:'메쉬형태로 금속링을 엮은 갑옷, 쇄자갑',en:''},eff:[{type:4,num:['200','300']},{type:6,num:['150','300']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,false,false,false,false,false,true,true,true,false,true,true,false,true],set:0},
                    {idx:8,part:2,grade:1,display:28,na:{ko:'스피린트 메일',en:'Splint Mail'},kg:17,price:1500,color:["#9B8579"],socket:4,txt:{ko:'천이나 가죽에 금속 스트립을 엮은 갑옷, 경번갑',en:'A mesh-type metal ring of armor'},eff:[{type:4,num:['250','400']},{type:6,num:['250','400']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,false,false,false,false,false,true,true,true,false,true,true,false,true],set:0},
                    {idx:9,part:2,grade:1,display:29,na:{ko:'브리간딘',en:'Brigandine'},kg:20,price:2000,color:["#D1D3D4"],socket:4,txt:{ko:'가죽 겉 감 안에 철판을 덧댄 갑옷, 두정갑',en:'Armor with iron plate inside leather cover'},eff:[{type:4,num:['300','450']},{type:6,num:['200','350']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,false,false,false,false,false,true,true,true,false,true,true,false,true],set:0},
                    {idx:10,part:2,grade:1,display:30,na:{ko:'플레이트 메일',en:'Plate Mail'},kg:27,price:3000,color:["#000"],socket:5,txt:{ko:'강철판으로 만든 갑옷, 판금갑',en:'Armor made of steel plates'},eff:[{type:4,num:['450','600']},{type:6,num:['300','400']}],actionType:"",requiredSlot:1,limit:[true,false,false,true,false,false,false,false,false,false,true,false,false,true,false,false,false],set:0},
                    {idx:11,part:2,grade:1,display:31,na:{ko:'풀 플레이트',en:'Full Plate'},kg:35,price:4000,color:["#fff"],socket:5,txt:{ko:'전신을 강철판으로 만든 갑옷, 판금갑',en:'Upgraded form of plate mail'},eff:[{type:4,num:['600','1000']},{type:6,num:['350','450']}],actionType:"",requiredSlot:1,limit:[true,false,false,true,false,false,false,false,false,false,true,false,false,true,false,false,false],set:0},
                ],
                [//unique

                ],
                [//legend

                ]
            ]
        ],
        3:[//무기
            [//단검0
                [//normal,magic,rare,epic
                    {idx:0,part:3,grade:1,display:100,na:{ko:'마키리',en:'Makiri'},kg:0.5,price:400,color:["#ffffff,#987E2E"],socket:2,txt:{ko:'아이누족의 전통적인 칼. 마키리 자체가 아이누어로 칼이라는 의미이다. 여성용은 메노코마키리(メノコマキリ)라고 하며, 메노코(メノコ)라는 단어가 아이누어로 여자를 의미한다.',en:''},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],actionType:[1],requiredSlot:1,limit:[true,true,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],set:0},
                    {idx:1,part:3,grade:1,display:101,na:{ko:'자마다르',en:'Jamadar'},kg:0.8,price:1000,color:["#ffffff","#FEE05F"],socket:3,txt:{ko:'인도에서 사용된 단검의 일종으로 서양권에 전파되어 서양에서는 자마다르를 \'카타르\'라 부름.'},eff:[{type:3,num:['100','200']},{type:5,num:['100','250']},{type:8,num:['1','10']}],actionType:[1],requiredSlot:1,limit:[true,true,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],set:0},
                    {idx:2,part:3,grade:1,display:102,na:{ko:'장도',en:'Self Defense Knife'},kg:0.2,price:2000,color:["#ffffff","#000000","#FFFFFF"],socket:4,txt:{ko:'칼집이 있는 작은 칼을 말하며, 허리춤에 차고 옷고름에 찬다 하여 패도(佩刀), 주머니에 넣고 다닌다 하여 낭도(囊刀)라고도 불렀다.',en:''},eff:[{type:3,num:['1','50']},{type:5,num:['200','400']},{type:8,num:['1','5']}],actionType:[0],requiredSlot:1,limit:[true,true,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],set:0},
                    {idx:3,part:3,grade:1,display:103,na:{ko:'탄토',en:'Dagger'},kg:0.4,price:500,color:["#ffffff","#FEBC12"],socket:2,txt:{ko:'탄토(短刀)란, 날 길이 1척(30, 3cm) 이하의 일본도의 총칭이다. 국내에서는 단도라고도 널리 불린다.',en:''},eff:[{type:3,num:['10','150']},{type:5,num:['150','200']},{type:8,num:['1','5']}],actionType:[1],requiredSlot:1,limit:[true,true,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],set:0},
                    {idx:4,part:3,grade:1,display:104,na:{ko:'카람빗',en:'Karambit'},kg:0.5,price:500,color:["#ffffff","#461422"],socket:2,txt:{ko:'말레이시아와 필리핀을 뿌리로 인도네시아 군도, 정확히는 술라웨시 서부에서 탄생한 유명한 다용도 나이프로 고대 원주민의 일상용 포켓나이프였다.',en:''},eff:[{type:3,num:['20','70']},{type:5,num:['150','250']},{type:8,num:['1','5']}],actionType:[1],requiredSlot:1,limit:[true,true,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],set:0},
                    {idx:5,part:3,grade:1,display:105,na:{ko:'쿠나이',en:'Kunai'},kg:0.5,price:500,color:["#ffffff","#27367A"],socket:1,txt:{ko:'닌자들이 사용했다고 알려진 무기. 성인 남성 손바닥만한 길이의 단검 손잡이 끝에 고리가 달린 형태를 하고 있다.',en:''},eff:[{type:3,num:['50','120']},{type:5,num:['1','350']},{type:8,num:['1','10']}],actionType:[5],requiredSlot:1,limit:[true,true,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],set:0},
                    {idx:6,part:3,grade:1,display:106,na:{ko:'쿠크리',en:'Kukri'},kg:1.2,price:600,color:["#ffffff","#FEBC12"],socket:3,txt:{ko:'네팔 구르카족의 전통 도검. Kukri가 가장 보편화되었지만 Khukri, Khukuri 등으로 적기도 한다.',en:''},eff:[{type:3,num:['120','240']},{type:5,num:['150','180']},{type:8,num:['1','5']}],actionType:[1],requiredSlot:1,limit:[true,true,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],set:0},
                    {idx:7,part:3,grade:1,display:107,na:{ko:'크리스',en:'Kris'},kg:0.7,price:600,color:["#ffffff","#814F20"],socket:3,txt:{ko:'기본적으로 말레이시아와 인도네시아 등지의 검으로, 물결처럼 구불구불한 모양의 특이한 날을 가진 도검.',en:''},eff:[{type:3,num:['30','130']},{type:5,num:['100','190']},{type:8,num:['1','5']}],actionType:[1],requiredSlot:1,limit:[true,true,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],set:0},
                    {idx:8,part:3,grade:1,display:138,na:{ko:'런들대거',en:'Rondel Dagger'},kg:0.5,price:500,color:["#ffffff","#FBB040","#754C29"],socket:2,txt:{ko:'중세 후기(14세기경 부근)에 기사와 중장병 계급이 흔히 쓰던 단검이다.',en:''},eff:[{type:3,num:['70','100']},{type:5,num:['180','260']},{type:8,num:['1','5']}],actionType:[0],requiredSlot:1,limit:[true,true,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],set:0},
                    {idx:9,part:3,grade:1,display:139,na:{ko:'망고슈',en:'Main-gauche'},kg:1,price:700,color:["#ffffff","#3C56A6","#FBB040"],socket:3,txt:{ko:'중세 후기에서 르네상스 시대에 사용하던 방어용 단검을 뜻한다.영국에서는 패링 대거(Parring Dagger)라고 불렀다.',en:''},eff:[{type:3,num:['150','200']},{type:5,num:['100','300']},{type:8,num:['1','5']}],actionType:[1],requiredSlot:1,limit:[true,true,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],set:0},
                    {idx:10,part:3,grade:1,display:140,na:{ko:'배즐러드',en:'Baselard'},kg:0.6,price:700,color:["#ffffff","#FBB040","#754C29"],socket:3,txt:{ko:'칼날 끝부분이 손잡이 끝부분과 마찬가지로 막대기 모향으로 평행을 이루는 단검.',en:''},eff:[{type:3,num:['50','120']},{type:5,num:['170','270']},{type:8,num:['1','5']}],actionType:[1],requiredSlot:1,limit:[true,true,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],set:0},
                    {idx:11,part:3,grade:1,display:141,na:{ko:'스틸레토',en:'Stiletto'},kg:0.5,price:1000,color:["#ffffff","#FBB040","#754C29"],socket:2,txt:{ko:'검신이 가늘고 길며 끝이 매우 뾰족하여 검이 갑옷의 틈새를 파고들어가 깊은 곳까지 관통할 수 있어서 찌르는 무기.',en:''},eff:[{type:3,num:['100','150']},{type:5,num:['250','250']},{type:8,num:['1','5']}],actionType:[0],requiredSlot:1,limit:[true,true,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],set:0},
                    {idx:12,part:3,grade:1,display:142,na:{ko:'페스카즈',en:'Persqabz'},kg:0.4,price:3000,color:["#FBB040","#FBB040","#754C29"],socket:4,txt:{ko:'페스카즈는 예리한 날을 갖추고 있으며 면도칼 같이 날카로운 느낌을 갖는 단검으로 알려져 있다.',en:''},eff:[{type:3,num:['100','100']},{type:5,num:['100','450']},{type:8,num:['1','5']}],actionType:[1],requiredSlot:1,limit:[true,true,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],set:0},
                ],
                [//unique

                ],
                [//legend

                ]
            ],
            [//검1
                [//normal,magic,rare,epic
                    {idx:0,part:3,grade:1,display:109,na:{ko:'일본도',en:'Japanese Sword'},kg:1,price:1500,color:["#ffffff", "#EE1C4E"],socket:3,txt:{ko:'타치(太刀)나 우치가타나(打刀) 등을 포함하는 일본의 전통 도검이다.',en:''},eff:[{type:3,num:['100','300']},{type:5,num:['100','200']}],actionType:[1],requiredSlot:1,limit:[true,false,true,true,true,true,false,true,true,true,true,true,false,true,true,true,false],set:0},
                    {idx:1,part:3,grade:1,display:110,na:{ko:'환도',en:'Military Sword'},kg:1,price:1500,color:["#ffffff", "#EE1C4E"],socket:3,txt:{ko:'한반도 지역 국가들의 전통 무기로, 고리를 사용하여 패용(佩用)하였던 도검(刀劍)들을 일컫는다.',en:''},eff:[{type:3,num:['150','250']},{type:5,num:['150','300']}],actionType:[1],requiredSlot:1,limit:[true,false,true,true,true,true,false,true,true,true,true,true,false,true,true,true,false],set:0},
                    {idx:2,part:3,grade:1,display:111,na:{ko:'환두대도',en:'Military Large Sword'},kg:1,price:2000,color:["#ffffff", "#FEBC12"],socket:4,txt:{ko:'대한민국 역사에서 가장 오랫동안 사용한 군사 도검이다.',en:''},eff:[{type:3,num:['250','250']},{type:5,num:['100','300']}],actionType:[1],requiredSlot:1,limit:[true,false,true,true,true,true,false,true,true,true,true,true,false,true,true,true,false],set:0},
                    {idx:3,part:3,grade:1,display:112,na:{ko:'글라디우스',en:'Gradius'},kg:1.5,price:800,color:["#ffffff", "#B39C31"],socket:2,txt:{ko:'글라디우스는 로마군의 대표적인 한손검이다. 로마군의 표준 제식 무장이자 주력 무기였다.',en:''},eff:[{type:3,num:['130','230']},{type:5,num:['50','150']}],actionType:[1],requiredSlot:1,limit:[true,false,true,true,true,true,false,true,true,true,true,true,false,true,true,true,false],set:0},
                    {idx:4,part:3,grade:1,display:113,na:{ko:'레이피어',en:'Rapier'},kg:1.8,price:1000,color:["#ffffff", "#A7A9AC"],socket:3,txt:{ko:'16~17세기 유럽에서 사용된 검으로 베기보다는 찌르기에 특화된 형태의 검.',en:''},eff:[{type:3,num:['150','200']},{type:5,num:['150','250']}],actionType:[0],requiredSlot:1,limit:[true,false,true,true,true,true,false,true,true,true,true,true,false,true,true,true,false],set:0},
                    {idx:5,part:3,grade:1,display:114,na:{ko:'세이버',en:'Sabre'},kg:1.3,price:900,color:["#ffffff", "#FBB040","#754C29"],socket:3,txt:{ko:'근대 유럽을 대표하는 기병용 장검. 주로 한손으로 쓰는 휘어진 외날도(刀)로 알려져 있다.',en:''},eff:[{type:3,num:['120','150']},{type:5,num:['100','150']}],actionType:[1],requiredSlot:1,limit:[true,false,true,true,true,true,false,true,true,true,true,true,false,true,true,true,false],set:0},
                    {idx:6,part:3,grade:1,display:115,na:{ko:'시미터',en:'Scimitar'},kg:1.5,price:900,color:["#ffffff", "#FBB040","#754C29"],socket:2,txt:{ko:'중동에서 기원한 곡도를 일컫는 말. 흔히 초승달처럼 휘어있는 곡률이 큰 중동제 곡도.',en:''},eff:[{type:3,num:['150','250']},{type:5,num:['120','240']}],actionType:[1],requiredSlot:1,limit:[true,false,true,true,true,true,false,true,true,true,true,true,false,true,true,true,false],set:0},
                    {idx:7,part:3,grade:1,display:116,na:{ko:'브로드소드',en:'Broad Sword'},kg:1.6,price:1000,color:["#ffffff", "#A5A4A4"],socket:2,txt:{ko:'중국의 도(刀, Dao)를 영어로 번역할 때 브로드소드라고 하는 경우도 종종 있다.',en:''},eff:[{type:3,num:['250','350']},{type:5,num:['1','100']}],actionType:[1],requiredSlot:1,limit:[true,false,true,true,true,true,false,true,true,true,true,true,false,true,true,true,false],set:0},
                    {idx:8,part:3,grade:1,display:117,na:{ko:'팔카타',en:'Falcata'},kg:1.8,price:1500,color:["#ffffff", "#FBB040","#754C29"],socket:3,txt:{ko:'그리스의 중장보병 호플리테스들이 즐겨 쓴 검.',en:''},eff:[{type:3,num:['200','250']},{type:5,num:['50','160']}],actionType:[1],requiredSlot:1,limit:[true,false,true,true,true,true,false,true,true,true,true,true,false,true,true,true,false],set:0},
                ],
                [//unique

                ],
                [//legend

                ]
            ],
            [//양손검2
                [//normal,magic,rare,epic
                    {idx:0,part:3,grade:1,display:108,na:{ko:'월도',en:'Moon Blade'},kg:2.5,price:1000,color:["#ffffff","#3C2415"],socket:5,txt:{ko:'월도(月刀)는 외날에 긴 자루를 가진 도(刀) 계열의 무기를 일컫는다.',en:''},eff:[{type:3,num:['200','300']},{type:5,num:['150','200']}],actionType:[1],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,true,false,true,false,false,false],set:0},
                    {idx:1,part:3,grade:1,display:124,na:{ko:'나기나타',en:'Oriental Glaive'},kg:3,price:1000,color:["#ffffff","#FBB040"],socket:4,txt:{ko:'일본 헤이안 시대부터 쓰이기 시작한 전근대 장병도(長柄刀) 계열 무기이며, 장병기의 일종이다.',en:''},eff:[{type:3,num:['250','350']},{type:5,num:['100','150']}],actionType:[1],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,true,false,true,false,false,false],set:0},
                    {idx:2,part:3,grade:1,display:131,na:{ko:'롱소드',en:'Long Sword'},kg:3,price:1000,color:["#ffffff"],socket:4,txt:{ko:'유럽에서 쓰인 양날 양손 도검이다.',en:''},eff:[{type:3,num:['250','350']},{type:5,num:['50','200']}],actionType:[1],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,true,false,true,false,false,false],set:0},
                    {idx:3,part:3,grade:1,display:132,na:{ko:'바스타드소드',en:'Bastard Sword'},kg:4,price:1500,color:["#ffffff"],socket:5,txt:{ko:'폭의 변화가 매우 큰(테이퍼진) 검신을 지닌 롱소드.',en:''},eff:[{type:3,num:['300','600']},{type:5,num:['10','100']}],actionType:[1],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,true,false,true,false,false,false],set:0},
                    {idx:4,part:3,grade:1,display:133,na:{ko:'그레이트소드',en:'Great Sword'},kg:4,price:1500,color:["#ffffff","#831529"],socket:4,txt:{ko:'그레이트소드는 말 그대로 대검이라는 의미. 대검이라는 것 외에 단어가 특정짓는 특징은 없다.',en:''},eff:[{type:3,num:['250','550']},{type:5,num:['10','120']}],actionType:[1],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,true,false,true,false,false,false],set:0},
                    {idx:5,part:3,grade:1,display:134,na:{ko:'익시큐셔너소드',en:'Executioner Sword'},kg:5,price:1700,color:["#ffffff","#FBB040","#754C29"],socket:5,txt:{ko:'이름 그대로 사형집행인들이 죄인을 참수형에 처할때 쓰기 위해 특별히 만들어진 도검이다.',en:''},eff:[{type:3,num:['300','500']}],actionType:[1],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,true,false,true,false,false,false],set:0},
                    {idx:6,part:3,grade:1,display:135,na:{ko:'츠바이헨더',en:'Zweihänder'},kg:7,price:3000,color:["#ffffff","#FBB040","#754C29"],socket:6,txt:{ko:'르네상스 시대, 16세기경에 주로 사용된 독일제 트루 투핸더를 말한다.',en:''},eff:[{type:3,num:['300','700']},{type:5,num:['10','150']}],actionType:[1],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,true,false,true,false,false,false],set:0},
                    {idx:7,part:3,grade:1,display:136,na:{ko:'클레이모어',en:'Claymore'},kg:5.5,price:2500,color:["#ffffff","#831529"],socket:5,txt:{ko:'15세기에서 17세기까지 스코틀랜드의 하이랜더들이 사용한 것으로 유명하다.',en:''},eff:[{type:3,num:['350','450']},{type:5,num:['10','250']}],actionType:[1],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,true,false,true,false,false,false],set:0},
                    {idx:8,part:3,grade:1,display:137,na:{ko:'플랑베르주',en:'Flamberge'},kg:4.5,price:2500,color:["#ffffff","#FCEE22"],socket:6,txt:{ko:'서양의 도검류 중 한 종류로, 물결치는 형태의 날을 가진 검이다.',en:''},eff:[{type:3,num:['400','600']},{type:5,num:['10','200']}],actionType:[1],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,true,false,true,false,false,false],set:0},
                ],
                [//unique

                ],
                [//legend

                ]
            ],
            [//둔기3
                [//normal,magic,rare,epic
                    {idx:0,part:3,grade:1,display:118,na:{ko:'편',en:'Whip'},kg:1.5,price:700,color:["#603913"],socket:3,txt:{ko:'중국의 병장기. 간혹 簡이라고 쓰기도 한다.',en:''},eff:[{type:3,num:['200','300']},{type:5,num:['150','150']}],actionType:[3],requiredSlot:1,limit:[true,true,true,true,false,false,true,false,true,false,true,true,true,true,true,true,true],set:0},
                    {idx:1,part:3,grade:1,display:119,na:{ko:'철편',en:'Bull Whip'},kg:2.5,price:800,color:["#603913"],socket:3,txt:{ko:'철편(鐵鞭)은 회초리와 비슷하게 생긴 타격 무기의 일종이다.',en:''},eff:[{type:3,num:['300','400']},{type:5,num:['200','200']}],actionType:[3],requiredSlot:1,limit:[true,true,true,true,false,false,true,false,true,false,true,true,true,true,true,true,true],set:0},
                    {idx:2,part:3,grade:1,display:120,na:{ko:'금쇄봉',en:'Gold Mace'},kg:3,price:1000,color:["#603913"],socket:4,txt:{ko:'중세 일본의 철퇴 중 하나. 카나사이보라고 읽으며, 테츠보(鉄棒), 혹은 카나보(金棒)라고도 불린다.',en:''},eff:[{type:3,num:['300','500']},{type:5,num:['300','300']}],actionType:[3],requiredSlot:1,limit:[true,true,true,true,false,false,true,false,true,false,true,true,true,true,true,true,true],set:0},
                    {idx:3,part:3,grade:1,display:121,na:{ko:'철퇴',en:'Mace'},kg:3,price:1200,color:["#ffffff"],socket:4,txt:{ko:'철퇴(鐵槌)는 병장기의 하나로, 막대끝에 돌기나 무게추가 달려있어 한손으로 휘두를 수 있는 몽둥이다.',en:''},eff:[{type:3,num:['200','400']},{type:5,num:['250','350']}],actionType:[3],requiredSlot:1,limit:[true,true,true,true,false,false,true,false,true,false,true,true,true,true,true,true,true],set:0},
                    {idx:4,part:3,grade:1,display:144,na:{ko:'워해머',en:'War Hammer'},kg:3.5,price:2000,color:["#ffffff"],socket:6,txt:{ko:'전투용으로 쓰이는 무거운 망치.',en:''},eff:[{type:3,num:['500','550']},{type:5,num:['100','300']}],actionType:[3],requiredSlot:2,limit:[true,true,true,true,false,false,true,false,true,false,true,true,true,true,true,true,true],set:0},
                ],
                [//unique

                ],
                [//legend

                ]
            ],
            [//창4
                [//normal,magic,rare,epic
                    {idx:0,part:3,grade:1,display:123,na:{ko:'극',en:'Oriental Polearm'},kg:3.5,price:1500,color:["#ffffff"],socket:5,txt:{ko:'戟. 중국의 고대 폴암으로 긴 손잡이 끝에 단검이 붙었고 그보다 조금 밑에 보조날이 달린 무기.',en:''},eff:[{type:3,num:['100','450']},{type:5,num:['450','450']}],actionType:[0],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,false,true,true,true,false,false],set:0},
                    {idx:1,part:3,grade:1,display:145,na:{ko:'랜스',en:'Lance'},kg:4,price:1200,color:["#ffffff","#BCBEC0"],socket:6,txt:{ko:'거대한 원뿔형태를 한 창으로, 손으로 겨누고 겨드랑이로 고정할 수 있도록 뒷부분이 짧게 설계되어 있다.',en:''},eff:[{type:3,num:['50','500']},{type:5,num:['500','500']}],actionType:[0],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,false,true,true,true,false,false],set:0},
                    {idx:2,part:3,grade:1,display:160,na:{ko:'파이크',en:'Pike'},kg:5,price:1500,color:["#ffffff"],socket:6,txt:{ko:'적을 위협하는데 효과적인 수단의 나뭇잎 모양 창.',en:''},eff:[{type:3,num:['100','550']},{type:5,num:['650','650']}],actionType:[0],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,false,true,true,true,false,false],set:0},
                    {idx:3,part:3,grade:1,display:148,na:{ko:'빌',en:'Bill'},kg:3,price:1300,color:["#ffffff"],socket:4,txt:{ko:'유럽에서 사용하던 것으로 농기구에서 먼저 발전해 전쟁사에 이름이 등장하며 영국에서는 ‘무기를 들고 일어서라’라는 의미인 ‘활과 창’을 의미한다.',en:''},eff:[{type:3,num:['50','400']},{type:5,num:['400','400']}],actionType:[0],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,false,true,true,true,false,false],set:0},
                    {idx:4,part:3,grade:1,display:149,na:{ko:'파르티잔',en:'Partisan'},kg:2.5,price:1000,color:["#ffffff"],socket:5,txt:{ko:'날의 평평한 부분에는 조각이나 투각같은 장식이 새겨져 있고 사용자의 상황에 따라 베고 찌를수 있도록 디자인이 되었다.',en:''},eff:[{type:3,num:['10','450']},{type:5,num:['450','450']},{type:9,num:['1','10']}],actionType:[0],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,false,true,true,true,false,false],set:0},
                    {idx:5,part:3,grade:1,display:150,na:{ko:'스피툼',en:'Spetum'},kg:2.5,price:1000,color:["#ffffff"],socket:5,txt:{ko:'파르티잔의 한 종류로 창날 밑동에 칼날을 세운 날개 두 개가 튀어나온 형태이다.',en:''},eff:[{type:3,num:['10','450']},{type:5,num:['450','450']},{type:8,num:['1','10']}],actionType:[0],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,false,true,true,true,false,false],set:0},
                    {idx:6,part:3,grade:1,display:151,na:{ko:'워사이드',en:'War Scythe'},kg:2.2,price:1000,color:["#ffffff"],socket:5,txt:{ko:'대낫이 개량되어 전투에 적합한 형태가 된 것이 서양의 폴암 중 하나인 워 사이드.',en:''},eff:[{type:3,num:['100','400']},{type:5,num:['450','450']}],actionType:[1],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,false,true,true,true,false,false],set:0},
                ],
                [//unique
                    [],
                    [
                        {idx:0,part:3,grade:5,display:400,na:{ko:'죽창',en:'Oriental Glaive'},kg:0.5,price:2000,color:[],socket:1,txt:{ko:'죽창(竹槍)은 대나무로 만든 창을 말한다. 대창이라고도 불린다.',en:''},eff:[{type:3,num:['200','300']}],actionType:[0],requiredSlot:2,limit:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],set:0},
                    ],
                    [
                        {idx:2,part:3,grade:5,display:401,na:{ko:'당파',en:'Oriental Glaive'},kg:3,price:2000,color:[],socket:3,txt:{ko:'무기의 일종, 삼지창처럼 생겼으나 좌우의 가지 부분이 옆으로 갈라지는 형태로 생겼다.',en:''},eff:[{type:4,num:['333','333']},{type:4,num:['333','333']}],actionType:[0],requiredSlot:2,limit:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],set:0},
                    ],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                ],
                [//legend

                ]
            ],
            [//도끼5
                [//normal,magic,rare,epic
                    {idx:0,part:3,grade:1,display:161,na:{ko:'토마호크',en:'Tomahawk'},kg:0.5,price:500,color:["#ffffff"],socket:2,txt:{ko:'아메리카 원주민의 전통적인 도끼.',en:''},eff:[{type:3,num:['100','150']},{type:5,num:['100','150']}],actionType:[2],requiredSlot:1,limit:[true,true,false,true,false,true,false,false,false,false,true,true,true,true,true,true,true],set:0},
                    {idx:1,part:3,grade:1,display:143,na:{ko:'배틀액스',en:'Battle Axe'},kg:4,price:1500,color:["#ffffff"],socket:6,txt:{ko:'도구인 도끼를 인마살상용 전쟁무기로 개량한 무기로 도끼날이 얇고 예각인 것이 특징이다.',en:''},eff:[{type:3,num:['400','500']},{type:5,num:['200','300']}],actionType:[2],requiredSlot:2,limit:[true,true,false,true,false,true,false,false,false,false,true,true,true,true,true,true,true],set:0},
                    {idx:2,part:3,grade:1,display:147,na:{ko:'버디슈',en:'Berdysh'},kg:5,price:2000,color:["#ffffff"],socket:6,txt:{ko:'긴 자루 끝에 초승달 모양의 도끼날을 달아둔 형상의 무기.',en:''},eff:[{type:3,num:['200','500']},{type:5,num:['200','400']}],actionType:[2],requiredSlot:2,limit:[true,true,false,true,false,true,false,false,false,false,true,true,true,true,true,true,true],set:0},
                    {idx:3,part:3,grade:1,display:146,na:{ko:'할버드',en:'Halberd'},kg:3.5,price:1500,color:["#ffffff"],socket:6,txt:{ko:'장대에 단검과 도끼와 끌개가 함께 부착된 무기. ',en:''},eff:[{type:3,num:['100','500']},{type:5,num:['150','300']}],actionType:[2],requiredSlot:2,limit:[true,true,false,true,false,true,false,false,false,false,true,true,true,true,true,true,true],set:0},
                ],
                [//unique
                ],
                [//legend
                ]
            ],
            [//활6
                [//normal,magic,rare,epic
                    {idx:0,part:3,grade:1,display:126,na:{ko:'수리검',en:'Shuriken'},kg:0.5,price:300,color:["#BCBEC0","#000000"],socket:2,txt:{ko:'던져서 적을 맞히는 것을 목적으로 하는 표창 계열의 무기.',en:''},eff:[{type:3,num:['10','130']}],actionType:[5],requiredSlot:1,limit:[true,false,false,false,false,false,false,true,true,true,true,true,true,true,false,false,false],set:0},
                    {idx:1,part:3,grade:1,display:127,na:{ko:'궁',en:'Short Bow'},kg:1.2,price:900,color:["#70C169","#FBA919"],socket:5,txt:{ko:'화살을 먼거리로 보내기위한 도구, 원거리 무기',en:''},eff:[{type:3,num:['100','350']}],actionType:[5],requiredSlot:2,limit:[true,false,false,false,false,false,false,true,true,true,true,true,false,true,false,false,true],set:0},
                    {idx:2,part:3,grade:1,display:128,na:{ko:'장궁',en:'Long Bow'},kg:2,price:1200,color:["#ED1F24","#FBA919"],socket:6,txt:{ko:'궁(활)보다 크기가 큰 원거리 무기',en:''},eff:[{type:3,num:['200','490']}],actionType:[5],requiredSlot:2,limit:[true,false,false,false,false,false,false,true,true,true,true,true,false,true,false,false,true],set:0},
                    {idx:3,part:3,grade:1,display:129,na:{ko:'석궁',en:'Crossbow'},kg:2.2,price:1200,color:["#A76928","#991B1E","#FBA919"],socket:6,txt:{ko:'활과 유사한 대표적인 발사 무기. 옛 한국에서는 쇠뇌라고 불렀다.',en:''},eff:[{type:3,num:['100','550']}],actionType:[5],requiredSlot:2,limit:[true,false,false,false,false,false,false,true,true,true,true,true,false,true,false,false,true],set:0},
                    {idx:4,part:3,grade:1,display:130,na:{ko:'철선',en:'Iron Fan'},kg:0.3,price:500,color:["#ffffff"],socket:4,txt:{ko:'Iron Fan. War Fan. 쇠로 만든 부채. 믿기 어렵겠지만 무기이다.',en:''},eff:[{type:3,num:['1','111']}],actionType:[5],requiredSlot:1,limit:[true,false,false,false,false,false,false,true,true,true,true,true,true,true,false,false,false],set:0},
                ],
                [//unique
                ],
                [//legend
                ]
            ],
            [//타격7
                [//normal,magic,rare,epic
                    {idx:0,part:3,grade:1,display:122,na:{ko:'톤파',en:'Tonfa'},kg:1,price:500,color:["#F7941E"],socket:3,txt:{ko:'중국 拐(괴) 단봉형 무기가 오키나와에 와서 변형되어 오키나와에서 유래한 날없는 타격 무기다.',en:''},eff:[{type:3,num:['100','200']},{type:5,num:['100','200']}],actionType:[3],requiredSlot:1,limit:[true,false,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],set:0},
                    {idx:1,part:3,grade:1,display:125,na:{ko:'차크람',en:'Chakram'},kg:1.2,price:700,color:["#ffffff"],socket:4,txt:{ko:'시크교 신도의 전통 투척 무기, 산스크리트어로 \'둥근\', \'원\', \'바퀴\' 등을 뜻하는 차크라에서 유래하였다.',en:''},eff:[{type:3,num:['50','250']},{type:5,num:['50','250']}],actionType:[1],requiredSlot:1,limit:[true,false,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],set:0},
                    {idx:2,part:3,grade:1,display:159,na:{ko:'너클',en:'Knuckle'},kg:0.5,price:500,color:["#939598","#000000"],socket:4,txt:{ko:'뾰족한 돌기가 있는 금속의 맨손무기.',en:''},eff:[{type:3,num:['50','150']},{type:5,num:['50','150']}],actionType:[3],requiredSlot:1,limit:[true,false,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],set:0},
                ],
                [//unique
                ],
                [//legend
                ]
            ],
            [//방패8
                [//normal,magic,rare,epic
                    {idx:0,part:3,grade:1,display:152,na:{ko:'버클러',en:'Buckler'},kg:1,price:500,color:["#ffffff","#58595B"],socket:2,txt:{ko:'직경 또는 둘레가 30cm정도 되는 원형, 사각형 소형 방패.',en:''},eff:[{type:4,num:['50','150']},{type:6,num:['50','100']}],actionType:"",requiredSlot:1,limit:[true,true,false,true,true,false,true,true,true,true,true,true,false,true,false,true,true],set:0},
                    {idx:1,part:3,grade:1,display:153,na:{ko:'타지',en:'Targa'},kg:0.7,price:800,color:["#603913","#FBB040"],socket:2,txt:{ko:'직경 또는 둘레가 30cm정도 되는 원형, 사각형 소형 방패.',en:''},eff:[{type:4,num:['50','100']},{type:6,num:['50','150']}],actionType:"",requiredSlot:1,limit:[true,true,false,true,true,false,true,true,true,true,true,true,false,true,false,true,true],set:0},
                    {idx:2,part:3,grade:1,display:154,na:{ko:'라운드실드',en:'Round Shield'},kg:1.5,price:1000,color:["#ffffff","#000000","#ED1C24"],socket:3,txt:{ko:'고대부터 사용된 원형형태의 방패.',en:''},eff:[{type:4,num:['100','250']},{type:6,num:['100','150']}],actionType:"",requiredSlot:1,limit:[true,true,false,true,true,false,true,true,true,true,true,true,false,true,false,true,true],set:0},
                    {idx:3,part:3,grade:1,display:155,na:{ko:'카이트실드',en:'Kite Shield'},kg:1,price:1000,color:["#603913","#FBB040"],socket:3,txt:{ko:'중세 초기에 유럽 각지에서 사용한 가오리연과 비슷하게 생긴 방패.',en:''},eff:[{type:4,num:['100','200']},{type:6,num:['150','200']}],actionType:"",requiredSlot:1,limit:[true,true,false,true,true,false,true,true,true,true,true,true,false,true,false,true,true],set:0},
                    {idx:4,part:3,grade:1,display:156,na:{ko:'히터실드',en:'Heater Shield'},kg:6.5,price:1200,color:["#3F6731","#EE1C4E","#FEEB00"],socket:4,txt:{ko:'10세기 중엽부터 등장한 외형은 카이트 실드의 위아래를 짧게 자른듯한 축소형 중세 유럽의 방패.',en:''},eff:[{type:4,num:['200','300']},{type:6,num:['150','200']}],actionType:"",requiredSlot:1,limit:[true,true,false,true,true,false,true,true,true,true,true,true,false,true,false,true,true],set:0},
                    {idx:5,part:3,grade:1,display:157,na:{ko:'스쿠툼',en:'Scutum'},kg:8,price:1500,color:["#939598","#000000"],socket:4,txt:{ko:'목제 방패로, 타원형과 직사각형 모양의 로마군이 장비한 제식 방패.',en:''},eff:[{type:4,num:['300','400']},{type:6,num:['200','300']}],actionType:"",requiredSlot:1,limit:[true,true,false,true,true,false,true,true,true,true,true,true,false,true,false,true,true],set:0},
                    {idx:6,part:3,grade:1,display:158,na:{ko:'파비스',en:'Pavise'},kg:8,price:1500,color:["#939598","#000000","#19469B"],socket:4,txt:{ko:'중세 유럽의 전쟁에서 궁병이나 쇠뇌병들이 사용한 대형방패.',en:''},eff:[{type:4,num:['200','350']},{type:6,num:['200','350']}],actionType:"",requiredSlot:1,limit:[true,true,false,true,true,false,true,true,true,true,true,true,false,true,false,true,true],set:0},
                ],
                [//unique
                ],
                [//legend
                ]
            ],
        ],
        4:[//반지
            [
                [//normal,magic,rare,epic
                    {idx:0,part:4,grade:1,display:501,na:{ko:'반지',en:'Ring'},kg:0.1,price:1000,color:["#F9B919"],socket:1,txt:{ko:'손가락에 끼는 악세사리.',en:''},eff:[],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],set:0},
                    {idx:1,part:4,grade:1,display:502,na:{ko:'진주반지',en:'Pearl Ring'},kg:0.1,price:1000,color:["#F9B919","#000000"],socket:1,txt:{ko:'손가락에 끼우는 악세사리. 진주로 장식되어 있음',en:''},eff:[],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],set:0},
                ],
                [//unique
                ],
                [//legend
                ]
            ],
        ],
        5:[//목걸이
            [
                [//normal,magic,rare,epic
                    {idx:0,part:5,grade:1,display:551,na:{ko:'목걸이',en:'Necklace'},kg:0.1,price:1000,color:["#F9B919","#ffffff"],socket:1,txt:{ko:'목에 착용하는 악세사리.',en:''},eff:[],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],set:0},
                    {idx:1,part:5,grade:1,display:552,na:{ko:'진주 목걸이',en:'Pearl Necklace'},kg:0.1,price:1000,color:["#ffffff","#F9B919"],socket:1,txt:{ko:'목에 착용하는 악세사리.',en:''},eff:[],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],set:0},
                ],
                [//unique
                ],
                [//legend
                ]
            ],
        ],
    },
    hole:[//홀 장착 아이템
        //type 장착 타입
        //stone 아이템창 색상
        {idx:0,grade:0,imgCate:'itemHole',display:0,na:'',color:'transparent',kg:0,price:0,action:9,eff:[]},
        {idx:1,grade:3,imgCate:'itemHole',display:1,na:{ko:'큰 다이아몬드',en:''},colorSet:'fff',color:'rgba(255,255,255,.8)',kg:0.1,price:100,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:4,num:['30']}]},//
        {idx:2,grade:2,imgCate:'itemHole',display:2,na:{ko:'다이아몬드',en:''},colorSet:'fff',color:'rgba(255,255,255,.6)',kg:0.2,price:200,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:4,num:['20']}]},
        {idx:3,grade:1,imgCate:'itemHole',display:3,na:{ko:'작은 다이아몬드',en:''},colorSet:'fff',color:'rgba(255,255,255,.4)',kg:0.4,price:400,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:4,num:['10']}]},
        {idx:4,grade:3,imgCate:'itemHole',display:4,na:{ko:'큰 에메랄드',en:''},colorSet:'0f0',color:'rgba(0,255,0,.8)',kg:0.7,price:1000,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:0,num:['30']}]},
        {idx:5,grade:2,imgCate:'itemHole',display:5,na:{ko:'에메랄드',en:''},colorSet:'0f0',color:'rgba(0,255,0,.6)',kg:0.1,price:100,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:0,num:['20']}]},//HP
        {idx:6,grade:1,imgCate:'itemHole',display:6,na:{ko:'작은 에메랄드',en:''},colorSet:'0f0',color:'rgba(0,255,0,.4)',kg:0.2,price:200,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:0,num:['10']}]},
        {idx:7,grade:3,imgCate:'itemHole',display:7,na:{ko:'큰 토파즈',en:''},colorSet:'ff0',color:'rgba(255,255,0,.8)',kg:0.4,price:400,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:6,num:['30']}]},
        {idx:8,grade:2,imgCate:'itemHole',display:8,na:{ko:'토파즈',en:''},colorSet:'ff0',color:'rgba(255,255,0,.6)',kg:0.7,price:1000,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:6,num:['20']}]},
        {idx:9,grade:1,imgCate:'itemHole',display:9,na:{ko:'작은 토파즈',en:''},colorSet:'ff0',color:'rgba(255,255,0,.4)',kg:0.1,price:100,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:6,num:['10']}]},//공
        {idx:10,grade:3,imgCate:'itemHole',display:10,na:{ko:'큰 루비',en:''},colorSet:'f00',color:'rgba(255,0,0,.8)',kg:0.2,price:200,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:3,num:['30']}]},
        {idx:11,grade:2,imgCate:'itemHole',display:11,na:{ko:'루비',en:''},colorSet:'f00',color:'rgba(255,0,0,.6)',kg:0.4,price:400,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:3,num:['20']}]},
        {idx:12,grade:1,imgCate:'itemHole',display:12,na:{ko:'작은 루비',en:''},colorSet:'f00',color:'rgba(255,0,0,.4)',kg:0.7,price:1000,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:3,num:['10']}]},
        {idx:13,grade:3,imgCate:'itemHole',display:13,na:{ko:'큰 자수정',en:''},colorSet:'f0f',color:'rgba(255,0,255,.8)',kg:0.1,price:100,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:5,num:['30']}]},//방
        {idx:14,grade:2,imgCate:'itemHole',display:14,na:{ko:'자수정',en:''},colorSet:'f0f',color:'rgba(255,0,255,.6)',kg:0.2,price:200,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:5,num:['20']}]},
        {idx:15,grade:1,imgCate:'itemHole',display:15,na:{ko:'작은 자수정',en:''},colorSet:'f0f',color:'rgba(255,0,255,.4)',kg:0.4,price:400,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:5,num:['10']}]},'','','','','',
        '','','','','','','','','','',
        '','','','','','','','','','',
        '','','','','','','','','','',
        '','','','','','','','','','',
        '','','','','','','','','','',
        '','','','','','','','','','',
        '','','','','','','','','','',
        '','','','','','','','','',
        {idx:100,grade:2,imgCate:'itemHole',display:100,na:{ko:'빈 염료병',en:''},kg:0.05,price:1000,txt:{ko:'염료를 소분할때 사용 ',en:''},colorSet:'transparent',color:'rgba(255,255,255,0)',size:0,eff:[{type:21,num:['3']}]},
        {idx:101,grade:2,imgCate:'itemHole',display:101,na:{ko:'작은 백 염료',en:''},kg:0.1,price:1000,txt:{ko:'작은 백색 염료 ',en:''},colorSet:'fff',color:'rgba(255,255,255,.4)',size:0,eff:[{type:21,num:['3']}]},
        {idx:102,grade:2,imgCate:'itemHole',display:102,na:{ko:'작은 흑 염료',en:''},kg:0.1,price:1000,txt:{ko:'작은 흑색 염료 ',en:''},colorSet:'000',color:'rgba(0,0,0,.4)',size:0,eff:[{type:22,num:['3']}]},
        {idx:103,grade:2,imgCate:'itemHole',display:103,na:{ko:'작은 청록 염료',en:''},kg:0.1,price:1000,txt:{ko:'작은 청록색 염료 ',en:''},colorSet:'088',color:'rgba(0,137,137,.4)',size:0,eff:[{type:0,num:['25']}]},
        {idx:104,grade:2,imgCate:'itemHole',display:104,na:{ko:'작은 카키 염료',en:''},kg:0.1,price:1000,txt:{ko:'작은 카키색 염료 ',en:''},colorSet:'880',color:'rgba(137,137,0,.4)',size:0,eff:[{type:21,num:['1']},{type:22,num:['1']}]},
        {idx:105,grade:2,imgCate:'itemHole',display:105,na:{ko:'작은 하늘 염료',en:''},kg:0.1,price:1000,txt:{ko:'작은 하늘색 염료 ',en:''},colorSet:'0ff',color:'rgba(0,255,255,.4)',size:0,eff:[{type:25,num:['3']}]},
        {idx:106,grade:2,imgCate:'itemHole',display:106,na:{ko:'작은 분홍 염료',en:''},kg:0.1,price:1000,txt:{ko:'작은 분홍색 염료 ',en:''},colorSet:'f0f',color:'rgba(255,0,255,.4)',size:0,eff:[{type:23,num:['1']},{type:24,num:['1']},{type:25,num:['1']},{type:26,num:['1']}]},
        {idx:107,grade:2,imgCate:'itemHole',display:107,na:{ko:'작은 자주 염료',en:''},kg:0.1,price:1000,txt:{ko:'작은 자주색 염료 ',en:''},colorSet:'808',color:'rgba(137,0,137,.4)',size:0,eff:[{type:8,num:['3']}]},
        {idx:108,grade:2,imgCate:'itemHole',display:108,na:{ko:'작은 녹 염료',en:''},kg:0.1,price:1000,txt:{ko:'작은 녹색색 염료 ',en:''},colorSet:'080',color:'rgba(0,137,0,.4)',size:0,eff:[{type:4,num:['15']}]},
        {idx:109,grade:2,imgCate:'itemHole',display:109,na:{ko:'작은 연두 염료',en:''},kg:0.1,price:1000,txt:{ko:'작은 연두색 염료 ',en:''},colorSet:'0f0',color:'rgba(0,255,0,.4)',size:0,eff:[{type:26,num:['3']}]},
        {idx:110,grade:2,imgCate:'itemHole',display:110,na:{ko:'작은 노랑 염료',en:''},kg:0.1,price:1000,txt:{ko:'작은 노랑색 염료 ',en:''},colorSet:'ff0',color:'rgba(255,255,0,.4)',size:0,eff:[{type:9,num:['3']}]},
        {idx:111,grade:2,imgCate:'itemHole',display:111,na:{ko:'작은 주황 염료',en:''},kg:0.1,price:1000,txt:{ko:'작은 주황색 염료 ',en:''},colorSet:'f80',color:'rgba(255,137,0,.4)',size:0,eff:[{type:3,num:['15']}]},
        {idx:112,grade:2,imgCate:'itemHole',display:112,na:{ko:'작은 빨강 염료',en:''},kg:0.1,price:1000,txt:{ko:'작은 빨강색 염료 ',en:''},colorSet:'f00',color:'rgba(255,0,0,.4)',size:0,eff:[{type:24,num:['3']}]},
        {idx:113,grade:2,imgCate:'itemHole',display:113,na:{ko:'작은 보라 염료',en:''},kg:0.1,price:1000,txt:{ko:'작은 보라색 염료 ',en:''},colorSet:'80f',color:'rgba(137,0,255,.4)',size:0,eff:[{type:6,num:['15']}]},
        {idx:114,grade:2,imgCate:'itemHole',display:114,na:{ko:'작은 파랑 염료',en:''},kg:0.1,price:1000,txt:{ko:'작은 파랑색 염료 ',en:''},colorSet:'00f',color:'rgba(0,0,255,.4)',size:0,eff:[{type:23,num:['3']}]},
        {idx:115,grade:2,imgCate:'itemHole',display:115,na:{ko:'작은 군청 염료',en:''},kg:0.1,price:1000,txt:{ko:'작은 군청색 염료 ',en:''},colorSet:'008',color:'rgba(0,0,137,.4)',size:0,eff:[{type:5,num:['15']}]},
        '','','','','',
        {idx:121,grade:3,imgCate:'itemHole',display:121,na:{ko:'백 염료',en:''},kg:0.1,price:1000,txt:{ko:'백색 염료 ',en:''},colorSet:'fff',color:'rgba(255,255,255,.6)',size:1,eff:[{type:21,num:['7']}]},
        {idx:122,grade:3,imgCate:'itemHole',display:122,na:{ko:'흑 염료',en:''},kg:0.1,price:1000,txt:{ko:'흑색 염료 ',en:''},colorSet:'000',color:'rgba(0,0,0,.6)',size:1,eff:[{type:22,num:['7']}]},
        {idx:123,grade:3,imgCate:'itemHole',display:123,na:{ko:'청록 염료',en:''},kg:0.1,price:1000,txt:{ko:'청록색 염료 ',en:''},colorSet:'088',color:'rgba(0,137,137,.6)',size:1,eff:[{type:0,num:['50']}]},
        {idx:124,grade:3,imgCate:'itemHole',display:124,na:{ko:'카키 염료',en:''},kg:0.1,price:1000,txt:{ko:'카키색 염료 ',en:''},colorSet:'880',color:'rgba(137,137,0,.6)',size:1,eff:[{type:21,num:['2']},{type:22,num:['2']}]},
        {idx:125,grade:3,imgCate:'itemHole',display:125,na:{ko:'하늘 염료',en:''},kg:0.1,price:1000,txt:{ko:'하늘색 염료 ',en:''},colorSet:'0ff',color:'rgba(0,255,255,.6)',size:1,eff:[{type:25,num:['7']}]},
        {idx:126,grade:3,imgCate:'itemHole',display:126,na:{ko:'분홍 염료',en:''},kg:0.1,price:1000,txt:{ko:'분홍색 염료 ',en:''},colorSet:'f0f',color:'rgba(255,0,255,.6)',size:1,eff:[{type:23,num:['2']},{type:24,num:['2']},{type:25,num:['2']},{type:26,num:['2']}]},
        {idx:127,grade:3,imgCate:'itemHole',display:127,na:{ko:'자주 염료',en:''},kg:0.1,price:1000,txt:{ko:'자주색 염료 ',en:''},colorSet:'808',color:'rgba(137,0,137,.6)',size:1,eff:[{type:8,num:['7']}]},
        {idx:128,grade:3,imgCate:'itemHole',display:128,na:{ko:'녹 염료',en:''},kg:0.1,price:1000,txt:{ko:'녹색 염료 ',en:''},colorSet:'080',color:'rgba(0,137,0,.6)',size:1,eff:[{type:4,num:['30']}]},
        {idx:129,grade:3,imgCate:'itemHole',display:129,na:{ko:'연두 염료',en:''},kg:0.1,price:1000,txt:{ko:'연두색 염료 ',en:''},colorSet:'0f0',color:'rgba(0,255,0,.6)',size:1,eff:[{type:26,num:['7']}]},
        {idx:130,grade:3,imgCate:'itemHole',display:130,na:{ko:'노랑 염료',en:''},kg:0.1,price:1000,txt:{ko:'노랑색 염료 ',en:''},colorSet:'ff0',color:'rgba(255,255,0,.6)',size:1,eff:[{type:9,num:['7']}]},
        {idx:131,grade:3,imgCate:'itemHole',display:131,na:{ko:'주황 염료',en:''},kg:0.1,price:1000,txt:{ko:'주황색 염료 ',en:''},colorSet:'f80',color:'rgba(255,137,0,.6)',size:1,eff:[{type:3,num:['30']}]},
        {idx:132,grade:3,imgCate:'itemHole',display:132,na:{ko:'빨강 염료',en:''},kg:0.1,price:1000,txt:{ko:'빨강색 염료 ',en:''},colorSet:'f00',color:'rgba(255,0,0,.6)',size:1,eff:[{type:24,num:['7']}]},
        {idx:133,grade:3,imgCate:'itemHole',display:133,na:{ko:'보라 염료',en:''},kg:0.1,price:1000,txt:{ko:'보라색 염료 ',en:''},colorSet:'80f',color:'rgba(137,0,255,.6)',size:1,eff:[{type:6,num:['30']}]},
        {idx:134,grade:3,imgCate:'itemHole',display:134,na:{ko:'파랑 염료',en:''},kg:0.1,price:1000,txt:{ko:'파랑색 염료 ',en:''},colorSet:'00f',color:'rgba(0,0,255,.6)',size:1,eff:[{type:23,num:['7']}]},
        {idx:135,grade:3,imgCate:'itemHole',display:135,na:{ko:'군청 염료',en:''},kg:0.1,price:1000,txt:{ko:'군청색 염료 ',en:''},colorSet:'008',color:'rgba(0,0,137,.6)',size:1,eff:[{type:5,num:['30']}]},
        '','','','','',
        {idx:141,grade:4,imgCate:'itemHole',display:141,na:{ko:'큰 백 염료',en:''},kg:0.2,price:1000,txt:{ko:'큰 백색 염료 ',en:''},colorSet:'fff',color:'rgba(255,255,255,.8)',size:2,eff:[{type:21,num:['10']}]},
        {idx:142,grade:4,imgCate:'itemHole',display:142,na:{ko:'큰 흑 염료',en:''},kg:0.2,price:1000,txt:{ko:'큰 흑색 염료 ',en:''},colorSet:'000',color:'rgba(0,0,0,.8)',size:2,eff:[{type:22,num:['10']}]},
        {idx:143,grade:4,imgCate:'itemHole',display:143,na:{ko:'큰 청록 염료',en:''},kg:0.2,price:1000,txt:{ko:'큰 청록색 염료 ',en:''},colorSet:'088',color:'rgba(0,137,137,.8)',size:2,eff:[{type:0,num:['75']}]},
        {idx:144,grade:4,imgCate:'itemHole',display:144,na:{ko:'큰 카키 염료',en:''},kg:0.2,price:1000,txt:{ko:'큰 카키색 염료 ',en:''},colorSet:'880',color:'rgba(137,137,0,.8)',size:2,eff:[{type:21,num:['3']},{type:22,num:['3']}]},
        {idx:145,grade:4,imgCate:'itemHole',display:145,na:{ko:'큰 하늘 염료',en:''},kg:0.2,price:1000,txt:{ko:'큰 하늘색 염료 ',en:''},colorSet:'0ff',color:'rgba(0,255,255,.8)',size:2,eff:[{type:25,num:['10']}]},
        {idx:146,grade:4,imgCate:'itemHole',display:146,na:{ko:'큰 분홍 염료',en:''},kg:0.2,price:1000,txt:{ko:'큰 분홍색 염료 ',en:''},colorSet:'f0f',color:'rgba(255,0,255,.8)',size:2,eff:[{type:23,num:['3']},{type:24,num:['3']},{type:25,num:['3']},{type:26,num:['3']}]},
        {idx:147,grade:4,imgCate:'itemHole',display:147,na:{ko:'큰 자주 염료',en:''},kg:0.2,price:1000,txt:{ko:'큰 자주색 염료 ',en:''},colorSet:'808',color:'rgba(137,0,137,.8)',size:2,eff:[{type:8,num:['10']}]},
        {idx:148,grade:4,imgCate:'itemHole',display:148,na:{ko:'큰 녹 염료',en:''},kg:0.2,price:1000,txt:{ko:'큰 녹색 염료 ',en:''},colorSet:'080',color:'rgba(0,137,0,.8)',size:2,eff:[{type:4,num:['50']}]},
        {idx:149,grade:4,imgCate:'itemHole',display:149,na:{ko:'큰 연두 염료',en:''},kg:0.2,price:1000,txt:{ko:'큰 연두색 염료 ',en:''},colorSet:'0f0',color:'rgba(0,255,0,.8)',size:2,eff:[{type:26,num:['10']}]},
        {idx:150,grade:4,imgCate:'itemHole',display:150,na:{ko:'큰 노랑 염료',en:''},kg:0.2,price:1000,txt:{ko:'큰 노랑색 염료 ',en:''},colorSet:'ff0',color:'rgba(255,255,0,.8)',size:2,eff:[{type:9,num:['10']}]},
        {idx:151,grade:4,imgCate:'itemHole',display:151,na:{ko:'큰 주황 염료',en:''},kg:0.2,price:1000,txt:{ko:'큰 주황색 염료 ',en:''},colorSet:'f80',color:'rgba(255,137,0,.8)',size:2,eff:[{type:3,num:['50']}]},
        {idx:152,grade:4,imgCate:'itemHole',display:152,na:{ko:'큰 빨강 염료',en:''},kg:0.2,price:1000,txt:{ko:'큰 빨강색 염료 ',en:''},colorSet:'f00',color:'rgba(255,0,0,.8)',size:2,eff:[{type:24,num:['10']}]},
        {idx:153,grade:4,imgCate:'itemHole',display:153,na:{ko:'큰 보라 염료',en:''},kg:0.2,price:1000,txt:{ko:'큰 보라색 염료 ',en:''},colorSet:'80f',color:'rgba(137,0,255,.8)',size:2,eff:[{type:6,num:['50']}]},
        {idx:154,grade:4,imgCate:'itemHole',display:154,na:{ko:'큰 파랑 염료',en:''},kg:0.2,price:1000,txt:{ko:'큰 파랑색 염료 ',en:''},colorSet:'00f',color:'rgba(0,0,255,.8)',size:2,eff:[{type:23,num:['10']}]},
        {idx:155,grade:4,imgCate:'itemHole',display:155,na:{ko:'큰 군청 염료',en:''},kg:0.2,price:1000,txt:{ko:'큰 군청색 염료 ',en:''},colorSet:'008',color:'rgba(0,0,137,.8)',size:2,eff:[{type:5,num:['50']}]},
    ],
    upgrade:[//업그레이드 아이템
        {idx:0,grade:1,imgCate:'itemUpgrade',display:0,na:{ko:'대장장이 망치I',en:''},kg:1,price:1000,action:'',invenUse:false,txt:{ko:'방어구 업그레이드에 쓰인다.',en:''},eff:['?']},
        {idx:1,grade:2,imgCate:'itemUpgrade',display:1,na:{ko:'대장장이 망치II',en:''},kg:1,price:2000,action:'',invenUse:false,txt:{ko:'방어구 업그레이드에 쓰인다.',en:''},eff:['?']},
        {idx:2,grade:3,imgCate:'itemUpgrade',display:2,na:{ko:'대장장이 망치III',en:''},kg:2,price:4000,action:'',invenUse:false,txt:{ko:'방어구 업그레이드에 쓰인다.',en:''},eff:['?']},
        {idx:3,grade:4,imgCate:'itemUpgrade',display:3,na:{ko:'대장장이 망치IV',en:''},kg:2,price:8000,action:'',invenUse:false,txt:{ko:'방어구 업그레이드에 쓰인다.',en:''},eff:['?']},
        {idx:4,grade:5,imgCate:'itemUpgrade',display:4,na:{ko:'대장장이 망치V',en:''},kg:3,price:10000,action:'',invenUse:false,txt:{ko:'방어구 업그레이드에 쓰인다.',en:''},eff:['?']},
        {idx:5,grade:5,imgCate:'itemUpgrade',display:5,na:{ko:'대장장이 망치IV',en:''},kg:3,price:10000,action:'',invenUse:false,txt:{ko:'방어구 업그레이드에 쓰인다.',en:''},eff:['?']},
        {idx:6,grade:1,imgCate:'itemUpgrade',display:6,na:{ko:'숫돌I',en:''},kg:0.1,price:1000,action:'',invenUse:false,txt:{ko:'무기 업그레이드에 쓰인다.',en:''},eff:['?']},
        {idx:7,grade:2,imgCate:'itemUpgrade',display:7,na:{ko:'숫돌III',en:''},kg:0.1,price:2000,action:'',invenUse:false,txt:{ko:'무기 업그레이드에 쓰인다.',en:''},eff:['?']},
        {idx:8,grade:3,imgCate:'itemUpgrade',display:8,na:{ko:'숫돌IIII',en:''},kg:0.1,price:4000,action:'',invenUse:false,txt:{ko:'무기 업그레이드에 쓰인다.',en:''},eff:['?']},
        {idx:9,grade:4,imgCate:'itemUpgrade',display:9,na:{ko:'숫돌IIV',en:''},kg:0.1,price:8000,action:'',invenUse:false,txt:{ko:'무기 업그레이드에 쓰인다.',en:''},eff:['?']},
        {idx:10,grade:5,imgCate:'itemUpgrade',display:10,na:{ko:'숫돌IV',en:''},kg:0.1,price:10000,action:'',invenUse:false,txt:{ko:'무기 업그레이드에 쓰인다.',en:''},eff:['?']},
        {idx:11,grade:5,imgCate:'itemUpgrade',display:11,na:{ko:'숫돌IIV',en:''},kg:0.1,price:10000,action:'',invenUse:false,txt:{ko:'무기 업그레이드에 쓰인다.',en:''},eff:['?']},
    ],
    material:[//재료
        {idx:0,grade:1,imgCate:'itemMaterial',display:0,na:{ko:'식량',en:'Food'},kg:10,price:100,action:'',invenUse:false,txt:{ko:'항해 할때 먹는 식량.',en:''},eff:['?']},
        {idx:1,grade:1,imgCate:'itemMaterial',display:1,na:{ko:'물',en:'Water'},kg:10,price:100,action:'',invenUse:false,txt:{ko:'항해 할때 마시는 물.',en:''},eff:['?']},
        {idx:2,grade:1,imgCate:'itemMaterial',display:2,na:{ko:'보리',en:'Barley'},kg:10,price:500,action:'',invenUse:false,txt:{ko:'리는 밀보다 값이 싸서 경제적이고 가축의 사료로 사용되기도 한다.',en:''},eff:['?']},
        {idx:3,grade:1,imgCate:'itemMaterial',display:3,na:{ko:'쌀',en:'Rice'},kg:10,price:1000,action:'',invenUse:false,txt:{ko:'벼의 씨앗에서 껍질을 벗겨 낸 식량이다.',en:''},eff:['?']},
        {idx:4,grade:1,imgCate:'itemMaterial',display:4,na:{ko:'밀가루',en:'Wheat Flour'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'밀의 배유부분을 가루로 만든 것이다. ',en:''},eff:['?']},
        {idx:5,grade:1,imgCate:'itemMaterial',display:5,na:{ko:'커피',en:'Coffee Bean'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'커피나무의 씨앗이며 음용 커피의 재료이다.',en:''},eff:['?']},
        {idx:6,grade:1,imgCate:'itemMaterial',display:6,na:{ko:'카카오',en:'Cacao'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'쌍떡잎식물 아욱목 벽오동나무과의 교목으로 코코아라고도 한다.',en:''},eff:['?']},
        {idx:7,grade:1,imgCate:'itemMaterial',display:7,na:{ko:'레몬',en:'Lemon'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'비타민 C의 함량이 높은 신맛 나는 과일.',en:''},eff:['?']},
        {idx:8,grade:1,imgCate:'itemMaterial',display:8,na:{ko:'오렌지',en:'Orange'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'감귤류에 속하는 열매의 하나로 모양이 둥글고 주황빛이며 껍질이 두껍고 즙이 많다.',en:''},eff:['?']},
        {idx:9,grade:1,imgCate:'itemMaterial',display:9,na:{ko:'키위',en:'Kiwi'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'껍질이 솜털로 덮여있고 녹색을 띤 갈색의 새콤달콤한 맛이 나는 과일이다.',en:''},eff:['?']},
        {idx:10,grade:1,imgCate:'itemMaterial',display:10,na:{ko:'석류',en:'Pomegranate'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'부처꽃과에 속하는 빨간색의 껍질 안에 과육이 꽉 차있는 과일이다.',en:''},eff:['?']},
        {idx:11,grade:1,imgCate:'itemMaterial',display:11,na:{ko:'체리',en:'Cherry'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'장미과에 속하는 관목인 벚나무의 열매이다.',en:''},eff:['?']},
        {idx:12,grade:1,imgCate:'itemMaterial',display:12,na:{ko:'파인애플',en:'Pineapple'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'잎이 모여난 칼 모양이고 비타민이 풍부한 열대과일이다.',en:''},eff:['?']},
        {idx:13,grade:1,imgCate:'itemMaterial',display:13,na:{ko:'블루베리',en:'Blueberry'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'달고 신맛이 나는 짙은 하늘색, 붉은빛을 띤 갈색, 검은색이고 겉에 흰가루가 묻어있는 과일.',en:''},eff:['?']},
        {idx:14,grade:1,imgCate:'itemMaterial',display:14,na:{ko:'포도',en:'Grape'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'송이 형태로 열리는 동그란 모양 또는 갸름한 알갱이 모양의 과일.',en:''},eff:['?']},
        {idx:15,grade:1,imgCate:'itemMaterial',display:15,na:{ko:'바나나',en:'Banana'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'칼륨과 식이섬유소가 풍부하여 건강에 좋은 과일.',en:''},eff:['?']},
        {idx:16,grade:1,imgCate:'itemMaterial',display:16,na:{ko:'아보카도',en:'Avocado'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'악어의 등처럼 울퉁불퉁한 껍질 때문에 악어배라 불리는 과일.',en:''},eff:['?']},
        {idx:17,grade:1,imgCate:'itemMaterial',display:17,na:{ko:'코코넛',en:'Coconut'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'연한 녹색의 열대과일로서 즙이 많아 음료로는 과일.',en:''},eff:['?']},
        {idx:18,grade:1,imgCate:'itemMaterial',display:18,na:{ko:'두리안',en:'Durian'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'천국의 맛과 지옥의 냄새를 모두 가지고 있는 과일.',en:''},eff:['?']},
        {idx:19,grade:1,imgCate:'itemMaterial',display:19,na:{ko:'사탕수수',en:'Sugar Cane'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'설탕의 원료로 높이 2∼6m까지 열대지방에서 자란다.',en:''},eff:['?']},
        {idx:20,grade:1,imgCate:'itemMaterial',display:20,na:{ko:'완두콩',en:'Garden Bean'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'초록 빛깔과 귀여운 모양으로 사랑받는 식이섬유소가 풍부한 콩 중의 왕이다.',en:''},eff:['?']},
        {idx:21,grade:1,imgCate:'itemMaterial',display:21,na:{ko:'강낭콩',en:'Kidney Bean'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'단백질뿐 아니라 다양한 무기질과 비타민과 같은 영양분을 고루 함유한 붉은빛을 띠는 콩이다.',en:''},eff:['?']},
        {idx:22,grade:1,imgCate:'itemMaterial',display:22,na:{ko:'팥',en:'Red Bean'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'붉은색을 띠고 사포닌이 풍부하고 곡류에 부족한 라이신과 트립토판이 함유되어 콩의 한종류이다.',en:''},eff:['?']},
        {idx:23,grade:1,imgCate:'itemMaterial',display:23,na:{ko:'수수',en:'Sorghum'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'흰색·노란색·갈색·붉은 갈색등 다양한 색을 가지고 있는 작은 알갱이로 구성된 식용가능한 식물이다.',en:''},eff:['?']},
        {idx:24,grade:1,imgCate:'itemMaterial',display:24,na:{ko:'치즈',en:'Cheese'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'우유 속에 있는 카세인(casein)을 뽑아 응고·발효시킨 식품이다.',en:''},eff:['?']},
        {idx:25,grade:1,imgCate:'itemMaterial',display:25,na:{ko:'위스키',en:'Whisky'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'엿기름 또는 곡류 따위를 효모로 알코올 발효하여 증류하고 오크통에 저장하여 숙성한 술이다.',en:''},eff:['?']},
        {idx:26,grade:1,imgCate:'itemMaterial',display:26,na:{ko:'데낄라',en:'Tequila'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'멕시코 특산의 다육식물인 용설란(龍舌蘭)의 수액을 채취해서 증류한 것이 테킬라이다.',en:''},eff:['?']},
        {idx:27,grade:1,imgCate:'itemMaterial',display:27,na:{ko:'와인',en:'Wine'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'포도를 발효시켜 제조한 알코올 음료이다.',en:''},eff:['?']},
        {idx:28,grade:1,imgCate:'itemMaterial',display:28,na:{ko:'럼',en:'Rum'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'당밀이나 사탕수수의 즙을 발효시켜서 증류한 술이며 화이트 럼과 다크 럼이 있다.',en:''},eff:['?']},
        {idx:29,grade:1,imgCate:'itemMaterial',display:29,na:{ko:'산호',en:'Coral'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'겉은 무르고 속은 단단한 석회질로 된 나뭇가지 모양의 산호. 모양과 색깔이 아름다워 보석으로 취급했다.',en:''},eff:['?']},
        {idx:30,grade:1,imgCate:'itemMaterial',display:30,na:{ko:'동광석',en:'Copper Ore'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'구리를 함유한 광석의 총칭으로서, 동광 혹은 동광석이라고도 부른다.',en:''},eff:['?']},
        {idx:31,grade:1,imgCate:'itemMaterial',display:31,na:{ko:'석탄',en:'Coal'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'땅속에서 얻은 숯. 식물이 땅에 묻힌 다음, 열과 압력을 받으면서 만들어진 고체 상태의 물질이다.',en:''},eff:['?']},
        {idx:32,grade:1,imgCate:'itemMaterial',display:32,na:{ko:'은광석',en:'Silver Ore'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'은을 함유한 광석을 총칭한다.',en:''},eff:['?']},
        {idx:33,grade:1,imgCate:'itemMaterial',display:33,na:{ko:'금광석',en:'Gold Ore'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'금을 함유한 광석의 총칭이다.',en:''},eff:['?']},
        {idx:34,grade:1,imgCate:'itemMaterial',display:34,na:{ko:'주석석',en:'Cassiterite'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'정방정계 결정형을 가지는 산화 주석 광물이다.',en:''},eff:['?']},
        {idx:35,grade:1,imgCate:'itemMaterial',display:35,na:{ko:'월계수잎',en:'Bay Leaf'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'녹색을 띠며, 말린 잎의 경우에 강한 향과 쓴맛이 난다.',en:''},eff:['?']},
        {idx:36,grade:1,imgCate:'itemMaterial',display:36,na:{ko:'벌꿀',en:'Honey'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'꿀벌이 꽃의 밀선에서 빨아내어 축적한 감미료(당분)이다.',en:''},eff:['?']},
        {idx:37,grade:1,imgCate:'itemMaterial',display:37,na:{ko:'올리브',en:'Olive'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'열매를 생으로 혹은 절여 먹거나 압착해서 기름으로 만든다.',en:''},eff:['?']},
        {idx:38,grade:1,imgCate:'itemMaterial',display:38,na:{ko:'고추',en:'Chili pepper'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'익어 가면서 점점 빨갛게 되며 껍질과 씨는 캡사이신을 함유하고 있어 매운 맛이 난다.',en:''},eff:['?']},
        {idx:39,grade:1,imgCate:'itemMaterial',display:39,na:{ko:'맥주',en:'Beer'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'보리를 가공한 맥아(Malt)를 발효시키고 이를 주재료로 향신료인 홉(hop)을 첨가하여 맛을 낸 술이다.',en:''},eff:['?']},
        {idx:40,grade:1,imgCate:'itemMaterial',display:40,na:{ko:'상아',en:'Ivory'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'조각 및 장식품 재료의 일종으로, 넓게는 예술적 용도로 쓰기에 충분할 정도로 크게 자란 포유류 치아의 총칭이다.',en:''},eff:['?']},
        {idx:41,grade:1,imgCate:'itemMaterial',display:41,na:{ko:'진주',en:'Pearl'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'조개 내부로 이물질이 유입되면 격리시키고자 탄산칼슘으로 감싸면서 생기는 것으로 장신구 및 악세사리를 만들때 쓰인다.',en:''},eff:['?']},
        {idx:42,grade:1,imgCate:'itemMaterial',display:42,na:{ko:'공작석',en:'Malachite'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'구리가 양이온으로 들어가고, 수화 상태인 탄산염 광물로 장신구 및 악세사리를 만들때 쓰인다.',en:''},eff:['?']},
        {idx:43,grade:1,imgCate:'itemMaterial',display:43,na:{ko:'호박석',en:'Amber'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'보통 송진(수액이라고도 함)이 굳어서 100만 년 정도 지나면 호박이 되고 장신구 및 악세사리를 만들때 쓰인다.',en:''},eff:['?']},
        {idx:44,grade:1,imgCate:'itemMaterial',display:44,na:{ko:'유리공예품',en:'Glass Crafts'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'유리를 가공해서 만든 물건이나 장식품이다.',en:''},eff:['?']},
        {idx:45,grade:1,imgCate:'itemMaterial',display:45,na:{ko:'도자기공예품',en:'Pottery Crafts'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'토기, 도자기, 석기 등을 만드는 물건이나 장식품이다.',en:''},eff:['?']},
        {idx:46,grade:1,imgCate:'itemMaterial',display:46,na:{ko:'미술품',en:'Work of Art'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'공간적 또는 시각적 아름다움을 표현하여 만들어진 작품이다.',en:''},eff:['?']},
        {idx:47,grade:1,imgCate:'itemMaterial',display:47,na:{ko:'금주괴',en:'Gold Ingot'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'금을 가공하기 좋게 주물로 뜬 사각모양의 주괴이다.',en:''},eff:['?']},
        {idx:48,grade:1,imgCate:'itemMaterial',display:48,na:{ko:'은주괴',en:'Silver Ingot'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'은을 가공하기 좋게 주물로 뜬 사각모양의 주괴이다.',en:''},eff:['?']},
        {idx:49,grade:1,imgCate:'itemMaterial',display:49,na:{ko:'동주괴',en:'Copper Ingot'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'동을 가공하기 좋게 주물로 뜬 사각모양의 주괴이다.',en:''},eff:['?']},
        {idx:50,grade:1,imgCate:'itemMaterial',display:50,na:{ko:'청동주괴',en:'Bronze Ingot'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'청동을 가공하기 좋게 주물로 뜬 사각모양의 주괴이다.',en:''},eff:['?']},
        {idx:51,grade:1,imgCate:'itemMaterial',display:51,na:{ko:'주석주괴',en:'Tin Ingot'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'주석을 가공하기 좋게 주물로 뜬 사각모양의 주괴이다.',en:''},eff:['?']},
        {idx:52,grade:1,imgCate:'itemMaterial',display:52,na:{ko:'대리석',en:'Marble'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'탄산염 광물로 이루어진 변성암으로 주로 저각상이나 건축재료로 쓰인다.',en:''},eff:['?']},
        {idx:53,grade:1,imgCate:'itemMaterial',display:53,na:{ko:'목재',en:'Timber'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'나무를 이용한 건축재료이다.',en:''},eff:['?']},
        {idx:54,grade:1,imgCate:'itemMaterial',display:54,na:{ko:'석재',en:'Stone'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'돌을 이용한 건축재료이다.',en:''},eff:['?']},
        {idx:55,grade:1,imgCate:'itemMaterial',display:55,na:{ko:'융단',en:'Carpet'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'양털, 목화 혹은 비단 등으로 만든 직물로 바닥에 깔거나 벽에 거는 용도로 사용하는 천을 말한다.',en:''},eff:['?']},
        {idx:56,grade:1,imgCate:'itemMaterial',display:56,na:{ko:'민트',en:'Mint'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'박하과 식물이고 식용, 화장품등에 쓰인다.',en:''},eff:['?']},
        //밀,쌀,보리,현미,수수,팥,콩,커피,카카오,꿀
        //사탕수수,코코넛,치즈,레몬,올리브,월계수,민트
        //와인,데킬라,양주,맥주
        //두리안,바나나
        //산호,상아,진주,공작석,호박석
        //목재,대리석,석재
        //석탄,동,은,금,주석,수은,
        //유리공예품,도자기공예품,미술품,융단

        //설탕,소금,후추
        //우유,홍차
        //거울
        //강철
        //비단,마섬유,면화,피혁,양모,모피,목화
        //무궁화, 튤립, 장미
    ],
    etc:[
        {idx:0,grade:1,imgCate:'itemEtc',display:2,na:{ko:'동전더미(동)',en:''},kg:10,price:1000,
        action:99,invenUse:true,txt:{ko:'G조각 1000개로 판매할 수 있다.',en:''},eff:1000},
        {idx:1,grade:2,imgCate:'itemEtc',display:1,na:{ko:'동전더미(은)',en:''},kg:20,price:5000,
        action:99,invenUse:true,txt:{ko:'G조각 5000개로 판매할 수 있다.',en:''},eff:5000},
        {idx:2,grade:3,imgCate:'itemEtc',display:0,na:{ko:'동전더미(금)',en:''},kg:30,price:10000,
        action:99,invenUse:true,txt:{ko:'G조각 10000개로 판매할 수 있다.',en:''},eff:10000},
        {idx:3,grade:4,imgCate:'itemEtc',displayText:'I',display:22,na:{ko:'경험의서I',en:''},kg:0.1,price:100,
        action:98,invenUse:false,txt:{ko:'100의 경험치를 획들 할 수 있다.',en:''},eff:100},
        {idx:4,grade:5,imgCate:'itemEtc',displayText:'II',display:22,na:{ko:'경험의서II',en:''},kg:0.1,price:1000,
        action:98,invenUse:false,txt:{ko:'1000의 경험치를 획들 할 수 있다.',en:''},eff:1000},
        {idx:5,grade:5,imgCate:'itemEtc',displayText:'III',display:22,na:{ko:'경험의서III',en:''},kg:0.1,price:10000,
        action:98,invenUse:false,txt:{ko:'10000의 경험치를 획들 할 수 있다.',en:''},eff:10000},
        {idx:6,grade:6,imgCate:'itemEtc',displayText:'IV',display:22,na:{ko:'경험의서IV',en:''},kg:0.1,price:50000,
        action:98,invenUse:false,txt:{ko:'50000의 경험치를 획들 할 수 있다.',en:''},eff:50000},
        {idx:7,grade:6,imgCate:'itemEtc',displayText:'V',display:22,na:{ko:'경험의서V',en:''},kg:0.1,price:100000,
        action:98,invenUse:false,txt:{ko:'100000의 경험치를 획들 할 수 있다.',en:''},eff:100000},
        {idx:8,grade:1,imgCate:'itemEtc',displayText:'I',display:23,na:{ko:'아이템강화서I',en:''},kg:0.1,price:100,
        action:0,invenUse:false,txt:{ko:'일반 아이템 업그레이드 할 수 있다.',en:''},eff:['?']},
        {idx:9,grade:2,imgCate:'itemEtc',displayText:'II',display:23,na:{ko:'아이템강화서II',en:''},kg:0.1,price:1000,
        action:0,invenUse:false,txt:{ko:'매직 아이템 업그레이드 할 수 있다.',en:''},eff:['?']},
        {idx:10,grade:3,imgCate:'itemEtc',displayText:'III',display:23,na:{ko:'아이템강화서III',en:''},kg:0.1,price:5000,
        action:0,invenUse:false,txt:{ko:'레어 아이템 업그레이드 할 수 있다.',en:''},eff:['?']},
        '','','','','','','','',
        {idx:19,grade:1,imgCate:'itemEtc',display:10,na:{ko:'선물상자',en:''},price:100,action:100,invenUse:true,txt:{ko:'무언가 나올 것 같은 기분좋은 상자',en:''},kg:15,eff:['?']},
        {idx:20,grade:1,imgCate:'itemEtc',display:21,na:{ko:'ID교환권',en:''},price:100,action:1,invenUse:true,txt:{ko:'ID를 변경할수 있다.',en:''},kg:0.1,eff:['?']},
        {idx:21,grade:1,imgCate:'itemEtc',display:20,na:{ko:'스킬제거권',en:''},price:100,action:11,invenUse:false,txt:{ko:'캐릭터의 스킬을 제거할수 있다.',en:''},kg:0.1,eff:['?']},
        {idx:22,grade:1,imgCate:'itemEtc',display:28,na:{ko:'보석제거 집게',en:''},price:100,action:0,invenUse:false,txt:{ko:'아이템에 박힌 보석을 제거 할 수 있다.',en:''},kg:0.3,eff:['?']},
        {idx:23,grade:1,imgCate:'itemEtc',display:29,na:{ko:'보물지도',en:''},price:100,action:0,invenUse:false,txt:{ko:'보물이 숨겨진 장소를 알 수 있다.',en:''},kg:0.3,eff:['?']},
        {idx:24,grade:1,imgCate:'itemEtc',display:30,na:{ko:'보물지도 조각',en:''},price:100,action:0,invenUse:false,txt:{ko:'10개를 합치면 보물지도를 만들 수 있다.',en:''},kg:0.3,eff:['?']},
        {idx:25,grade:1,imgCate:'itemEtc',display:31,na:{ko:'선박 설계도',en:''},price:100,action:0,invenUse:false,txt:{ko:'선박 설계도 小형, 中형, 大형 중 한개의 설계도를 얻을 수 있다.',en:''},kg:0.3,eff:['?']},
        {idx:26,grade:1,imgCate:'itemEtc',display:32,na:{ko:'선박 설계도 조각',en:''},price:100,action:0,invenUse:false,txt:{ko:'5개는 小형, 10개는 中형, 15개는 大형 설계도를 만들 수 있다.',en:''},kg:0.3,eff:['?']},
        {idx:27,grade:1,imgCate:'itemEtc',displayText:'No1',display:31,na:{ko:'소형 선박 설계도 I',en:''},price:100,action:0,invenUse:false,txt:{ko:'소형 선박을 제조 할 수 있는 설계도.',en:''},kg:0.1,eff:['?']},
        {idx:28,grade:1,imgCate:'itemEtc',displayText:'No2',display:31,na:{ko:'소형 선박 설계도 II',en:''},price:100,action:0,invenUse:false,txt:{ko:'소형 선박을 제조 할 수 있는 설계도.',en:''},kg:0.1,eff:['?']},
        {idx:29,grade:1,imgCate:'itemEtc',displayText:'No3',display:31,na:{ko:'소형 선박 설계도 III',en:''},price:100,action:0,invenUse:false,txt:{ko:'소형 선박을 제조 할 수 있는 설계도.',en:''},kg:0.1,eff:['?']},
        {idx:30,grade:2,imgCate:'itemEtc',displayText:'No4',display:31,na:{ko:'중형 선박 설계도 I',en:''},price:100,action:0,invenUse:false,txt:{ko:'소형 선박을 제조 할 수 있는 설계도.',en:''},kg:0.1,eff:['?']},
        {idx:31,grade:2,imgCate:'itemEtc',displayText:'No5',display:31,na:{ko:'중형 선박 설계도 II',en:''},price:100,action:0,invenUse:false,txt:{ko:'중형 선박을 제조 할 수 있는 설계도.',en:''},kg:0.1,eff:['?']},
        {idx:32,grade:2,imgCate:'itemEtc',displayText:'No6',display:31,na:{ko:'중형 선박 설계도 III',en:''},price:100,action:0,invenUse:false,txt:{ko:'중형 선박을 제조 할 수 있는 설계도.',en:''},kg:0.1,eff:['?']},
        {idx:33,grade:2,imgCate:'itemEtc',displayText:'No7',display:31,na:{ko:'중형 선박 설계도 IV',en:''},price:100,action:0,invenUse:false,txt:{ko:'중형 선박을 제조 할 수 있는 설계도.',en:''},kg:0.1,eff:['?']},
        {idx:34,grade:3,imgCate:'itemEtc',displayText:'No8',display:31,na:{ko:'대형 선박 설계도 I',en:''},price:100,action:0,invenUse:false,txt:{ko:'대형 선박을 제조 할 수 있는 설계도.',en:''},kg:0.1,eff:['?']},
        {idx:35,grade:3,imgCate:'itemEtc',displayText:'No9',display:31,na:{ko:'대형 선박 설계도 II',en:''},price:100,action:0,invenUse:false,txt:{ko:'대형 선박을 제조 할 수 있는 설계도.',en:''},kg:0.1,eff:['?']},
        {idx:36,grade:3,imgCate:'itemEtc',displayText:'No10',display:31,na:{ko:'대형 선박 설계도 III',en:''},price:100,action:0,invenUse:false,txt:{ko:'대형 선박을 제조 할 수 있는 설계도.',en:''},kg:0.1,eff:['?']},
        {idx:37,grade:3,imgCate:'itemEtc',displayText:'No11',display:31,na:{ko:'대형 선박 설계도 IV',en:''},price:100,action:0,invenUse:false,txt:{ko:'대형 선박을 제조 할 수 있는 설계도.',en:''},kg:0.1,eff:['?']},
        {idx:38,grade:3,imgCate:'itemEtc',displayText:'No12',display:31,na:{ko:'대형 선박 설계도 V',en:''},price:100,action:0,invenUse:false,txt:{ko:'대형 선박을 제조 할 수 있는 설계도.',en:''},kg:0.1,eff:['?']},'',
        {idx:40,grade:1,imgCate:'itemEtc',displayText:'I',display:25,na:{ko:'동물 선수상 설계도',en:''},price:100,action:0,invenUse:false,txt:{ko:'동물 선수상을 제조 할 수 있는 설계도.',en:''},kg:0.1,eff:['?']},
        {idx:41,grade:2,imgCate:'itemEtc',displayText:'II',display:25,na:{ko:'위인 선수상 설계도',en:''},price:100,action:0,invenUse:false,txt:{ko:'위인 선수상을 제조 할 수 있는 설계도.',en:''},kg:0.1,eff:['?']},
        {idx:42,grade:3,imgCate:'itemEtc',displayText:'III',display:25,na:{ko:'용 선수상 설계도',en:''},price:100,action:0,invenUse:false,txt:{ko:'용 선수상을 제조 할 수 있는 설계도.',en:''},kg:0.1,eff:['?']},
    ]
}