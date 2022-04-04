import styled from "styled-components";
import { useContext } from "react";
import {
	CircularProgressbar,
	buildStyles,
	CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { Link } from "react-router-dom";

import UserContext from "../App/Contexto";
import "react-circular-progressbar/dist/styles.css";

function Footer() {
	const { porcentagem } = useContext(UserContext);
	return (
		<Rodape>
			<Link to='/habitos'>
				<p>Hábitos</p>
			</Link>
			<Link to='/hoje'>
				<div style={{ width: 110, height: 170 }}>
					<CircularProgressbarWithChildren
						background
						backgroundPadding={3}
						value={`${porcentagem}`}
						styles={buildStyles({
							backgroundColor: "#52B6FF",
							pathColor: "#FFFFFF",
							trailColor: "#52B6FF",
							textColor: "#FFFFFF",
						})}>
						<div
							style={{
								fontSize: 20,
								fontFamily: "Lexend Deca",
								color: "#fff",
							}}>
							Hoje
						</div>
					</CircularProgressbarWithChildren>
				</div>
			</Link>
			<p>Histórico</p>
		</Rodape>
	);
}

const Rodape = styled.footer`
	display: flex;
	position: fixed;
	justify-content: space-around;
	align-items: center;
	bottom: 0px;
	width: 100vw;
	height: 70px;
	background-color: white;
	z-index: 2;
	p {
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 17.976px;
		line-height: 22px;
		text-align: center;

		color: #52b6ff;
	}
	p:hover {
		cursor: pointer;
	}
`;

export default Footer;
