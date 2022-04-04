import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Logo from "../Assets/Group 8.svg";

function Cadastro() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [image, setPhoto] = useState("");
	const navigate = useNavigate();
	return (
		<Body>
			<img src={Logo} alt='logo' />
			<Formulario>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						const URL =
							"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";
						const dadosCadastrais = {
							email,
							name,
							password,
							image,
						};
						const request = axios.post(URL, dadosCadastrais);
						request.then((response) => {
							alert("Cadastro feito com sucesso!");
							navigate("/");
						});
						request.catch((err) => {
							alert("Houve algum erro, tente novamente!");
						});
					}}>
					<input
						type='text'
						placeholder='email'
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						required
					/>
					<input
						type='password'
						placeholder='senha'
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						required
					/>
					<input
						type='text'
						placeholder='nome'
						onChange={(e) => {
							setName(e.target.value);
						}}
						required
					/>
					<input
						type='text'
						placeholder='foto'
						onChange={(e) => {
							setPhoto(e.target.value);
						}}
						required
					/>
					<button>Cadastrar</button>
					<Link to='/'>
						<p>Já tem uma conta? Faça login!</p>
					</Link>
				</form>
			</Formulario>
		</Body>
	);
}

const Body = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 30px;

	img {
		width: 190px;
		height: 190px;
	}
`;
const Formulario = styled.div`
	margin-top: 10px;
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	input {
		width: 303px;
		height: 45px;
		background: #ffffff;
		border: 1px solid #d5d5d5;
		box-sizing: border-box;
		border-radius: 5px;
		margin: 7px;
		padding-left: 10px;

		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 19.976px;
		line-height: 25px;
	}
	::-webkit-input-placeholder {
		color: #dbdbdb;
	}
	button {
		width: 303px;
		height: 45px;
		background: #52b6ff;
		border-radius: 4.63636px;
		border: none;
		margin-bottom: 30px;

		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 20.976px;
		line-height: 26px;
		text-align: center;

		color: #ffffff;
	}
	p {
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 13.976px;
		line-height: 17px;
		text-align: center;
		text-decoration-line: underline;

		color: #52b6ff;
	}
	p:hover,
	button:hover {
		cursor: pointer;
	}
`;

export default Cadastro;
