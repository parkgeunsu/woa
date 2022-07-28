import { chImg, itemHole, ringImg } from 'components/ImgSet';
import { util } from 'components/Libs';
import MsgContinaer from 'components/MsgContainer';
import imgRing from 'images/ring/ring_.png';
import React from 'react';
import styled from 'styled-components';


const MsgArea = styled.div`
	position:fixed;left:0;right:0;top:0;bottom:0;z-index:10;
	&:after{
		content:'';position:absolute;left:0;right:0;top:0;bottom:0;background:rgba(0,0,0,.7);
	}
`;
const MsgCont = styled.div`
	position:absolute;left:0;right:0;top:0;bottom:0;z-index:2;
  display:flex;flex-direction:column;align-items:center;
	&{
		ul{margin:auto auto;width:80%;}

		button{margin:10px 3px;padding:5px 10px;border-radius:10px;background-image:-webkit-linear-gradient(bottom, rgba(0,0,0,0.075), rgba(255,255,255,0.5));background-image: linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(255,255,255,0.5));box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.5), 0 0 1px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0,0,0,1);border-radius: 20px;color:rgba(255,255,255,0.9);line-height:1;}
	}
`;
const Msg = ({
  text,
}) => {
	return (
		<MsgContinaer>
			<MsgArea className="msg transition">
				<MsgCont className="msg_cont">
          {text}
					{/* {typeAsContent(type, dataObj, saveData, changeSaveData, gameData, imgSet)} */}
				</MsgCont>
			</MsgArea>
		</MsgContinaer>
	)
}

export default Msg;
