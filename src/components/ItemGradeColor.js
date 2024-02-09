import styled from 'styled-components';

const ItemContainer = styled.div`
  ${({size}) => size ? `
    position: relative;
    width: ${size}px;
    height: ${size}px;
  ` : `
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  `}
  ${({sealed, impossible}) => {
      if (sealed) {
        return `
          svg {
            filter:brightness(0.3) drop-shadow(0px 0px 1px #fff) ${impossible ? 'invert(1)' : ''};
          }
          &:before {
            content: '?';
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            z-index: 1;
            font-size: 1.25rem;
          }
        `
      } else {
        return impossible ? `filter: invert(1);` : '';
      }
    }
  };
  ${({part, grade}) => {
    if (grade) {
      switch (grade) {
        case 'normal':
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-normal) 100%);
          `;
        case 'magic':
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-magic) 100%);
          `;
        case 'rare':
          return `
            background-image:radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-rare) 100%);
          `;
        case 'epic':
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-epic) 100%);
          `;
        case 'set':
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-set) 100%);
          `;
        case 'unique':
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-unique) 100%);
          `;
        case 'legend':
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-legend) 100%);
          `;
        default:
          break;
      }
    } else {
      switch(part) {
        case "1":
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-red) 100%);`;
        case "2":
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-green) 100%);
          `;
        case "3":
          return `
            background-image:radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-blue) 100%);
          `;
        case "4":
          return `
            background-image:radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-lightblue) 100%);
          `;
        case "5":
          return `
            background-image:radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-yellow) 100%);
          `;
        case "10":
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-grey) 100%);
          `;
        case "11":
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-point1) 100%);
          `;
        case "12":
          return `
            background-image: radial-gradient(at 30% 30%,rgba(255,255,255,.5) 0%,var(--color-b) 100%);
          `;
        case "13":
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-point5) 100%);
          `;
        case "14":
          return `
            background-image: radial-gradient(at 30% 30%,rgba(0,0,0,.3) 0%,var(--color-point5) 100%);
          `;
        default:
          break;
      }
    }
  }}
`;
const ItemGradeColor = ({
  part,
  grade,
  sealed,
  impossible,
  size,
  children,
}) => {
  return (
    <ItemContainer part={part} grade={grade} sealed={sealed} impossible={impossible} size={size}>
      {children}
    </ItemContainer>
  )
}

export default ItemGradeColor;
