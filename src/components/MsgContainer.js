import ReactDom from 'react-dom';

const MsgContainer = ({ children }) => {
	const el = document.getElementById('msgContainer');
	return ReactDom.createPortal(children, el);
}

export default MsgContainer;
