import { AppContext } from 'App';
import { ItemPic } from 'components/ImagePic';
import { util } from 'components/Libs';
import Modal from 'components/Modal';
import ModalContainer from 'components/ModalContainer';
import Msg from 'components/Msg';
import MsgContainer from 'components/MsgContainer';
import TabMenu from 'components/TabMenu';
import 'css/itemEnhancement.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Img = styled.img.attrs(
  ({imgurl}) => ({
    src: imgurl 
  })
)``;
const ItemEnWrap = styled.div`
	background:url(${({backImg}) => backImg});background-size:cover;
`;
const ShopIcon = styled.span`
	background:url(${({ icoType }) => icoType}) no-repeat left center;background-size:100%;
`;

const itemEnList = [
	{na:'socket',icon:14},
	{na:'class',icon:15},
];
const ColorArea = styled.div`
	&:after{
		content:'';position:absolute;left:0;right:0;top:0;bottom:0;background:transparent;filter:blur(4px);border-radius:50%;pointer-events:none;
	}
	&.hole1:after{
		background:
		radial-gradient(ellipse at 50% 50%, ${({mainColor}) => mainColor ? mainColor[0] : 'transparent'},transparent 40%),
		radial-gradient(ellipse at 50% 0%, ${({color}) => color[0] ? color[0].color : 'transparent'},transparent 100%);
	}
	&.hole2:after{
		background:
		radial-gradient(ellipse at 50% 50%, ${({mainColor}) => mainColor ? mainColor[0] : 'transparent'},transparent 40%),
		radial-gradient(ellipse at 50% 10%, ${({color}) => color[0] ? color[0].color : 'transparent'},transparent 90%),
		radial-gradient(ellipse at 50% 90%, ${({color}) => color[1] ? color[1].color : 'transparent'},transparent 90%);
	}
	&.hole3:after{
		background:
		radial-gradient(ellipse at 50% 50%, ${({mainColor}) => mainColor ? mainColor[0] : 'transparent'},transparent 40%),
		radial-gradient(ellipse at 50% 10%, ${({color}) => color[0] ? color[0].color : 'transparent'},transparent 80%),
		radial-gradient(ellipse at 80% 90%, ${({color}) => color[1] ? color[1].color : 'transparent'},transparent 80%),
		radial-gradient(ellipse at 20% 90%, ${({color}) => color[2] ? color[2].color : 'transparent'},transparent 80%);
	}
	&.hole4:after{
		background:
		radial-gradient(ellipse at 50% 50%, ${({mainColor}) => mainColor ? mainColor[0] : 'transparent'},transparent 40%),
		radial-gradient(ellipse at 15% 15%, ${({color}) => color[0] ? color[0].color : 'transparent'},transparent 70%),
		radial-gradient(ellipse at 85% 15%, ${({color}) => color[1] ? color[1].color : 'transparent'},transparent 70%),
		radial-gradient(ellipse at 85% 85%, ${({color}) => color[2] ? color[2].color : 'transparent'},transparent 70%),
		radial-gradient(ellipse at 15% 85%, ${({color}) => color[3] ? color[3].color : 'transparent'},transparent 70%);
	}
	&.hole5:after{
		background:
		radial-gradient(ellipse at 50% 50%, ${({mainColor}) => mainColor ? mainColor[0] : 'transparent'},transparent 40%),
		radial-gradient(ellipse at 50% 10%, ${({color}) => color[0] ? color[0].color : 'transparent'},transparent 60%),
		radial-gradient(ellipse at 85% 35%, ${({color}) => color[1] ? color[1].color : 'transparent'},transparent 60%),
		radial-gradient(ellipse at 70% 100%, ${({color}) => color[2] ? color[2].color : 'transparent'},transparent 60%),
		radial-gradient(ellipse at 30% 100%, ${({color}) => color[3] ? color[3].color : 'transparent'},transparent 60%),
		radial-gradient(ellipse at 15% 35%, ${({color}) => color[4] ? color[4].color : 'transparent'},transparent 60%);
	}
`;
const UpgradeArea = styled.div`

`;
const UpgradeShadow = styled.div`
	  position:absolute;left:0;right:0;top:0;bottom:0;background:radial-gradient(ellipse at 50% 50%,${({gradeColor}) => gradeColor},transparent 40%);
    filter:blur(4px);border-radius:50%;pointer-events:none;
`;
const ItemTotalEff = styled.div`
	border:5px solid transparent;
  border-image:url(${({frameBack}) => frameBack}) 5 round;
	.item_header{text-align:center;}
	.item_name{
		line-height:1.2;
		color:${({color}) => color};
		font-size:0.875rem;
		font-weight:600;
	}
`;
const LockIcon = styled.div`
	background-image:url(${({iconLock}) => iconLock});background-size:100%;background-repeat:no-repeat;background-position:center center;
`;
const ItemEnBack = styled.div`
	&:before{
		content:'';
		position:absolute;left:50%;
		top:${({idx}) => {
			if (idx === 0) {
				return '45%';
			} else {
				return '30%';
			} 
		}};
		width:${({idx}) => {
			if (idx === 0) {
				return '50%';
			} else {
				return '100%';
			} 
		}};
		height:100%;
		background: url(${({back}) => back}) no-repeat center top;
		background-size:100%;transform:translate(-50%,0);
	}
`;
const colorMix = (util, mainColor, color) => {
	let colorNum = [0,0,0];
	const mRgb = mainColor.indexOf('rgb') >= 0 ? mainColor.replace(/\s/g,'').replace(/rgba\(([0-9]{1,3})\,([0-9]{1,3})\,([0-9]{1,3})\,[0-9,\.]{1,5}\)/g,`$1,$2,$3`).split(',') : util.getHslaToRgba(mainColor).replace(/\s/g,'').replace(/rgba\(([0-9]{1,3})\,([0-9]{1,3})\,([0-9]{1,3})\,[0-9,\.]{1,5}\)/g,`$1,$2,$3`).split(',');
	color.forEach((colorData, idx) => {
		const rgb = colorData ? colorData.replace(/\s/g,'').replace(/rgba\(([0-9]{1,3})\,([0-9]{1,3})\,([0-9]{1,3})\,[0-9,\.]{1,5}\)/g,`$1,$2,$3`).split(',') : ['0','0','0'];
		rgb.forEach((num, idx) => {
			colorNum[idx] += Math.floor((num*1 - mRgb[idx]*1) * 0.1);
		});
	});
	const changeColor = `rgba(${mRgb[0]*1 + colorNum[0]},${mRgb[1]*1 + colorNum[1]},${mRgb[2]*1 + colorNum[2]},1)`;
	
	//console.log(colorNum, mRgb,changeColor)
	return changeColor;
}
const colorantSetColor = (color) => {
	const num = Math.floor(Math.random()*5);
	switch(num) {
		case 0:
			return `<path fill="${color}" d="M83.148,30.918C73.296,15.122,50.787,9.629,34.444,19.182c-1.542,0.915-3.021,1.963-4.429,3.14
			C17.018,34.352,14.203,55.64,28.273,68c9.85,8.24,23.218,10.301,34.474,3.433c14.067-8.928,16.882-28.842,2.813-39.827
			c-14.772-10.989-34.47,0-35.175,16.479c0-7.553,3.518-14.421,9.851-18.539c9.847-6.182,23.211-3.436,30.247,5.493
			c8.442,10.988,6.332,26.094-4.217,35.022c-9.854,8.241-23.219,8.241-33.771,2.747C13.5,62.505,12.797,36.41,26.559,21.757
			c-1.154,0.649-2.723,1.872-4.357,3.465c-6.534,6.379-10.578,15.194-10.578,24.927c0,19.471,15.554,35.254,36.115,35.254
			C86.46,85.402,92.996,48.084,83.148,30.918z M38.562,24.79c-1.327,0.78-2.667,1.705-4.019,2.792
			c-11.896,9.516-13.303,27.369-1.343,37.671c9.847,8.241,23.918,7.554,32.36-2.059c7.034-8.929,6.333-21.977-3.517-28.842
			c-6.334-4.123-13.37-3.434-19.698,0.686c-5.629,4.121-7.739,10.988-4.221,17.168c3.517,5.493,10.549,7.554,16.181,3.434
			c2.813-2.061,3.518-6.867,0.701-9.614c0.703,4.809-4.219,9.614-9.144,8.24c-3.518-1.373-4.222-4.807-4.925-7.555
			c0-4.12,3.517-8.928,8.442-9.613c9.146-1.375,15.477,6.867,13.368,15.108c-2.815,8.926-13.368,12.358-21.81,8.241
			c-7.034-4.121-9.848-13.736-6.331-21.289c4.925-10.3,17.586-13.049,27.437-8.24c9.85,4.805,13.365,17.166,10.551,26.781
			c-2.814,6.865-7.737,12.36-14.771,15.107c-14.072,5.494-30.25-2.059-35.879-15.794c-5.627-13.048,0-28.155,11.96-36.396
			c11.959-7.554,28.844-7.554,37.99,4.12C61.338,20.617,48.673,18.555,38.562,24.79z"/>`;
		case 1:
			return `<path fill="${color}" d="M26.834,63.481c-0.311-0.36-0.611-0.722-0.897-1.093c-0.093-0.129-0.183-0.262-0.274-0.394
			C26.037,62.502,26.426,62.996,26.834,63.481z M81.878,28.666c2.54,3.813,4.385,8.078,5.459,12.532
			C86.396,36.608,84.498,32.38,81.878,28.666z M86.109,38.834c-1.377-5.001-3.832-9.792-7.377-14.007
			c-2.7-2.869-5.878-5.307-9.389-7.216c-0.087-0.046-0.178-0.088-0.264-0.133c-16.441-8.217-38.862-2.697-46.332,14.922
			c-2.828,6.315-3.479,13.264-1.84,19.709c-0.438-1.621-0.75-3.269-0.932-4.928c-0.013-0.121-0.021-0.243-0.032-0.364
			c-0.02-0.235-0.044-0.469-0.057-0.705c-0.317-5.163,0.716-10.466,3.246-15.378c-1.216,2.26-2.159,4.699-2.784,7.294
			c0.434-2.215,1.115-4.386,2.074-6.465c-0.146,0.277-0.289,0.555-0.426,0.837c-2.314,4.798-2.951,9.812-2.311,14.71
			c0.356,3.458,1.383,6.801,2.959,9.882c0.06,0.13,0.116,0.26,0.179,0.39c-0.054-0.117-0.108-0.236-0.161-0.355
			c0.074,0.143,0.152,0.279,0.228,0.419c-0.317-0.646-0.606-1.305-0.876-1.972c-0.064-0.166-0.135-0.33-0.197-0.498
			c0.58,1.404,1.258,2.778,2.021,4.119c3.718,6.03,9.548,10.816,16.302,13.096c-0.82-0.223-1.637-0.48-2.442-0.775
			c1.791,0.736,3.642,1.275,5.515,1.62c2.848,0.611,5.813,0.786,8.825,0.419c3.061-0.447,5.93-1.42,8.534-2.799
			c4.467-2.217,8.349-5.701,10.992-10.396c0.3-0.657,0.569-1.324,0.823-1.996c-1.169,2.622-2.762,4.929-4.677,6.896
			c2.158-2.339,3.883-5.047,5.063-7.98c1.931-5.748,2.087-11.861-0.458-17.448c-3.756-8.064-12.018-13.929-21.779-13.197
			c-6.06,0.539-11.303,3.448-14.857,7.85c2.336-3.091,5.578-5.606,9.6-7.117c6.759-2.199,13.518-0.733,19.526,2.933
			c5.63,4.12,8.913,9.67,9.673,15.58c-0.116-1.277-0.33-2.564-0.66-3.851c-3.005-8.796-11.266-15.396-21.027-16.128
			C39.271,25.07,28.006,38.266,31.01,51.461c2.254,8.799,9.763,14.662,18.775,16.861c-3.756,1.469-8.26,1.469-12.016,0
			c9.729,7.307,23.932,1.508,31.462-6.512c-4.36,6.939-12.361,10.911-20.948,10.911c-18.023,0-31.543-18.327-27.037-35.189
			c3.005-10.264,11.266-19.061,21.781-21.994c12.015-2.932,24.031,0,33.045,8.064c9.762,9.531,13.518,24.192,8.261,36.657
			c-4.507,10.263-12.017,18.328-23.282,19.793c-16.523,2.933-34.547-5.131-42.058-19.793c-6.759-13.93-3.004-30.792,7.511-41.789
			c-10.515,2.199-14.27,13.197-15.771,21.993C9.23,55.86,16.74,69.057,29.508,78.588c8.401,5.738,18.209,7.578,27.459,5.906
			c0.068-0.013,0.138-0.021,0.209-0.035c0.466-0.086,0.93-0.185,1.393-0.289c0.06-0.014,0.117-0.027,0.177-0.04
			c14.097-3.237,25.96-14.319,28.592-29.735C88.07,49.149,87.604,43.831,86.109,38.834z M75.604,76.789
			c-3.844,3.247-8.357,5.754-13.219,7.443C67.16,82.73,71.641,80.316,75.604,76.789z M31.76,83.719
			c9.981,3.957,20.992,3.86,30.625,0.514C52.766,87.254,41.951,86.561,31.76,83.719z M30.287,68.086
			c-1.919-1.408-3.701-3.04-5.287-4.894C26.531,65.111,28.322,66.715,30.287,68.086z M30.287,68.086
			c3.269,2.4,6.943,4.137,10.772,5.143C37.2,71.943,33.504,70.33,30.287,68.086z"/>`;
		case 2:
			return `<path fill="${color}" d="M17.573,65.18c-0.749-1.453-1.407-2.96-1.974-4.505c-0.428-1.22-0.795-2.468-1.104-3.739
			c-3.775-16.628,5.225-35.055,22.026-41.31c6.271-2.021,12.544-2.697,19.513-2.021c16.027,2.697,29.268,16.858,29.965,32.371
			c-8.361-6.07-13.938-15.512-25.087-16.859c-13.938-2.024-25.087,8.092-31.36,19.557c-0.697-12.813,11.848-20.232,21.604-26.977
			c-11.149-0.674-22.301,4.721-27.406,14.35c0,0,0.942-1.343,2.443-3.041c3.359-3.889,7.541-6.588,12.419-8.611
			c-7.665,5.396-14.635,10.791-17.422,20.232c-2.787,10.791,0,22.256,9.06,29.675c7.666,6.744,18.816,9.441,28.574,4.721
			c4.876-2.023,12.542-6.744,11.148-13.488c-7.665,6.744-18.816,8.094-27.18,1.351c-8.363-7.419-7.664-20.229,1.396-26.975
			c6.271-4.72,14.636-4.041,21.604-1.343c6.27,2.696,9.755,8.099,11.846,14.17c2.786,12.813-4.182,26.315-16.726,31.036
			c-8.005,2.931-15.74,2.576-22.687-0.032c3.405,1.198,6.949,1.822,10.461,1.796c0.993,0.03,1.997,0.083,3.01,0.083
			c0.005,0,0.011,0,0.017,0c0.969,0,1.944-0.264,2.928-0.402c2.084-0.356,4.078-1.072,5.967-1.858
			c2.695-1.077,5.203-2.549,7.435-4.348c2.354-1.823,4.396-4.02,5.979-6.611c0.857-1.317,1.603-2.709,2.223-4.169
			c0.688-1.998,1.146-3.996,1.381-5.997c0.004-0.024,0.01-0.048,0.014-0.073c0.407-2.891,0.252-5.703-0.364-8.341
			c-0.255-1.267-0.594-2.532-1.03-3.799c-0.563-1.089-1.203-2.136-1.905-3.141c-0.774-1.199-1.663-2.317-2.646-3.341
			c-2.63-2.949-6.005-4.879-9.623-5.82c-3.148-0.912-6.603-1.147-10.217-0.51c-1.255,0.279-2.435,0.687-3.548,1.185
			c-3.377,1.328-6.309,3.603-8.299,6.907c-0.335,0.728-0.626,1.475-0.876,2.234c-0.182,0.371-0.358,0.748-0.519,1.139
			c-1.629,4.334-1.104,8.892,0.993,12.612c0.093,0.165,0.189,0.329,0.29,0.492c0.081,0.135,0.163,0.272,0.252,0.407
			c2.139,3.312,5.586,5.853,9.616,6.72c2.724,0.661,5.448,0.669,8.009-0.038c0.006-0.003,0.012-0.003,0.018-0.005
			c0.17-0.049,0.339-0.102,0.508-0.154c0.207-0.064,0.412-0.132,0.618-0.204c0.007-0.003,0.013-0.005,0.021-0.007
			c1.453-0.527,2.823-1.286,4.068-2.289c0.059-0.058,0.116-0.123,0.175-0.182c0.124-0.101,0.247-0.2,0.369-0.306
			c0.49-0.411,0.941-0.858,1.355-1.334c0.062-0.068,0.13-0.131,0.19-0.202c3.483-4.047,4.182-10.116,1.395-14.837
			c-1.758-3.4-4.993-5.37-8.463-6.713c-0.455-0.305-0.904-0.611-1.343-0.918c1.186-0.363,2.354-0.516,3.495-0.483
			c4.26,0.586,8.114,3.001,10.835,6.37c1.967,2.579,3.343,5.618,3.839,8.491c0.728,5.294-0.273,10.393-2.679,14.736
			C68.298,77.25,61.15,81.753,53.322,83.236c-4.056,0.609-8.122,0.353-12.004-0.631c-5.104-1.469-9.892-4.248-14.216-7.646
			c-2.953-2.662-5.458-5.845-7.308-9.428c1.429,2.918,3.221,5.587,5.305,7.951c11.347,14.343,35.96,16.122,47.659-0.532
			c1.161-1.642,2.091-3.372,2.8-5.15c1.059-2.414,1.772-4.988,2.079-7.663C76.243,74.974,62.307,86.439,46.975,85.09
			c-5.66-0.995-11.318-2.364-16.136-5.453c-1.742-1.165-3.349-2.496-4.771-3.987c1.457,1.587,3.063,2.893,4.771,3.987
			c6.805,4.557,15.698,6.525,24.023,5.114c-0.954,0.196-1.917,0.349-2.89,0.457c-1.938,0.154-3.839,0.139-5.696-0.026
			c-0.23-0.029-0.464-0.056-0.696-0.092c-6.931-0.874-13.079-3.644-18.108-7.703c-3.77-3.079-6.941-6.893-9.331-11.147
			c-0.037-0.069-0.075-0.14-0.113-0.208C17.873,65.75,17.721,65.466,17.573,65.18z"/>`;
		case 3:
			return `<path fill="${color}" d="M8.883,41.61c1.047,19.411,14.653,36.78,34.538,39.846c19.887,3.063,39.771-12.261,39.771-31.673
			c-1.045-13.28-13.604-33.715-31.396-25.541c9.419,1.021,16.746,6.128,20.932,13.281c8.373,15.325-4.186,33.717-20.932,34.738
			c-10.579,0.735-20.064-4.918-25.311-13.501c2.376,3.604,5.621,6.817,9.61,9.413c13.606,8.174,33.493,2.043,37.681-14.304
			c2.09-11.238-4.188-23.5-15.701-26.563c-12.559-2.043-21.979,5.108-26.166,16.347c-4.188-17.369,16.748-27.585,31.398-25.542
			c-15.698-4.087-34.539,3.064-37.679,20.434c-1.046,7.152,0,15.325,5.232,21.455c6.28,8.174,16.748,11.24,26.169,8.174
			c11.512-4.087,17.793-16.348,12.559-27.585c-4.188-7.151-13.607-12.26-21.979-8.174c-5.233,3.065-9.421,8.174-7.326,15.326
			c2.093,8.172,11.513,10.218,16.747,4.086c4.185-6.129-2.096-11.238-6.281-13.281c-2.092-1.021-4.188,3.065-7.328,4.087
			c1.048-10.217,12.561-9.195,18.841-6.129c4.187,3.064,6.28,7.151,6.28,12.259c0,7.15-5.234,15.325-12.561,15.325
			c0,0,0-2.044,1.049-3.065C46.562,60,35.048,54.891,37.142,42.632c2.094-8.174,9.42-15.325,17.793-14.303
			c9.42,1.022,16.746,9.195,17.793,18.39c1.049,9.193-5.233,17.368-12.559,21.455c-15.7,8.174-34.54-4.087-36.633-20.434
			c-1.047-8.174,1.047-16.347,6.279-22.477c8.373-9.195,21.98-13.282,34.539-9.195C77.96,21.176,87.38,33.437,88.428,47.74
			c0,26.563-29.306,45.975-54.425,34.736C18.303,75.325,6.79,58.978,8.883,41.61z"/>`;
		case 4:
			return `<path fill="${color}" d="M82.893,63.461C76.086,76.748,63.835,86.715,48.18,87.379c-15.653,0-28.584-11.293-34.708-24.581
			c-3.406-8.638-4.766-19.268,2.039-26.575c-5.445,19.93,9.53,42.52,31.309,41.189c6.807-0.664,13.613-3.321,18.377-7.969
			c7.486-7.309,9.529-18.605,5.445-27.906c-4.764-10.63-17.695-15.946-28.586-11.959c-16.335,5.979-14.973,24.582-6.807,35.876
			c-6.805-0.665-10.889-7.308-12.999-12.779c-0.688-2.2-0.901-3.302-0.901-3.302c-3.114-21.788,22.749-33.748,41.806-27.104
			C50.224,11.64,29.124,18.948,21.638,32.9c-4.764,9.301-4.764,19.932,1.36,29.235c6.126,9.299,17.696,13.285,28.586,10.628
			c-8.849,3.323-17.695,0-24.501-5.313c-11.572-9.968-12.252-26.576-3.404-38.536C31.432,19.184,43.237,15.172,54.7,16.52
			c-6.369-0.842-12.823-0.205-18.652,2.173c5.672-2.762,12.196-4.007,18.94-3.068C68.6,17.621,78.81,26.92,81.53,40.208
			c1.362,5.98,2.725,13.291-2.721,15.945c-0.682,0.665,0-3.32-1.361-4.65c0,19.932-23.822,31.891-42.199,27.906
			c10.891,7.971,25.864,3.32,36.072-3.988c8.168-5.977,12.934-14.615,14.293-23.918c2.043-17.938-11.57-34.547-29.947-37.205
			c-12.576-1.673-24.67,3.685-32.254,12.922c6.523-8.381,16.885-13.93,28.171-13.586c9.529,0.664,18.377,4.65,25.184,11.294
			C86.294,35.558,89.019,50.838,82.893,63.461z"/>`;
		default:
			break;
	}
};
const removeSocket = (data, saveData, gameData, changeSaveData, lang) => {
	let sData = {...saveData};
	const removeIdx = sData.items.etc.findIndex((itemEtc) => itemEtc.idx === 22);
	if (removeIdx >= 0) {//보석제거 집게(22) 있을 경우
		sData.items.etc.splice(removeIdx,1);
		sData.info.money -= gameData.prices.enhancingStickers.socketRemove[0].price;
		sData.items.equip[data.item.select].hole.splice(data.socketIdx,1,0);
		delete sData.items.equip[data.item.select].colorantSet;
		delete sData.items.equip[data.item.select].colorantColor;
		delete sData.items.equip[data.item.select].colorEff;
		delete sData.items.equip[data.item.select].svgColor;

		let cloneColor = data.socket.game.map((data) => {
			return data.color
		});
		const mColor = colorMix(util,data.item.save.color[0], cloneColor);
		let saveColor = [...data.item.save.color];
		saveColor[0] = mColor;
		data.setMainColor(saveColor);
		
		data.showMsg(true);
    data.msgText(`<span remove>-500</span><br/><span remove>-1 ${gameData.items.etc[22].na[lang]}</span>`);
		changeSaveData(sData);
	} else {
		data.showMsg(true);
		//여기 요기 작업 수정
    data.msgText(gameData.msg.sentenceFn.lackItem(lang, gameData.items.etc[22].na));
	}
	console.log(data);
}
const upgrade = (data, saveData, gameData, changeSaveData, lang) => {
	let sData = {...saveData};
	const removeIdx = sData.items.etc.findIndex((itemEtc) => itemEtc.idx === (7 + data.upgradeItem.game.grade));
	if (removeIdx >= 0) {//아이템 강화책(8-10) 있을 경우
		sData.items.etc.splice(removeIdx,1);
		sData.info.money -= gameData.prices.enhancingStickers[`upgrade${data.item.save.grade - 1}`][0].price;
		const removeIdx2 = sData.items.upgrade.findIndex((itemUpgrade) => itemUpgrade.idx === data.upgradeItem.save.idx);
		sData.items.upgrade.splice(removeIdx2,1);
		if (typeof data.upgradeItem.select === 'number') {
			data.setUpgradeOn('upgradeAnimation');
			data.timeoutRef.current = setTimeout(() => {
				data.setUpgradeOn('');
				data.setUpgradeItem({save:{},select:'',game:{}});
				if (Math.random() < data.upgradePercent / 100) {
					console.log(data.upgradePercent / 100);
					sData.items.equip[data.item.select].grade += 1;
					changeSaveData(sData);
				}
			}, 3000);
		}
	} else {
		data.showMsg(true);
    data.msgText(gameData.msg.sentenceFn.lackItem(lang, gameData.items.etc[7 + data.upgradeItem.game.grade].na));
	}
	console.log(data, data.upgradeItem.save.grade)
}
const setPercent = (item, tool) => {
	if (Object.keys(item).length !== 0 && Object.keys(tool).length !== 0) {
		const gradeGap = item.grade - tool.grade;
		switch(gradeGap) {
			case -1:
				return 80;
			case 0:
				return 50;
			case 1:
				return 30;
			case 2:
				return 10;
			default:
				return 100;
		}
	} else {
		return 0;
	}
}
const EnhancingCards = ({
	saveData,
	changeSaveData,
}) => {
  const context = useContext(AppContext);
  const lang = React.useMemo(() => {
    return context.setting.lang;
  }, [context]);
  const imgSet = React.useMemo(() => {
    return context.images;
  }, [context]);
  const gameData = React.useMemo(() => {
    return context.gameData;
  }, [context]);
  const gameItem = React.useMemo(() => {
    return gameData.items;
  }, [gameData]);
  const [modalOn, setModalOn] = useState(false);
	const [modalInfo, setModalInfo] = useState({});
  const [modalType] = useState('confirm');
  const [msgOn, setMsgOn] = useState(false);
  const [msg, setMsg] = useState("");
	const [selectTab, setSelectTab] = useState(0);
	const [item, setItem] = useState(saveData.items);
	const [selectItem1, setSelectItem1] = useState(saveData.items.equip[0] ? {
		save:saveData.items.equip[0],
		select:0,
		game:gameItem.equip[saveData.items.equip[0].part][saveData.items.equip[0].weaponType][saveData.items.equip[0].grade < 5 ? 0 : saveData.items.equip[0].grade - 5][saveData.items.equip[0].idx],
	} : {
		save:{},
		select:'',
		game:{},
	});//좌측 장비 save, game
	const [possibleHole, setPossibleHole] = useState([]);
	const [selectItem2, setSelectItem2] = useState({save:[],select:[],game:[]});//탭1 우측 홀 save, game
	const [selectItem3, setSelectItem3] = useState({save:{},select:'',game:{}});//탭2 우측 홀 save, game
	const [colorantIdx, setColorantIdx] = useState(0);
	const [mainColor, setMainColor] = useState(saveData.items.equip[0] ? saveData.items.equip[0].color : '');//합성된 장비 색상
	const [itemEffShow, setItemEffShow] = useState(false);//아이템 효과 보기
	const [mItemEff, setMItemEff] = useState();//아이템 효과 문구
	const [upgradeOn, setUpgradeOn] = useState('');//업그레이드 애니메이션 동작
	const [upgradePercent, setUpgradePercent] = useState(setPercent(selectItem1?.save, selectItem3?.game));
	const timeoutRef = useRef(null);
	const [modalData, setModalData] = useState({
		fn:() => {},
		payment:'',
	});
	const handleModal = (type, socketIdx) => {
		if (type === 'socket') {
			setModalInfo({
				type: 'confirm',
				msg: `${gameData.msg.sentence.removeSocket[lang]}<br/><span class="des">${gameData.msg.sentence.notReclaimed[lang]}</span>`,
				info: {
					item:selectItem1,
					socket:selectItem2,
					socketIdx:socketIdx,
					showMsg:setMsgOn,
					msgText:setMsg,
					setMainColor:setMainColor,
				},
				bt: [{txt:gameData.msg.button.use[lang],action:'itemEn'},{txt:gameData.msg.button.cancel[lang],action:'popClose'}],
			});
		} else {
			setModalInfo({
				type: 'confirm',
				msg: gameData.msg.sentence.upgradeQuestion[lang],
				info: {
					item:selectItem1,
					showMsg:setMsgOn,
					msgText:setMsg,
					upgradeItem:selectItem3,
					setUpgradeItem:setSelectItem3,
					setUpgradeOn:setUpgradeOn,
					timeoutRef:timeoutRef,
					upgradePercent:upgradePercent,
				},
				bt: [{txt:gameData.msg.button.use[lang],action:'itemEn'},{txt:gameData.msg.button.cancel[lang],action:'popClose'}],
			});
		}
    setModalOn(true);
  }
	useEffect(() => {
		return () => {
			clearTimeout(timeoutRef.current);
		}
	}, []);
	useEffect(() => {
		//equip, hole, upgrade, merterial, etc
		setItem(saveData.items);
		let baseSelectItem = {save:[],select:[],game:[]},
		possibleColorantIdx = '';
		let pHole = [];
		if (saveData.items.equip[selectItem1.select]) {
			saveData.items.equip[selectItem1.select].hole.forEach((data,idx) => {
				if (data) {
					baseSelectItem.save[idx] = data;
					baseSelectItem.game[idx] = gameItem.hole[data.idx];
					pHole[idx] = false;
				} else {
					pHole[idx] = true;
					if (typeof possibleColorantIdx !== 'number') {
						possibleColorantIdx = idx;
					}
				}
			});
			setPossibleHole(pHole);
			setSelectItem2(baseSelectItem);
			setColorantIdx(possibleColorantIdx);
			setMItemEff(util.getTotalEff(selectItem1.save, gameData, baseSelectItem));
		}
	}, [saveData]);
  return (
		<>
			<ItemEnWrap className="wrap" backImg={imgSet.back[2]} >
				<TabMenu list={itemEnList} selectTab={selectTab} setSelectTab={setSelectTab} className="transition" onClick={(idx) => {
					if (idx === 1) {
						setUpgradeOn(false);
						setSelectItem3({save:{},select:'',game:{}});
						clearTimeout(timeoutRef.current);
					}
				}}/>
				<div className="itemEn_area">
					{selectTab === 0 ? (
						<>
							<ItemEnBack className="itemEn_top" idx={0} back={imgSet.back[4]} onClick={(e) => {
								e.stopPropagation();
								if (itemEffShow) {
									setItemEffShow(false);
								}
							}}>
								<div className="button_group">
									<button className="button_big" text="true" onClick={(e) => {
										e.stopPropagation();
										let pHole = [],
											possibleColorantIdx = '';
										let sData = {...saveData};
										console.log('확정');
										let holeArr = [];
										gameData.items.colorant[selectItem1.save.slot].forEach((colorant, setIdx) => {
											let colorantSet = '';
											colorant.socket.forEach((color,idx) => {
												if (selectItem2.save[idx]) {
													if (color !== gameData.items.hole[selectItem2.save[idx].idx].colorSet) {
														colorantSet += 'N';
													} else {
														colorantSet += 'Y';
													}
												} else {
													colorantSet += 'N';
												}
											});
											if (colorantSet.indexOf('N') >= 0) {
												return;
											} else {
												sData.items.equip[selectItem1.select].colorantSet = `${selectItem1.save.slot}_${setIdx}`;
												sData.items.equip[selectItem1.select].colorEff = gameData.items.colorant[selectItem1.save.slot][setIdx].eff;

												sData.items.equip[selectItem1.select].svgColor = gameData.items.colorant[selectItem1.save.slot][setIdx].svgColor;

												let cColor = [...selectItem1.save.color];

												cColor[0] = gameData.items.colorant[selectItem1.save.slot][setIdx].color[0];
												sData.items.equip[selectItem1.select].colorantColor = cColor;
											}
										});
										for(let i = 0; i < selectItem1.save.hole.length; ++i) {
											if (selectItem2.save[i]) {
												holeArr[i] = selectItem2.save[i];
												pHole[i] = false;
											} else {
												holeArr[i] = 0;
												pHole[i] = true;
												if (typeof possibleColorantIdx !== 'number') {
													possibleColorantIdx = i;
												}
											}
										}
										const selectSort = selectItem2.select.sort((a,b) => {
											return b - a;
										});
										selectSort.forEach((data) => {
											sData.items.hole.splice(data,1);
										})
										sData.items.equip[selectItem1.select].hole = holeArr;
										changeSaveData(sData);
										setPossibleHole(pHole);
										setColorantIdx(possibleColorantIdx);
									}}>{gameData.msg.button.confirm[lang]}</button>
								</div>
								{itemEffShow && <ItemTotalEff frameBack={imgSet.etc.frameChBack} className="main_itemEff scroll-y" color={gameData.itemGrade.color[selectItem1.save.grade]}>
									<ul>
										<li className="item_header" flex-center="true"><span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem1.save.colorantSet ? util.getColorant(selectItem1.save.colorantSet, gameData).na[lang] : ''} ${selectItem1.save.modifier[lang]} ${selectItem1.game.na[lang]}`}}></span></li>
										<li className="item_list item_eff">
											<div className="item_title">{gameData.msg.itemInfo.itemEffect[lang]}</div>
											{mItemEff && mItemEff.map((eff, idx) => {
												return (
													<div key={idx} className="item_effs"><span className="cate">{util.getEffectType(eff.type, lang)}</span>{eff.base > 0 && <span className="base">{eff.base}</span>}{eff.add > 0 && <span className="add">{eff.add}</span>}{eff.hole > 0 && <span className="hole">{eff.hole}</span>}<span className="total">{eff.base + eff.add + eff.hole}</span></div>
												)
											})}
										</li>
										<div style={{width:"100%"}}>
											{selectItem1.save.baseEff.length > 0 && (
												<li className="item_list item_eff">
													<div className="item_title">{gameData.msg.itemInfo.basicEffect[lang]}</div>
													{selectItem1.save.baseEff.map((data, idx) => {
														const grade = selectItem1.save.grade > 3 ? 3 : selectItem1.save.grade - 1;
														return (
															<div key={`base${idx}`} className="item_effs">{`${util.getEffectType(data.type, lang)} ${data.num[grade]}`}</div>
														) 
													})}
												</li>
											)}
											{selectItem1.save.addEff.length > 0 && (
												<li className="item_list item_eff">
													<div className="item_title">{gameData.msg.itemInfo.addEffect[lang]}</div>
													{selectItem1.save.addEff.map((data, idx) => {
														return (
															<div key={`add${idx}`} className="item_effs add">{`${util.getEffectType(data.type, lang)} ${data.num[0]}`}</div>
														) 
													})}
												</li>
											)}
											{selectItem1.save.hole.length > 0 && (
												<li className="item_list item_hole">
													<div className="item_title">{gameData.msg.itemInfo.socketEffect[lang]}</div>
													{mItemEff && mItemEff.map((data, idx) => {
														if (data.hole > 0) {
															return (
																<div key={idx} className="item_effs hole">{`${util.getEffectType(data.type, lang)} ${data.hole}`}</div>
															)
														}
													})}
												</li>
											)}
											{selectItem1.game.set !== 0 && (<li className="item_list item_set">
												<div className="item_setNa">{gameData.items.set_type[selectItem1.game.set].na}</div>
											</li>
											)}
										</div>
									</ul>
								</ItemTotalEff>}
								<ColorArea className={`itemEn_colorArea hole${Object.keys(selectItem1.save).length !== 0 ? selectItem1.save?.hole.length : '0'} ${selectItem1.save.colorantSet ? 'colorantSet' : ''}`} mainColor={selectItem1.save.colorantSet ? selectItem1.save.colorantColor : mainColor} color={selectItem2.game}>
									<div className="colorant_item" onClick={() => {
										setItemEffShow(true);
									}}>
										{Object.keys(selectItem1.save).length !== 0 && (
											<span className={`pic ${selectItem1.save.sealed ? "sealed" : ""}`}>
												<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[selectItem1.game.display], selectItem1.save.colorantSet ? selectItem1.save.colorantColor : mainColor || selectItem1.save.color || selectItem1.game.color, selectItem1.save.svgColor || Math.random().toString(36).substring(2, 11))}}>
												</svg>
											</span>
										)}
									</div>
									{selectItem1.save?.hole && selectItem1.save?.hole.map((data, idx) => {
										let cColor = '';
										if (selectItem1.save.colorantSet) {
											const colorantColor = selectItem1.save.colorantSet.split('_');
											cColor = gameData.items.colorant[colorantColor[0]][colorantColor[1]].color;
										}
										return (
											<div className={`colorant colorant${idx} ${colorantIdx === idx ? 'select' : ''} ${possibleHole[idx] ? selectItem2.game[idx] ? 'on' : '' : 'fixed'}`} key={`colorant${idx}`} onClick={() => {//상단 슬롯 클릭
												if (possibleHole[idx]) {
													let cloneSelectItem2 = {...selectItem2};
													if (colorantIdx === idx && selectItem2.game[colorantIdx]) {//선택된 슬롯에 홀이 있으면
													//선택된 홀 제거
														cloneSelectItem2.game[colorantIdx] = ''
														cloneSelectItem2.select[colorantIdx] = '';
														cloneSelectItem2.save[colorantIdx] = '';
														setSelectItem2(cloneSelectItem2);
														let cloneColor = selectItem2.game.map((data) => {
															return data.color
														});
														let saveColor = [...selectItem1.save.color];
														const mColor = colorMix(util,selectItem1.save.color[0], cloneColor);
														saveColor[0] = mColor;
														setMainColor(saveColor);
														setMItemEff(util.getTotalEff(selectItem1.save, gameData, cloneSelectItem2));
													}
													setColorantIdx(idx);
												}
											}}>
												{selectItem2.save && selectItem2.save[idx] && (
													<>
														<div className={`item_colorant ${gameData.itemGrade.txt_e[selectItem2.save[idx].grade || selectItem2.game[idx].grade].toLowerCase()}`}  key={`hole_${idx}`}>
															<ItemPic className="pic" pic="itemEtc" type="hole" idx={selectItem2.game[idx].display} />
														</div>
														<div className={`item_colorantEff`}>
															{selectItem2.game[idx].eff.map((eff,idx) => {
																return <div className="eff" key={`colorant_eff${idx}`}>{util.getEffectType(eff.type, lang)}: <em>{eff.num[0]}</em></div>;
															})}
														</div>
														<LockIcon iconLock={imgSet.icon.iconLock} className="lock" onClick={(e) => {
															e.stopPropagation();
															setModalData({
																fn:removeSocket,
																payment:'socketRemove'
															});
															// setModalFn(removeSocket);
															// setPayment('socketRemove');
															handleModal('socket',idx);
															console.log("슬롯 해제");
														}}/>
														{cColor && (
															<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html:colorantSetColor(cColor)}}>				
															</svg>
														)}
													</>
												)}
											</div>
										)
									})}
								</ColorArea>
							</ItemEnBack>
							<div className="itemEn_bottom scroll-y">
								<div className="item_select item_select1 num4">
									{item.equip && item.equip.map((data, idx) => {
										const itemsGrade = data.grade < 5 ? 0 : data.grade - 5;
										const items = gameItem.equip[data.part][data.weaponType][itemsGrade][data.idx];
										const grade = data.grade || items.grade;
										const itemsHole = data.hole;
										return (
											<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()} ${selectItem1.select === idx ? 'select1' : ''}`} key={`hole_${idx}`} onClick={() => {//하단 좌측 장비 클릭
												setMainColor(data.color);//상단 장비 합성배경 색상
												let baseSelectItem = {save:[],select:[],game:[]};
												let pHole = [],
													possibleColorantIdx = '';
												data.hole.forEach((holeData,idx) => {//박혀 있는 hole셋팅
													if (holeData) {
														baseSelectItem.save[idx] = holeData;
														baseSelectItem.game[idx] = gameItem.hole[holeData.idx];
														pHole[idx] = false;
													} else {
														pHole[idx] = true;
														if (typeof possibleColorantIdx !== 'number') {
															possibleColorantIdx = idx;
														}
													}
												});
												let cloneColor = baseSelectItem.game.map((data) => {
													return data.color
												});
												const mColor = colorMix(util,data.color[0], cloneColor);
												let saveColor = [...data.color];
												saveColor[0] = mColor;
												setMainColor(saveColor);
												setSelectItem1({
													save:{...data},
													select:idx,
													game:items,
												});
												setPossibleHole(pHole);
												setColorantIdx(possibleColorantIdx);
												setSelectItem2(baseSelectItem);
												setMItemEff(util.getTotalEff(data, gameData, baseSelectItem));
											}}>
												<span className={`pic ${data.sealed ? "sealed" : ""}`}>
													<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[items.display], data.color, data.id)}}>
													</svg>
												</span>
												<span className="hole" flex-center="true">
													{itemsHole.map((holeData, holeidx) => {
														const holePic = holeData !== 0 ? gameItem.hole[holeData.idx].display : 0;
														return (
															<span className={`hole_slot hole${holeidx} ${holePic !== 0 ? 'fixed': ''}`} key={`hole${holeidx}`}>
																<ItemPic className="pic" pic="itemEtc" type="etc" idx={holePic} />
															</span>
														);
													})}
												</span>
											</div>
										)
									})}
								</div>
								<div className="item_select item_select2 num4">
									{item.hole && item.hole.map((data, idx) => {
										const items = gameItem.hole[data.idx];
										const grade = data.grade || items.grade;
										const select = selectItem2.select.filter((select) => {
											return select === idx;
										});
										return (
											<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()} ${select.length > 0 ? 'select2' : ''}`} key={`hole_${idx}`} onClick={() => {//하단 우측 홀 클릭
												const overlapIdx = selectItem2.select.findIndex((select) => {
													return select === idx;
												});
												if (possibleHole[colorantIdx] && overlapIdx < 0 && typeof colorantIdx === 'number') {
													//선택된 홀상태 설정
													let cloneSelectItem2 = {...selectItem2};
													cloneSelectItem2.save[colorantIdx] = data;
													//하단 우측 홀 선택상태 설정
													cloneSelectItem2.select[colorantIdx] = idx;
													cloneSelectItem2.game[colorantIdx] = items;
													setSelectItem2(cloneSelectItem2);
													//슬롯 셋팅
													let cloneColor = selectItem2.game.map((data) => {
														return data.color
													});
													const mColor = colorMix(util,selectItem1.save.color[0], cloneColor);
													let saveColor = [...selectItem1.save.color];
													saveColor[0] = mColor;
													setMainColor(saveColor);
													
													setMItemEff(util.getTotalEff(selectItem1.save, gameData, cloneSelectItem2));
													//메인 아이템 컬러 설정
													let colorArr = [...selectItem1.save.color];
													colorArr[0] = mColor;
												}
											}}>
												<ItemPic className="pic" pic="itemEtc" type="hole" idx={items.display} />
											</div>
										)
									})}
								</div>
							</div>
						</>
					) : (
						<>
							<ItemEnBack className={`itemEn_top ${upgradeOn}`} idx={1} back={imgSet.back[5]} onClick={(e) => {
									e.stopPropagation();
									if (itemEffShow) {
										setItemEffShow(false);
									}
							}}>
								<div className="button_group">
									<button className="button_big" text="true" onClick={(e) => {
										e.stopPropagation();
										console.log('업그레이드');
										if (typeof selectItem3.select === 'number') {
											if (selectItem1.save.grade > 3) {
												setMsgOn(true);
												setMsg(gameData.msg.sentence.maxGrade[lang]);
											} else {
												if (selectItem1.save.part === 3) { //무기면
													if (selectItem3.save.idx > 5) { //숫돌이면
														setModalData({
															fn:upgrade,
															payment:`upgrade${selectItem1.save.grade - 1}`
														});
														handleModal('upgrade');
													} else {
														setMsgOn(true);
														setMsg(gameData.msg.sentence.selectWhetstone[lang]);
													}
												} else { //방어구면
													if (selectItem3.save.idx <= 5) { //대장장이망치면
														setModalData({
															fn:upgrade,
															payment:`upgrade${selectItem1.save.grade - 1}`
														});
														handleModal('upgrade');
													} else {
														setMsgOn(true);
														setMsg(gameData.msg.sentence.selectHammer[lang]);
													}
												}
											}
										} else {
											setMsgOn(true);
    									setMsg(gameData.msg.sentence.selectUpgradeTools[lang]);
										}
									}}>{gameData.msg.button.upgrade[lang]}</button>
								</div>
								<UpgradeArea className={`itemEn_upgradeArea`}>
									<div className="upgrade_item" onClick={() => {
										setItemEffShow(true);
									}}>
										{Object.keys(selectItem1.save).length !== 0 && (
											<span className={`pic ${selectItem1.save.sealed ? "sealed" : ""}`}>
												<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[selectItem1.game.display], selectItem1.save.colorantSet ? selectItem1.save.colorantColor : mainColor || selectItem1.save.color || selectItem1.game.color, selectItem1.save.svgColor || Math.random().toString(36).substring(2, 11))}}>
												</svg>
											</span>
										)}
									</div>
									{selectItem3 && (
										<div className={`upgrade_material`}>
											<ItemPic className="pic" pic="itemEtc" type="upgrade" idx={selectItem3.game.display} onClick={() => {
												setSelectItem3({save:{},select:'',game:{}});
											}} />
										</div>
									)}
									{itemEffShow && <ItemTotalEff frameBack={imgSet.etc.frameChBack} className="main_itemEff scroll-y" color={gameData.itemGrade.color[selectItem1.save.grade]}>
										<ul>
											<li className="item_header" flex-center="true"><span className="item_name" dangerouslySetInnerHTML={{__html: `${selectItem1.save.colorantSet ? util.getColorant(selectItem1.save.colorantSet, gameData).na[lang] : ''} ${selectItem1.save.modifier[lang]} ${selectItem1.game.na[lang]}`}}></span></li>
											<li className="item_list item_eff">
												<div className="item_title">{gameData.msg.itemInfo.itemEffect[lang]}</div>
												{mItemEff && mItemEff.map((eff, idx) => {
													return (
														<div key={idx} className="item_effs"><span className="cate">{util.getEffectType(eff.type, lang)}</span>{eff.base > 0 && <span className="base">{eff.base}</span>}{eff.add > 0 && <span className="add">{eff.add}</span>}{eff.hole > 0 && <span className="hole">{eff.hole}</span>}<span className="total">{eff.base + eff.add + eff.hole}</span></div>
													)
												})}
											</li>
											<div style={{width:"100%"}}>
												{selectItem1.save.baseEff.length > 0 && (
													<li className="item_list item_eff">
														<div className="item_title">{gameData.msg.itemInfo.basicEffect[lang]}</div>
														{selectItem1.save.baseEff.map((data, idx) => {
															const grade = selectItem1.save.grade > 3 ? 3 : selectItem1.save.grade - 1;
															return (
																<div key={`base${idx}`} className="item_effs">{`${util.getEffectType(data.type, lang)} ${data.num[grade]}`}</div>
															) 
														})}
													</li>
												)}
												{selectItem1.save.addEff.length > 0 && (
													<li className="item_list item_eff">
														<div className="item_title">{gameData.msg.itemInfo.addEffect[lang]}</div>
														{selectItem1.save.addEff.map((data, idx) => {
															return (
																<div key={`add${idx}`} className="item_effs add">{`${util.getEffectType(data.type, lang)} ${data.num[0]}`}</div>
															) 
														})}
													</li>
												)}
												{selectItem1.save.hole.length > 0 && (
													<li className="item_list item_hole">
														<div className="item_title">{gameData.msg.itemInfo.socketEffect[lang]}</div>
														{mItemEff && mItemEff.map((data, idx) => {
															if (data.hole > 0) {
																return (
																	<div key={idx} className="item_effs hole">{`${util.getEffectType(data.type, lang)} ${data.hole}`}</div>
																)
															}
														})}
													</li>
												)}
												{selectItem1.game.set !== 0 && (<li className="item_list item_set">
													<div className="item_setNa">{gameData.items.set_type[selectItem1.game.set].na}</div>
												</li>
												)}
											</div>
										</ul>
									</ItemTotalEff>}
									<UpgradeShadow className={`itemEn_shadowArea`} gradeColor={gameData.itemGrade.color[selectItem1.save.grade]} />
									<div className="upgrade_percent">{upgradePercent}</div>
								</UpgradeArea>
							</ItemEnBack>
							<div className={`itemEn_bottom scroll-y ${upgradeOn}`}>
								<div className="item_select item_select1 num4">
									{item.equip && item.equip.map((data, idx) => {
										const itemsGrade = data.grade < 5 ? 0 : data.grade - 5;
										const items = gameItem.equip[data.part][data.weaponType][itemsGrade][data.idx];
										const grade = data.grade || items.grade;
										const itemsHole = data.hole;
										return (
											<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()} ${selectItem1.select === idx ? 'select1' : ''}`} key={`hole_${idx}`} onClick={() => {//하단 좌측 장비 클릭
												let baseSelectItem = {save:[],select:[],game:[]};data.hole.forEach((holeData,idx) => {//박혀 있는 hole셋팅
													if (holeData) {
														baseSelectItem.save[idx] = holeData;
														baseSelectItem.game[idx] = gameItem.hole[holeData.idx];
													}
												});
												setUpgradePercent(setPercent(data, selectItem3.game));
												setSelectItem1({
													save:{...data},
													select:idx,
													game:items,
												});
												setMItemEff(util.getTotalEff(data, gameData, baseSelectItem));
											}}>
												<span className={`pic ${data.sealed ? "sealed" : ""}`}>
													<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: util.setItemColor(gameData.itemsSvg[items.display], data.color, data.id)}}>
													</svg>
												</span>
												<span className="hole" flex-center="true">
													{itemsHole.map((holeData, holeidx) => {
														const holePic = holeData !== 0 ? gameItem.hole[holeData.idx].display : 0;
														return (
															<span className={`hole_slot hole${holeidx} ${holePic !== 0 ? 'fixed': ''}`} key={`hole${holeidx}`}>
																<ItemPic className="pic" pic="itemEtc" type="etc" idx={holePic} />
															</span>
														);
													})}
												</span>
											</div>
										)
									})}
								</div>
								<div className="item_select item_select2 num4">
									{item.upgrade && item.upgrade.map((data, idx) => {
										const items = gameItem.upgrade[data.idx];
										const grade = data.grade || items.grade;
										return (
											<div className={`item_layout ${gameData.itemGrade.txt_e[grade].toLowerCase()} ${selectItem3.select === idx ? 'select2' : ''}`} key={`upgrade_${idx}`} onClick={() => {
												setUpgradePercent(setPercent(selectItem1.save, items));
												setSelectItem3({
													save:{...data},
													select:idx,
													game:items,
												});
											}}>
												<ItemPic className="pic" pic="itemEtc" type="upgrade" idx={items.display} />
											</div>
										)
									})}
								</div>
							</div>
						</>
					)}
				</div>
			</ItemEnWrap>
			<ModalContainer>
				{modalOn && <Modal fn={modalData.fn} payment={modalData.payment} imgSet={imgSet} type={modalType} dataObj={modalInfo} saveData={saveData} changeSaveData={changeSaveData} onClose={() => {
					setModalOn(false);
				}} gameData={gameData}/>}
			</ModalContainer>
      <MsgContainer>
        {msgOn && <Msg text={msg} showMsg={setMsgOn}></Msg>}
      </MsgContainer>
		</>
  );
}

export default EnhancingCards;
