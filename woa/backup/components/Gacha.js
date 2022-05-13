import React from 'react';

const Gacha = () => {
  return (
    <>
    	<div class="gacha_wrap">
			<div class="gacha_menu transition"></div>
			<div class="gacha_area">
				<div class="cards"></div>
				<div class="bg"></div>
				<div class="effect"></div>
				<div class="touch"></div>
			</div>
			<div class="gacha_info">
				<div class="ch_card">
					{/* <img src="./images/ring/ring_.png"/> */}
					<ul class="ch_detail"></ul>
				</div>
				<div class="ch_graph">
					<canvas></canvas>
				</div>
				<div class="ch_state scroll-y"></div>
			</div>
		</div>
    </>
  );
}

export default Gacha;
