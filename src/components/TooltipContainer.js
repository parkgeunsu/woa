import ReactDom from 'react-dom';

const TooltipContainer = ({ children }) => {
	const el = document.getElementById('tooltipContainer');
	return ReactDom.createPortal(children, el);
}

export default TooltipContainer;
