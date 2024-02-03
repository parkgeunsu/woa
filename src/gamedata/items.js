export const items = {
  slotModifier:{ko:['','사파이어의','에메랄드의','루비의','다이아몬드의'],en:['','Sapphire\'s','Emerald\'s','Ruby\'s','Diamond\'s'],jp:['','サファイアの','エメラルドの','ルビーの','ダイヤモンドの'],},
  markModifier:{ko:['','','두마리','세마리','네마리'],en:['','a','two','three','four'],jp:['','','二匹','三匹','四匹']},
  item_point_light:['#ffdf8b','#00ff00','#d9e506','#ff00bf','#f00a36','#ed3b21','#ff6908','#ffc719','#ae9a64','#8ba753','#598c14','#dbe0e3','#fff','#FFD1D8','#FFFFD1','#FFE39B','#9CFFE6','#b0a696','#2dde98','#4a8594','#1fb3e0','#2e9df7'],
  item_point_dark:['#8e43e7','#52057f','#cd3292','#bf033b','#335238','#213e97','#003666','#051736','#706357'],
  item_point_color:['#8e43e7','#52057f','#cd3292','#ff00bf','#bf033b','#f00a36','#ed3b21','#ff6908','#ffc719','#ffdf8b','#d9e506','#ae9a64','#8ba753','#598c14','#335238','#2dde98','#00ff00','#4a8594','#1fb3e0','#2e9df7','#213e97','#003666','#051736','#706357','#b0a696','#dbe0e3','#fff','#FFD1D8','#FFFFD1','#FFE39B','#9CFFE6'],//아이템 포인트 컬러
  set_type:[//셋트아이템 효과
    //set_num 셋트갯수
    //part 부위
    {idx:0},
    {idx:1,na:{ko:'나무의 축복',en:'',jp:''},part:[0,1,2,3,4],set_num:[5],eff:[{type:0,num:'500'}]},
    {idx:2,na:{ko:'철든 XX',en:'',jp:''},part:[5,6,7,8,9],set_num:[5],eff:[{type:3,num:'100'},{type:0,num:'700'}]},
  ],
  colorant:{//색료조합 아이템
    2:[
      {idx:0,na:{ko:'흑백',en:'Black and white',jp:'白黒'},socket:['000','fff'],eff:[{type:5,num:['300']}],color:['#888'],svgColor:''},
    ],
    3:[],
    4:[
      {idx:0,na:{ko:'피로 물든',en:'Stained with Blood',jp:'血に染まった'},socket:['f00','f00','f00','f00'],eff:[{type:5,num:['300']}],color:['#f00'],svgColor:''},

      {idx:1,na:{ko:'채식주의자',en:'Vegetarian',jp:'ベジタリアン'},socket:['080','080','080','080'],eff:[{type:0,num:['1000']}],color:['#080'],svgColor:''}
    ],
    5:[
      {idx:0,na:{ko:'무지개',en:'Rainbow',jp:'レインボー'},socket:['f00','f80','ff0','080','00f'],eff:[{type:5,num:['300']}],color:['#fff'],svgColor:'linear_rainbow'},

      {idx:1,na:{ko:'얼룩덜룩',en:'Mottled',jp:'斑点'},socket:['000','fff','000','fff','000'],eff:[{type:4,num:['300']}],color:['#000'],svgColor:'Mottled'},
    ],
  },
  equip:{//part 부위 head1, body2, weapon3, ring4, necklace5, baggage짐, 보석11, 업그레이드12, 기타13, 재료14
  //eff type(효과 dmg_type&buff_type) 체력HP(0), 행동력SP(1), 행동회복력RSP(2), 공격력ATK(3), 방어력DEF(4), 술법공격력MAK(5), 술법방어력MDF(6), 회복력RCV(7), 속도SPD(8), 행운LUK(9), 쪼기(10),할퀴기(11),물기(12),치기(13),누르기(14),던지기(15), 빛(21),어둠(22),물(23),불(24),바람(25),땅(26), 진형(100)
  //action 아이템 동작 아이디변경(1), 홀장착(9), 장비강화(10), 스킬제거(11), 골드변경(99), 랜덤뽑기(100)
  //display 이미지번호
  //grade 레어등급 (1일반normal, 2매직magic, 3레어rare, 4에픽epic, 5유니크unique, 6레전드legend, 7세트set)
  //requiredSlot 아이템착용시 필요슬롯
  //actionType 쪼기0, 할퀴기1, 물기2, 치기3, 누르기4, 던지기5
  //upgrade 증가된등급
  //set 셋트번호 0없음
  //hole 홀장착
  //enhance 강화
    1:[//모자
      [
        [//normal,magic,rare,epic
          {idx:0,part:1,grade:1,display:0,na:{ko:'터번',en:'Turban',jp:'ターバン'},kg:0.1,price:100,color:["#fff"],socket:2,txt:{ko:'머리에 둘둘 감고 다니는 천',en:'A cloth wrapped around one\'s head',jp:'頭に巻いて持ち歩く布'},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','10']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],country:'',set:0},
          
          {idx:1,part:1,grade:1,display:1,na:{ko:'두정투',en:'\'Doojung\' Helm',jp:'頭釘鬪'},kg:3,price:1000,color:["#fff","#e2ae37"],socket:3,txt:{ko:'가죽에 옻칠을 한 투구',en:'A leather-lacquered helmet',jp:'革に漆を塗った兜'},eff:[{type:4,num:['50','200']},{type:6,num:['50','250']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],country:'',set:0},

          {idx:2,part:1,grade:1,display:10,na:{ko:'스컬 캡',en:'Skull Cap',jp:'スカルキャップ'},kg:3,price:500,color:["#fff"],socket:2,txt:{ko:'반구 형태의 철제 투구',en:'A hemispherical iron helmet',jp:'半球型の鉄製の兜'},eff:[{type:4,num:['50','100']},{type:6,num:['100','200']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true,false,true,true,true,true],country:'',set:0},

          {idx:3,part:1,grade:1,display:2,na:{ko:'코니컬 헬름',en:'Conical Helm',jp:'コニカルヘルム'},kg:5,price:500,color:["#fff"],socket:2,txt:{ko:'원뿔형태의 철제 투구',en:'A conical iron helmet',jp:'円錐形の鉄製ヘルメット'},eff:[{type:4,num:['100','150']},{type:6,num:['50','200']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,false,true,false,false,false,true,true,true,false,true,true,true,true],country:'',set:0},

          {idx:4,part:1,grade:1,display:7,na:{ko:'풀 헬름',en:'Full Helm',jp:'フルヘルム'},kg:7,price:700,color:["#fff"],socket:3,txt:{ko:'헬름을 강화시킨 투구',en:'A helmet reinforced with Helm',jp:'ヘルムを強化した兜'},eff:[{type:4,num:['150','250']},{type:6,num:['100','200']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,false,true,false,false,false,true,true,true,false,true,true,true,true],country:'',set:0},

          {idx:5,part:1,grade:1,display:9,na:{ko:'본 헬름',en:'Bone Helm',jp:'ボーンヘルム'},kg:6,price:700,color:["#fff"],socket:4,txt:{ko:'짐승의 뼈로 만든 투구',en:'A helmet made of animal bones',jp:'獣の骨で作られた兜'},eff:[{type:4,num:['100','300']},{type:6,num:['150','300']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,false,true,false,false,false,true,true,true,false,true,true,true,true],country:'',set:0},

          {idx:6,part:1,grade:1,display:6,na:{ko:'헤럴드리 헬름',en:'Heraldry Helm',jp:'ヘラルド・ヘルム'},kg:14,price:1500,color:["#fff"],socket:3,txt:{ko:'폐쇄형 강철 투구',en:'A closed steel helmet',jp:'密閉型スチールヘルメット'},eff:[{type:4,num:['200','350']},{type:6,num:['200','300']}],actionType:"",requiredSlot:1,limit:[true,false,false,true,false,false,false,false,false,false,true,false,false,true,false,false,false],country:'',set:0},

          {idx:7,part:1,grade:1,display:8,na:{ko:'그레이트 헬름',en:'Great Helm',jp:'グレートヘルム'},kg:25,price:2000,color:["#fff","#AF8C4F"],socket:4,txt:{ko:'우수한 방어효과 만큼 무거운 투구',en:'Helm as heavy as a good defense',jp:'優れた防御効果と同じくらい重い兜'},eff:[{type:4,num:['350','500']},{type:6,num:['200','350']}],actionType:"",requiredSlot:1,limit:[true,false,false,true,false,false,false,false,false,false,true,false,false,true,false,false,false],country:'',set:0},
        ],
        [//unique

        ],
        [//legend

        ]
      ]
      // {idx:6,part:1,grade:1,display:3,na:'코니컬 헬름II',kg:4,price:200,color:["#fff","#000"],socket:3,txt:'Conical Helm II 원뿔형태에서 변형시킨 투구',eff:[{type:4,num:['130','180']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true],country:'',set:0},
      // {idx:4,part:1,grade:1,display:5,na:'마스크드 헬름',kg:7,price:200,color:["#fff","#000"],socket:3,txt:'Masked helm 얼굴을 완벽히 보호되는 투구',eff:[{type:4,num:['150','300']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true],country:'',set:0},
    ],
    2:[//갑옷
      [
        [//normal,magic,rare,epic
          {idx:0,part:2,grade:1,display:20,na:{ko:'클로스 클로시즈',en:'Cloth Clothes',jp:'クロースクローゼット'},kg:1,price:100,color:["#F57E20"],socket:2,txt:{ko:'천으로 만든 가벼운 옷, 천옷',en:'Light clothes made of cloth',jp:'布で作られた軽い服、布の服'},eff:[{type:4,num:['5','50']},{type:6,num:['50','100']},{type:8,num:['1','5']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],country:'',set:0},

          {idx:1,part:2,grade:1,display:21,na:{ko:'퀄티드 아머',en:'Quiled Armor',jp:'クォーティッドアーマー'},kg:5,price:300,color:["#FEC260"],socket:3,txt:{ko:'천을 기워 붙인 갑옷, 면갑',en:'A cloth armour',jp:'布を張り合わせた鎧、綿甲冑、綿手袋'},eff:[{type:4,num:['50','100']},{type:6,num:['100','200']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],country:'',set:0},

          {idx:2,part:2,grade:1,display:22,na:{ko:'하이드 아머',en:'Hide Armor',jp:'ハイドアーマー'},kg:7,price:400,color:["#C16F2B"],socket:4,txt:{ko:'조끼형태의 가죽 갑옷',en:'Leather armor in the form of a vest',jp:'ベスト型のレザーアーマー'},eff:[{type:4,num:['30','120']},{type:6,num:['50','150']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,false,false,true,true,true,true,true,true,true,true,true],country:'',set:0},

          {idx:3,part:2,grade:1,display:23,na:{ko:'레더 아머',en:'Lether Armor',jp:'レザーアーマー'},kg:10,price:500,color:["#C16F2B"],socket:3,txt:{ko:'가죽으로 만든 갑옷',en:'Armor made of leather',jp:'革で作られた鎧'},eff:[{type:4,num:['50','150']},{type:6,num:['150','200']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,false,false,true,true,true,true,true,true,true,true,true],country:'',set:0},

          {idx:4,part:2,grade:1,display:24,na:{ko:'스터디드 레더 아머',en:'Studded Lether Armor',jp:'スタッズ付きレザーアーマー'},kg:5,price:700,color:["#E4AF51"],socket:3,txt:{ko:'징박힌 가죽 갑옷',en:'Armor covered with dozens of metal projections in leather',jp:'ジンクスレザーアーマー'},eff:[{type:4,num:['100','200']},{type:6,num:['180','220']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,false,false,true,true,true,true,true,true,true,true,true],country:'',set:0},

          {idx:5,part:2,grade:1,display:25,na:{ko:'링 메일',en:'Ring Mail',jp:'リングメール'},kg:11,price:1000,color:["#fff"],socket:3,txt:{ko:'사슬 형태의 철제 갑옷',en:'A chain of iron armor',jp:'チェーン型の鉄製の鎧'},eff:[{type:4,num:['150','250']},{type:6,num:['100','250']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,false,false,false,false,false,true,true,true,false,true,true,false,true],country:'',set:0},

          {idx:6,part:2,grade:1,display:26,na:{ko:'스케일 메일',en:'Scale Mail',jp:'スケールメール'},kg:13,price:1500,color:["#E6E7E8"],socket:4,txt:{ko:'금속조각을 붙힌 갑옷, 어린갑',en:'A piece of metal armor',jp:'金属片を貼り付けた鎧、幼い鎧'},eff:[{type:4,num:['170','270']},{type:6,num:['200','300']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,false,false,false,false,false,true,true,true,false,true,true,false,true],country:'',set:0},

          {idx:7,part:2,grade:1,display:27,na:{ko:'체인 메일',en:'Chain Mail',jp:'チェーンメール'},kg:15,price:1200,color:["#fff"],socket:3,txt:{ko:'메쉬형태로 금속링을 엮은 갑옷, 쇄자갑',en:'Armor made of metal rings woven together in a mesh, a chainmail.',jp:'メッシュ状に金属リングを編み込んだ鎧、鎖帷子鎧。'},eff:[{type:4,num:['200','300']},{type:6,num:['150','300']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,false,false,false,false,false,true,true,true,false,true,true,false,true],country:'',set:0},

          {idx:8,part:2,grade:1,display:28,na:{ko:'스피린트 메일',en:'Splint Mail',jp:'スピリントメール'},kg:17,price:1500,color:["#9B8579"],socket:4,txt:{ko:'천이나 가죽에 금속 스트립을 엮은 갑옷, 경번갑',en:'A mesh-type metal ring of armor',jp:'布や革に金属片を編み込んだ鎧、軽装甲。'},eff:[{type:4,num:['250','400']},{type:6,num:['250','400']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,false,false,false,false,false,true,true,true,false,true,true,false,true],country:'',set:0},

          {idx:9,part:2,grade:1,display:29,na:{ko:'브리간딘',en:'Brigandine',jp:'ブリガンディン'},kg:20,price:2000,color:["#D1D3D4"],socket:4,txt:{ko:'가죽 겉 감 안에 철판을 덧댄 갑옷, 두정갑',en:'Armor with iron plate inside leather cover',jp:'革の外装の中に鉄板を張った鎧、頭頂鎧。'},eff:[{type:4,num:['300','450']},{type:6,num:['200','350']}],actionType:"",requiredSlot:1,limit:[true,true,true,true,false,false,false,false,false,true,true,true,false,true,true,false,true],country:'',set:0},

          {idx:10,part:2,grade:1,display:30,na:{ko:'플레이트 메일',en:'Plate Mail',jp:'プレートメール'},kg:27,price:3000,color:["#000"],socket:5,txt:{ko:'강철판으로 만든 갑옷, 판금갑',en:'Armor made of steel plates',jp:'鋼板製の鎧、板金甲冑'},eff:[{type:4,num:['450','600']},{type:6,num:['300','400']}],actionType:"",requiredSlot:1,limit:[true,false,false,true,false,false,false,false,false,false,true,false,false,true,false,false,false],country:'',set:0},

          {idx:11,part:2,grade:1,display:31,na:{ko:'풀 플레이트',en:'Full Plate',jp:'フルプレート'},kg:35,price:4000,color:["#fff"],socket:5,txt:{ko:'전신을 강철판으로 만든 갑옷, 판금갑',en:'Upgraded form of plate mail',jp:'全身を鉄板で作った鎧、板金甲冑。'},eff:[{type:4,num:['600','1000']},{type:6,num:['350','450']}],actionType:"",requiredSlot:1,limit:[true,false,false,true,false,false,false,false,false,false,true,false,false,true,false,false,false],country:'',set:0},
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
          {idx:0,part:3,grade:1,display:100,na:{ko:'마키리',en:'Makiri',jp:'マキリ'},kg:0.5,price:400,color:["#ffffff,#987E2E"],socket:2,txt:{ko:'아이누족의 전통적인 칼.',en:'Traditional Ainu knife',jp:'アイヌ民族の伝統的なナイフ'},eff:[{type:3,num:['50','100']},{type:5,num:['100','200']},{type:8,num:['1','5']}],actionType:[1],requiredSlot:1,limit:[true,true,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],country:'',set:0},

          {idx:1,part:3,grade:1,display:101,na:{ko:'자마다르',en:'Jamadar',jp:'ザマダール'},kg:0.8,price:1000,color:["#ffffff","#FEE05F"],socket:3,txt:{ko:'인도에서 사용된 단검의 일종으로 서양권에 전파되어 서양에서는 자마다르를 \'카타르\'라 부름.',en:'A type of dagger used in India that spread to the West, leading to the jamadar being called a \'qatar\' in the West.',jp:'インドで使われていた短剣の一種で、欧米に伝わり、欧米ではザマダーを「カタール」と呼ぶ。'},eff:[{type:3,num:['100','200']},{type:5,num:['100','250']},{type:8,num:['1','10']}],actionType:[1],requiredSlot:1,limit:[true,true,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],country:'',set:0},

          {idx:2,part:3,grade:1,display:102,na:{ko:'장도',en:'Self Defense Knife',jp:'長刀'},kg:0.2,price:2000,color:["#ffffff","#000000","#FFFFFF"],socket:4,txt:{ko:'칼집이 있는 작은 칼을 말하며, 허리춤에 차고 옷고름에 찬다 하여 패도(佩刀), 주머니에 넣고 다닌다 하여 낭도(囊刀)라고도 불렀다.',en:'A small knife with a scabbard, it was also called a pado (佩刀) because it was worn on the waist, and a nangdao (囊刀) because it was carried in a pocket.',jp:'鞘のある小さな刀を指し、腰に巻いたり、衣服の裾に巻くことから佩刀(ペド)、ポケットに入れて持ち歩くことから囊刀(ナンド)とも呼ばれた。'},eff:[{type:3,num:['1','50']},{type:5,num:['200','400']},{type:8,num:['1','5']}],actionType:[0],requiredSlot:1,limit:[true,true,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],country:'',set:0},

          {idx:3,part:3,grade:1,display:103,na:{ko:'탄토',en:'Dagger',jp:'短刀'},kg:0.4,price:500,color:["#ffffff","#FEBC12"],socket:2,txt:{ko:'탄토(短刀)란, 날 길이 1척(3cm) 이하의 일본도의 총칭이다. 국내에서는 단도라고도 널리 불린다.',en:'Tanto (短刀) is a general term for Japanese swords with a blade length of one inch (3 centimeters) or less. In Korea, it is also widely referred to as a dando.',jp:'短刀（たんとう）とは、刃渡り1尺（3cm）以下の日本刀の総称である。韓国では短刀とも広く呼ばれている。'},eff:[{type:3,num:['10','150']},{type:5,num:['150','200']},{type:8,num:['1','5']}],actionType:[1],requiredSlot:1,limit:[true,true,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],country:'',set:0},

          {idx:4,part:3,grade:1,display:104,na:{ko:'카람빗',en:'Karambit',jp:'カラムビット'},kg:0.5,price:500,color:["#ffffff","#461422"],socket:2,txt:{ko:'말레이시아와 필리핀을 뿌리로 인도네시아 군도, 정확히는 술라웨시 서부에서 탄생한 유명한 다용도 나이프로 고대 원주민의 일상용 포켓나이프였다.',en:'Hailing from the Indonesian archipelago, more specifically western Sulawesi, with roots in Malaysia and the Philippines, this famous multi-purpose knife was the everyday pocket knife of the ancient natives.',jp:'マレーシアとフィリピンをルーツにインドネシア群島、正確にはスラウェシ島西部で生まれた有名な万能ナイフで、古代先住民の日常用ポケットナイフでした。'},eff:[{type:3,num:['20','70']},{type:5,num:['150','250']},{type:8,num:['1','5']}],actionType:[1],requiredSlot:1,limit:[true,true,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],country:'',set:0},

          {idx:5,part:3,grade:1,display:105,na:{ko:'쿠나이',en:'Kunai',jp:'クナイ'},kg:0.5,price:500,color:["#ffffff","#27367A"],socket:1,txt:{ko:'닌자들이 사용했다고 알려진 무기. 성인 남성 손바닥만한 길이의 단검 손잡이 끝에 고리가 달린 형태를 하고 있다.',en:'A weapon said to have been used by ninjas. A dagger about the length of an adult male\'s palm with a loop at the end of the handle.',jp:'忍者が使用したとされる武器。成人男性の手のひらほどの長さの短剣の柄の先に輪が付いた形をしている。'},eff:[{type:3,num:['50','120']},{type:5,num:['1','350']},{type:8,num:['1','10']}],actionType:[5],requiredSlot:1,limit:[true,true,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],country:'',set:0},

          {idx:6,part:3,grade:1,display:106,na:{ko:'쿠크리',en:'Kukri',jp:'ククリ'},kg:1.2,price:600,color:["#ffffff","#FEBC12"],socket:3,txt:{ko:'네팔 구르카족의 전통 도검. Kukri가 가장 보편화되었지만 Khukri, Khukuri 등으로 적기도 한다.',en:'Traditional sword of the Gurkha people of Nepal. Kukri is the most common, but it is also written Khukri, Khukuri, etc.',jp:'ネパール・グルカ族の伝統的な刀剣。Kukriが最も普及しているが、Khukri、Khukuriなどと書くこともある。'},eff:[{type:3,num:['120','240']},{type:5,num:['150','180']},{type:8,num:['1','5']}],actionType:[1],requiredSlot:1,limit:[true,true,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],country:'',set:0},

          {idx:7,part:3,grade:1,display:107,na:{ko:'크리스',en:'Kris',jp:'クリス'},kg:0.7,price:600,color:["#ffffff","#814F20"],socket:3,txt:{ko:'기본적으로 말레이시아와 인도네시아 등지의 검으로, 물결처럼 구불구불한 모양의 특이한 날을 가진 도검.',en:'Basically a sword from Malaysia, Indonesia, and elsewhere with an unusual blade that curves like a wave.',jp:'基本的にマレーシアやインドネシアなどの剣で、波のように曲がりくねった独特の刃を持つ刀剣。'},eff:[{type:3,num:['30','130']},{type:5,num:['100','190']},{type:8,num:['1','5']}],actionType:[1],requiredSlot:1,limit:[true,true,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],country:'',set:0},

          {idx:8,part:3,grade:1,display:138,na:{ko:'런들대거',en:'Rondel Dagger',jp:'ランデルダガー'},kg:0.5,price:500,color:["#ffffff","#FBB040","#754C29"],socket:2,txt:{ko:'중세 후기(14세기경 부근)에 기사와 중장병 계급이 흔히 쓰던 단검이다.',en:'A dagger commonly wielded by knights and heavy soldiers in the late Middle Ages (around the 14th century).',jp:'中世後期（14世紀頃）に騎士や中将階級がよく使っていた短剣である。'},eff:[{type:3,num:['70','100']},{type:5,num:['180','260']},{type:8,num:['1','5']}],actionType:[0],requiredSlot:1,limit:[true,true,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],country:'',set:0},

          {idx:9,part:3,grade:1,display:139,na:{ko:'망고슈',en:'Main-gauche'},kg:1,price:700,color:["#ffffff","#3C56A6","#FBB040"],socket:3,txt:{ko:'중세 후기에서 르네상스 시대에 사용하던 방어용 단검을 뜻한다.영국에서는 패링 대거(Parring Dagger)라고 불렀다.',en:'',jp:''},eff:[{type:3,num:['150','200']},{type:5,num:['100','300']},{type:8,num:['1','5']}],actionType:[1],requiredSlot:1,limit:[true,true,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],country:'',set:0},

          {idx:10,part:3,grade:1,display:140,na:{ko:'배즐러드',en:'Baselard',jp:'バズラード'},kg:0.6,price:700,color:["#ffffff","#FBB040","#754C29"],socket:3,txt:{ko:'칼날 끝부분이 손잡이 끝부분과 마찬가지로 막대기 모향으로 평행을 이루는 단검.',en:'A dagger with the tip of the blade parallel to the end of the handle, oriented like a stick.',jp:'刃先が柄の先端と同様に棒状に平行になる短剣。'},eff:[{type:3,num:['50','120']},{type:5,num:['170','270']},{type:8,num:['1','5']}],actionType:[1],requiredSlot:1,limit:[true,true,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],country:'',set:0},

          {idx:11,part:3,grade:1,display:141,na:{ko:'스틸레토',en:'Stiletto',jp:'スティレット'},kg:0.5,price:1000,color:["#ffffff","#FBB040","#754C29"],socket:2,txt:{ko:'검신이 가늘고 길며 끝이 매우 뾰족하여 검이 갑옷의 틈새를 파고들어가 깊은 곳까지 관통할 수 있어서 찌르는 무기.',en:'A stabbing weapon because the blade is slender, long, and very pointed, allowing the sword to pierce through gaps in armor and penetrate deeply.',jp:'刀身が細くて長く、先端が非常に尖っているため、剣が鎧の隙間に入り込み、深いところまで突き刺すことができる突き刺し武器。'},eff:[{type:3,num:['100','150']},{type:5,num:['250','250']},{type:8,num:['1','5']}],actionType:[0],requiredSlot:1,limit:[true,true,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],country:'',set:0},

          {idx:12,part:3,grade:1,display:142,na:{ko:'페스카즈',en:'Persqabz',jp:'ペスカス'},kg:0.4,price:3000,color:["#FBB040","#FBB040","#754C29"],socket:4,txt:{ko:'페스카즈는 예리한 날을 갖추고 있으며 면도칼 같이 날카로운 느낌을 갖는 단검으로 알려져 있다.',en:'Pescaz are known to be daggers with a sharp edge and a razor-sharp feel.',jp:'ペスカスは鋭い刃を備え、剃刀のような鋭い感触を持つ短剣として知られている。'},eff:[{type:3,num:['100','100']},{type:5,num:['100','450']},{type:8,num:['1','5']}],actionType:[1],requiredSlot:1,limit:[true,true,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],country:'',set:0},
        ],
        [//unique

        ],
        [//legend

        ]
      ],
      [//검1
        [//normal,magic,rare,epic
          {idx:0,part:3,grade:1,display:109,na:{ko:'일본도',en:'Japanese Sword',jp:'日本刀'},kg:1,price:1500,color:["#ffffff", "#EE1C4E"],socket:3,txt:{ko:'타치(太刀)나 우치가타나(打刀) 등을 포함하는 일본의 전통 도검이다.',en:'Traditional Japanese swords, including tachi and uchigatana.',jp:'太刀や打刀などを含む日本の伝統的な刀剣である。'},eff:[{type:3,num:['100','300']},{type:5,num:['100','200']}],actionType:[1],requiredSlot:1,limit:[true,false,true,true,true,true,false,true,true,true,true,true,false,true,true,true,false],country:'',set:0},

          {idx:1,part:3,grade:1,display:110,na:{ko:'환도',en:'Military Sword',jp:'幻刀'},kg:1,price:1500,color:["#ffffff", "#EE1C4E"],socket:3,txt:{ko:'한반도 지역 국가들의 전통 무기로, 고리를 사용하여 패용(佩用)하였던 도검(刀劍)들을 일컫는다.',en:'A traditional weapon of the nations of the Korean Peninsula, it refers to swords that were wielded with rings.',jp:'韓半島地域の国々の伝統的な武器で、輪を使用して佩用していた刀剣を指す。'},eff:[{type:3,num:['150','250']},{type:5,num:['150','300']}],actionType:[1],requiredSlot:1,limit:[true,false,true,true,true,true,false,true,true,true,true,true,false,true,true,true,false],country:'',set:0},

          {idx:2,part:3,grade:1,display:111,na:{ko:'환두대도',en:'Military Large Sword',jp:'幻頭大刀'},kg:1,price:2000,color:["#ffffff", "#FEBC12"],socket:4,txt:{ko:'대한민국 역사에서 가장 오랫동안 사용한 군사 도검이다.',en:'It is the oldest military sword in Korean history.',jp:'韓国史上最も長く使用された軍用刀剣である。'},eff:[{type:3,num:['250','250']},{type:5,num:['100','300']}],actionType:[1],requiredSlot:1,limit:[true,false,true,true,true,true,false,true,true,true,true,true,false,true,true,true,false],country:'',set:0},

          {idx:3,part:3,grade:1,display:112,na:{ko:'글라디우스',en:'Gradius',jp:'グラディウス'},kg:1.5,price:800,color:["#ffffff", "#B39C31"],socket:2,txt:{ko:'글라디우스는 로마군의 대표적인 한손검이다. 로마군의 표준 제식 무장이자 주력 무기였다.',en:'The Gladius is the quintessential one-handed sword of the Roman army. It was the standard ceremonial weapon of the Roman army.',jp:'グラディウスはローマ軍の代表的な片手剣である。ローマ軍の標準制式兵器であり、主力武器だった。'},eff:[{type:3,num:['130','230']},{type:5,num:['50','150']}],actionType:[1],requiredSlot:1,limit:[true,false,true,true,true,true,false,true,true,true,true,true,false,true,true,true,false],country:'',set:0},

          {idx:4,part:3,grade:1,display:113,na:{ko:'레이피어',en:'Rapier',jp:'レイピア'},kg:1.8,price:1000,color:["#ffffff", "#A7A9AC"],socket:3,txt:{ko:'16~17세기 유럽에서 사용된 검으로 베기보다는 찌르기에 특화된 형태의 검.',en:'A sword used in Europe in the 16th and 17th centuries that specialized in stabbing rather than slashing.',jp:'16～17世紀のヨーロッパで使用された剣で、斬るよりも刺すことに特化した形の剣。'},eff:[{type:3,num:['150','200']},{type:5,num:['150','250']}],actionType:[0],requiredSlot:1,limit:[true,false,true,true,true,true,false,true,true,true,true,true,false,true,true,true,false],country:'',set:0},

          {idx:5,part:3,grade:1,display:114,na:{ko:'세이버',en:'Sabre',jp:'セイバー'},kg:1.3,price:900,color:["#ffffff", "#FBB040","#754C29"],socket:3,txt:{ko:'근대 유럽을 대표하는 기병용 장검. 주로 한손으로 쓰는 휘어진 외날도(刀)로 알려져 있다.',en:'The signature cavalry longsword of modern Europe. It is known as a curved halberd wielded primarily in one hand.',jp:'近代ヨーロッパを代表する騎兵用の長剣。主に片手で使う曲がった片刃刀として知られている。'},eff:[{type:3,num:['120','150']},{type:5,num:['100','150']}],actionType:[1],requiredSlot:1,limit:[true,false,true,true,true,true,false,true,true,true,true,true,false,true,true,true,false],country:'',set:0},

          {idx:6,part:3,grade:1,display:115,na:{ko:'시미터',en:'Scimitar',jp:'シメーター'},kg:1.5,price:900,color:["#ffffff", "#FBB040","#754C29"],socket:2,txt:{ko:'중동에서 기원한 곡도를 일컫는 말. 흔히 초승달처럼 휘어있는 곡률이 큰 중동제 곡도.',en:'A curved shape that originated in the Middle East. A Middle Eastern curved sword with a large curvature, often shaped like a crescent.',jp:'中東に起源を持つ曲線を指す言葉。よく三日月のように湾曲している曲率が大きい中東製のカーブド。'},eff:[{type:3,num:['150','250']},{type:5,num:['120','240']}],actionType:[1],requiredSlot:1,limit:[true,false,true,true,true,true,false,true,true,true,true,true,false,true,true,true,false],country:'',set:0},

          {idx:7,part:3,grade:1,display:116,na:{ko:'브로드소드',en:'Broad Sword',jp:'ブロードソード'},kg:1.6,price:1000,color:["#ffffff", "#A5A4A4"],socket:2,txt:{ko:'중국의 도(刀, Dao)를 영어로 번역할 때 브로드소드라고 하는 경우도 종종 있다.',en:'When translating the Chinese Dao into English, it is often referred to as a broadsword.',jp:'中国の刀(刀、Dao)を英語に翻訳する際、ブロードソードと呼ばれることもしばしばある。'},eff:[{type:3,num:['250','350']},{type:5,num:['1','100']}],actionType:[1],requiredSlot:1,limit:[true,false,true,true,true,true,false,true,true,true,true,true,false,true,true,true,false],country:'',set:0},

          {idx:8,part:3,grade:1,display:117,na:{ko:'팔카타',en:'Falcata',jp:'ファルカタ'},kg:1.8,price:1500,color:["#ffffff", "#FBB040","#754C29"],socket:3,txt:{ko:'그리스의 중장보병 호플리테스들이 즐겨 쓴 검.',en:'The favorite sword of the Greek heavy infantry Hoplites.',jp:'ギリシャの重装歩兵ホプリテスが愛用した剣。'},eff:[{type:3,num:['200','250']},{type:5,num:['50','160']}],actionType:[1],requiredSlot:1,limit:[true,false,true,true,true,true,false,true,true,true,true,true,false,true,true,true,false],country:'',set:0},
        ],
        [//unique

        ],
        [//legend

        ]
      ],
      [//양손검2
        [//normal,magic,rare,epic
          {idx:0,part:3,grade:1,display:108,na:{ko:'월도',en:'Moon Blade',jp:'月刀'},kg:2.5,price:1000,color:["#ffffff","#3C2415"],socket:5,txt:{ko:'월도는 외날에 긴 자루를 가진 도(刀) 계열의 무기를 일컫는다.',en:'A moon sword is a weapon of the sword family that has a long hilt on the outer edge.',jp:'月刀は、片刃に長い柄を持つ刀(刀)系の武器を指す。'},eff:[{type:3,num:['200','300']},{type:5,num:['150','200']}],actionType:[1],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,true,false,true,false,false,false],country:'',set:0},

          {idx:1,part:3,grade:1,display:124,na:{ko:'나기나타',en:'Oriental Glaive',jp:'ナギナタ'},kg:3,price:1000,color:["#ffffff","#FBB040"],socket:4,txt:{ko:'일본 헤이안 시대부터 쓰이기 시작한 전근대 장병도 계열 무기이며, 장병기의 일종이다.',en:'It is a pre-modern longsword-like weapon from the Heian period in Japan, and is a type of longsword.',jp:'日本の平安時代から使われ始めた前近代長柄刀系の武器で、長柄刀の一種である。'},eff:[{type:3,num:['250','350']},{type:5,num:['100','150']}],actionType:[1],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,true,false,true,false,false,false],country:'',set:0},

          {idx:2,part:3,grade:1,display:131,na:{ko:'롱소드',en:'Long Sword',jp:'ロングソード'},kg:3,price:1000,color:["#ffffff"],socket:4,txt:{ko:'유럽에서 쓰인 양날 양손 도검이다.',en:'A double-edged, two-handed sword used in Europe.',jp:'ヨーロッパで使われた両刃の両手剣です。'},eff:[{type:3,num:['250','350']},{type:5,num:['50','200']}],actionType:[1],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,true,false,true,false,false,false],country:'',set:0},

          {idx:3,part:3,grade:1,display:132,na:{ko:'바스타드소드',en:'Bastard Sword',jp:'バスタードソード'},kg:4,price:1500,color:["#ffffff"],socket:5,txt:{ko:'폭의 변화가 매우 큰(테이퍼진) 검신을 지닌 롱소드.',en:'A longsword with a very wide (tapered) hilt.',jp:'幅の変化が非常に大きい(テーパード)剣身を持つロングソード。'},eff:[{type:3,num:['300','600']},{type:5,num:['10','100']}],actionType:[1],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,true,false,true,false,false,false],country:'',set:0},

          {idx:4,part:3,grade:1,display:133,na:{ko:'그레이트소드',en:'Great Sword'},kg:4,price:1500,color:["#ffffff","#831529"],socket:4,txt:{ko:'그레이트소드는 말 그대로 대검이라는 의미. 대검이라는 것 외에 단어가 특정짓는 특징은 없다.',en:'',jp:''},eff:[{type:3,num:['250','550']},{type:5,num:['10','120']}],actionType:[1],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,true,false,true,false,false,false],country:'',set:0},

          {idx:5,part:3,grade:1,display:134,na:{ko:'익시큐셔너소드',en:'Executioner Sword',jp:'エクスキューショナーソード'},kg:5,price:1700,color:["#ffffff","#FBB040","#754C29"],socket:5,txt:{ko:'이름 그대로 사형집행인들이 죄인을 참수형에 처할때 쓰기 위해 특별히 만들어진 도검이다.',en:'As the name suggests, it is a sword made specifically for executioners to behead criminals.',jp:'その名の通り、死刑執行人が罪人を斬首するときに使うために特別に作られた刀だ。'},eff:[{type:3,num:['300','500']}],actionType:[1],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,true,false,true,false,false,false],country:'',set:0},

          {idx:6,part:3,grade:1,display:135,na:{ko:'츠바이헨더',en:'Zweihänder',jp:'ツヴァイヘンダー'},kg:7,price:3000,color:["#ffffff","#FBB040","#754C29"],socket:6,txt:{ko:'르네상스 시대, 16세기경에 주로 사용된 독일제 트루 투핸더를 말한다.',en:'A German-made true two-hander used primarily during the Renaissance, around the 16th century.',jp:'ルネッサンス時代、16世紀頃に主に使用されたドイツ製トゥーハンダーのこと。'},eff:[{type:3,num:['300','700']},{type:5,num:['10','150']}],actionType:[1],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,true,false,true,false,false,false],country:'',set:0},

          {idx:7,part:3,grade:1,display:136,na:{ko:'클레이모어',en:'Claymore',jp:'クレイモア'},kg:5.5,price:2500,color:["#ffffff","#831529"],socket:5,txt:{ko:'15세기에서 17세기까지 스코틀랜드의 하이랜더들이 사용한 것으로 유명하다.',en:'It was famously used by the Highlanders of Scotland from the 15th to the 17th century.',jp:'15世紀から17世紀にかけてスコットランドのハイランダーが使用したことで有名。'},eff:[{type:3,num:['350','450']},{type:5,num:['10','250']}],actionType:[1],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,true,false,true,false,false,false],country:'',set:0},

          {idx:8,part:3,grade:1,display:137,na:{ko:'플랑베르주',en:'Flamberge',jp:'フランベルジュ'},kg:4.5,price:2500,color:["#ffffff","#FCEE22"],socket:6,txt:{ko:'서양의 도검류 중 한 종류로, 물결치는 형태의 날을 가진 검이다.',en:'A type of Western sword with an undulating blade.',jp:'西洋の刀剣類の一種で、波打つような形の刃を持つ剣である。'},eff:[{type:3,num:['400','600']},{type:5,num:['10','200']}],actionType:[1],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,true,false,true,false,false,false],country:'',set:0},
        ],
        [//unique

        ],
        [//legend

        ]
      ],
      [//둔기3
        [//normal,magic,rare,epic
          {idx:0,part:3,grade:1,display:118,na:{ko:'편',en:'Whip',jp:'鞭'},kg:1.5,price:700,color:["#603913"],socket:3,txt:{ko:'중국의 병장기. 간혹 簡이라고 쓰기도 한다.',en:'중국의 병장기. 간혹 簡이라고 쓰기도 한다.',jp:'中国の兵章。たまに簡と書くこともある。'},eff:[{type:3,num:['200','300']},{type:5,num:['150','150']}],actionType:[3],requiredSlot:1,limit:[true,true,true,true,false,false,true,false,true,false,true,true,true,true,true,true,true],country:'',set:0},

          {idx:1,part:3,grade:1,display:119,na:{ko:'철편',en:'Bull Whip',jp:'鐵鞭'},kg:2.5,price:800,color:["#603913"],socket:3,txt:{ko:'철편(鐵鞭)은 회초리와 비슷하게 생긴 타격 무기의 일종이다.',en:'An iron mace is a type of striking weapon that resembles a spinning wheel.',jp:'鉄鞭は、鞭に似た形をした打撃武器の一種である。'},eff:[{type:3,num:['300','400']},{type:5,num:['200','200']}],actionType:[3],requiredSlot:1,limit:[true,true,true,true,false,false,true,false,true,false,true,true,true,true,true,true,true],country:'',set:0},

          {idx:2,part:3,grade:1,display:120,na:{ko:'금쇄봉',en:'Gold Mace',jp:'金鎖棒'},kg:3,price:1000,color:["#603913"],socket:4,txt:{ko:'중세 일본의 철퇴 중 하나. 카나사이보라고 읽으며, 테츠보(鉄棒), 혹은 카나보(金棒)라고도 불린다.',en:'One of the maces of medieval Japan. It is pronounced kana-saibo, and is also called tetsubo (鉄棒) or kanabo (金棒).',jp:'中世日本の鉄棒の一つ。カナサイボと読み、鉄棒、あるいは金棒とも呼ばれる。'},eff:[{type:3,num:['300','500']},{type:5,num:['300','300']}],actionType:[3],requiredSlot:1,limit:[true,true,true,true,false,false,true,false,true,false,true,true,true,true,true,true,true],country:'',set:0},

          {idx:3,part:3,grade:1,display:121,na:{ko:'철퇴',en:'Mace',jp:'鐵槌'},kg:3,price:1200,color:["#ffffff"],socket:4,txt:{ko:'철퇴(鐵槌)는 병장기의 하나로, 막대끝에 돌기나 무게추가 달려있어 한손으로 휘두를 수 있는 몽둥이다.',en:'A mace is a piece of military equipment, a club with a point or weight on the end that can be wielded with one hand.',jp:'鐵槌は兵器の一つで、棒の先に突起や錘がついていて片手で振ることができる棍棒である。'},eff:[{type:3,num:['200','400']},{type:5,num:['250','350']}],actionType:[3],requiredSlot:1,limit:[true,true,true,true,false,false,true,false,true,false,true,true,true,true,true,true,true],country:'',set:0},

          {idx:4,part:3,grade:1,display:144,na:{ko:'워해머',en:'War Hammer',jp:'ウォーハンマー'},kg:3.5,price:2000,color:["#ffffff"],socket:6,txt:{ko:'전투용으로 쓰이는 무거운 망치.',en:'A heavy hammer used for combat.',jp:'戦闘用に使われる重いハンマー。'},eff:[{type:3,num:['500','550']},{type:5,num:['100','300']}],actionType:[3],requiredSlot:2,limit:[true,true,true,true,false,false,true,false,true,false,true,true,true,true,true,true,true],country:'',set:0},
        ],
        [//unique

        ],
        [//legend

        ]
      ],
      [//창4
        [//normal,magic,rare,epic
          {idx:0,part:3,grade:1,display:123,na:{ko:'극',en:'Oriental Polearm',jp:'戟'},kg:3.5,price:1500,color:["#ffffff"],socket:5,txt:{ko:'중국의 고대 폴암으로 긴 손잡이 끝에 단검이 붙었고 그보다 조금 밑에 보조날이 달린 무기.',en:'An ancient Chinese polearm with a dagger attached to the end of the long handle and a secondary blade slightly below it.',jp:'中国の古代ポールアームで、長い柄の先に短剣がつき、その少し下に補助刃が付いた武器。'},eff:[{type:3,num:['100','450']},{type:5,num:['450','450']}],actionType:[0],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,false,true,true,true,false,false],country:'',set:0},

          {idx:1,part:3,grade:1,display:145,na:{ko:'랜스',en:'Lance',jp:'ランス'},kg:4,price:1200,color:["#ffffff","#BCBEC0"],socket:6,txt:{ko:'거대한 원뿔형태를 한 창으로, 손으로 겨누고 겨드랑이로 고정할 수 있도록 뒷부분이 짧게 설계되어 있다.',en:'It\'s a giant cone-shaped spear, with a short back end that allows you to aim it with your hand and hold it in your armpit.',jp:'巨大な円錐形をした槍で、手で向けて脇の下で固定できるように後部が短く設計されている。'},eff:[{type:3,num:['50','500']},{type:5,num:['500','500']}],actionType:[0],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,false,true,true,true,false,false],country:'',set:0},

          {idx:2,part:3,grade:1,display:160,na:{ko:'파이크',en:'Pike',jp:'パイク'},kg:5,price:1500,color:["#ffffff"],socket:6,txt:{ko:'적을 위협하는데 효과적인 수단의 나뭇잎 모양 창.',en:'A leaf-shaped spear that is an effective means of intimidating enemies.',jp:'敵を威嚇するのに有効な手段の葉っぱの形をした槍。'},eff:[{type:3,num:['100','550']},{type:5,num:['650','650']}],actionType:[0],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,false,true,true,true,false,false],country:'',set:0},

          {idx:3,part:3,grade:1,display:148,na:{ko:'빌',en:'Bill',jp:'ビル'},kg:3,price:1300,color:["#ffffff"],socket:4,txt:{ko:'유럽에서 사용하던 것으로 농기구에서 먼저 발전해 전쟁사에 이름이 등장하며 영국에서는 ‘무기를 들고 일어서라’라는 의미인 ‘활과 창’을 의미한다.',en:'Used in Europe, it evolved first as a farming tool, and its name appears in the history of warfare, where it means "bow and spear" in English, meaning "to take up arms".',jp:'ヨーロッパで使われていたもので、農具から先に発展し、戦争史に名前が登場し、イギリスでは「武器を持って立ち上がれ」という意味の「弓と槍」を意味します。'},eff:[{type:3,num:['50','400']},{type:5,num:['400','400']}],actionType:[0],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,false,true,true,true,false,false],country:'',set:0},

          {idx:4,part:3,grade:1,display:149,na:{ko:'파르티잔',en:'Partisan',jp:'パルティザン'},kg:2.5,price:1000,color:["#ffffff"],socket:5,txt:{ko:'날의 평평한 부분에는 조각이나 투각같은 장식이 새겨져 있고 사용자의 상황에 따라 베고 찌를수 있도록 디자인이 되었다.',en:'The flat part of the blade is decorated with carvings or engravings and is designed to slash and stab depending on the user\'s situation.',jp:'刃の平らな部分には彫刻や透かし彫りのような装飾が施され、ユーザーの状況に応じて斬ったり刺したりできるようにデザインされています。'},eff:[{type:3,num:['10','450']},{type:5,num:['450','450']},{type:9,num:['1','10']}],actionType:[0],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,false,true,true,true,false,false],country:'',set:0},

          {idx:5,part:3,grade:1,display:150,na:{ko:'스피툼',en:'Spetum',jp:'スピトゥーム'},kg:2.5,price:1000,color:["#ffffff"],socket:5,txt:{ko:'파르티잔의 한 종류로 창날 밑동에 칼날을 세운 날개 두 개가 튀어나온 형태이다.',en:'A type of partizan with two wings protruding from the base of the spear blade.',jp:'パルティザンの一種で、槍の刃の付け根に刃を立てた翼が二つ突き出た形をしている。'},eff:[{type:3,num:['10','450']},{type:5,num:['450','450']},{type:8,num:['1','10']}],actionType:[0],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,false,true,true,true,false,false],country:'',set:0},

          {idx:6,part:3,grade:1,display:151,na:{ko:'워사이드',en:'War Scythe',jp:'ウォーサイド'},kg:2.2,price:1000,color:["#ffffff"],socket:5,txt:{ko:'대낫이 개량되어 전투에 적합한 형태가 된 것이 서양의 폴암 중 하나인 워 사이드.',en:'The War Side, one of the Western polearms, was the first time the Dannat was modified and given a combat-ready form.',jp:'竹筒が改良され、戦闘に適した形になったのが西洋のポールアームの一つであるウォーサイド。'},eff:[{type:3,num:['100','400']},{type:5,num:['450','450']}],actionType:[1],requiredSlot:2,limit:[true,false,true,true,false,false,false,false,false,false,true,false,true,true,true,false,false],country:'',set:0},
        ],
        [//unique
          [],
          [
            {idx:0,part:3,grade:5,display:400,na:{ko:'죽창',en:'Oriental Glaive',jp:'竹槍'},kg:0.5,price:2000,color:[],socket:1,txt:{ko:'죽창(竹槍)은 대나무로 만든 창을 말한다. 대창이라고도 불린다.',en:'A bamboo spear is a spear made of bamboo. It is also called a great spear.',jp:'竹槍は竹で作られた槍のこと。大槍とも呼ばれる。'},eff:[{type:3,num:['200','300']}],actionType:[0],requiredSlot:2,limit:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],country:'',set:0},
          ],
          [
            {idx:2,part:3,grade:5,display:401,na:{ko:'당파',en:'Oriental Glaive',jp:'鏜鈀'},kg:3,price:2000,color:[],socket:3,txt:{ko:'조선 군병 들이 사용한 무기, 삼지창처럼 생겼으나 좌우의 가지 부분이 옆으로 갈라지는 형태로 생겼다.',en:'A weapon used by Joseon soldiers, it looks like a trident, but with branches on the left and right sides that branch off to the side.',jp:'朝鮮の兵士たちが使用した武器、三叉槍のような形をしているが、左右の枝部分が横に分かれた形をしている。'},eff:[{type:4,num:['333','333']},{type:4,num:['333','333']}],actionType:[0],requiredSlot:2,limit:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],country:'',set:0},
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
          {idx:0,part:3,grade:1,display:161,na:{ko:'토마호크',en:'Tomahawk',jp:'トマホーク'},kg:0.5,price:500,color:["#ffffff"],socket:2,txt:{ko:'아메리카 원주민의 전통적인 도끼.',en:'A traditional Native American axe.',jp:'ネイティブアメリカンの伝統的な斧。'},eff:[{type:3,num:['100','150']},{type:5,num:['100','150']}],actionType:[2],requiredSlot:1,limit:[true,true,false,true,false,true,false,false,false,false,true,true,true,true,true,true,true],country:'',set:0},

          {idx:1,part:3,grade:1,display:143,na:{ko:'배틀액스',en:'Battle Axe',jp:'バトルアックス'},kg:4,price:1500,color:["#ffffff"],socket:6,txt:{ko:'도구인 도끼를 인마살상용 전쟁무기로 개량한 무기로 도끼날이 얇고 예각인 것이 특징이다.',en:'An adaptation of the axe, a tool, into a weapon of war for killing people, it is characterized by a thin, sharply angled blade.',jp:'道具である斧を人殺し用の戦争武器に改良した武器で、斧の刃が細く鋭角なのが特徴です。'},eff:[{type:3,num:['400','500']},{type:5,num:['200','300']}],actionType:[2],requiredSlot:2,limit:[true,true,false,true,false,true,false,false,false,false,true,true,true,true,true,true,true],country:'',set:0},

          {idx:2,part:3,grade:1,display:147,na:{ko:'버디슈',en:'Berdysh',jp:'バーディッシュ'},kg:5,price:2000,color:["#ffffff"],socket:6,txt:{ko:'긴 자루 끝에 초승달 모양의 도끼날을 달아둔 형상의 무기.',en:'A weapon with a crescent-shaped axe blade at the end of a long hilt.',jp:'長い袋の先に三日月型の斧の刃をつけた形状の武器。'},eff:[{type:3,num:['200','500']},{type:5,num:['200','400']}],actionType:[2],requiredSlot:2,limit:[true,true,false,true,false,true,false,false,false,false,true,true,true,true,true,true,true],country:'',set:0},

          {idx:3,part:3,grade:1,display:146,na:{ko:'할버드',en:'Halberd',jp:'ハルバード'},kg:3.5,price:1500,color:["#ffffff"],socket:6,txt:{ko:'장대에 단검과 도끼와 끌개가 함께 부착된 무기. ',en:'A weapon consisting of a dagger, axe, and chisel attached to a pole.',jp:'竿に短剣と斧、斧と引きずりが一緒に取り付けられた武器。'},eff:[{type:3,num:['100','500']},{type:5,num:['150','300']}],actionType:[2],requiredSlot:2,limit:[true,true,false,true,false,true,false,false,false,false,true,true,true,true,true,true,true],country:'',set:0},
        ],
        [//unique
        ],
        [//legend
        ]
      ],
      [//활6
        [//normal,magic,rare,epic
          {idx:0,part:3,grade:1,display:126,na:{ko:'수리검',en:'Shuriken',jp:'手裏剣'},kg:0.5,price:300,color:["#BCBEC0","#000000"],socket:2,txt:{ko:'던져서 적을 맞히는 것을 목적으로 하는 표창 계열의 무기.',en:'A mace-like weapon intended to be thrown and hit enemies.',jp:'投擲して敵を攻撃することを目的とした表彰系の武器。'},eff:[{type:3,num:['10','130']}],actionType:[5],requiredSlot:1,limit:[true,false,false,false,false,false,false,true,true,true,true,true,true,true,false,false,false],country:'',set:0},

          {idx:1,part:3,grade:1,display:127,na:{ko:'궁',en:'Short Bow',jp:'弓'},kg:1.2,price:900,color:["#70C169","#FBA919"],socket:5,txt:{ko:'화살을 먼거리로 보내기위한 도구, 원거리 무기',en:'Tools for sending arrows a long way, ranged weapons',jp:'矢を遠くに飛ばすための道具、遠距離武器。'},eff:[{type:3,num:['100','350']}],actionType:[5],requiredSlot:2,limit:[true,false,false,false,false,false,false,true,true,true,true,true,false,true,false,false,true],country:'',set:0},

          {idx:2,part:3,grade:1,display:128,na:{ko:'장궁',en:'Long Bow',jp:'長弓'},kg:2,price:1200,color:["#ED1F24","#FBA919"],socket:6,txt:{ko:'궁보다 크기가 큰 원거리 무기',en:'Ranged weapons larger than a bow',jp:'弓よりサイズが大きい遠距離武器'},eff:[{type:3,num:['200','490']}],actionType:[5],requiredSlot:2,limit:[true,false,false,false,false,false,false,true,true,true,true,true,false,true,false,false,true],country:'',set:0},

          {idx:3,part:3,grade:1,display:129,na:{ko:'석궁',en:'Crossbow',jp:'クロスボウ'},kg:2.2,price:1200,color:["#A76928","#991B1E","#FBA919"],socket:6,txt:{ko:'활과 유사한 대표적인 발사 무기. 옛 한국에서는 쇠뇌라고 불렀다.',en:'A typical projectile weapon similar to a bow. In ancient Korea, it was called a crossbow.',jp:'弓に似た代表的な発射武器。昔の韓国では弩と呼ばれていた。'},eff:[{type:3,num:['100','550']}],actionType:[5],requiredSlot:2,limit:[true,false,false,false,false,false,false,true,true,true,true,true,false,true,false,false,true],country:'',set:0},
        ],
        [//unique
        ],
        [//legend
        ]
      ],
      [//타격7
        [//normal,magic,rare,epic
          {idx:0,part:3,grade:1,display:122,na:{ko:'톤파',en:'Tonfa',jp:'トンファー'},kg:1,price:500,color:["#F7941E"],socket:3,txt:{ko:'중국 拐(괴) 단봉형 무기가 오키나와에 와서 변형되어 오키나와에서 유래한 날없는 타격 무기다.',en:'It is a bladed striking weapon that originated in Okinawa when the Chinese 拐 short-barreled weapon came to Okinawa and was modified.',jp:'中国の拐棒型武器が沖縄に来て変形し、沖縄に由来する刃のない打撃武器である。'},eff:[{type:3,num:['100','200']},{type:5,num:['100','200']}],actionType:[3],requiredSlot:1,limit:[true,false,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],country:'',set:0},

          {idx:1,part:3,grade:1,display:125,na:{ko:'차크람',en:'Chakram',jp:'チャクラム'},kg:1.2,price:700,color:["#ffffff"],socket:4,txt:{ko:'시크교 신도의 전통 투척 무기, 산스크리트어로 \'둥근\', \'원\', \'바퀴\' 등을 뜻하는 차크라에서 유래하였다.',en:'A traditional throwing weapon of the Sikhs, it comes from the Sanskrit word chakra, which means "round," "circle," "wheel," etc.',jp:'シーク教徒の伝統的な投擲武器、サンスクリット語で「丸い」、「円」、「輪」などを意味するチャクラに由来する。'},eff:[{type:3,num:['50','250']},{type:5,num:['50','250']}],actionType:[1],requiredSlot:1,limit:[true,false,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],country:'',set:0},

          {idx:2,part:3,grade:1,display:159,na:{ko:'너클',en:'Knuckle',jp:'ナックル'},kg:0.5,price:500,color:["#939598","#000000"],socket:4,txt:{ko:'뾰족한 돌기가 있는 금속의 맨손무기.',en:'A metal, bare weapon with a sharp point.',jp:'尖った突起のある金属の素手武器。'},eff:[{type:3,num:['50','150']},{type:5,num:['50','150']}],actionType:[3],requiredSlot:1,limit:[true,false,true,false,true,true,false,true,true,true,true,true,true,true,true,true,true],country:'',set:0},
          
          {idx:3,part:3,grade:1,display:130,na:{ko:'철선',en:'Iron Fan',jp:'鐵扇'},kg:0.3,price:500,color:["#ffffff"],socket:4,txt:{ko:'쇠로 만든 부채.',en:'A fan made of iron.',jp:'鉄製の扇子。'},eff:[{type:3,num:['1','111']}],actionType:[5],requiredSlot:1,limit:[true,false,false,false,false,false,false,true,true,true,true,true,true,true,false,false,false],country:'',set:0},
        ],
        [//unique
        ],
        [//legend
        ]
      ],
      [//방패8
        [//normal,magic,rare,epic
          {idx:0,part:3,grade:1,display:152,na:{ko:'버클러',en:'Buckler',jp:'バックラー'},kg:1,price:500,color:["#ffffff","#58595B"],socket:2,txt:{ko:'직경 또는 둘레가 30cm정도 되는 원형, 사각형 소형 방패.',en:'A small round or square shield with a diameter or circumference of about 30 centimeters.',jp:'直径または周囲30cm程度の円形、四角形の小型シールド。'},eff:[{type:4,num:['50','150']},{type:6,num:['50','100']}],actionType:"",requiredSlot:1,limit:[true,true,false,true,true,false,true,true,true,true,true,true,false,true,false,true,true],country:'',set:0},

          {idx:1,part:3,grade:1,display:153,na:{ko:'타지',en:'Targa',jp:'タジ'},kg:0.7,price:800,color:["#603913","#FBB040"],socket:2,txt:{ko:'중세 유럽에서 사용되었던, 손으로 들지 않고 팔뚝에 매달아 사용하는 형태의 소형 방패.',en:'A small shield used in medieval Europe that hung from the forearm rather than being held in the hand.',jp:'中世ヨーロッパで使われていた、手で持たずに前腕にぶら下げて使う形の小型盾。'},eff:[{type:4,num:['50','100']},{type:6,num:['50','150']}],actionType:"",requiredSlot:1,limit:[true,true,false,true,true,false,true,true,true,true,true,true,false,true,false,true,true],country:'',set:0},

          {idx:2,part:3,grade:1,display:154,na:{ko:'라운드실드',en:'Round Shield',jp:'ラウンドシールド'},kg:1.5,price:1000,color:["#ffffff","#000000","#ED1C24"],socket:3,txt:{ko:'고대부터 사용된 원형형태의 방패.',en:'A circular shield used since ancient times.',jp:'古代から使われてきた円形の盾。'},eff:[{type:4,num:['100','250']},{type:6,num:['100','150']}],actionType:"",requiredSlot:1,limit:[true,true,false,true,true,false,true,true,true,true,true,true,false,true,false,true,true],country:'',set:0},

          {idx:3,part:3,grade:1,display:155,na:{ko:'카이트실드',en:'Kite Shield',jp:'カイトシールド'},kg:1,price:1000,color:["#603913","#FBB040"],socket:3,txt:{ko:'중세 초기에 유럽 각지에서 사용한 가오리연과 비슷하게 생긴 방패.',en:'A shield that resembles a stingray kite used around Europe in the early Middle Ages.',jp:'中世初期にヨーロッパ各地で使用されたエイ凧に似た形の盾。'},eff:[{type:4,num:['100','200']},{type:6,num:['150','200']}],actionType:"",requiredSlot:1,limit:[true,true,false,true,true,false,true,true,true,true,true,true,false,true,false,true,true],country:'',set:0},

          {idx:4,part:3,grade:1,display:156,na:{ko:'히터실드',en:'Heater Shield',jp:'ヒーターシールド'},kg:6.5,price:1200,color:["#3F6731","#EE1C4E","#FEEB00"],socket:4,txt:{ko:'10세기 중엽부터 등장한 외형은 카이트 실드의 위아래를 짧게 자른듯한 축소형 중세 유럽의 방패.',en:'A scaled-down medieval European shield from the mid-10th century that looks like a shortened version of the top and bottom of a kite shield.',jp:'10世紀中頃から登場した外観は、カイトシールドの上下を短く切ったような縮小型の中世ヨーロッパの盾。'},eff:[{type:4,num:['200','300']},{type:6,num:['150','200']}],actionType:"",requiredSlot:1,limit:[true,true,false,true,true,false,true,true,true,true,true,true,false,true,false,true,true],country:'',set:0},

          {idx:5,part:3,grade:1,display:157,na:{ko:'스쿠툼',en:'Scutum',jp:'スクトゥーム'},kg:8,price:1500,color:["#939598","#000000"],socket:4,txt:{ko:'목제 방패로, 타원형과 직사각형 모양의 로마군이 장비한 제식 방패.',en:'Wooden shield, ceremonial shield equipped by Roman soldiers in oval and rectangular shapes.',jp:'木製の盾で、楕円形や長方形の形をしたローマ軍が装備した制式盾。'},eff:[{type:4,num:['300','400']},{type:6,num:['200','300']}],actionType:"",requiredSlot:1,limit:[true,true,false,true,true,false,true,true,true,true,true,true,false,true,false,true,true],country:'',set:0},
          
          {idx:6,part:3,grade:1,display:158,na:{ko:'파비스',en:'Pavise',jp:'ファビス'},kg:8,price:1500,color:["#939598","#000000","#19469B"],socket:4,txt:{ko:'중세 유럽의 전쟁에서 궁병이나 쇠뇌병들이 사용한 대형방패.',en:'A large shield used by archers and crossbowmen in medieval European warfare.',jp:'中世ヨーロッパの戦争で弓兵や弩兵が使用した大型盾。'},eff:[{type:4,num:['200','350']},{type:6,num:['200','350']}],actionType:"",requiredSlot:1,limit:[true,true,false,true,true,false,true,true,true,true,true,true,false,true,false,true,true],country:'',set:0},
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
          {idx:0,part:4,grade:1,display:501,na:{ko:'반지',en:'Ring',jp:'リング'},kg:0.1,price:1000,color:["#F9B919"],socket:1,txt:{ko:'손가락에 끼는 악세사리.',en:'An accessory that fits on your finger.',jp:'指にはめるアクセサリー。'},eff:[],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],country:'',set:0},

          {idx:1,part:4,grade:1,display:502,na:{ko:'진주 반지',en:'Pearl Ring',jp:'パールリング'},kg:0.1,price:2000,color:["#F9B919","#000000"],socket:1,txt:{ko:'손가락에 끼우는 악세사리. 진주로 장식되어 있음',en:'An accessory worn on the finger. Decorated with pearls',jp:'指にはめるアクセサリー。パールで飾られている'},eff:[],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],country:'',set:0},

          {idx:2,part:4,grade:1,display:502,na:{ko:'뼈 반지',en:'Bone Ring',jp:'ボーンリング'},kg:0.1,price:5000,color:["#F9B919","#000000"],socket:1,txt:{ko:'손가락에 끼우는 악세사리. 뼈로 장식되어 있음',en:'An accessory worn on the finger. Decorated with bones',jp:'指にはめるアクセサリー。骨の装飾が施されている'},eff:[],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],country:'',set:0},
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
          {idx:0,part:5,grade:1,display:551,na:{ko:'목걸이',en:'Necklace',jp:'ネックレス'},kg:0.1,price:1500,color:["#F9B919","#ffffff"],socket:1,txt:{ko:'목에 착용하는 악세사리.',en:'An accessory worn around the neck.',jp:'首に着用するアクセサリー。'},eff:[],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],country:'',set:0},

          {idx:1,part:5,grade:1,display:552,na:{ko:'진주 목걸이',en:'Pearl Necklace',jp:'パールネックレス'},kg:0.1,price:2500,color:["#ffffff","#F9B919"],socket:1,txt:{ko:'목에 착용하는 악세사리. 진주로 장식되어 있음',en:'An accessory worn around the neck. Decorated with pearls',jp:'首につけるアクセサリー。真珠で飾られている'},eff:[],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],country:'',set:0},

          {idx:2,part:5,grade:1,display:552,na:{ko:'뼈 목걸이',en:'Bone Necklace',jp:'ボーンネックレス'},kg:0.1,price:2500,color:["#ffffff","#F9B919"],socket:1,txt:{ko:'목에 착용하는 악세사리. 뼈로 장식되어 있음',en:'An accessory worn around the neck. Decorated with bones',jp:'首につけるアクセサリー。骨で飾られている'},eff:[],actionType:"",requiredSlot:1,limit:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],country:'',set:0},
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

    {idx:1,grade:3,imgCate:'itemHole',display:1,na:{ko:'큰 다이아몬드',en:'Large Diamond',jp:'大きなダイヤモンド'},colorSet:'fff',color:'rgba(255,255,255,.8)',kg:0.1,price:100,txt:{ko:'다이아몬드는 단순히 아름다움 뿐만 아니라, 독특한 물성으로 다양한 분야에서 높은 가치를 지닌다.',en:'Diamonds aren\'t just beautiful, their unique properties make them highly valued in a variety of fields.',jp:'ダイヤモンドは単に美しさだけでなく、独特の物性で様々な分野で高い価値を持つ。'},action:9,eff:[{type:4,num:['30']}, {type:21,num:['2']}]},//방어, 빛

    {idx:2,grade:2,imgCate:'itemHole',display:2,na:{ko:'다이아몬드',en:'Diamond',jp:'ダイヤモンド'},colorSet:'fff',color:'rgba(255,255,255,.6)',kg:0.2,price:200,txt:{ko:'다이아몬드는 단순히 아름다움 뿐만 아니라, 독특한 물성으로 다양한 분야에서 높은 가치를 지닌다.',en:'Diamonds aren\'t just beautiful, their unique properties make them highly valued in a variety of fields.',jp:'ダイヤモンドは単に美しさだけでなく、独特の物性で様々な分野で高い価値を持つ。'},action:9,eff:[{type:4,num:['20']}]},//방어

    {idx:3,grade:1,imgCate:'itemHole',display:3,na:{ko:'작은 다이아몬드',en:'Small Diamond',jp:'小さなダイヤモンド'},colorSet:'fff',color:'rgba(255,255,255,.4)',kg:0.4,price:400,txt:{ko:'다이아몬드는 단순히 아름다움 뿐만 아니라, 독특한 물성으로 다양한 분야에서 높은 가치를 지닌다.',en:'Diamonds aren\'t just beautiful, their unique properties make them highly valued in a variety of fields.',jp:'ダイヤモンドは単に美しさだけでなく、独特の物性で様々な分野で高い価値を持つ。'},action:9,eff:[{type:4,num:['10']}]},//방어

    {idx:4,grade:3,imgCate:'itemHole',display:4,na:{ko:'큰 에메랄드',en:'Large Emerald',jp:'大きなエメラルド'},colorSet:'0f0',color:'rgba(0,255,0,.8)',kg:0.4,price:1000,txt:{ko:'녹주옥, 취옥이라고도 하며 베릴륨 보석의 일종으로서, 녹주석 중 청록색을 띠는 종을 일컫는다.',en:'A type of beryllium gemstone, also known as chalcedony or jadeite, it refers to the blue-green color of a species of green gemstone.',jp:'緑珠玉、翠玉とも呼ばれ、ベリリウム宝石の一種で、緑珠石の中でも青緑色を帯びた種を指す。'},action:9,eff:[{type:0,num:['30']}, {type:26,num:['2']}]},//체력, 땅

    {idx:5,grade:2,imgCate:'itemHole',display:5,na:{ko:'에메랄드',en:'Emerald',jp:'エメラルド'},colorSet:'0f0',color:'rgba(0,255,0,.6)',kg:0.2,price:100,txt:{ko:'녹주옥, 취옥이라고도 하며 베릴륨 보석의 일종으로서, 녹주석 중 청록색을 띠는 종을 일컫는다.',en:'A type of beryllium gemstone, also known as chalcedony or jadeite, it refers to the blue-green color of a species of green gemstone.',jp:'緑珠玉、翠玉とも呼ばれ、ベリリウム宝石の一種で、緑珠石の中でも青緑色を帯びた種を指す。'},action:9,eff:[{type:0,num:['20']}]},//체력

    {idx:6,grade:1,imgCate:'itemHole',display:6,na:{ko:'작은 에메랄드',en:'Small Emerald',jp:'小さなエメラルド'},colorSet:'0f0',color:'rgba(0,255,0,.4)',kg:0.1,price:200,txt:{ko:'녹주옥, 취옥이라고도 하며 베릴륨 보석의 일종으로서, 녹주석 중 청록색을 띠는 종을 일컫는다.',en:'A type of beryllium gemstone, also known as chalcedony or jadeite, it refers to the blue-green color of a species of green gemstone.',jp:'緑珠玉、翠玉とも呼ばれ、ベリリウム宝石の一種で、緑珠石の中でも青緑色を帯びた種を指す。'},action:9,eff:[{type:0,num:['10']}]},//체력

    {idx:7,grade:3,imgCate:'itemHole',display:7,na:{ko:'큰 토파즈',en:'Large Topaz',jp:'大きなトパーズ'},colorSet:'ff0',color:'rgba(255,255,0,.8)',kg:0.4,price:2000,txt:{ko:'일반적인 무색 내지는 노르스름한 색 이외에도 토파즈는 다채로운 색을 가지고 있다.',en:'In addition to its typical colorless interior, topaz has a wide range of colors.',jp:'一般的な無色または黄色がかった色以外にも、トパーズは多彩な色を持つ。'},action:9,eff:[{type:9,num:['20']}, {type:25,num:['2']}]},//행운, 바람

    {idx:8,grade:2,imgCate:'itemHole',display:8,na:{ko:'토파즈',en:'Topaz',jp:'トパーズ'},colorSet:'ff0',color:'rgba(255,255,0,.6)',kg:0.2,price:1000,txt:{ko:'일반적인 무색 내지는 노르스름한 색 이외에도 토파즈는 다채로운 색을 가지고 있다.',en:'In addition to its typical colorless interior, topaz has a wide range of colors.',jp:'一般的な無色または黄色がかった色以外にも、トパーズは多彩な色を持つ。'},action:9,eff:[{type:9,num:['10']}]},//행운

    {idx:9,grade:1,imgCate:'itemHole',display:9,na:{ko:'작은 토파즈',en:'Small Topaz',jp:'小さなトパーズ'},colorSet:'ff0',color:'rgba(255,255,0,.4)',kg:0.1,price:500,txt:{ko:'일반적인 무색 내지는 노르스름한 색 이외에도 토파즈는 다채로운 색을 가지고 있다.',en:'In addition to its typical colorless interior, topaz has a wide range of colors.',jp:'一般的な無色または黄色がかった色以外にも、トパーズは多彩な色を持つ。'},action:9,eff:[{type:6,num:['5']}]},//행운

    {idx:10,grade:3,imgCate:'itemHole',display:10,na:{ko:'큰 루비',en:'Large Ruby',jp:'大きなルビー'},colorSet:'f00',color:'rgba(255,0,0,.8)',kg:0.4,price:2000,txt:{ko:'보석의 왕. 루비는 예나 지금이나 최고급의 보석으로 이전에는 다이아몬드보다 값이 나갔다.',en:'The king of gems. Rubies have always been the most expensive gemstone, and used to cost more than diamonds.',jp:'宝石の王様。ルビーは今も昔も最高級の宝石で、以前はダイヤモンドよりも高価でした。'},action:9,eff:[{type:3,num:['30']}, {type:24,num:['2']}]},//공격, 불

    {idx:11,grade:2,imgCate:'itemHole',display:11,na:{ko:'루비',en:'Ruby',jp:'ルビー'},colorSet:'f00',color:'rgba(255,0,0,.6)',kg:0.2,price:1000,txt:{ko:'보석의 왕. 루비는 예나 지금이나 최고급의 보석으로 이전에는 다이아몬드보다 값이 나갔다.',en:'The king of gems. Rubies have always been the most expensive gemstone, and used to cost more than diamonds.',jp:'宝石の王様。ルビーは今も昔も最高級の宝石で、以前はダイヤモンドよりも高価でした。'},action:9,eff:[{type:3,num:['20']}]},//공격

    {idx:12,grade:1,imgCate:'itemHole',display:12,na:{ko:'작은 루비',en:'Small Ruby',jp:'小さなルビー'},colorSet:'f00',color:'rgba(255,0,0,.4)',kg:0.1,price:500,txt:{ko:'보석의 왕. 루비는 예나 지금이나 최고급의 보석으로 이전에는 다이아몬드보다 값이 나갔다.',en:'The king of gems. Rubies have always been the most expensive gemstone, and used to cost more than diamonds.',jp:'宝石の王様。ルビーは今も昔も最高級の宝石で、以前はダイヤモンドよりも高価でした。'},action:9,eff:[{type:3,num:['10']}]},//공격

    {idx:13,grade:3,imgCate:'itemHole',display:13,na:{ko:'큰 자수정',en:'Large Amethyst',jp:'大きなアメジスト'},colorSet:'f0f',color:'rgba(255,0,255,.8)',kg:0.4,price:2000,txt:{ko:'보석 계열의 보석으로 다른 고가의 보석에 비하면 그렇게 비싼 편은 아니다.',en:'As a gemstone, it\'s not as expensive as other more expensive gems.',jp:'宝石系の宝石で、他の高価な宝石に比べるとそれほど高価な方ではありません。'},action:9,eff:[{type:5,num:['30']}]},//술법공격

    {idx:14,grade:2,imgCate:'itemHole',display:14,na:{ko:'자수정',en:'Amethyst',jp:'アメジスト'},colorSet:'f0f',color:'rgba(255,0,255,.6)',kg:0.2,price:1000,txt:{ko:'보석 계열의 보석으로 다른 고가의 보석에 비하면 그렇게 비싼 편은 아니다.',en:'As a gemstone, it\'s not as expensive as other more expensive gems.',jp:'宝石系の宝石で、他の高価な宝石に比べるとそれほど高価な方ではありません。'},action:9,eff:[{type:5,num:['20']}]},//술법공격

    {idx:15,grade:1,imgCate:'itemHole',display:15,na:{ko:'작은 자수정',en:'Small Amethyst',jp:'小さなアメジスト'},colorSet:'f0f',color:'rgba(255,0,255,.4)',kg:0.1,price:500,txt:{ko:'보석 계열의 보석으로 다른 고가의 보석에 비하면 그렇게 비싼 편은 아니다.',en:'As a gemstone, it\'s not as expensive as other more expensive gems.',jp:'宝石系の宝石で、他の高価な宝石に比べるとそれほど高価な方ではありません。'},action:9,eff:[{type:5,num:['10']}]},//술법공격

    {idx:16,grade:3,imgCate:'itemHole',display:13,na:{ko:'큰 사파이어',en:'Large Sapphire',jp:'大きなサファイア'},colorSet:'00f',color:'rgba(0,0,255,.8)',kg:0.4,price:2000,txt:{ko:'루비와 마찬가지로 강옥의 일종으로, 섞인 것이 달라 색깔이 다르게 나왔을 뿐이다.',en:'Like ruby, it\'s a type of corundum, just with a different mix of colors.',jp:'ルビーと同じく鋼玉石の一種で、混ざり合うものが違い、色が違うだけです。'},action:9,eff:[{type:6,num:['30']}, {type:23,num:['2']}]},//술법방어, 물

    {idx:17,grade:2,imgCate:'itemHole',display:14,na:{ko:'사파이어',en:'Sapphire',jp:'サファイア'},colorSet:'00f',color:'rgba(0,0,255,.6)',kg:0.2,price:1000,txt:{ko:'루비와 마찬가지로 강옥의 일종으로, 섞인 것이 달라 색깔이 다르게 나왔을 뿐이다.',en:'Like ruby, it\'s a type of corundum, just with a different mix of colors.',jp:'ルビーと同じく鋼玉石の一種で、混ざり合うものが違い、色が違うだけです。'},action:9,eff:[{type:6,num:['20']}]},//술법방어

    {idx:18,grade:1,imgCate:'itemHole',display:15,na:{ko:'작은 사파이어',en:'Small Sapphire',jp:'小さなサファイア'},colorSet:'00f',color:'rgba(0,0,255,.4)',kg:0.1,price:500,txt:{ko:'루비와 마찬가지로 강옥의 일종으로, 섞인 것이 달라 색깔이 다르게 나왔을 뿐이다.',en:'Like ruby, it\'s a type of corundum, just with a different mix of colors.',jp:'ルビーと同じく鋼玉石の一種で、混ざり合うものが違い、色が違うだけです。'},action:9,eff:[{type:6,num:['10']}]},//술법방어
    
    {idx:19,grade:3,imgCate:'itemHole',display:13,na:{ko:'큰 진주',en:'Large Pearl',jp:'大きな真珠'},colorSet:'7f7f7f',color:'rgba(127,127,127,.8)',kg:0.4,price:2000,txt:{ko:'보석의 한 종류로서 조개에서 낮은 확률로 발견된다.',en:'It is a type of gemstone that is found in low probability in shells.',jp:'宝石の一種として貝殻から低確率で発見される。'},action:9,eff:[{type:8,num:['5']}]},//속도

    {idx:20,grade:2,imgCate:'itemHole',display:14,na:{ko:'진주',en:'Pearl',jp:'真珠'},colorSet:'7f7f7f',color:'rgba(127,127,127,.6)',kg:0.2,price:1000,txt:{ko:'보석의 한 종류로서 조개에서 낮은 확률로 발견된다.',en:'It is a type of gemstone that is found in low probability in shells.',jp:'宝石の一種として貝殻から低確率で発見される。'},action:9,eff:[{type:8,num:['3']}]},//속도

    {idx:21,grade:1,imgCate:'itemHole',display:15,na:{ko:'작은 진주',en:'Small Pearl',jp:'小さな真珠'},colorSet:'7f7f7f',color:'rgba(0,0,0,.4)',kg:0.1,price:500,txt:{ko:'보석의 한 종류로서 조개에서 낮은 확률로 발견된다.',en:'It is a type of gemstone that is found in low probability in shells.',jp:'宝石の一種として貝殻から低確率で発見される。'},action:9,eff:[{type:8,num:['1']}]},//속도

    {idx:22,grade:3,imgCate:'itemHole',display:13,na:{ko:'큰 블랙오팔',en:'Large Black Opal',jp:'大きなブラックオパール'},colorSet:'000',color:'rgba(0,0,0,.8)',kg:0.4,price:2000,txt:{ko:'검은색을 띈 보석으로 고대 로마인은 오팔을 힘의 상징으로 여겼으나, 이후 불길한 보석이라고 여겨졌다.',en:'A black gemstone, opal was considered a symbol of power by the ancient Romans, but was later considered ominous.',jp:'黒色を帯びた宝石で、古代ローマ人はオパールを力の象徴と見なしたが、その後不吉な宝石とされるようになった。'},action:9,eff:[{type:22,num:['5']}]},//어둠

    {idx:23,grade:2,imgCate:'itemHole',display:14,na:{ko:'블랙오팔',en:'Black Opal',jp:'ブラックオパール'},colorSet:'000',color:'rgba(0,0,0,.6)',kg:0.2,price:1000,txt:{ko:'검은색을 띈 보석으로 고대 로마인은 오팔을 힘의 상징으로 여겼으나, 이후 불길한 보석이라고 여겨졌다.',en:'A black gemstone, opal was considered a symbol of power by the ancient Romans, but was later considered ominous.',jp:'黒色を帯びた宝石で、古代ローマ人はオパールを力の象徴と見なしたが、その後不吉な宝石とされるようになった。'},action:9,eff:[{type:22,num:['3']}]},//어둠

    {idx:24,grade:1,imgCate:'itemHole',display:15,na:{ko:'작은 블랙오팔',en:'Small Black Opal',jp:'小さなブラックオパール'},colorSet:'000',color:'rgba(0,0,0,.4)',kg:0.1,price:500,txt:{ko:'검은색을 띈 보석으로 고대 로마인은 오팔을 힘의 상징으로 여겼으나, 이후 불길한 보석이라고 여겨졌다.',en:'A black gemstone, opal was considered a symbol of power by the ancient Romans, but was later considered ominous.',jp:'黒色を帯びた宝石で、古代ローマ人はオパールを力の象徴と見なしたが、その後不吉な宝石とされるようになった。'},action:22,eff:[{type:8,num:['1']}]},//어둠

    '','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','','',
    '','','','','','','','','',
    {idx:100,grade:2,imgCate:'itemHole',display:100,na:{ko:'빈 염료병',en:'Empty Dye Bottle',jp:'空の染料ボトル'},kg:0.05,price:1000,txt:{ko:'염료를 소분할때 사용한다.',en:'Used to subdivide the dye.',jp:'染料を小分けするときに使う。'},colorSet:'transparent',color:'rgba(255,255,255,0)',size:0,eff:[{type:21,num:['3']}]},

    {idx:101,grade:2,imgCate:'itemHole',display:101,na:{ko:'작은 백색 염료',en:'Small white Dye',jp:'小さな白色染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'fff',color:'rgba(255,255,255,.4)',size:0,eff:[{type:21,num:['3']}]},

    {idx:102,grade:2,imgCate:'itemHole',display:102,na:{ko:'작은 흑색 염료',en:'Small Black Dye',jp:'小さな黒色染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'000',color:'rgba(0,0,0,.4)',size:0,eff:[{type:22,num:['3']}]},

    {idx:103,grade:2,imgCate:'itemHole',display:103,na:{ko:'작은 청록색 염료',en:'Small Turquoise Dye',jp:'小青緑色染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'088',color:'rgba(0,137,137,.4)',size:0,eff:[{type:0,num:['25']}]},
    
    {idx:104,grade:2,imgCate:'itemHole',display:104,na:{ko:'작은 카키색 염료',en:'Small Khaki Dye',jp:'小さなカーキ色染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'880',color:'rgba(137,137,0,.4)',size:0,eff:[{type:21,num:['1']},{type:22,num:['1']}]},

    {idx:105,grade:2,imgCate:'itemHole',display:105,na:{ko:'작은 하늘색 염료',en:'Small Light Blue Dye',jp:'小さな水色染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'0ff',color:'rgba(0,255,255,.4)',size:0,eff:[{type:25,num:['3']}]},
    
    {idx:106,grade:2,imgCate:'itemHole',display:106,na:{ko:'작은 분홍색 염료',en:'Small Pink Dye',jp:'小さなピンクの染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'f0f',color:'rgba(255,0,255,.4)',size:0,eff:[{type:23,num:['1']},{type:24,num:['1']},{type:25,num:['1']},{type:26,num:['1']}]},

    {idx:107,grade:2,imgCate:'itemHole',display:107,na:{ko:'작은 자주색 염료',en:'Small Red Violet Dye',jp:'小さな紫色の染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'808',color:'rgba(137,0,137,.4)',size:0,eff:[{type:8,num:['3']}]},

    {idx:108,grade:2,imgCate:'itemHole',display:108,na:{ko:'작은 녹색 염료',en:'Small Green Dye',jp:'小さな緑色の染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'080',color:'rgba(0,137,0,.4)',size:0,eff:[{type:4,num:['15']}]},

    {idx:109,grade:2,imgCate:'itemHole',display:109,na:{ko:'작은 연두색 염료',en:'Small Light Green Dye',jp:'小さな薄緑色の染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'0f0',color:'rgba(0,255,0,.4)',size:0,eff:[{type:26,num:['3']}]},

    {idx:110,grade:2,imgCate:'itemHole',display:110,na:{ko:'작은 노랑색 염료',en:'Small Yellow Dye',jp:'小さな黄色い染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'ff0',color:'rgba(255,255,0,.4)',size:0,eff:[{type:9,num:['3']}]},

    {idx:111,grade:2,imgCate:'itemHole',display:111,na:{ko:'작은 주황색 염료',en:'Small Orange Dye',jp:'小さなオレンジ色の染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'f80',color:'rgba(255,137,0,.4)',size:0,eff:[{type:3,num:['15']}]},

    {idx:112,grade:2,imgCate:'itemHole',display:112,na:{ko:'작은 빨강색 염료',en:'Small Red Dye',jp:'小さな赤色染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'f00',color:'rgba(255,0,0,.4)',size:0,eff:[{type:24,num:['3']}]},

    {idx:113,grade:2,imgCate:'itemHole',display:113,na:{ko:'작은 보라색 염료',en:'Small Purple Dye',jp:'小さな紫色の染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'80f',color:'rgba(137,0,255,.4)',size:0,eff:[{type:6,num:['15']}]},

    {idx:114,grade:2,imgCate:'itemHole',display:114,na:{ko:'작은 파랑색 염료',en:'Small Blue Dye',jp:'小さな青色染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'00f',color:'rgba(0,0,255,.4)',size:0,eff:[{type:23,num:['3']}]},

    {idx:115,grade:2,imgCate:'itemHole',display:115,na:{ko:'작은 군청색 염료',en:'Small Ultramarine Dye',jp:'小さな群青色素'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'008',color:'rgba(0,0,137,.4)',size:0,eff:[{type:5,num:['15']}]},

    '','','','','',
    {idx:121,grade:3,imgCate:'itemHole',display:121,na:{ko:'백색 염료',en:'White Dye',jp:'白色染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'fff',color:'rgba(255,255,255,.6)',size:1,eff:[{type:21,num:['7']}]},
    {idx:122,grade:3,imgCate:'itemHole',display:122,na:{ko:'흑색 염료',en:'Black Dye',jp:'黒色染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'000',color:'rgba(0,0,0,.6)',size:1,eff:[{type:22,num:['7']}]},
    {idx:123,grade:3,imgCate:'itemHole',display:123,na:{ko:'청록색 염료',en:'Cyan Dye',jp:'青緑色染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'088',color:'rgba(0,137,137,.6)',size:1,eff:[{type:0,num:['50']}]},
    {idx:124,grade:3,imgCate:'itemHole',display:124,na:{ko:'카키색 염료',en:'Khaki Dye',jp:'カーキ色染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'880',color:'rgba(137,137,0,.6)',size:1,eff:[{type:21,num:['2']},{type:22,num:['2']}]},
    {idx:125,grade:3,imgCate:'itemHole',display:125,na:{ko:'하늘색 염료',en:'Light Blue Dye',jp:'水色染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'0ff',color:'rgba(0,255,255,.6)',size:1,eff:[{type:25,num:['7']}]},
    {idx:126,grade:3,imgCate:'itemHole',display:126,na:{ko:'분홍색 염료',en:'Pink Dye',jp:'ピンクの染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'f0f',color:'rgba(255,0,255,.6)',size:1,eff:[{type:23,num:['2']},{type:24,num:['2']},{type:25,num:['2']},{type:26,num:['2']}]},
    {idx:127,grade:3,imgCate:'itemHole',display:127,na:{ko:'자주색 염료',en:'Red Violet Dye',jp:'紫色の染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'808',color:'rgba(137,0,137,.6)',size:1,eff:[{type:8,num:['7']}]},
    {idx:128,grade:3,imgCate:'itemHole',display:128,na:{ko:'녹색 염료',en:'Green Dye',jp:'緑色染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'080',color:'rgba(0,137,0,.6)',size:1,eff:[{type:4,num:['30']}]},
    {idx:129,grade:3,imgCate:'itemHole',display:129,na:{ko:'연두색 염료',en:'Light Green Dye',jp:'薄緑色染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'0f0',color:'rgba(0,255,0,.6)',size:1,eff:[{type:26,num:['7']}]},
    {idx:130,grade:3,imgCate:'itemHole',display:130,na:{ko:'노랑색 염료',en:'Yellow Dye',jp:'黄色の染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'ff0',color:'rgba(255,255,0,.6)',size:1,eff:[{type:9,num:['7']}]},
    {idx:131,grade:3,imgCate:'itemHole',display:131,na:{ko:'주황색 염료',en:'Orange Dye',jp:'オレンジ色染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'f80',color:'rgba(255,137,0,.6)',size:1,eff:[{type:3,num:['30']}]},
    {idx:132,grade:3,imgCate:'itemHole',display:132,na:{ko:'빨강색 염료',en:'Red Dye',jp:'赤色染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'f00',color:'rgba(255,0,0,.6)',size:1,eff:[{type:24,num:['7']}]},
    {idx:133,grade:3,imgCate:'itemHole',display:133,na:{ko:'보라색 염료',en:'Purple Dye',jp:'紫色の染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'80f',color:'rgba(137,0,255,.6)',size:1,eff:[{type:6,num:['30']}]},
    {idx:134,grade:3,imgCate:'itemHole',display:134,na:{ko:'파랑색 염료',en:'Blue Dye',jp:'青色染料'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'00f',color:'rgba(0,0,255,.6)',size:1,eff:[{type:23,num:['7']}]},
    {idx:135,grade:3,imgCate:'itemHole',display:135,na:{ko:'군청색 염료',en:'Ultramarine Dye',jp:'群青色素'},kg:0.1,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'008',color:'rgba(0,0,137,.6)',size:1,eff:[{type:5,num:['30']}]},
    '','','','','',
    {idx:141,grade:4,imgCate:'itemHole',display:141,na:{ko:'큰 백색 염료',en:'Large White Dye',jp:'大きな白色染料'},kg:0.2,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'fff',color:'rgba(255,255,255,.8)',size:2,eff:[{type:21,num:['10']}]},
    {idx:142,grade:4,imgCate:'itemHole',display:142,na:{ko:'큰 흑색 염료',en:'Large Black Dye',jp:'大きな黒色染料'},kg:0.2,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'000',color:'rgba(0,0,0,.8)',size:2,eff:[{type:22,num:['10']}]},
    {idx:143,grade:4,imgCate:'itemHole',display:143,na:{ko:'큰 청록색 염료',en:'Large Turquoise Dye',jp:'大青緑色染料'},kg:0.2,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'088',color:'rgba(0,137,137,.8)',size:2,eff:[{type:0,num:['75']}]},
    {idx:144,grade:4,imgCate:'itemHole',display:144,na:{ko:'큰 카키색 염료',en:'Large Khaki Dye',jp:'大きなカーキ色染料'},kg:0.2,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'880',color:'rgba(137,137,0,.8)',size:2,eff:[{type:21,num:['3']},{type:22,num:['3']}]},
    {idx:145,grade:4,imgCate:'itemHole',display:145,na:{ko:'큰 하늘색 염료',en:'Large Light Blue Dye',jp:'大きな水色染料'},kg:0.2,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'0ff',color:'rgba(0,255,255,.8)',size:2,eff:[{type:25,num:['10']}]},
    {idx:146,grade:4,imgCate:'itemHole',display:146,na:{ko:'큰 분홍색 염료',en:'Large Pink Dye',jp:'大きなピンクの染料'},kg:0.2,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'f0f',color:'rgba(255,0,255,.8)',size:2,eff:[{type:23,num:['3']},{type:24,num:['3']},{type:25,num:['3']},{type:26,num:['3']}]},
    {idx:147,grade:4,imgCate:'itemHole',display:147,na:{ko:'큰 자주색 염료',en:'Large Red Violet Dye',jp:'大きな紫色の染料'},kg:0.2,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'808',color:'rgba(137,0,137,.8)',size:2,eff:[{type:8,num:['10']}]},
    {idx:148,grade:4,imgCate:'itemHole',display:148,na:{ko:'큰 녹색 염료',en:'Large Green Dye',jp:'大きな緑色の染料'},kg:0.2,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'080',color:'rgba(0,137,0,.8)',size:2,eff:[{type:4,num:['50']}]},
    {idx:149,grade:4,imgCate:'itemHole',display:149,na:{ko:'큰 연두색 염료',en:'Large Light Green Dye',jp:'大きな緑色の染料'},kg:0.2,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'0f0',color:'rgba(0,255,0,.8)',size:2,eff:[{type:26,num:['10']}]},
    {idx:150,grade:4,imgCate:'itemHole',display:150,na:{ko:'큰 노랑색 염료',en:'Large Yellow Dye',jp:'大きな黄色い染料'},kg:0.2,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'ff0',color:'rgba(255,255,0,.8)',size:2,eff:[{type:9,num:['10']}]},
    {idx:151,grade:4,imgCate:'itemHole',display:151,na:{ko:'큰 주황색 염료',en:'Large Orange Dye',jp:'大きなオレンジ色の染料'},kg:0.2,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'f80',color:'rgba(255,137,0,.8)',size:2,eff:[{type:3,num:['50']}]},
    {idx:152,grade:4,imgCate:'itemHole',display:152,na:{ko:'큰 빨강색 염료',en:'Large Red Dye',jp:'大赤色染料'},kg:0.2,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'f00',color:'rgba(255,0,0,.8)',size:2,eff:[{type:24,num:['10']}]},
    {idx:153,grade:4,imgCate:'itemHole',display:153,na:{ko:'큰 보라색 염료',en:'Large Purple Dye',jp:'大きな紫色の染料'},kg:0.2,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'80f',color:'rgba(137,0,255,.8)',size:2,eff:[{type:6,num:['50']}]},
    {idx:154,grade:4,imgCate:'itemHole',display:154,na:{ko:'큰 파랑색 염료',en:'Large Blue Dye',jp:'大青色染料'},kg:0.2,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'00f',color:'rgba(0,0,255,.8)',size:2,eff:[{type:23,num:['10']}]},
    {idx:155,grade:4,imgCate:'itemHole',display:155,na:{ko:'큰 군청색 염료',en:'Large Ultramarine Dye',jp:'大きな群青色素'},kg:0.2,price:1000,txt:{ko:'아이템을 염색 할때 쓰이는 염료',en:'Dyes used to dye items',jp:'アイテムを染めるときに使われる染料'},colorSet:'008',color:'rgba(0,0,137,.8)',size:2,eff:[{type:5,num:['50']}]},
  ],
  upgrade:[//업그레이드 아이템
    {idx:0,grade:1,imgCate:'itemUpgrade',display:0,na:{ko:'대장장이 망치I',en:'Blacksmith Hammer I',jp:'鍛冶屋のハンマーI'},kg:1,price:1000,action:'',invenUse:false,txt:{ko:'방어구 업그레이드에 쓰인다.',en:'Used to upgrade armor.',jp:'防具のアップグレードに使われる。'},eff:['?']},
    {idx:1,grade:2,imgCate:'itemUpgrade',display:1,na:{ko:'대장장이 망치II',en:'Blacksmith Hammer II',jp:'鍛冶屋のハンマーII'},kg:1,price:2000,action:'',invenUse:false,txt:{ko:'방어구 업그레이드에 쓰인다.',en:'Used to upgrade armor.',jp:'防具のアップグレードに使われる。'},eff:['?']},
    {idx:2,grade:3,imgCate:'itemUpgrade',display:2,na:{ko:'대장장이 망치III',en:'Blacksmith Hammer III',jp:'鍛冶屋のハンマーIII'},kg:2,price:4000,action:'',invenUse:false,txt:{ko:'방어구 업그레이드에 쓰인다.',en:'Used to upgrade armor.',jp:'防具のアップグレードに使われる。'},eff:['?']},
    {idx:3,grade:4,imgCate:'itemUpgrade',display:3,na:{ko:'대장장이 망치IV',en:'Blacksmith Hammer IV',jp:'鍛冶屋のハンマーIV'},kg:2,price:8000,action:'',invenUse:false,txt:{ko:'방어구 업그레이드에 쓰인다.',en:'Used to upgrade armor.',jp:'防具のアップグレードに使われる。'},eff:['?']},
    {idx:4,grade:5,imgCate:'itemUpgrade',display:4,na:{ko:'대장장이 망치V',en:'Blacksmith Hammer V',jp:'鍛冶屋のハンマーV'},kg:3,price:10000,action:'',invenUse:false,txt:{ko:'방어구 업그레이드에 쓰인다.',en:'Used to upgrade armor.',jp:'防具のアップグレードに使われる。'},eff:['?']},
    {idx:5,grade:5,imgCate:'itemUpgrade',display:5,na:{ko:'대장장이 망치VI',en:'Blacksmith Hammer VI',jp:'鍛冶屋のハンマーVI'},kg:3,price:10000,action:'',invenUse:false,txt:{ko:'방어구 업그레이드에 쓰인다.',en:'Used to upgrade armor.',jp:'防具のアップグレードに使われる。'},eff:['?']},
    {idx:6,grade:1,imgCate:'itemUpgrade',display:6,na:{ko:'숫돌I',en:'Whetstone I',jp:'砥石I'},kg:0.1,price:1000,action:'',invenUse:false,txt:{ko:'무기 업그레이드에 쓰인다.',en:'Used to upgrade weapons.',jp:'武器のアップグレードに使われる。'},eff:['?']},
    {idx:7,grade:2,imgCate:'itemUpgrade',display:7,na:{ko:'숫돌II',en:'Whetstone II',jp:'砥石II'},kg:0.1,price:2000,action:'',invenUse:false,txt:{ko:'무기 업그레이드에 쓰인다.',en:'Used to upgrade weapons.',jp:'武器のアップグレードに使われる。'},eff:['?']},
    {idx:8,grade:3,imgCate:'itemUpgrade',display:8,na:{ko:'숫돌III',en:'Whetstone III',jp:'砥石III'},kg:0.1,price:4000,action:'',invenUse:false,txt:{ko:'무기 업그레이드에 쓰인다.',en:'Used to upgrade weapons.',jp:'武器のアップグレードに使われる。'},eff:['?']},
    {idx:9,grade:4,imgCate:'itemUpgrade',display:9,na:{ko:'숫돌IV',en:'Whetstone IV',jp:'砥石IV'},kg:0.1,price:8000,action:'',invenUse:false,txt:{ko:'무기 업그레이드에 쓰인다.',en:'Used to upgrade weapons.',jp:'武器のアップグレードに使われる。'},eff:['?']},
    {idx:10,grade:5,imgCate:'itemUpgrade',display:10,na:{ko:'숫돌V',en:'Whetstone V',jp:'砥石V'},kg:0.1,price:10000,action:'',invenUse:false,txt:{ko:'무기 업그레이드에 쓰인다.',en:'Used to upgrade weapons.',jp:'武器のアップグレードに使われる。'},eff:['?']},
    {idx:11,grade:5,imgCate:'itemUpgrade',display:11,na:{ko:'숫돌VI',en:'Whetstone VI',jp:'砥石VI'},kg:0.1,price:10000,action:'',invenUse:false,txt:{ko:'무기 업그레이드에 쓰인다.',en:'Used to upgrade weapons.',jp:'武器のアップグレードに使われる。'},eff:['?']},
  ],
  material:[//재료
    {idx:0,grade:1,imgCate:'itemMaterial',display:0,na:{ko:'식량',en:'Food',jp:'食料'},kg:10,price:100,action:'',invenUse:false,txt:{ko:'항해 할때 먹는 식량.',en:'Food to eat when sailing.',jp:'航海時に食べる食料。'},eff:['?']},
    {idx:1,grade:1,imgCate:'itemMaterial',display:1,na:{ko:'물',en:'Water',jp:'水'},kg:10,price:100,action:'',invenUse:false,txt:{ko:'항해 할때 마시는 물.',en:'Water to drink when sailing.',jp:'航海時に飲む水。'},eff:['?']},
    {idx:2,grade:1,imgCate:'itemMaterial',display:2,na:{ko:'보리',en:'Barley',jp:'大麦'},kg:10,price:500,action:'',invenUse:false,txt:{ko:'보리는 밀보다 값이 싸서 경제적이고 가축의 사료로 사용되기도 한다.',en:'Barley is cheaper than wheat, making it economical and often used as feed for livestock.',jp:'大麦は小麦より安いので経済的で、家畜の飼料として使われることもある。'},eff:['?']},
    {idx:3,grade:1,imgCate:'itemMaterial',display:3,na:{ko:'쌀',en:'Rice',jp:'お米'},kg:10,price:1000,action:'',invenUse:false,txt:{ko:'벼의 씨앗에서 껍질을 벗겨 낸 식량이다.',en:'It is a food product that is hulled from the seeds of rice.',jp:'稲の種から籾殻を取り除いた食料である。'},eff:['?']},
    {idx:4,grade:1,imgCate:'itemMaterial',display:4,na:{ko:'밀가루',en:'Wheat Flour',jp:'小麦粉'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'밀의 배유부분을 가루로 만든 것이다.',en:'The endosperm of wheat is ground into flour.',jp:'小麦の胚乳部分を粉末にしたもの。'},eff:['?']},
    {idx:5,grade:1,imgCate:'itemMaterial',display:5,na:{ko:'커피',en:'Coffee Bean',jp:'コーヒー'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'커피나무의 씨앗이며 음용 커피의 재료이다.',en:'The seed of the coffee plant and the ingredient in drinking coffee.',jp:'コーヒーの木の種子であり、飲用コーヒーの材料である。'},eff:['?']},
    {idx:6,grade:1,imgCate:'itemMaterial',display:6,na:{ko:'카카오',en:'Cacao',jp:'カカオ'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'쌍떡잎식물 아욱목 벽오동나무과의 교목으로 코코아라고도 한다.',en:'A member of the dicotyledonous mallow family, also known as cocoa.',jp:'双子葉植物アオイ科の壁桐科の交配樹で、ココアとも呼ばれる。'},eff:['?']},
    {idx:7,grade:1,imgCate:'itemMaterial',display:7,na:{ko:'레몬',en:'Lemon',jp:'レモン'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'비타민 C의 함량이 높은 신맛 나는 과일.',en:'Sour fruits with a high content of vitamin C.',jp:'ビタミンCの含有量が高い酸味のあるフルーツ。'},eff:['?']},
    {idx:8,grade:1,imgCate:'itemMaterial',display:8,na:{ko:'오렌지',en:'Orange',jp:'オレンジ'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'감귤류에 속하는 열매의 하나로 모양이 둥글고 주황빛이며 껍질이 두껍고 즙이 많다.',en:'A member of the citrus family, it is round, orange in color, and has a thick, succulent skin.',jp:'柑橘類に属する果実の一つで、形が丸く、オレンジ色で、皮が厚く、果汁が多い。'},eff:['?']},
    {idx:9,grade:1,imgCate:'itemMaterial',display:9,na:{ko:'키위',en:'Kiwi',jp:'キウイ'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'껍질이 솜털로 덮여있고 녹색을 띤 갈색의 새콤달콤한 맛이 나는 과일이다.',en:'It is a greenish-brown fruit with a fuzzy skin and a sweet and sour flavor.',jp:'皮が綿毛で覆われ、緑がかった茶色の甘酸っぱい味の果物である。'},eff:['?']},
    {idx:10,grade:1,imgCate:'itemMaterial',display:10,na:{ko:'석류',en:'Pomegranate',jp:'ザクロ'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'부처꽃과에 속하는 빨간색의 껍질 안에 과육이 꽉 차있는 과일이다.',en:'It\'s a red, fleshy fruit in a red skin that belongs to the Buddha flower family.',jp:'仏花科に属する赤色の皮の中に果肉がぎっしり詰まった果実である。'},eff:['?']},
    {idx:11,grade:1,imgCate:'itemMaterial',display:11,na:{ko:'체리',en:'Cherry',jp:'チェリー'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'장미과에 속하는 관목인 벚나무의 열매이다.',en:'The fruit of the cherry tree, a shrub in the rose family.',jp:'バラ科に属する低木である桜の木の実である。'},eff:['?']},
    {idx:12,grade:1,imgCate:'itemMaterial',display:12,na:{ko:'파인애플',en:'Pineapple',jp:'パイナップル'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'잎이 모여난 칼 모양이고 비타민이 풍부한 열대과일이다.',en:'It\'s a tropical fruit with sword-shaped leaves that are packed with vitamins.',jp:'葉が集まったナイフ型で、ビタミンが豊富なトロピカルフルーツです。'},eff:['?']},
    {idx:13,grade:1,imgCate:'itemMaterial',display:13,na:{ko:'블루베리',en:'Blueberry',jp:'ブルーベリー'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'달고 신맛이 나는 짙은 하늘색, 붉은빛을 띤 갈색, 검은색이고 겉에 흰가루가 묻어있는 과일.',en:'A sweet and sour, dark light blue, reddish brown, or black fruit with a white powdery exterior.',jp:'甘酸っぱい味の濃い水色、赤みを帯びた茶色、黒色で外側に白い粉がついた果実。'},eff:['?']},
    {idx:14,grade:1,imgCate:'itemMaterial',display:14,na:{ko:'포도',en:'Grape',jp:'ぶどう'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'송이 형태로 열리는 동그란 모양 또는 갸름한 알갱이 모양의 과일.',en:'A round or slender, granular fruit that opens in the form of a cluster.',jp:'房状に開いた丸い形や細長い粒状の果実。'},eff:['?']},
    {idx:15,grade:1,imgCate:'itemMaterial',display:15,na:{ko:'바나나',en:'Banana',jp:'バナナ'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'칼륨과 식이섬유소가 풍부하여 건강에 좋은 과일.',en:'A healthy fruit that is high in potassium and fiber.',jp:'カリウムと食物繊維が豊富で健康に良いフルーツです。'},eff:['?']},
    {idx:16,grade:1,imgCate:'itemMaterial',display:16,na:{ko:'아보카도',en:'Avocado',jp:'アボカド'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'악어의 등처럼 울퉁불퉁한 껍질 때문에 악어배라 불리는 과일.',en:'A fruit called an alligator pear because of its bumpy skin, like an alligator\'s back.',jp:'ワニの背中のようにゴツゴツした皮があることからワニ梨と呼ばれるフルーツ。'},eff:['?']},
    {idx:17,grade:1,imgCate:'itemMaterial',display:17,na:{ko:'코코넛',en:'Coconut',jp:'ココナッツ'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'연한 녹색의 열대과일로서 즙이 많아 음료로는 과일.',en:'A light green, tropical, succulent fruit used as a beverage.',jp:'薄緑色のトロピカルフルーツで果汁が多く、飲み物としてはフルーツ。'},eff:['?']},
    {idx:18,grade:1,imgCate:'itemMaterial',display:18,na:{ko:'두리안',en:'Durian',jp:'ドリアン'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'천국의 맛과 지옥의 냄새를 모두 가지고 있는 과일.',en:'A fruit that tastes like heaven and smells like hell.',jp:'天国の味と地獄の匂いの両方を持つ果物。'},eff:['?']},
    {idx:19,grade:1,imgCate:'itemMaterial',display:19,na:{ko:'사탕수수',en:'Sugar Cane',jp:'サトウキビ'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'설탕의 원료로 높이 2∼6m까지 열대지방에서 자란다.',en:'A source of sugar, it grows in the tropics up to 2-6 meters tall.',jp:'砂糖の原料として高さ2～6mまで熱帯地方で育つ。'},eff:['?']},
    {idx:20,grade:1,imgCate:'itemMaterial',display:20,na:{ko:'완두콩',en:'Garden Bean',jp:'エンドウ豆'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'초록 빛깔과 귀여운 모양으로 사랑받는 식이섬유소가 풍부한 콩 중의 왕이다.',en:'Loved for its green color and cute shape, it\'s the king of fiber-rich beans.',jp:'緑色と可愛らしい形で愛されている食物繊維が豊富な豆の王様。'},eff:['?']},
    {idx:21,grade:1,imgCate:'itemMaterial',display:21,na:{ko:'강낭콩',en:'Kidney Bean',jp:'インゲン豆'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'단백질뿐 아니라 다양한 무기질과 비타민과 같은 영양분을 고루 함유한 붉은빛을 띠는 콩이다.',en:'It\'s a reddish-colored bean that\'s packed with nutrients like protein, as well as a variety of minerals and vitamins.',jp:'タンパク質だけでなく、様々なミネラルやビタミンなどの栄養素をまんべんなく含む赤みを帯びた豆である。'},eff:['?']},
    {idx:22,grade:1,imgCate:'itemMaterial',display:22,na:{ko:'팥',en:'Red Bean',jp:'小豆'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'붉은색을 띠고 사포닌이 풍부하고 곡류에 부족한 라이신과 트립토판이 함유되어 콩의 한종류이다.',en:'It is a type of bean that is red in color, rich in saponins, and contains lysine and tryptophan, which are lacking in grains.',jp:'赤みを帯び、サポニンが豊富で、穀物に不足しているリジンとトリプトファンを含む豆の一種である。'},eff:['?']},
    {idx:23,grade:1,imgCate:'itemMaterial',display:23,na:{ko:'수수',en:'Sorghum',jp:'ソルガム'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'흰색·노란색·갈색·붉은 갈색등 다양한 색을 가지고 있는 작은 알갱이로 구성된 식용가능한 식물이다.',en:'It is an edible plant that consists of small kernels that come in a variety of colors, including white, yellow, brown, and reddish brown.',jp:'白・黄・茶色・赤褐色など様々な色を持つ小さな粒で構成された食用可能な植物です。'},eff:['?']},
    {idx:24,grade:1,imgCate:'itemMaterial',display:24,na:{ko:'치즈',en:'Cheese',jp:'チーズ'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'우유 속에 있는 카세인(casein)을 뽑아 응고·발효시킨 식품이다.',en:'The casein in milk is extracted, coagulated, and fermented.',jp:'牛乳の中にあるカゼイン（カゼイン）を抽出して凝固・発酵させた食品です。'},eff:['?']},
    {idx:25,grade:1,imgCate:'itemMaterial',display:25,na:{ko:'위스키',en:'Whisky',jp:'ウイスキー'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'엿기름 또는 곡류 따위를 효모로 알코올 발효하여 증류하고 오크통에 저장하여 숙성한 술이다.',en:'It is an alcoholic fermentation of malt or grain with yeast, distilled, and aged in oak barrels.',jp:'麦芽や穀物などを酵母でアルコール発酵させて蒸留し、オーク樽に貯蔵して熟成させたお酒。'},eff:['?']},
    {idx:26,grade:1,imgCate:'itemMaterial',display:26,na:{ko:'데낄라',en:'Tequila',jp:'テキーラ'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'멕시코 특산의 다육식물인 용설란(龍舌蘭)의 수액을 채취해서 증류한 것이 테킬라이다.',en:'Tequila is distilled from the sap of the agave plant, a succulent native to Mexico.',jp:'メキシコ特産の多肉植物であるリュウゼツランの樹液を採取して蒸留したものがテキーラである。'},eff:['?']},
    {idx:27,grade:1,imgCate:'itemMaterial',display:27,na:{ko:'와인',en:'Wine',jp:'ワイン'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'포도를 발효시켜 제조한 알코올 음료이다.',en:'An alcoholic beverage made by fermenting grapes.',jp:'ブドウを発酵させて製造したアルコール飲料です。'},eff:['?']},
    {idx:28,grade:1,imgCate:'itemMaterial',display:28,na:{ko:'럼',en:'Rum',jp:'ラム酒'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'당밀이나 사탕수수의 즙을 발효시켜서 증류한 술이며 화이트 럼과 다크 럼이 있다.',en:'Distilled from the fermented juice of molasses or sugar cane, it comes in both white and dark rums.',jp:'糖蜜やサトウキビの果汁を発酵させて蒸留したお酒で、ホワイトラムとダークラムがある。'},eff:['?']},
    {idx:29,grade:1,imgCate:'itemMaterial',display:29,na:{ko:'산호',en:'Coral',jp:'サンゴ'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'겉은 무르고 속은 단단한 석회질로 된 나뭇가지 모양의 산호. 모양과 색깔이 아름다워 보석으로 취급했다.',en:'A twig-like coral with a soft exterior and a hard calcareous interior. They were treated as jewelry because of their beautiful shape and color.',jp:'外側は柔らかく、内側は硬い石灰質の小枝状のサンゴ。形や色が美しく、宝石として扱われた。'},eff:['?']},
    {idx:30,grade:1,imgCate:'itemMaterial',display:30,na:{ko:'동광석',en:'Copper Ore',jp:'銅鉱石'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'구리를 함유한 광석의 총칭으로서, 동광 혹은 동광석이라고도 부른다.',en:'A generic term for ores containing copper, also known as copper ore or cassiterite.',jp:'銅を含む鉱石の総称で、銅鉱または銅鉱石とも呼ばれる。'},eff:['?']},
    {idx:31,grade:1,imgCate:'itemMaterial',display:31,na:{ko:'석탄',en:'Coal',jp:'石炭'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'땅속에서 얻은 숯. 식물이 땅에 묻힌 다음, 열과 압력을 받으면서 만들어진 고체 상태의 물질이다.',en:'Charcoal from the ground. It is a solid substance formed when plants are buried in the ground and then subjected to heat and pressure.',jp:'地中から得られる木炭。植物が地中に埋められた後、熱と圧力を受けて作られた固体状態の物質である。'},eff:['?']},
    {idx:32,grade:1,imgCate:'itemMaterial',display:32,na:{ko:'은광석',en:'Silver Ore',jp:'銀鉱石'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'은을 함유한 광석을 총칭한다.',en:'Refers to ores that contain silver.',jp:'銀を含む鉱石の総称。'},eff:['?']},
    {idx:33,grade:1,imgCate:'itemMaterial',display:33,na:{ko:'금광석',en:'Gold Ore',jp:'金鉱石'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'금을 함유한 광석의 총칭이다.',en:'A generic term for gold-bearing ores.',jp:'金を含む鉱石の総称である。'},eff:['?']},
    {idx:34,grade:1,imgCate:'itemMaterial',display:34,na:{ko:'주석',en:'Cassiterite',jp:'錫石'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'정방정계 결정형을 가지는 산화 주석 광물이다.',en:'A tin oxide mineral with a tetragonal crystal form.',jp:'正方晶系結晶形を持つ酸化スズ鉱物である。'},eff:['?']},
    {idx:35,grade:1,imgCate:'itemMaterial',display:35,na:{ko:'월계수잎',en:'Bay Leaf',jp:'月桂樹の葉'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'녹색을 띠며, 말린 잎의 경우에 강한 향과 쓴맛이 난다.',en:'It is green in color and has a strong aroma and bitter taste in dried leaves.',jp:'緑色を帯び、乾燥した葉の場合、強い香りと苦味がある。'},eff:['?']},
    {idx:36,grade:1,imgCate:'itemMaterial',display:36,na:{ko:'벌꿀',en:'Honey',jp:'ハチミツ'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'꿀벌이 꽃의 밀선에서 빨아내어 축적한 감미료(당분)이다.',en:'It is a sweetener (sugar) that bees have accumulated by sucking it out of the stigma of the flower.',jp:'ミツバチが花の蜜線から吸い取って蓄積した甘味料（糖分）である。'},eff:['?']},
    {idx:37,grade:1,imgCate:'itemMaterial',display:37,na:{ko:'올리브',en:'Olive',jp:'オリーブ'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'열매를 생으로 혹은 절여 먹거나 압착해서 기름으로 만든다.',en:'The fruit is eaten raw, pickled, or pressed into oil.',jp:'果実を生で食べたり、漬けたり、搾油して油にする。'},eff:['?']},
    {idx:38,grade:1,imgCate:'itemMaterial',display:38,na:{ko:'고추',en:'Chili pepper',jp:'唐辛子'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'익어 가면서 점점 빨갛게 되며 껍질과 씨는 캡사이신을 함유하고 있어 매운 맛이 난다.',en:'As they ripen, they become increasingly red, and the skin and seeds contain capsaicin, which gives them a spicy flavor.',jp:'熟すにつれてどんどん赤くなり、皮と種はカプサイシンを含んでいるので辛味があります。'},eff:['?']},
    {idx:39,grade:1,imgCate:'itemMaterial',display:39,na:{ko:'맥주',en:'Beer',jp:'ビール'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'보리를 가공한 맥아(Malt)를 발효시키고 이를 주재료로 향신료인 홉(hop)을 첨가하여 맛을 낸 술이다.',en:'Malt, a processed barley malt, is fermented and flavored with hops, a spice.',jp:'大麦を加工した麦芽(Malt)を発酵させ、これを主原料に香辛料であるホップ(hop)を加えて味をつけたお酒です。'},eff:['?']},
    {idx:40,grade:1,imgCate:'itemMaterial',display:40,na:{ko:'상아',en:'Ivory',jp:'象牙'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'조각 및 장식품 재료의 일종으로, 넓게는 예술적 용도로 쓰기에 충분할 정도로 크게 자란 포유류 치아의 총칭이다.',en:'A type of carving and ornamental material, broadly speaking, any mammalian tooth that has grown large enough for artistic use.',jp:'彫刻や装飾品の材料の一種で、広くは芸術的用途に使えるほど大きく成長した哺乳類の歯の総称である。'},eff:['?']},
    {idx:41,grade:1,imgCate:'itemMaterial',display:41,na:{ko:'진주',en:'Pearl',jp:'真珠'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'조개 내부로 이물질이 유입되면 격리시키고자 탄산칼슘으로 감싸면서 생기는 것으로 장신구 및 악세사리를 만들때 쓰인다.',en:'It\'s used to make jewelry and accessories by wrapping the shells in calcium carbonate to isolate any foreign matter that gets inside.',jp:'貝殻の内部に異物が侵入すると隔離しようと炭酸カルシウムで包むことで生じるもので、装身具やアクセサリーを作るときに使われる。'},eff:['?']},
    {idx:42,grade:1,imgCate:'itemMaterial',display:42,na:{ko:'공작석',en:'Malachite',jp:'マラカイト'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'구리가 양이온으로 들어가고, 수화 상태인 탄산염 광물로 장신구 및 악세사리를 만들때 쓰인다.',en:'A hydrated carbonate mineral that contains copper as a cation and is used to make jewelry and accessories.',jp:'銅が陽イオンとして入り、水和状態の炭酸塩鉱物で装身具やアクセサリーを作る時に使われます。'},eff:['?']},
    {idx:43,grade:1,imgCate:'itemMaterial',display:43,na:{ko:'호박석',en:'Amber',jp:'琥珀石'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'보통 송진(수액이라고도 함)이 굳어서 100만 년 정도 지나면 호박이 되고 장신구 및 악세사리를 만들때 쓰인다.',en:'Usually, the rosin (also known as sap) hardens into a pumpkin after a million years or so and is used to make jewelry and accessories.',jp:'通常、松脂（樹液とも呼ばれる）が固まって100万年ほど経つとカボチャになり、装身具やアクセサリーを作るときに使われます。'},eff:['?']},
    {idx:44,grade:1,imgCate:'itemMaterial',display:44,na:{ko:'유리공예품',en:'Glass Crafts',jp:'ガラス工芸品'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'유리를 가공해서 만든 물건이나 장식품이다.',en:'An object or ornament made from processed glass.',jp:'ガラスを加工して作ったものや装飾品です。'},eff:['?']},
    {idx:45,grade:1,imgCate:'itemMaterial',display:45,na:{ko:'도자기공예품',en:'Pottery Crafts',jp:'陶磁器工芸品'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'토기, 도자기, 석기 등을 만드는 물건이나 장식품이다.',en:'An object or decoration for making earthenware, pottery, stoneware, etc.',jp:'土器、陶器、石器などを作るものや装飾品である。'},eff:['?']},
    {idx:46,grade:1,imgCate:'itemMaterial',display:46,na:{ko:'미술품',en:'Work of Art',jp:'美術品'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'공간적 또는 시각적 아름다움을 표현하여 만들어진 작품이다.',en:'An artwork created to express spatial or visual beauty.',jp:'空間的または視覚的な美しさを表現して作られた作品である。'},eff:['?']},
    {idx:47,grade:1,imgCate:'itemMaterial',display:47,na:{ko:'금주괴',en:'Gold Ingot',jp:'金インゴット'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'금을 가공하기 좋게 주물로 뜬 사각모양의 주괴이다.',en:'A square-shaped ingot that has been cast to make it easier to work with gold.',jp:'金を加工しやすいように鋳物で浮かせた四角い形のインゴットである。'},eff:['?']},
    {idx:48,grade:1,imgCate:'itemMaterial',display:48,na:{ko:'은주괴',en:'Silver Ingot',jp:'銀インゴット'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'은을 가공하기 좋게 주물로 뜬 사각모양의 주괴이다.',en:'A square-shaped ingot cast from silver to make it easier to work with.',jp:'銀を加工しやすいように鋳物で浮かせた四角い形のインゴットである。'},eff:['?']},
    {idx:49,grade:1,imgCate:'itemMaterial',display:49,na:{ko:'동주괴',en:'Copper Ingot',jp:'銅インゴット'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'동을 가공하기 좋게 주물로 뜬 사각모양의 주괴이다.',en:'A square-shaped ingot that has been cast to make it easier to work copper.',jp:'銅を加工しやすいように鋳物で浮かせた正方形の鋳塊である。'},eff:['?']},
    {idx:50,grade:1,imgCate:'itemMaterial',display:50,na:{ko:'청동주괴',en:'Bronze Ingot',jp:'ブロンズインゴット'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'청동을 가공하기 좋게 주물로 뜬 사각모양의 주괴이다.',en:'A square-shaped ingot cast in bronze to make it easier to work with.',jp:'青銅を加工しやすいように鋳物で浮かせた正方形の鋳塊である。'},eff:['?']},
    {idx:51,grade:1,imgCate:'itemMaterial',display:51,na:{ko:'주석주괴',en:'Tin Ingot',jp:'錫インゴット'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'주석을 가공하기 좋게 주물로 뜬 사각모양의 주괴이다.',en:'A square-shaped ingot that has been cast to make tin easier to work with.',jp:'錫を加工しやすいように鋳物で浮かせた正方形の鋳塊である。'},eff:['?']},
    {idx:52,grade:1,imgCate:'itemMaterial',display:52,na:{ko:'대리석',en:'Marble',jp:'大理石'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'탄산염 광물로 이루어진 변성암으로 주로 저각상이나 건축재료로 쓰인다.',en:'It is a metamorphic rock composed of carbonate minerals and is often used for low-angle sculptures and building materials.',jp:'炭酸塩鉱物からなる変成岩で、主に低角相や建築材料として使われる。'},eff:['?']},
    {idx:53,grade:1,imgCate:'itemMaterial',display:53,na:{ko:'목재',en:'Wood',jp:'木材'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'나무를 이용한 건축재료이다.',en:'Wood is a building material.',jp:'木を利用した建築材料である。'},eff:['?']},
    {idx:54,grade:1,imgCate:'itemMaterial',display:54,na:{ko:'석재',en:'Stone',jp:'石材'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'돌을 이용한 건축재료이다.',en:'Stone is a building material.',jp:'石を利用した建築材料である。'},eff:['?']},
    {idx:55,grade:1,imgCate:'itemMaterial',display:55,na:{ko:'융단',en:'Carpet',jp:'カーペット'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'양털, 목화 혹은 비단 등으로 만든 직물로 바닥에 깔거나 벽에 거는 용도로 사용하는 천을 말한다.',en:'A fabric made of wool, cotton, or silk that is used to cover floors or hang on walls.',jp:'羊毛や綿、あるいは絹などで作られた生地で、床に敷いたり、壁に掛けたりする目的で使用する布をいう。'},eff:['?']},
    {idx:56,grade:1,imgCate:'itemMaterial',display:56,na:{ko:'민트',en:'Mint',jp:'ミント'},kg:5,price:1000,action:'',invenUse:false,txt:{ko:'박하과 식물이고 식용, 화장품등에 쓰인다.',en:'It is a member of the mint family and is used for food, cosmetics, and more.',jp:'ミント科の植物で、食用、化粧品などに使われます。'},eff:['?']},
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
    {idx:0,grade:1,imgCate:'itemEtc',display:2,na:{ko:'동전더미(동)',en:'Stack of Coins (Copper)',jp:'コイン山(銅)'},kg:10,price:1000,
    action:99,invenUse:true,txt:{ko:'G조각 1000개로 판매할 수 있다.',en:'G can be sold for 1000 pieces.',jp:'Gピース1000個で販売できる。'},eff:1000},
    
    {idx:1,grade:2,imgCate:'itemEtc',display:1,na:{ko:'동전더미(은)',en:'Stack of Coins (Silver)',jp:'コインの山(銀)'},kg:20,price:5000,
    action:99,invenUse:true,txt:{ko:'G조각 5000개로 판매할 수 있다.',en:'G can be sold for 5000 pieces.',jp:'Gピース5000個で販売できる。'},eff:5000},

    {idx:2,grade:3,imgCate:'itemEtc',display:0,na:{ko:'동전더미(금)',en:'Stack of Coins (Gold)',jp:'コイン山(金)'},kg:30,price:10000,
    action:99,invenUse:true,txt:{ko:'G조각 10000개로 판매할 수 있다.',en:'G can be sold for 10000 pieces.',jp:'Gピース10000個で販売できる。'},eff:10000},

    {idx:3,grade:4,imgCate:'itemEtc',displayText:'I',display:22,na:{ko:'경험의 서I',en:'Book of ExperiencesI',jp:'経験の書I'},kg:0.1,price:100,
    action:98,invenUse:false,txt:{ko:'100의 경험치를 획득 할 수 있다.',en:'You can earn 100 experience points.',jp:'100の経験値を獲得できる。'},eff:100},

    {idx:4,grade:5,imgCate:'itemEtc',displayText:'II',display:22,na:{ko:'경험의 서II',en:'Book of ExperiencesII',jp:'経験の書II'},kg:0.1,price:1000,
    action:98,invenUse:false,txt:{ko:'1000의 경험치를 획득 할 수 있다.',en:'You can earn 1000 experience points.',jp:'1000の経験値を獲得できる。'},eff:1000},

    {idx:5,grade:5,imgCate:'itemEtc',displayText:'III',display:22,na:{ko:'경험의 서III',en:'Book of ExperiencesIII',jp:'経験の書III'},kg:0.1,price:10000,
    action:98,invenUse:false,txt:{ko:'10000의 경험치를 획득 할 수 있다.',en:'You can earn 10000 experience points.',jp:'10000の経験値を獲得できる。'},eff:10000},

    {idx:6,grade:6,imgCate:'itemEtc',displayText:'IV',display:22,na:{ko:'경험의 서IV',en:'Book of ExperiencesIV',jp:'経験の書IV'},kg:0.1,price:50000,
    action:98,invenUse:false,txt:{ko:'50000의 경험치를 획득 할 수 있다.',en:'You can earn 50000 experience points.',jp:'50000の経験値を獲得できる。'},eff:50000},

    {idx:7,grade:6,imgCate:'itemEtc',displayText:'V',display:22,na:{ko:'경험의 서V',en:'Book of ExperiencesV',jp:'経験の書V'},kg:0.1,price:100000,
    action:98,invenUse:false,txt:{ko:'100000의 경험치를 획득 할 수 있다.',en:'You can earn 100000 experience points.',jp:'100000の経験値を獲得できる。'},eff:100000},

    {idx:8,grade:1,imgCate:'itemEtc',displayText:'I',display:23,na:{ko:'아이템 강화서I',en:'Item Enhancement Scroll I',jp:'アイテム強化書I'},kg:0.1,price:100,
    action:0,invenUse:false,txt:{ko:'일반 아이템을 매직 아이템으로 업그레이드 할 수 있다.',en:'You can upgrade a normal item to a magic item.',jp:'通常のアイテムをマジックアイテムにアップグレードできる。'},eff:['?']},

    {idx:9,grade:2,imgCate:'itemEtc',displayText:'II',display:23,na:{ko:'아이템 강화서II',en:'Item Enhancement Scroll II',jp:'アイテム強化書II'},kg:0.1,price:1000,
    action:0,invenUse:false,txt:{ko:'매직 아이템을 레어 아이템으로 업그레이드 할 수 있다.',en:'You can upgrade Magic items to Rare items.',jp:'マジックアイテムをレアアイテムにアップグレードできる。'},eff:['?']},

    {idx:10,grade:3,imgCate:'itemEtc',displayText:'III',display:23,na:{ko:'아이템 강화서III',en:'Item Enhancement Scroll III',jp:'アイテム強化書III'},kg:0.1,price:5000,
    action:0,invenUse:false,txt:{ko:'레어 아이템을 에픽 아이템으로 업그레이드 할 수 있다.',en:'You can upgrade rare items to epic items.',jp:'レアアイテムをエピックアイテムにアップグレードできる。'},eff:['?']},

    '','','','','','','','',
    {idx:19,grade:1,imgCate:'itemEtc',display:10,na:{ko:'선물상자',en:'Gift Boxes',jp:'ギフトボックス'},price:100,action:100,invenUse:true,txt:{ko:'무언가 나올 것 같은 기분좋은 상자',en:'A box that feels like something will come out of it',jp:'何か出てきそうな気持ちいい箱'},kg:15,eff:['?']},

    {idx:20,grade:1,imgCate:'itemEtc',display:21,na:{ko:'ID 교환권',en:'ID vouchers',jp:'ID交換券'},price:100,action:1,invenUse:true,txt:{ko:'ID를 변경할수 있다.',en:'You can change the ID.',jp:'IDを変更できる。'},kg:0.1,eff:['?']},

    {idx:21,grade:1,imgCate:'itemEtc',display:20,na:{ko:'스킬 제거권',en:'Skill Removal Rights',jp:'スキル除去権'},price:100,action:11,invenUse:false,txt:{ko:'캐릭터의 스킬을 제거할수 있다.',en:'Remove a character\'s skills.',jp:'キャラクターのスキルを除去できる。'},kg:0.1,eff:['?']},

    {idx:22,grade:1,imgCate:'itemEtc',display:28,na:{ko:'보석제거 집게',en:'Jewelry Removal Pincers',jp:'宝石除去用トング'},price:100,action:0,invenUse:false,txt:{ko:'아이템에 박힌 보석을 제거 할 수 있다.',en:'',jp:''},kg:0.3,eff:['?']},

    {idx:23,grade:1,imgCate:'itemEtc',display:29,na:{ko:'보물지도',en:'Treasure Map',jp:'宝の地図'},price:100,action:0,invenUse:false,txt:{ko:'보물이 숨겨진 장소를 알 수 있다.',en:'You know where the treasure is hidden.',jp:'宝物が隠された場所を知ることができる。'},kg:0.3,eff:['?']},

    {idx:24,grade:1,imgCate:'itemEtc',display:30,na:{ko:'보물지도 조각',en:'Treasure Map Fragments',jp:'宝の地図の彫刻'},price:100,action:0,invenUse:false,txt:{ko:'10개를 합치면 보물지도를 만들 수 있다.',en:'Combine 10 of them to create a treasure map.',jp:'10個合わせると宝の地図を作ることができる。'},kg:0.3,eff:['?']},

    {idx:25,grade:4,imgCate:'itemEtc',display:30,na:{ko:'보물지도 조각',en:'Treasure Map Fragments',jp:'宝の地図の彫刻'},price:100,action:0,invenUse:false,txt:{ko:'10개를 합치면 보물지도를 만들 수 있다.',en:'Combine 10 of them to create a treasure map.',jp:'10個合わせると宝の地図を作ることができる。'},kg:0.3,eff:['?']},

    // {idx:25,grade:1,imgCate:'itemEtc',display:31,na:{ko:'선박 설계도',en:'Ship Blueprints',jp:'船舶設計図'},price:100,action:0,invenUse:false,txt:{ko:'선박 설계도 소형, 중형, 대형 중 한개의 설계도를 얻을 수 있다.',en:'Ship Blueprints You can get one of the following blueprints: small, medium, or large.',jp:'船舶設計図 小型、中型、大型のいずれかの設計図が入手できます。'},kg:0.3,eff:['?']},

    // {idx:26,grade:1,imgCate:'itemEtc',display:32,na:{ko:'선박 설계도 조각',en:'Ship Blueprint Fragments',jp:'船の設計図彫刻'},price:100,action:0,invenUse:false,txt:{ko:'5개는 소형, 10개는 중형, 15개는 대형 설계도를 만들 수 있다.',en:'You can create 5 small, 10 medium, and 15 large schematics.',jp:'5個は小型、10個は中型、15個は大型の設計図を作成することができます。'},kg:0.3,eff:['?']},

    // {idx:27,grade:1,imgCate:'itemEtc',displayText:'No1',display:31,na:{ko:'소형 선박 설계도 I',en:'Small Ship Blueprint I',jp:'小型船舶設計図I'},price:100,action:0,invenUse:false,txt:{ko:'소형 선박을 제조 할 수 있는 설계도.',en:'A blueprint from which a small ship can be manufactured.',jp:'小型船舶を製造できる設計図。'},kg:0.1,eff:['?']},

    // {idx:28,grade:1,imgCate:'itemEtc',displayText:'No2',display:31,na:{ko:'소형 선박 설계도 II',en:'Small Ship Blueprint II',jp:'小型船舶設計図II'},price:100,action:0,invenUse:false,txt:{ko:'소형 선박을 제조 할 수 있는 설계도.',en:'A blueprint from which a small ship can be manufactured.',jp:'小型船舶を製造できる設計図。'},kg:0.1,eff:['?']},

    // {idx:29,grade:1,imgCate:'itemEtc',displayText:'No3',display:31,na:{ko:'소형 선박 설계도 III',en:'Small Ship Blueprint III',jp:'小型船舶設計図III'},price:100,action:0,invenUse:false,txt:{ko:'소형 선박을 제조 할 수 있는 설계도.',en:'A blueprint from which a small ship can be manufactured.',jp:'小型船舶を製造できる設計図。'},kg:0.1,eff:['?']},

    // {idx:30,grade:2,imgCate:'itemEtc',displayText:'No4',display:31,na:{ko:'중형 선박 설계도 I',en:'Medium Ship Blueprint I',jp:'中型船の設計図I'},price:100,action:0,invenUse:false,txt:{ko:'중형 선박을 제조 할 수 있는 설계도.',en:'A blueprint from which a medium ship can be manufactured.',jp:'中型船舶を製造できる設計図。'},kg:0.1,eff:['?']},

    // {idx:31,grade:2,imgCate:'itemEtc',displayText:'No5',display:31,na:{ko:'중형 선박 설계도 II',en:'Medium Ship Blueprint II',jp:'中型船の設計図II'},price:100,action:0,invenUse:false,txt:{ko:'중형 선박을 제조 할 수 있는 설계도.',en:'A blueprint from which a medium ship can be manufactured.',jp:'中型船舶を製造できる設計図。'},kg:0.1,eff:['?']},

    // {idx:32,grade:2,imgCate:'itemEtc',displayText:'No6',display:31,na:{ko:'중형 선박 설계도 III',en:'Medium Ship Blueprint III',jp:'中型船の設計図III'},price:100,action:0,invenUse:false,txt:{ko:'중형 선박을 제조 할 수 있는 설계도.',en:'A blueprint from which a medium ship can be manufactured.',jp:'中型船舶を製造できる設計図。'},kg:0.1,eff:['?']},

    // {idx:33,grade:2,imgCate:'itemEtc',displayText:'No7',display:31,na:{ko:'중형 선박 설계도 IV',en:'Medium Ship Blueprint IV',jp:'中型船の設計図IV'},price:100,action:0,invenUse:false,txt:{ko:'중형 선박을 제조 할 수 있는 설계도.',en:'A blueprint from which a medium ship can be manufactured.',jp:'中型船舶を製造できる設計図。'},kg:0.1,eff:['?']},

    // {idx:34,grade:3,imgCate:'itemEtc',displayText:'No8',display:31,na:{ko:'대형 선박 설계도 I',en:'Large Ship Blueprint I',jp:'大型船舶設計図I'},price:100,action:0,invenUse:false,txt:{ko:'대형 선박을 제조 할 수 있는 설계도.',en:'Blueprints for manufacturing large ships.',jp:'大型船舶を製造できる設計図。'},kg:0.1,eff:['?']},

    // {idx:35,grade:3,imgCate:'itemEtc',displayText:'No9',display:31,na:{ko:'대형 선박 설계도 II',en:'Large Ship Blueprint II',jp:'大型船舶設計図II'},price:100,action:0,invenUse:false,txt:{ko:'대형 선박을 제조 할 수 있는 설계도.',en:'Blueprints for manufacturing large ships.',jp:'大型船舶を製造できる設計図。'},kg:0.1,eff:['?']},

    // {idx:36,grade:3,imgCate:'itemEtc',displayText:'No10',display:31,na:{ko:'대형 선박 설계도 III',en:'Large Ship Blueprint III',jp:'大型船舶設計図III'},price:100,action:0,invenUse:false,txt:{ko:'대형 선박을 제조 할 수 있는 설계도.',en:'Blueprints for manufacturing large ships.',jp:'大型船舶を製造できる設計図。'},kg:0.1,eff:['?']},

    // {idx:37,grade:3,imgCate:'itemEtc',displayText:'No11',display:31,na:{ko:'대형 선박 설계도 IV',en:'Large Ship Blueprint IV',jp:'大型船舶設計図IV'},price:100,action:0,invenUse:false,txt:{ko:'대형 선박을 제조 할 수 있는 설계도.',en:'Blueprints for manufacturing large ships.',jp:'大型船舶を製造できる設計図。'},kg:0.1,eff:['?']},

    // {idx:38,grade:3,imgCate:'itemEtc',displayText:'No12',display:31,na:{ko:'대형 선박 설계도 V',en:'Large Ship Blueprint V',jp:'大型船舶設計図V'},price:100,action:0,invenUse:false,txt:{ko:'대형 선박을 제조 할 수 있는 설계도.',en:'Blueprints for manufacturing large ships.',jp:'大型船舶を製造できる設計図。'},kg:0.1,eff:['?']},

    // '',
    // {idx:40,grade:1,imgCate:'itemEtc',displayText:'I',display:25,na:{ko:'동물 선수상 설계도',en:'Animal Statue Blueprint',jp:'動物選手像設計図'},price:100,action:0,invenUse:false,txt:{ko:'동물 선수상을 제조 할 수 있는 설계도.',en:'Blueprints for manufacturing an animal statue.',jp:'動物選手像を製造できる設計図。'},kg:0.1,eff:['?']},

    // {idx:41,grade:2,imgCate:'itemEtc',displayText:'II',display:25,na:{ko:'위인 선수상 설계도',en:'Great Athlete Award Blueprint',jp:'偉人選手賞設計図'},price:100,action:0,invenUse:false,txt:{ko:'위인 선수상을 제조 할 수 있는 설계도.',en:'Blueprints for manufacturing the Great Athlete Award.',jp:'偉人選手像を製造できる設計図。'},kg:0.1,eff:['?']},

    // {idx:42,grade:3,imgCate:'itemEtc',displayText:'III',display:25,na:{ko:'용 선수상 설계도',en:'Dragon Statue Blueprint',jp:'ドラゴン選手像の設計図'},price:100,action:0,invenUse:false,txt:{ko:'용 선수상을 제조 할 수 있는 설계도.',en:'A blueprint for a dragon statue that can be manufactured.',jp:'ドラゴン選手像を製造できる設計図。'},kg:0.1,eff:['?']},

  ]
}