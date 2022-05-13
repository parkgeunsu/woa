import React from 'react';
import styled from 'styled-components'

const Lineup = () => {
  return (
    <>
      <div class="lineup_wrap">
				<div class="lineup_save">
					<dl flex-center>
						<dt>저장슬롯</dt>
						<dd>
							<ul>
								<li><button class="save_slot">1</button></li>
								<li><button class="save_slot">2</button></li>
								<li><button class="save_slot">3</button></li>
								<li><button class="save_slot">4</button></li>
								<li><button class="save_slot">5</button></li>
								<li><button class="save_slot">6</button></li>
								<li><button class="save_slot">7</button></li>
								<li><button class="save_slot">8</button></li>
							</ul>
							<button class="save_submit">저장</button>
						</dd>
					</dl>
				</div>
				<div class="lineup_middle">
					<div class="lineup_list scroll-y">
						<ul>
							<li class="lineup_cate lineup_pos">
              {/* <!--기본--> */}
								<span e4 class="l1"></span><span e4 class="l2"></span><span e4 class="l3"></span><span e4 class="l4"></span><span e4 class="l5"></span>
								<span e4 class="l6"></span><span e4 class="l7"></span><span e4 class="l8"></span><span e4 class="l9"></span><span e4 class="l10"></span>
								<span e2 class="l11"></span><span e2 class="l12"></span><span e1 class="l13"></span><span e2 class="l14"></span><span e2 class="l15"></span>
								<span e4 class="l16"></span><span e4 class="l17"></span><span e4 class="l18"></span><span e4 class="l19"></span><span e4 class="l20"></span>
								<span e4 class="l21"></span><span e4 class="l22"></span><span e4 class="l23"></span><span e4 class="l24"></span><span e4 class="l25"></span>
							</li>
							<li class="lineup_cate lineup_pos">
              {/* <!--학익진--> */}
								<span class="l1"></span><span class="l2"></span><span e1 class="l3"></span><span class="l4"></span><span class="l5"></span>
								<span class="l6"></span><span e2 class="l7"></span><span e4 class="l8"></span><span e2 class="l9"></span><span class="l10"></span>
								<span e3 class="l11"></span><span class="l12"></span><span class="l13"></span><span class="l14"></span><span e3 class="l15"></span>
								<span e3 class="l16"></span><span class="l17"></span><span class="l18"></span><span class="l19"></span><span e3 class="l20"></span>
								<span e4 class="l21"></span><span class="l22"></span><span class="l23"></span><span class="l24"></span><span e4 class="l25"></span>
							</li>
							<li class="lineup_cate lineup_pos">
              {/* <!--어린진--> */}
								<span e4 class="l1"></span><span class="l2"></span><span class="l3"></span><span class="l4"></span><span e4 class="l5"></span>
								<span e3 class="l6"></span><span class="l7"></span><span class="l8"></span><span class="l9"></span><span e3 class="l10"></span>
								<span class="l11"></span><span e3 class="l12"></span><span class="l13"></span><span e3 class="l14"></span><span class="l15"></span>
								<span class="l16"></span><span e2 class="l17"></span><span e2 class="l18"></span><span e2 class="l19"></span><span class="l20"></span>
								<span class="l21"></span><span class="l22"></span><span e1 class="l23"></span><span class="l24"></span><span class="l25"></span>
							</li>
							<li class="lineup_cate lineup_pos">
              {/* <!--언월진--> */}
								<span class="l1"></span><span e3 class="l2"></span><span e2 class="l3"></span><span e4 class="l4"></span><span class="l5"></span>
								<span e3 class="l6"></span><span class="l7"></span><span class="l8"></span><span e1 class="l9"></span><span e4 class="l10"></span>
								<span class="l11"></span><span class="l12"></span><span class="l13"></span><span e2 class="l14"></span><span class="l15"></span>
								<span class="l16"></span><span class="l17"></span><span class="l18"></span><span e2 class="l19"></span><span class="l20"></span>
								<span class="l21"></span><span e3 class="l22"></span><span e2 class="l23"></span><span class="l24"></span><span class="l25"></span>
							</li>
							<li class="lineup_cate lineup_pos">
              {/* <!--봉시진--> */}
								<span class="l1"></span><span class="l2"></span><span e3 class="l3"></span><span class="l4"></span><span class="l5"></span>
								<span e4 class="l6"></span><span class="l7"></span><span e3 class="l8"></span><span class="l9"></span><span e4 class="l10"></span>
								<span e2 class="l11"></span><span class="l12"></span><span e3 class="l13"></span><span class="l14"></span><span e2 class="l15"></span>
								<span class="l16"></span><span e2 class="l17"></span><span class="l18"></span><span e2 class="l19"></span><span class="l20"></span>
								<span class="l21"></span><span class="l22"></span><span e1 class="l23"></span><span class="l24"></span><span class="l25"></span>
							</li>
							<li class="lineup_cate lineup_pos">
              {/* <!--방원진--> */}
								<span class="l1"></span><span class="l2"></span><span e4 class="l3"></span><span class="l4"></span><span class="l5"></span>
								<span class="l6"></span><span e3 class="l7"></span><span e2 class="l8"></span><span e3 class="l9"></span><span class="l10"></span>
								<span e4 class="l11"></span><span e2 class="l12"></span><span e1 class="l13"></span><span e2 class="l14"></span><span e4 class="l15"></span>
								<span class="l16"></span><span e3 class="l17"></span><span e2 class="l18"></span><span e3 class="l19"></span><span class="l20"></span>
								<span class="l21"></span><span class="l22"></span><span e4 class="l23"></span><span class="l24"></span><span class="l25"></span>
							</li>
							<li class="lineup_cate lineup_pos">
              {/* <!--안행진--> */}
								<span class="l1"></span><span class="l2"></span><span e2 class="l3"></span><span class="l4"></span><span class="l5"></span>
								<span class="l6"></span><span class="l7"></span><span e1 class="l8"></span><span class="l9"></span><span class="l10"></span>
								<span class="l11"></span><span e2 class="l12"></span><span class="l13"></span><span e2 class="l14"></span><span class="l15"></span>
								<span e4 class="l16"></span><span e3 class="l17"></span><span class="l18"></span><span e3 class="l19"></span><span e4 class="l20"></span>
								<span e3 class="l21"></span><span class="l22"></span><span class="l23"></span><span class="l24"></span><span e3 class="l25"></span>
							</li>
							<li class="lineup_cate lineup_pos">
              {/* <!--장사진--> */}
								<span class="l1"></span><span class="l2"></span><span class="l3"></span><span e3 class="l4"></span><span e4 class="l5"></span>
								<span class="l6"></span><span class="l7"></span><span e4 class="l8"></span><span e2 class="l9"></span><span class="l10"></span>
								<span class="l11"></span><span class="l12"></span><span e1 class="l13"></span><span e4 class="l14"></span><span class="l15"></span>
								<span class="l16"></span><span e2 class="l17"></span><span e4 class="l18"></span><span class="l19"></span><span class="l20"></span>
								<span e4 class="l21"></span><span e3 class="l22"></span><span class="l23"></span><span class="l24"></span><span class="l25"></span>
							</li>
							<li class="lineup_cate lineup_pos">
              {/* <!--형액진--> */}
								<span class="l1"></span><span class="l2"></span><span e3 class="l3"></span><span class="l4"></span><span class="l5"></span>
								<span e4 class="l6"></span><span e3 class="l7"></span><span class="l8"></span><span e3 class="l9"></span><span e4 class="l10"></span>
								<span class="l11"></span><span class="l12"></span><span e1 class="l13"></span><span class="l14"></span><span class="l15"></span>
								<span class="l16"></span><span e2 class="l17"></span><span class="l18"></span><span e2 class="l19"></span><span class="l20"></span>
								<span class="l21"></span><span e2 class="l22"></span><span class="l23"></span><span e2 class="l24"></span><span class="l25"></span>
							</li>
							<li class="lineup_cate lineup_pos">
              {/* <!--추행진--> */}
								<span class="l1"></span><span class="l2"></span><span class="l3"></span><span class="l4"></span><span class="l5"></span>
								<span class="l6"></span><span class="l7"></span><span e4 class="l8"></span><span class="l9"></span><span class="l10"></span>
								<span e3 class="l11"></span><span e3 class="l12"></span><span e3 class="l13"></span><span e3 class="l14"></span><span e3 class="l15"></span>
								<span class="l16"></span><span e2 class="l17"></span><span e1 class="l18"></span><span e2 class="l19"></span><span class="l20"></span>
								<span class="l21"></span><span class="l22"></span><span e2 class="l23"></span><span class="l24"></span><span class="l25"></span>
							</li>
						</ul>
					</div>
					<div class="lineup_area">
						<div class="lineup_info"><div class="lineup_na">기본</div><div class="lineup_cost"><span class="cost_current">0</span><span class="bar"></span><span class="cost_total">0</span></div></div>
						<div class="lineup_map lineup_pos">
							<span class="mapCh l1" data-mapnum="0"><span class="mapEff"></span><span class="mapCh_"></span></span><span class="mapCh l2" data-mapnum="1"><span class="mapEff"></span><span class="mapCh_"></span></span><span class="mapCh l3" data-mapnum="2"><span class="mapEff"></span><span class="mapCh_"></span></span><span class="mapCh l4" data-mapnum="3"><span class="mapEff"></span><span class="mapCh_"></span></span><span class="mapCh l5" data-mapnum="4"><span class="mapEff"></span><span class="mapCh_"></span></span>
							<span class="mapCh l6" data-mapnum="5"><span class="mapEff"></span><span class="mapCh_"></span></span><span class="mapCh l7" data-mapnum="6"><span class="mapEff"></span><span class="mapCh_"></span></span><span class="mapCh l8" data-mapnum="7"><span class="mapEff"></span><span class="mapCh_"></span></span><span class="mapCh l9" data-mapnum="8"><span class="mapEff"></span><span class="mapCh_"></span></span><span class="mapCh l10" data-mapnum="9"><span class="mapEff"></span><span class="mapCh_"></span></span>
							<span class="mapCh l11" data-mapnum="10"><span class="mapEff"></span><span class="mapCh_"></span></span><span class="mapCh l12" data-mapnum="11"><span class="mapEff"></span><span class="mapCh_"></span></span><span class="mapCh l13" data-mapnum="12"><span class="mapEff"></span><span class="mapCh_"></span></span><span class="mapCh l14" data-mapnum="13"><span class="mapEff"></span><span class="mapCh_"></span></span><span class="mapCh l15" data-mapnum="14"><span class="mapEff"></span><span class="mapCh_"></span></span>
							<span class="mapCh l16" data-mapnum="15"><span class="mapEff"></span><span class="mapCh_"></span></span><span class="mapCh l17" data-mapnum="16"><span class="mapEff"></span><span class="mapCh_"></span></span><span class="mapCh l18" data-mapnum="17"><span class="mapEff"></span><span class="mapCh_"></span></span><span class="mapCh l19" data-mapnum="18"><span class="mapEff"></span><span class="mapCh_"></span></span><span class="mapCh l20" data-mapnum="19"><span class="mapEff"></span><span class="mapCh_"></span></span>
							<span class="mapCh l21" data-mapnum="20"><span class="mapEff"></span><span class="mapCh_"></span></span><span class="mapCh l22" data-mapnum="21"><span class="mapEff"></span><span class="mapCh_"></span></span><span class="mapCh l23" data-mapnum="22"><span class="mapEff"></span><span class="mapCh_"></span></span><span class="mapCh l24" data-mapnum="23"><span class="mapEff"></span><span class="mapCh_"></span></span><span class="mapCh l25" data-mapnum="24"><span class="mapEff"></span><span class="mapCh_"></span></span>
						</div>
						<div class="lineup_chInfo scroll-y">
							<ul>
								<li><span class="na"></span><span class="txt"></span><span class="add_txt"></span></li>
								<li><span class="na"></span><span class="txt"></span><span class="add_txt"></span></li>
								<li><span class="na"></span><span class="txt"></span><span class="add_txt"></span></li>
								<li><span class="na"></span><span class="txt"></span><span class="add_txt"></span></li>
								<li><span class="na"></span><span class="txt"></span><span class="add_txt"></span></li>
								<li><span class="na"></span><span class="txt"></span><span class="add_txt"></span></li>
								<li><span class="na"></span><span class="txt"></span><span class="add_txt"></span></li>
								<li><span class="na"></span><span class="txt"></span><span class="add_txt"></span></li>
								<li><span class="na"></span><span class="txt"></span><span class="add_txt"></span></li>
							</ul>
						</div>
					</div>
				</div>
				<div class="lineup_ch scroll-y"></div>
			</div>
    </>
  );
}

export default Lineup;
