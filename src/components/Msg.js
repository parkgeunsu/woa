import MsgContinaer from 'components/MsgContainer';
import { useLayoutEffect, useRef } from 'react';

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
			<div ref={msgRef} className="msg transition">
				<div className="msg_cont" dangerouslySetInnerHTML={{__html: text}}></div>
			</div>
		</MsgContinaer>
	)
}

export default Msg;
