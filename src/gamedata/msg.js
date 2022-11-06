export const msg = {
	menu:{
		state:{
			ko:'능력치',
			en:'State',
		},
		animalSkill:{
			ko:'동물 스킬',
			en:'Animal Skills',
		},
		skill:{
			ko:'스킬',
			en:'Skill'
		},
		relation:{
			ko:'인연',
			en:'Relation'
		},
		element:{
			ko:'속성',
			en:'Element',
		},
		equipment:{
			ko:'장비 착용',
			en:'Wearing Equipment',
		},
		totalState:{
			ko:'전체 능력치',
			en:'Total State',
		},
		helm:{
			ko:'모자',
			en:'Helm',
		},
		armor:{
			ko:'갑옷',
			en:'Armor',
		},
		weapon:{
			ko:'무기',
			en:'Weapon',
		},
		inven:{
			ko:'인벤',
			en:'Inven',
		},
		equip:{
			ko:'장비',
			en:'Equip',
		},
		accessory:{
			ko:'악세사리',
			en:'Accessory',
		},
		hole:{
			ko:'소켓',
			en:'Hole',
		},
		upgrade:{
			ko:'강화',
			en:'Upgrade',
		},
		material:{
			ko:'재료',
			en:'Material',
		},
		etc:{
			ko:'기타',
			en:'Etc',
		},
		socket:{
			ko:'소켓합성',
			en:'Socket Synthesis',
		},
		class:{
			ko:'등급진화',
			en:'Class Evolution',
		},
		buy:{
			ko:'사다',
			en:'Buy',
		},
		sell:{
			ko:'팔다',
			en:'Sell',
		},
		produce:{
			ko:'제작',
			en:'Produce',
		},
		used:{
			ko:'중고',
			en:'Used',
		},
		possessed:{
			ko:'보유',
			en:'Possessed',
		}
	},
	state:{
		hp:{
			ko:'체력',
			en:'HP'
		},
		sp:{
			ko:'행동',
			en:'SP'
		},
		rsp:{
			ko:'행동회복',
			en:'RSP'
		},
		atk:{
			ko:'공격',
			en:'ARK'
		},
		def:{
			ko:'방어',
			en:'DEF'
		},
		mak:{
			ko:'술법공격',
			en:'MAK'
		},
		mdf:{
			ko:'술법방어',
			en:'MDF'
		},
		rcv:{
			ko:'체력회복',
			en:'RCV'
		},
		spd:{
			ko:'속도',
			en:'SPD'
		},
		luk:{
			ko:'행운',
			en:'LUK'
		},
	},
	info:{
		exp:{
			ko:'경험치',
			en:'Exp',
		},
		cumulativeExp:{
			ko:'누적 경험치',
			en:'Cumulative Exp',
		},
	},
	button:{
		use:{
			ko:'사용',
			en:'Use',
		},
		cancel:{
			ko:'취소',
			en:'Cancel',
		},
		confirm:{
			ko:'확정',
			en:'Confirm',
		},
		upgrade:{
			ko:'업그레이드',
			en:'Upgrade',
		},
		buy:{
			ko:'구입',
			en:'Buy',
		},
		sell:{
			ko:'판매',
			en:'Sell',
		},
		unpack:{
			ko:'확인',
			en:'Unpack',
		},
		synthetic:{
			ko:'합성',
			en:'Synthetic'
		},
		skillReset:{
			ko:'스킬리셋',
			en:'Reset Skill'
		},
		skill:{
			ko:'스킬',
			en:'Skill'
		},
		reset:{
			ko:'초기화',
			en:'Reset'
		}
	},
	itemInfo:{
		itemEffect:{
			ko:'아이템 효과',
			en:'Item Effect',
		},
		basicEffect:{
			ko:'기본 효과',
			en:'Basic Effects',
		},
		addEffect:{
			ko:'추가 효과',
			en:'Additional Effects',
		},
		socketEffect:{
			ko:'소켓 효과',
			en:'Socket effect',
		},
		sellPrice:{
			ko:'판매가',
			en:'Selling Price',
		},
		buyPrice:{
			ko:'구입가',
			en:'Buying Price',
		}
	},
	sentence:{
		maxGrade:{
			ko:'최대 등급입니다.',
			en:'This is the maximum rating.',
		},
		selectWhetstone:{
			ko:'숫돌을 선택해 주세요.',
			en:'Please select a whetstone.',
		},
		selectHammer:{
			ko:'대장장이 망치를 선택해 주세요.',
			en:'Please choose a blacksmith hammer.',
		},
		selectUpgradeTools:{
			ko:'업그레이드 도구를 선택해 주세요.',
			en:'Please select an upgrade tool.',
		},
		upgradeQuestion:{
			ko:'업그레이드를 하시겠습니까?',
			en:'Would you like to upgrade?',
		},
		removeSocket:{
			ko:'소켓 보석을 제거 하시겠습니까?',
			en:'Remove Socket Jewels?',
		},
		notReclaimed:{
			ko:'제거 후 보석은 회수되지 않습니다.',
			en:'Jewels are not recovered after removal.'
		},
		lackBadges:{
			ko:'동물 뱃지가 부족합니다.',
			en:'There are not enough animal badges.'
		},
		maxSkillLv:{
			ko:'스킬이 최대 레벨입니다.',
			en:'The skill maximum level.',
		},
		lackUpgrade:{
			ko:'아이템 강화서가 부족합니다.',
			en:'There are not enough item enhancements.',
		},
		lackMoney:{
			ko:'보유한 돈이부족합니다.',
			en:'You don\'t have enough money.',
		},
		selectItem:{
			ko:'아이템을 선택해 주세요.',
			en:'Please select an item.',
		},
		none:{
			ko:'아무런 변화가 없습니다.',
			en:'There\'s no change.',
		},
		unpackItem:{
			ko:'미개봉 아이템입니다.',
			en:'This is an unpacked item.',
		},
		unpossibleJob:{
			ko:'착용이 불가능한 직업입니다.',
			en:'It\'s an impossible job to wear.',
		},
		heavyKg:{
			ko:'착용하려는 장비가 무겁습니다.',
			en:'The equipment you are trying to wear is heavy.',
		},
		samePart:{
			ko:'같은 부위에 이미 다른 아이템이 착용 중입니다.',
			en:'Another item is already being worn in the same part.',
		},
		selectQuantity:{
			ko:'수량을 선택하세요.',
			en:'Please select a quantity.',
		}
	},
	sentenceFn:{
		beforeSkill:(lang, txt, lv) => {
			switch(lang) {
				case 'ko':
					return `선행 스킬(${txt})의 레벨이<br/> ${lv}레벨 이상 이어야 가능합니다.`;
				case 'en':
					return `Leading skill(${txt}) level must be<br/>at least ${lv} level.`;
				default:
					break;
			}
		},
		lackItem:(lang, item) => {
			console.log(item);
			switch(lang) {
				case 'ko':
					return `${item[lang]} 이/가 부족합니다.`;
				case 'en':
					return `There's not enough ${item[lang]}.`;
				default:
					break;
			}
		}
	}
}