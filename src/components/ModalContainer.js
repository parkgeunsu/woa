import ReactDom from 'react-dom';

const ModalContainer = ({ children }) => {
	const el = document.getElementById('modalContainer');
	return ReactDom.createPortal(children, el);
}

export default ModalContainer;
