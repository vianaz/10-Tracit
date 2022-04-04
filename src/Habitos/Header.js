import styled from "styled-components";

import Logo from "../Assets/TrackIt.svg";

function Header() {
	const dadosLogin = JSON.parse(localStorage.getItem("dadosLogin"));
	return (
		<Cabecalho>
			<img src={Logo} alt='Logo-Header' />
			<img src={dadosLogin.image} alt='Foto-Perfil' />
		</Cabecalho>
	);
}
const Cabecalho = styled.header`
	position: fixed;
	display: flex;
	background-color: #126ba5;
	align-items: center;
	justify-content: space-between;
	height: 70px;
	width: 100vw;
	padding: 15px;
	z-index: 2;
	img:first-child {
		width: 95px;
	}
	img:last-child {
		width: 51px;
		height: 51px;
		border-radius: 60px;
	}
`;

export default Header;
