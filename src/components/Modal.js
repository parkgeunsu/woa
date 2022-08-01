import React from 'react';
import ModalContainer from 'components/ModalContainer';
import styled from 'styled-components';

const ModalArea = styled.div`
	position:fixed;left:0;right:0;top:0;bottom:0;z-index:20;
	&:after{
		content:'';position:absolute;left:0;right:0;top:0;bottom:0;background:rgba(0,0,0,.7);
	}
`;
const ModalCont = styled.div`
	position:absolute;left:0;right:0;top:0;bottom:0;z-index:2;
	display: flex;
    flex-direction: column;
    align-items: center;
	p{margin:0 0 10px 0;}
`;
const ModalBox = styled.div`
	display:flex;margin:auto auto;flex-direction:column;align-items:center;
`;
const ModalClose = styled.div`
	position:absolute;right:5px;top:10px;z-index:1;
	&{
		span{display:block;position:absolute;right:10px;top:20px;width:30px;height:5px;background:#fff;box-shadow:0 0 10px #fff;}
		span:first-of-type{transform-origin:50% 50%;transform:rotate(135deg);}
		span:last-of-type{transform-origin:50% 50%;transform:rotate(45deg);}
	}
`;
const ModalButton = styled.div`
	margin:10px 0 0 0;
	button {
		margin:0 5px;
	}
`;

// modal: (obj, type) => {
  //   let html = '<div flex-h-center class="modal_cont"><div class="msg_box">'+tag+'</div></div>'+
  //               '<div class="modal_close"><span></span><span></span></div>';
  //   this.el.modal.innerHTML = html;
    
  //   switch(type){
  //     case 'prompt':
  //       let msg = this.el.modal.querySelector('input');
  //       msg.addEventListener('click',(e)=>{
  //         e.stopPropagation();
  //       });
  //       this.el.modal.querySelectorAll('button').forEach((el,idx)=>{
  //         el.addEventListener('click',(e)=>{
  //           e.stopPropagation();
  //           if(obj.itemData){
  //             awb.data.userData.items[obj.itemData.type].splice(obj.itemData.idx,1);//인벤에서 아이템 제거
  //           }
  //           this[obj.bt[idx].fn](msg.value);
  //         });
  //       });
  //       break;
  //     case 'confirm':
  //       this.el.modal.querySelectorAll('button').forEach((el,idx)=>{
  //         el.addEventListener('click',(e)=>{
  //           e.stopPropagation();
  //           if(obj.gachaData){//가챠팝업
  //             if(obj.gachaData.type === 'dia'){//발바닥일때
  //               if(awb.data.userData.info.diamond > obj.gachaData.price){
  //                 awb.data.userData.info.diamond -= obj.gachaData.price;
  //               }else{
  //                 this.modal({txt:'발바닥이 부족합니다.',bt:[{txt:'확인',fn:'popClose'}]},'alert');
  //                 return;
  //               }
  //             }else{//골드일때
  //               if(awb.data.userData.info.money > obj.gachaData.price){
  //                 awb.data.userData.info.money -= obj.gachaData.price;
  //               }else{
  //                 this.modal({txt:'골드가 부족합니다.',bt:[{txt:'확인',fn:'popClose'}]},'alert');
  //                 return;
  //               }
  //             }
  //             awb.data.save_data();
  //             awb.header.set_info();
  //             this[obj.bt[idx].fn](obj.gachaData.num,obj.gachaData.type);
  //             if(idx === 0){//확인 눌렀을때
  //               awb.main.el.root.classList.add('noback');
  //             }
  //           }
  //         });
  //       });
  //       break;
  //     default:
  //       break;
  //   }
  //   this.el.modal.querySelector('.modal_cont').addEventListener('click',()=>{
  //     this.el.modal.classList.remove('on');
  //   });
  // },

const buttonEvent = (dataInfo, btInfo, fn) => {
	switch(btInfo.action) {
		case 'gacha':
			fn('start', dataInfo);
			break;
		case 'popClose':
			break;
		default:
			break;
	}
}
const typeAsContent = (type, dataObj, fn) => {
	if (type === 'confirm') {
		return (
			<ModalBox>
				<p>{dataObj.msg}</p>
				<ModalButton className="bt_box" flex="true">
					{dataObj?.bt && dataObj.bt.map((btData, idx) => {
						return <button key={idx} onClick={() => {buttonEvent(dataObj.info, dataObj.bt[idx], fn);}} msg="true">{btData.txt}</button>
					})}
				</ModalButton>
			</ModalBox>
		);
	} else if (type === 'prompt') {
		return (
			<ModalBox>
				<p>{dataObj.msg}</p>
				<input type="text" placeholder={dataObj.hint} />
				<ModalButton className="bt_box" flex="true">
					{dataObj?.bt && dataObj.bt.map((btData, idx) => {
						return <button key={idx} onClick={() => {buttonEvent(dataObj.info, dataObj.bt[idx], fn);}} msg="true">{btData.txt}</button>
					})}
				</ModalButton>
			</ModalBox>
		);
	} else if (type === 'alert') {
		return (
			<ModalBox>
				<p>{dataObj.msg}</p>
				<ModalButton className="bt_box" flex="true">
					{dataObj?.bt && dataObj.bt.map((btData, idx) => {
						return <button key={idx} msg="true">{btData.txt}</button>
					})}
				</ModalButton>
			</ModalBox>
		);
	} 
}
const Modal = ({ 
	onClose,
	type,
	dataObj,
	saveData,
	gameData,
	changeSaveData,
	fn
}) => {
	return (
		<ModalContainer>
			<ModalArea>
				<ModalCont onClick={() => {onClose()}}>
					{typeAsContent(type, dataObj, fn, saveData, gameData, changeSaveData)}
				</ModalCont>
				<ModalClose>
					<span></span><span></span>
				</ModalClose>
			</ModalArea>
		</ModalContainer>
	)
}

export default Modal;
