import styled from 'styled-components';
import { Logo } from './components/logo/logo';
import { ControlPanel } from './components/control-panel/control-panel';

const Description = styled.div`
	font-style: italic;
`;

const HeaderContainer = ({ className }) => (
	<div className={className}>
		<Logo />
		<Description>
			Веб технологии <br /> написание кода <br /> Разбор ошибок
		</Description>
		<ControlPanel />
	</div>
);

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	position: fixed;
	top: 0;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	box-shadow: 0px -2px 17px #000;
	backgtound-color: #fff;
`;
