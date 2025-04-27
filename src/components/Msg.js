import { FlexBox } from 'components/Container';
import MsgContinaer from 'components/MsgContainer';
import { useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';

const MsgWrap = styled.div`
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 11;
	transition: all 0.3s;
	&.fadeOut {
		opacity: 0;
	}
	&:after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.7);
	}
`;
const MsgCont = styled(FlexBox)`
	position: absolute;
	left: 10%;
	right: 10%;
	top: 0;
	bottom: 0;
	padding: 0 20px;
	z-index: 2;
	word-break: break-all;
	line-height: 1.5;
	font-size: 0.938rem;
	text-align: center;
	span {
		line-height: 1.5;
		font-size: 0.938rem;
		font-weight: 600;
		word-break: keep-all;
	}
	& [caution] {
		color: #ff2a00;
	}
	& [remove] {
		color: #ff8800;
	}
	& [get] {
		color: #0090ff;
	}
	& ul {
		margin: auto auto;
		width: 80%;
	}
	& button {
		margin: 10px 3px;
		padding: 5px 10px;
		border-radius: 10px;
		background-image: -webkit-linear-gradient(
			bottom,
			rgba(0, 0, 0, 0.075),
			rgba(255, 255, 255, 0.5)
		);
		background-image: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.75),
			rgba(255, 255, 255, 0.5)
		);
		box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.5),
			inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 0 1px rgba(0, 0, 0, 0.5),
			0 0 10px rgba(0, 0, 0, 1);
		border-radius: 20px;
		color: rgba(255, 255, 255, 0.9);
		line-height: 1;
	}
`;
const Msg = ({
  text,
	showMsg,
}) => {
	const timeRef = useRef(null);
	const msgRef = useRef(null);
	useLayoutEffect(() => {
		timeRef.current = setTimeout(() => {
			msgRef.current.classList.add("fadeOut");
			timeRef.current = setTimeout(() => {
				showMsg(prev => !prev);
			}, 300);
		}, 1500);
		return () => {
			clearTimeout(timeRef.current);
		}
	}, []);
	return (
		<MsgContinaer>
			<MsgWrap ref={msgRef} className="transition">
				<MsgCont direction="column"  dangerouslySetInnerHTML={{__html: text}}></MsgCont>
			</MsgWrap>
		</MsgContinaer>
	)
}

export default Msg;
