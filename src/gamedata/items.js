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
        1:[//모자
            [
                [//normal,magic,rare,epic
                    {idx:0,part:1,grade:1,display:0,na:{ko:'터번',en:'Turban'},kg:0.1,price:100,color:["#fff","#000"],socket:2,txt:{ko:'머리에 둘둘 감고 다니는 천',en:'A cloth wrapped around one\'s head'},eff:[{type:4,num:['5','50']},{type:4,num:['50','50','50']}],set:0},
                    {idx:1,part:1,grade:1,display:1,na:{ko:'두정투',en:'\'Doojung\' Helm'},kg:3,price:1000,color:["#fff","#000","#e2ae37"],socket:3,txt:{ko:'頭釘鬪, 가죽에 옻칠을 한 투구',en:'頭釘鬪, A leather-lacquered helmet'},eff:[{type:4,num:['50','250']}],set:0},
                    {idx:2,part:1,grade:1,display:10,na:{ko:'스컬 캡',en:'Skull Cap'},kg:3,price:400,color:["#fff","#000"],socket:2,txt:{ko:'반구 형태의 철제 투구',en:'A hemispherical iron helmet'},eff:[{type:4,num:['50','100']}],set:0},
                    {idx:3,part:1,grade:1,display:2,na:{ko:'코니컬 헬름',en:'Conical Helm'},kg:5,price:500,color:["#fff","#000"],socket:2,txt:{ko:'원뿔형태의 철제 투구',en:'A conical iron helmet'},eff:[{type:4,num:['100','150']}],set:0},
                    {idx:4,part:1,grade:1,display:7,na:{ko:'풀 헬름',en:'Full Helm'},kg:7,price:700,color:["#fff","#000"],socket:3,txt:{ko:'헬름을 강화시킨 투구',en:'A helmet reinforced with Helm'},eff:[{type:4,num:['150','250']}],set:0},
                    {idx:5,part:1,grade:1,display:9,na:{ko:'본 헬름',en:'Bone Helm'},kg:6,price:400,color:["#fff","#58595B"],socket:4,txt:{ko:'짐승의 뼈로 만든 투구',en:'A helmet made of animal bones'},eff:[{type:4,num:['100','300']}],set:0},
                    {idx:6,part:1,grade:1,display:6,na:{ko:'헤럴드리 헬름',en:'Heraldry Helm'},kg:14,price:1500,color:["#fff","#000"],socket:3,txt:{ko:'폐쇄형 강철 투구',en:'A closed steel helmet'},eff:[{type:3,num:['200','350']}],set:0},
                    {idx:7,part:1,grade:1,display:8,na:{ko:'그레이트 헬름',en:'Great Helm'},kg:25,price:2000,color:["#fff","#000","#AF8C4F"],socket:4,txt:{ko:'우수한 방어효과 만큼 무거운 투구',en:'Helm as heavy as a good defense'},eff:[{type:4,num:['350','500']}],set:0},
                ],
                [//unique

                ],
                [//legend

                ]
            ]
            
            // {idx:6,part:1,grade:1,display:3,na:'코니컬 헬름II',kg:4,price:200,color:["#fff","#000"],socket:3,txt:'Conical Helm II 원뿔형태에서 변형시킨 투구',eff:[{type:4,num:['130','180']}],set:0},
            // {idx:4,part:1,grade:1,display:5,na:'마스크드 헬름',kg:7,price:200,color:["#fff","#000"],socket:3,txt:'Masked helm 얼굴을 완벽히 보호되는 투구',eff:[{type:4,num:['150','300']}],set:0},
        ],
        2:[//갑옷
            [
                [//normal,magic,rare,epic
                    {idx:0,part:2,grade:1,display:20,na:{ko:'클로스 클로시즈',en:'Cloth Clothes'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'천으로 만든 가벼운 옷, 천옷',en:'Light clothes made of cloth'},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:1,part:2,grade:1,display:21,na:{ko:'퀄티드 아머',en:'Quiled Armor'},kg:5,price:300,color:["#FEC260"],socket:3,txt:{ko:'천을 기워 붙인 갑옷, 면갑',en:'A cloth armour'},eff:[{type:4,num:['50','100']}],set:0},
                    {idx:2,part:2,grade:1,display:22,na:{ko:'하이드 아머',en:'Hide Armor'},kg:7,price:400,color:["#C16F2B"],socket:4,txt:{ko:'조끼형태의 가죽 갑옷',en:'Leather armor in the form of a vest'},eff:[{type:4,num:['30','120']}],set:0},
                    {idx:3,part:2,grade:1,display:23,na:{ko:'레더 아머',en:'Lether Armor'},kg:10,price:500,color:["#C16F2B"],socket:3,txt:{ko:'가죽으로 만든 갑옷',en:'Armor made of leather'},eff:[{type:4,num:['50','150']}],set:0},
                    {idx:4,part:2,grade:1,display:24,na:{ko:'스터디드 레더 아머',en:'Studded Lether Armor'},kg:5,price:700,color:["#E4AF51"],socket:3,txt:{ko:'징박힌 가죽 갑옷',en:'Armor covered with dozens of metal projections in leather'},eff:[{type:3,num:['100','200']}],set:0},
                    {idx:5,part:2,grade:1,display:25,na:{ko:'링 메일',en:'Ring Mail'},kg:11,price:900,color:["#fff"],socket:3,txt:{ko:'사슬 형태의 철제 갑옷',en:'A chain of iron armor'},eff:[{type:4,num:['150','250']}],set:0},
                    {idx:6,part:2,grade:1,display:26,na:{ko:'스케일 메일',en:'Scale Mail'},kg:13,price:1000,color:["#E6E7E8"],socket:4,txt:{ko:'금속조각을 붙힌 갑옷, 어린갑',en:'A piece of metal armor'},eff:[{type:4,num:['170','270']}],set:0},
                    {idx:7,part:2,grade:1,display:27,na:{ko:'체인 메일',en:'Chain Mail'},kg:15,price:1000,color:["#fff"],socket:3,txt:{ko:'메쉬형태로 금속링을 엮은 갑옷, 쇄자갑',en:''},eff:[{type:3,num:['200','300']}],set:0},
                    {idx:8,part:2,grade:1,display:28,na:{ko:'스피린트 메일',en:'Splint Mail'},kg:17,price:1100,color:["#9B8579"],socket:4,txt:{ko:'천이나 가죽에 금속 스트립을 엮은 갑옷, 경번갑',en:'A mesh-type metal ring of armor'},eff:[{type:4,num:['250','400']}],set:0},
                    {idx:9,part:2,grade:1,display:29,na:{ko:'브리간딘',en:'Brigandine'},kg:20,price:1200,color:["#D1D3D4"],socket:4,txt:{ko:'가죽 겉 감 안에 철판을 덧댄 갑옷, 두정갑',en:'Armor with iron plate inside leather cover'},eff:[{type:4,num:['300','450']}],set:0},
                    {idx:10,part:2,grade:1,display:30,na:{ko:'플레이트 메일',en:'Plate Mail'},kg:27,price:1500,color:["#000"],socket:5,txt:{ko:'강철판으로 만든 갑옷, 판금갑',en:'Armor made of steel plates'},eff:[{type:4,num:['450','600']}],set:0},
                    {idx:11,part:2,grade:1,display:31,na:{ko:'풀 플레이트',en:'Full Plate'},kg:35,price:2000,color:["#fff"],socket:5,txt:{ko:'전신을 강철판으로 만든 갑옷, 판금갑',en:'Upgraded form of plate mail'},eff:[{type:4,num:['600','1000']}],set:0},
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
                    {idx:0,part:3,grade:1,display:100,na:{ko:'마키리',en:'Makiri'},kg:0.5,price:100,color:["#ffffff,#987E2E"],socket:2,txt:{ko:'아이누족의 전통적인 칼. 마키리 자체가 아이누어로 칼이라는 의미이다. 여성용은 메노코마키리(メノコマキリ)라고 하며, 메노코(メノコ)라는 단어가 아이누어로 여자를 의미한다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:1,part:3,grade:1,display:101,na:{ko:'자마다르',en:'Jamadar'},kg:0.8,price:100,color:["#ffffff","#FEE05F"],socket:2,txt:{ko:'인도에서 사용된 단검의 일종으로 서양권에 전파되어 서양에서는 자마다르를 \'카타르\'라 부름.'},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:2,part:3,grade:1,display:102,na:{ko:'장도',en:'Self Defense Knife'},kg:0.2,price:100,color:["#ffffff","#000000","#FFFFFF"],socket:2,txt:{ko:'인도에서 사용된 단검의 일종으로 서양권에 전파되어 서양에서는 자마다르를 \'카타르\'라 부름.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:3,part:3,grade:1,display:103,na:{ko:'탄토',en:'Dagger'},kg:0.4,price:100,color:["#ffffff","#FEBC12"],socket:2,txt:{ko:'탄토(短刀)란, 날 길이 1척(30, 3cm) 이하의 일본도의 총칭이다. 국내에서는 단도라고도 널리 불린다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:4,part:3,grade:1,display:104,na:{ko:'카람빗',en:'Karambit'},kg:0.5,price:100,color:["#ffffff","#461422"],socket:2,txt:{ko:'말레이시아와 필리핀을 뿌리로 인도네시아 군도, 정확히는 술라웨시 서부에서 탄생한 유명한 다용도 나이프로 고대 원주민의 일상용 포켓나이프였다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:5,part:3,grade:1,display:105,na:{ko:'쿠나이',en:'Kunai'},kg:0.5,price:100,color:["#ffffff","#27367A"],socket:2,txt:{ko:'닌자들이 사용했다고 알려진 무기. 성인 남성 손바닥만한 길이의 단검 손잡이 끝에 고리가 달린 형태를 하고 있다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:6,part:3,grade:1,display:106,na:{ko:'쿠크리',en:'Kukri'},kg:0.7,price:100,color:["#ffffff","#FEBC12"],socket:2,txt:{ko:'네팔 구르카족의 전통 도검. Kukri가 가장 보편화되었지만 Khukri, Khukuri 등으로 적기도 한다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:7,part:3,grade:1,display:107,na:{ko:'크리스',en:'Kris'},kg:0.7,price:100,color:["#ffffff","#814F20"],socket:2,txt:{ko:'기본적으로 말레이시아와 인도네시아 등지의 검으로, 물결처럼 구불구불한 모양의 특이한 날을 가진 도검.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:38,part:3,grade:1,display:138,na:{ko:'런들대거',en:'Rondel Dagger'},kg:0.5,price:100,color:["#ffffff","#FBB040","#754C29"],socket:2,txt:{ko:'중세 후기(14세기경 부근)에 기사와 중장병 계급이 흔히 쓰던 단검이다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:39,part:3,grade:1,display:139,na:{ko:'망고슈',en:'Main-gauche'},kg:1,price:100,color:["#ffffff","#3C56A6","#FBB040"],socket:2,txt:{ko:'중세 후기에서 르네상스 시대에 사용하던 방어용 단검을 뜻한다.영국에서는 패링 대거(Parring Dagger)라고 불렀다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:40,part:3,grade:1,display:140,na:{ko:'배즐러드',en:'Baselard'},kg:0.6,price:100,color:["#ffffff","#FBB040","#754C29"],socket:2,txt:{ko:'칼날 끝부분이 손잡이 끝부분과 마찬가지로 막대기 모향으로 평행을 이루는 단검.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:41,part:3,grade:1,display:141,na:{ko:'스틸레토',en:'Stiletto'},kg:0.5,price:100,color:["#ffffff","#FBB040","#754C29"],socket:2,txt:{ko:'검신이 가늘고 길며 끝이 매우 뾰족하여 검이 갑옷의 틈새를 파고들어가 깊은 곳까지 관통할 수 있어서 찌르는 무기.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:42,part:3,grade:1,display:142,na:{ko:'페스카즈',en:'Persqabz'},kg:0.4,price:100,color:["#FBB040","#FBB040","#754C29"],socket:2,txt:{ko:'페스카즈는 예리한 날을 갖추고 있으며 면도칼 같이 날카로운 느낌을 갖는 단검으로 알려져 있다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                ],
                [//unique

                ],
                [//legend

                ]
            ],
            [//검1
                [//normal,magic,rare,epic
                    {idx:8,part:3,grade:1,display:108,na:{ko:'월도',en:'Moon Blade'},kg:2.5,price:100,color:["#ffffff","#3C2415"],socket:2,txt:{ko:'월도(月刀)는 외날에 긴 자루를 가진 도(刀) 계열의 무기를 일컫는다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:9,part:3,grade:1,display:109,na:{ko:'일본도',en:'Japanese Sword'},kg:1,price:100,color:["#ffffff", "#EE1C4E"],socket:2,txt:{ko:'타치(太刀)나 우치가타나(打刀) 등을 포함하는 일본의 전통 도검이다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:10,part:3,grade:1,display:110,na:{ko:'환도',en:'Military Sword'},kg:1,price:100,color:["#ffffff", "#EE1C4E"],socket:2,txt:{ko:'한반도 지역 국가들의 전통 무기로, 고리를 사용하여 패용(佩用)하였던 도검(刀劍)들을 일컫는다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:11,part:3,grade:1,display:111,na:{ko:'환두대도',en:'Military Large Sword'},kg:1,price:100,color:["#ffffff", "#FEBC12"],socket:2,txt:{ko:'대한민국 역사에서 가장 오랫동안 사용한 군사 도검이다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:12,part:3,grade:1,display:112,na:{ko:'글라디우스',en:'Gradius'},kg:1.1,price:100,color:["#ffffff", "#B39C31"],socket:2,txt:{ko:'글라디우스는 로마군의 대표적인 한손검이다. 로마군의 표준 제식 무장이자 주력 무기였다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:13,part:3,grade:1,display:113,na:{ko:'레이피어',en:'Rapier'},kg:1.5,price:100,color:["#ffffff", "#A7A9AC"],socket:2,txt:{ko:'16~17세기 유럽에서 사용된 검으로 베기보다는 찌르기에 특화된 형태의 검.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:14,part:3,grade:1,display:114,na:{ko:'세이버',en:'Sabre'},kg:1.1,price:100,color:["#ffffff", "#FBB040","#754C29"],socket:2,txt:{ko:'근대 유럽을 대표하는 기병용 장검. 주로 한손으로 쓰는 휘어진 외날도(刀)로 알려져 있다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:15,part:3,grade:1,display:115,na:{ko:'시미터',en:'Scimitar'},kg:1.5,price:100,color:["#ffffff", "#FBB040","#754C29"],socket:2,txt:{ko:'중동에서 기원한 곡도를 일컫는 말. 흔히 초승달처럼 휘어있는 곡률이 큰 중동제 곡도.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:16,part:3,grade:1,display:116,na:{ko:'브로드소드',en:'Broad Sword'},kg:1.6,price:100,color:["#ffffff", "#A5A4A4"],socket:2,txt:{ko:'중국의 도(刀, Dao)를 영어로 번역할 때 브로드소드라고 하는 경우도 종종 있다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:17,part:3,grade:1,display:117,na:{ko:'팔카타',en:'Falcata'},kg:1.2,price:100,color:["#ffffff", "#FBB040","#754C29"],socket:2,txt:{ko:'그리스의 중장보병 호플리테스들이 즐겨 쓴 검.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                ],
                [//unique

                ],
                [//legend

                ]
            ],
            [//양손검2
                [//normal,magic,rare,epic
                    {idx:31,part:3,grade:1,display:131,na:{ko:'롱소드',en:'Long Sword'},kg:2,price:100,color:["#ffffff"],socket:2,txt:{ko:'유럽에서 쓰인 양날 양손 도검이다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:32,part:3,grade:1,display:132,na:{ko:'바스타드소드',en:'Bastard Sword'},kg:3,price:100,color:["#ffffff"],socket:2,txt:{ko:'폭의 변화가 매우 큰(테이퍼진) 검신을 지닌 롱소드.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:33,part:3,grade:1,display:133,na:{ko:'그레이트소드',en:'Great Sword'},kg:3,price:100,color:["#ffffff","#831529"],socket:2,txt:{ko:'그레이트소드는 말 그대로 대검이라는 의미. 대검이라는 것 외에 단어가 특정짓는 특징은 없다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:34,part:3,grade:1,display:134,na:{ko:'익시큐셔너소드',en:'Executioner Sword'},kg:2,price:100,color:["#ffffff","#FBB040","#754C29"],socket:2,txt:{ko:'이름 그대로 사형집행인들이 죄인을 참수형에 처할때 쓰기 위해 특별히 만들어진 도검이다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:35,part:3,grade:1,display:135,na:{ko:'츠바이헨더',en:'Zweihänder'},kg:6,price:100,color:["#ffffff","#FBB040","#754C29"],socket:2,txt:{ko:'르네상스 시대, 16세기경에 주로 사용된 독일제 트루 투핸더를 말한다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:36,part:3,grade:1,display:136,na:{ko:'클레이모어',en:'Claymore'},kg:4.5,price:100,color:["#ffffff","#831529"],socket:2,txt:{ko:'15세기에서 17세기까지 스코틀랜드의 하이랜더들이 사용한 것으로 유명하다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:37,part:3,grade:1,display:137,na:{ko:'플랑베르주',en:'Flamberge'},kg:3.5,price:100,color:["#ffffff","#FCEE22"],socket:2,txt:{ko:'서양의 도검류 중 한 종류로, 물결치는 형태의 날을 가진 검이다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                ],
                [//unique

                ],
                [//legend

                ]
            ],
            [//둔기3
                [//normal,magic,rare,epic
                    {idx:18,part:3,grade:1,display:118,na:{ko:'편',en:'Whip'},kg:1.5,price:100,color:["#603913"],socket:2,txt:{ko:'중국의 병장기. 간혹 簡이라고 쓰기도 한다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:19,part:3,grade:1,display:119,na:{ko:'철편',en:'Bull Whip'},kg:3.5,price:100,color:["#603913"],socket:2,txt:{ko:'철편(鐵鞭)은 회초리와 비슷하게 생긴 타격 무기의 일종이다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:20,part:3,grade:1,display:120,na:{ko:'금쇄봉',en:'Gold Mace'},kg:5,price:100,color:["#603913"],socket:2,txt:{ko:'중세 일본의 철퇴 중 하나. 카나사이보라고 읽으며, 테츠보(鉄棒), 혹은 카나보(金棒)라고도 불린다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:21,part:3,grade:1,display:121,na:{ko:'철퇴',en:'Mace'},kg:4,price:100,color:["#ffffff"],socket:2,txt:{ko:'철퇴(鐵槌)는 병장기의 하나로, 막대끝에 돌기나 무게추가 달려있어 한손으로 휘두를 수 있는 몽둥이다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:44,part:3,grade:1,display:144,na:{ko:'워해머',en:'War Hammer'},kg:3,price:100,color:["#ffffff"],socket:2,txt:{ko:'전투용으로 쓰이는 무거운 망치.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                ],
                [//unique

                ],
                [//legend

                ]
            ],
            [//창4
                [//normal,magic,rare,epic
                    {idx:0,part:3,grade:1,display:123,na:{ko:'극',en:'Oriental Polearm'},kg:3.5,price:100,color:["#ffffff"],socket:2,txt:{ko:'戟. 중국의 고대 폴암으로 긴 손잡이 끝에 단검이 붙었고 그보다 조금 밑에 보조날이 달린 무기.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:1,part:3,grade:1,display:124,na:{ko:'나기나타',en:'Oriental Glaive'},kg:3,price:100,color:["#ffffff","#FBB040"],socket:2,txt:{ko:'일본 헤이안 시대부터 쓰이기 시작한 전근대 장병도(長柄刀) 계열 무기이며, 장병기의 일종이다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:2,part:3,grade:1,display:143,na:{ko:'배틀액스',en:'Battle Axe'},kg:4,price:100,color:["#ffffff"],socket:2,txt:{ko:'도구인 도끼를 인마살상용 전쟁무기로 개량한 무기로 도끼날이 얇고 예각인 것이 특징이다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:3,part:3,grade:1,display:145,na:{ko:'랜스',en:'Lance'},kg:4,price:100,color:["#ffffff","#BCBEC0"],socket:2,txt:{ko:'거대한 원뿔형태를 한 창으로, 손으로 겨누고 겨드랑이로 고정할 수 있도록 뒷부분이 짧게 설계되어 있다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:4,part:3,grade:1,display:146,na:{ko:'파이크',en:'Pike'},kg:5,price:100,color:["#ffffff"],socket:2,txt:{ko:'적을 위협하는데 효과적인 수단의 나뭇잎 모양 창.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:5,part:3,grade:1,display:147,na:{ko:'버디슈',en:'Berdysh'},kg:5,price:100,color:["#ffffff"],socket:2,txt:{ko:'긴 자루 끝에 초승달 모양의 도끼날을 달아둔 형상의 무기.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:6,part:3,grade:1,display:148,na:{ko:'빌',en:'Bill'},kg:3,price:100,color:["#ffffff"],socket:2,txt:{ko:'유럽에서 사용하던 것으로 농기구에서 먼저 발전해 전쟁사에 이름이 등장하며 영국에서는 ‘무기를 들고 일어서라’라는 의미인 ‘활과 창’을 의미한다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:7,part:3,grade:1,display:149,na:{ko:'파르티잔',en:'Partisan'},kg:2.5,price:100,color:["#ffffff"],socket:2,txt:{ko:'날의 평평한 부분에는 조각이나 투각같은 장식이 새겨져 있고 사용자의 상황에 따라 베고 찌를수 있도록 디자인이 되었다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:8,part:3,grade:1,display:150,na:{ko:'스피툼',en:'Spetum'},kg:2.5,price:100,color:["#ffffff"],socket:2,txt:{ko:'파르티잔의 한 종류로 창날 밑동에 칼날을 세운 날개 두 개가 튀어나온 형태이다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:9,part:3,grade:1,display:151,na:{ko:'워사이드',en:'War Scythe'},kg:2.2,price:100,color:["#ffffff"],socket:2,txt:{ko:'대낫이 개량되어 전투에 적합한 형태가 된 것이 서양의 폴암 중 하나인 워 사이드.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                ],
                [//unique
                    [],
                    [],
                    [],
                    [
                        {idx:3,part:3,grade:5,display:400,na:{ko:'죽창',en:'Oriental Glaive'},kg:0.5,price:100,color:[],socket:2,txt:{ko:'죽창(竹槍)은 대나무로 만든 창을 말한다. 대창이라고도 불린다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    ],
                    [],
                    [],
                    [],
                    [],
                    [
                        {idx:8,part:3,grade:5,display:401,na:{ko:'당파',en:'Oriental Glaive'},kg:3,price:100,color:[],socket:2,txt:{ko:'무기의 일종, 삼지창처럼 생겼으나 좌우의 가지 부분이 옆으로 갈라지는 형태로 생겼다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    ],
                ],
                [//legend

                ]
            ],
            [//도끼5
                [//normal,magic,rare,epic
                ],
                [//unique
                ],
                [//legend
                ]
            ],
            [//활6
                [//normal,magic,rare,epic
                    {idx:26,part:3,grade:1,display:126,na:{ko:'수리검',en:'Shuriken'},kg:0.5,price:100,color:["#BCBEC0","#000000"],socket:2,txt:{ko:'던져서 적을 맞히는 것을 목적으로 하는 표창 계열의 무기.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:27,part:3,grade:1,display:127,na:{ko:'궁',en:'Short Bow'},kg:1.2,price:100,color:["#70C169","#FBA919"],socket:2,txt:{ko:'화살을 먼거리로 보내기위한 도구, 원거리 무기',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:28,part:3,grade:1,display:128,na:{ko:'장궁',en:'Long Bow'},kg:2,price:100,color:["#ED1F24","#FBA919"],socket:2,txt:{ko:'궁(활)보다 크기가 큰 원거리 무기',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:29,part:3,grade:1,display:129,na:{ko:'석궁',en:'Crossbow'},kg:2.2,price:100,color:["#A76928","#991B1E","#FBA919"],socket:2,txt:{ko:'활과 유사한 대표적인 발사 무기. 옛 한국에서는 쇠뇌라고 불렀다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:30,part:3,grade:1,display:130,na:{ko:'철선',en:'Iron Fan'},kg:0.3,price:100,color:["#ffffff"],socket:2,txt:{ko:'Iron Fan. War Fan. 쇠로 만든 부채. 믿기 어렵겠지만 무기이다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                ],
                [//unique
                ],
                [//legend
                ]
            ],
            [//타격7
                [//normal,magic,rare,epic
                    {idx:22,part:3,grade:1,display:122,na:{ko:'톤파',en:'Tonfa'},kg:1,price:100,color:["#F7941E"],socket:2,txt:{ko:'중국 拐(괴) 단봉형 무기가 오키나와에 와서 변형되어 오키나와에서 유래한 날없는 타격 무기다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:25,part:3,grade:1,display:125,na:{ko:'차크람',en:'Chakram'},kg:1.2,price:100,color:["#ffffff"],socket:2,txt:{ko:'시크교 신도의 전통 투척 무기, 산스크리트어로 \'둥근\', \'원\', \'바퀴\' 등을 뜻하는 차크라에서 유래하였다.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:59,part:3,grade:1,display:159,na:{ko:'너클',en:'Knuckle'},kg:0.5,price:100,color:["#939598","#000000"],socket:2,txt:{ko:'뾰족한 돌기가 있는 금속의 맨손무기.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                ],
                [//unique
                ],
                [//legend
                ]
            ],
            [//방패8
                [//normal,magic,rare,epic
                    {idx:52,part:3,grade:1,display:152,na:{ko:'버클러',en:'Buckler'},kg:1,price:100,color:["#ffffff","#58595B"],socket:2,txt:{ko:'직경 또는 둘레가 30cm정도 되는 원형, 사각형 소형 방패.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:53,part:3,grade:1,display:153,na:{ko:'타지',en:'Targa'},kg:0.7,price:100,color:["#603913","#FBB040"],socket:2,txt:{ko:'직경 또는 둘레가 30cm정도 되는 원형, 사각형 소형 방패.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:54,part:3,grade:1,display:154,na:{ko:'라운드실드',en:'Round Shield'},kg:1.5,price:100,color:["#ffffff","#000000","#ED1C24"],socket:2,txt:{ko:'고대부터 사용된 원형형태의 방패.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:55,part:3,grade:1,display:155,na:{ko:'카이트실드',en:'Kite Shield'},kg:1,price:100,color:["#603913","#FBB040"],socket:2,txt:{ko:'중세 초기에 유럽 각지에서 사용한 가오리연과 비슷하게 생긴 방패.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:56,part:3,grade:1,display:156,na:{ko:'히터실드',en:'Heater Shield'},kg:6.5,price:100,color:["#3F6731","#EE1C4E","#FEEB00"],socket:2,txt:{ko:'10세기 중엽부터 등장한 외형은 카이트 실드의 위아래를 짧게 자른듯한 축소형 중세 유럽의 방패.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:57,part:3,grade:1,display:157,na:{ko:'스쿠툼',en:'Scutum'},kg:8,price:100,color:["#939598","#000000"],socket:2,txt:{ko:'목제 방패로, 타원형과 직사각형 모양의 로마군이 장비한 제식 방패.',en:''},eff:[{type:4,num:['5','50']}],set:0},
                    {idx:58,part:3,grade:1,display:158,na:{ko:'파비스',en:'Pavise'},kg:8,price:100,color:["#939598","#000000","#19469B"],socket:2,txt:{ko:'중세 유럽의 전쟁에서 궁병이나 쇠뇌병들이 사용한 대형방패.',en:''},eff:[{type:4,num:['5','50']}],set:0},
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
        {idx:0,grade:0,stone:'empty',display:0,na:'',price:0,action:9,eff:[]},//
        {idx:1,grade:1,stone:'w',display:1,na:{ko:'작은 흰돌',en:''},price:100,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:3,num:'10'}]},//
        {idx:2,grade:2,stone:'w',display:2,na:{ko:'흰돌',en:''},price:200,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:3,num:'30'}]},
        {idx:3,grade:3,stone:'w',display:3,na:{ko:'빛나는 흰돌',en:''},price:400,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:3,num:'60'}]},
        {idx:4,grade:4,stone:'w',display:4,na:{ko:'큰 흰돌',en:''},price:1000,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:3,num:'100'}]},
        {idx:5,grade:1,stone:'k',display:5,na:{ko:'작은 흑돌',en:''},price:100,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:4,num:'10'}]},//HP
        {idx:6,grade:2,stone:'k',display:6,na:{ko:'흑돌',en:''},price:200,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:4,num:'30'}]},
        {idx:7,grade:3,stone:'k',display:7,na:{ko:'빛나는 흑돌',en:''},price:400,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:4,num:'60'}]},
        {idx:8,grade:4,stone:'k',display:8,na:{ko:'큰 흑돌',en:''},price:1000,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:4,num:'100'}]},
        {idx:9,grade:1,stone:'r',display:9,na:{ko:'작은 적돌',en:''},price:100,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:4,num:'10'}]},//공
        {idx:10,grade:2,stone:'r',display:10,na:{ko:'적돌',en:''},price:200,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:4,num:'30'}]},
        {idx:11,grade:3,stone:'r',display:11,na:{ko:'빛나는 적돌',en:''},price:400,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:4,num:'60'}]},
        {idx:12,grade:4,stone:'r',display:12,na:{ko:'큰 적돌',en:''},price:1000,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:4,num:'100'}]},
        {idx:13,grade:1,stone:'b',display:13,na:{ko:'작은 청돌',en:''},price:100,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:4,num:'1'}]},//방
        {idx:14,grade:2,stone:'b',display:14,na:{ko:'청돌',en:''},price:200,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:4,num:'2'}]},
        {idx:15,grade:3,stone:'b',display:15,na:{ko:'빛나는 청돌',en:''},price:400,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:4,num:'2'}]},
        {idx:16,grade:4,stone:'b',display:16,na:{ko:'큰 청돌',en:''},price:1000,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:4,num:'100'}]},
        {idx:17,grade:1,stone:'y',display:17,na:{ko:'작은 황돌',en:''},price:100,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:4,num:'10'}]},//술공
        {idx:18,grade:2,stone:'y',display:18,na:{ko:'황돌',en:''},price:200,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:4,num:'30'}]},
        {idx:19,grade:3,stone:'y',display:19,na:{ko:'빛나는 황돌',en:''},price:400,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:4,num:'60'}]},
        {idx:20,grade:4,stone:'y',display:20,na:{ko:'큰 황돌',en:''},price:1000,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:4,num:'100'}]},
        {idx:21,grade:1,stone:'g',display:21,na:{ko:'작은 녹돌',en:''},price:100,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:4,num:'10'}]},//술방
        {idx:22,grade:2,stone:'g',display:22,na:{ko:'녹돌',en:''},price:200,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:4,num:'30'}]},
        {idx:23,grade:3,stone:'g',display:23,na:{ko:'빛나는 녹돌',en:''},price:400,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:4,num:'60'}]},
        {idx:24,grade:4,stone:'g',display:24,na:{ko:'큰 녹돌',en:''},price:1000,txt:{ko:'마력이 깃든 돌',en:''},action:9,eff:[{type:4,num:'100'}]},
    ],
    upgrade:[//업그레이드 아이템
        {idx:0,grade:1,display:0,na:{ko:'작은 강화의돌',en:''},price:50,
        action:10,txt:{ko:'장비강화 재료(매우 낮은 확률)',en:''},eff:[75,50,25,10,0.5,0.2,0.1]},
        {idx:1,grade:2,display:1,na:{ko:'강화의돌',en:''},price:100,
        action:10,txt:{ko:'장비강화 재료(낮은 확률)',en:''},eff:[75,75,50,25,10,0.5,0.2]},
        {idx:2,grade:3,display:2,na:{ko:'큰 강화의돌',en:''},price:300,
        action:10,txt:{ko:'장비강화 재료(보통 확률)',en:''},eff:[75,75,75,50,25,2,0.5]},
        {idx:3,grade:4,display:3,na:{ko:'아주 큰 강화의돌',en:''},price:500,
        action:10,txt:{ko:'장비강화 재료(높은 확률)',en:''},eff:[75,75,75,75,50,10,5]},
        {idx:4,grade:5,display:4,na:{ko:'완벽한 강화의돌',en:''},price:1000,
        action:10,txt:{ko:'장비강화 재료(높은 확률)',en:''},eff:[50,50,50,50,50,50,25]},
    ],
    material:[//재료
    ],
    etc:[
        {idx:0,grade:0,display:0,na:{ko:'동전더미(동)',en:''},price:1000,
        action:99,txt:{ko:'G조각 1000개로 판매할 수 있다.',en:''},eff:1000},
        {idx:1,grade:1,display:1,na:{ko:'동전더미(은)',en:''},price:5000,
        action:99,txt:{ko:'G조각 5000개로 판매할 수 있다.',en:''},eff:5000},
        {idx:2,grade:2,display:2,na:{ko:'동전더미(금)',en:''},price:10000,
        action:99,txt:{ko:'G조각 10000개로 판매할 수 있다.',en:''},eff:10000},
        {idx:3,grade:3,display:10,na:{ko:'경험의책I',en:''},price:100,
        action:98,txt:{ko:'100의 경험치를 획들 할 수 있다.',en:''},eff:100},
        {idx:4,grade:4,display:10,na:{ko:'경험의책II',en:''},price:100,
        action:98,txt:{ko:'1000의 경험치를 획들 할 수 있다.',en:''},eff:1000},
        {idx:5,grade:5,display:10,na:{ko:'경험의책III',en:''},price:100,
        action:98,txt:{ko:'10000의 경험치를 획들 할 수 있다.',en:''},eff:10000},
        {idx:6,grade:6,display:10,na:{ko:'경험의책IV',en:''},price:100,
        action:98,txt:{ko:'50000의 경험치를 획들 할 수 있다.',en:''},eff:50000},
        {idx:7,grade:7,display:10,na:{ko:'경험의책V',en:''},price:100,
        action:98,txt:{ko:'100000의 경험치를 획들 할 수 있다.',en:''},eff:100000},
        {idx:8,grade:0,display:0,na:'',txt:'',eff:[]},
        {idx:9,grade:0,display:0,na:'',txt:'',eff:[]},
        {idx:10,grade:0,display:10,na:{ko:'선물상자',en:''},price:100,action:100,txt:{ko:'무언가 나올 것 같은 기분좋은 상자',en:''},eff:['?']},
        {idx:11,grade:0,display:0,na:'',txt:'',eff:[]},
        {idx:12,grade:0,display:0,na:'',txt:'',eff:[]},
        {idx:13,grade:0,display:0,na:'',txt:'',eff:[]},
        {idx:14,grade:0,display:0,na:'',txt:'',eff:[]},
        {idx:15,grade:0,display:0,na:'',txt:'',eff:[]},
        {idx:16,grade:0,display:0,na:'',txt:'',eff:[]},
        {idx:17,grade:0,display:0,na:'',txt:'',eff:[]},
        {idx:18,grade:0,display:0,na:'',txt:'',eff:[]},
        {idx:19,grade:0,display:0,na:'',txt:'',eff:[]},
        {idx:20,grade:0,display:10,na:{ko:'ID교환권',en:''},price:100,action:1,txt:{ko:'ID를 변경할수 있다.',en:''},eff:['?']},
        {idx:21,grade:0,display:10,na:{ko:'스킬제거권',en:''},price:100,action:11,txt:{ko:'캐릭터의 스킬을 제거할수 있다.',en:''},eff:['?']},
    ]
}