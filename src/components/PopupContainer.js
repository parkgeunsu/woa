import ReactDom from 'react-dom';

const PopupContainer = ({ children }) => {
	const el = document.getElementById('popupContainer');
	return ReactDom.createPortal(children, el);
}

export default PopupContainer;
