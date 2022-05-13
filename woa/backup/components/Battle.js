import React from 'react';

const Battle = () => {
  return (
    <>
      <div class="battle_wrap">
				<div class="battle_area">
					<div class="battle_units">
						<div class="units_ally"></div>
						<div class="units_enemy"></div>
					</div>
					<div class="battle_land">
						<div class="land_ally"></div>
						<div class="land_enemy"></div>
					</div>
					<div class="battle_order">
						<div class="battle_msg">김세존!<br/>현!실!타!격!</div>
					</div>
				</div>
				<div class="battle_menu">
					<ul>
						<li><button>Attack</button></li>
						<li><button>Skill</button></li>
						<li><button>defense</button></li>
					</ul>
				</div>
			</div>
    </>
  );
}

export default Battle;
