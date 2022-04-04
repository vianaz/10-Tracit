/* eslint-disable default-case */
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

import "./animacao.css";

function Main() {
	const [dadosHabito, setDadosHabito] = useState([]);
	const [criarHabito, setCriarHabito] = useState(false);
	const [recarregar, setRecarregar] = useState(false);

	// Atrelado ao conteudo geral
	const dias = ["D", "S", "T", "Q", "Q", "S", "S"];
	const dadosLogin = JSON.parse(localStorage.getItem("dadosLogin"));
	const URL =
		"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
	const token = {
		headers: {
			Authorization: `Bearer ${dadosLogin.token}`,
		},
	};

	useEffect(() => {
		const promise = axios.get(URL, token);
		promise.then((response) => setDadosHabito(response.data));
	}, [recarregar]);
	console.log(dadosHabito);
	return (
		<Corpo>
			<div className='conteudo'>
				<AddHabito>
					<p>Meus hábitos</p>
					<div>
						{criarHabito ? (
							<ion-icon name='add'></ion-icon>
						) : (
							<ion-icon
								name='add'
								onClick={() => {
									setCriarHabito(!criarHabito);
								}}></ion-icon>
						)}
					</div>
				</AddHabito>
				<div>{criarHabito ? <BoxHabitoCriar /> : <></>}</div>
				<div>
					{dadosHabito.map((element) => {
						return <BoxHabito item={element} key={element.id} />;
					})}
				</div>
				{dadosHabito.length < 1 ? semHabitos() : <></>}
			</div>
		</Corpo>
	);

	// Gerar BOX HABITO CRIAÇÃO
	function BoxHabitoCriar() {
		const [diasMarcados, setDiasMarcados] = useState(new Map());
		const [nomeHabito, setNomeHabito] = useState("");
		return (
			<CardHabitoCriacao>
				<div className='conteiner-criacao'>
					<input
						type='text'
						placeholder='nome do hábito'
						onChange={(e) => setNomeHabito(e.target.value)}
					/>
					<Dias>
						{dias.map((element, index) => {
							return <Dia element={element} key={index} index={index} />;
						})}
					</Dias>
					<Botoes>
						<button
							onClick={() => {
								setCriarHabito(!criarHabito);
							}}>
							Cancelar
						</button>
						<button onClick={enviarHabito}>Salvar</button>
					</Botoes>
				</div>
			</CardHabitoCriacao>
		);
		function Dia({ element, index }) {
			return (
				<div
					onClick={toggle}
					className={diasMarcados.has(index) ? "marcado" : ""}
					id={index}>
					{element}
				</div>
			);
			function toggle() {
				const jaMarcado = diasMarcados.has(index);
				if (jaMarcado) {
					diasMarcados.delete(index);
					setDiasMarcados(new Map(diasMarcados));
				} else {
					diasMarcados.set(index, element);
					setDiasMarcados(new Map(diasMarcados));
				}
			}
		}
		function enviarHabito() {
			const dados = {
				name: nomeHabito,
				days: gerarArrayDays(),
			};
			const promise = axios.post(URL, dados, token);
			promise.then((response) => {
				setCriarHabito(!criarHabito);
				setRecarregar(!recarregar);
			});
		}
		function gerarArrayDays() {
			const days = [];
			diasMarcados.forEach((value, key) => {
				days.push(key);
			});
			return days;
		}
	}
	function BoxHabito({ item }) {
		const diasMarcados = new Map();
		const dia = item.days;

		dia.forEach((element) => {
			diasMarcados.set(element);
		});

		return (
			<CardHabito>
				<div className='conteiner-criacao'>
					<div className='titulo'>
						<p className='titulo-habito'>{item.name}</p>
						<svg
							id={item.id}
							width='15'
							height='20'
							viewBox='0 0 13 15'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							onClick={(e) => {
								deletarHabito(e.target.id);
							}}>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M13 3C13 3.26522 12.8946 3.51957 12.7071 3.70711C12.5196 3.89464 12.2652 4 12 4H11.5V13C11.5 13.5304 11.2893 14.0391 10.9142 14.4142C10.5391 14.7893 10.0304 15 9.5 15H3.5C2.96957 15 2.46086 14.7893 2.08579 14.4142C1.71071 14.0391 1.5 13.5304 1.5 13V4H1C0.734784 4 0.48043 3.89464 0.292893 3.70711C0.105357 3.51957 0 3.26522 0 3V2C0 1.73478 0.105357 1.48043 0.292893 1.29289C0.48043 1.10536 0.734784 1 1 1H4.5C4.5 0.734784 4.60536 0.48043 4.79289 0.292893C4.98043 0.105357 5.23478 0 5.5 0L7.5 0C7.76522 0 8.01957 0.105357 8.20711 0.292893C8.39464 0.48043 8.5 0.734784 8.5 1H12C12.2652 1 12.5196 1.10536 12.7071 1.29289C12.8946 1.48043 13 1.73478 13 2V3ZM2.618 4L2.5 4.059V13C2.5 13.2652 2.60536 13.5196 2.79289 13.7071C2.98043 13.8946 3.23478 14 3.5 14H9.5C9.76522 14 10.0196 13.8946 10.2071 13.7071C10.3946 13.5196 10.5 13.2652 10.5 13V4.059L10.382 4H2.618ZM1 3V2H12V3H1Z'
								fill='#666666'
							/>
						</svg>
					</div>
					<Dias>
						{dias.map((element, index) => {
							return (
								<Dia
									element={element}
									key={index}
									index={index}
									diasMarcados={diasMarcados}
								/>
							);
						})}
					</Dias>
				</div>
			</CardHabito>
		);
		function Dia({ element, index, diasMarcados }) {
			return (
				<div id={index} className={diasMarcados.has(index) ? "marcado" : ""}>
					{element}
				</div>
			);
		}
		function deletarHabito(id) {
			axios
				.delete(
					`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
					token,
				)
				.then((response) => {
					setRecarregar(!recarregar);
				});
		}
	}
}
// Função para gerar texto de aviso sem habito
function semHabitos() {
	return (
		<div>
			<p>
				Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
				começar a trackear!
			</p>
		</div>
	);
}

const Corpo = styled.main`
	background-color: #e5e5e5;
	height: 100%;
	min-height: 100vh;
	width: 100vw;
	padding-top: 70px;
	padding-bottom: 100px;
	.conteudo {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	p:last-child {
		display: flex;
		width: 90%;
		margin: 30px;
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 17px;
		line-height: 22px;
		color: #666666;
	}
	.titulo-habito {
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 19.976px;
		line-height: 25px;
		color: #666666;
	}
	.titulo {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	svg:hover {
		cursor: pointer;
	}
`;
const AddHabito = styled.div`
	display: flex;
	justify-content: space-between;
	width: 340px;
	padding-top: 20px;
	z-index: 0;
	p {
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 22.976px;
		line-height: 29px;
		color: #126ba5;
	}
	div {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 35px;
		height: 35px;
		background-color: #52b6ff;
		border-radius: 5px;
		font-size: 30px;
		font-weight: 700;
		color: white;
	}
	div:hover {
		cursor: pointer;
	}
`;
const CardHabitoCriacao = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20px;
	width: 340px;
	height: 180px;
	background: #fff;
	border-radius: 5px;
	.conteiner-criacao {
		width: 310px;
		margin-top: 15px;
	}
	input {
		width: 100%;
		height: 45px;
		background: #ffffff;
		border: 1px solid #d5d5d5;
		box-sizing: border-box;
		border-radius: 5px;
		padding: 10px;

		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 19.976px;
		line-height: 25px;
		color: #666666;

		::-webkit-input-placeholder {
			color: #dbdbdb;
		}
	}
`;
const CardHabito = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20px;
	width: 340px;
	height: 100px;
	background: #fff;
	border-radius: 5px;
	.conteiner-criacao {
		width: 310px;
		margin-top: 15px;
	}
`;
const Dias = styled.div`
	display: flex;
	div {
		width: 35px;
		height: 35px;
		background: #ffffff;
		border: 1px solid #d5d5d5;
		border-radius: 5px;
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 19.976px;
		line-height: 25px;
		color: #dbdbdb;
		padding-left: 10px;
		padding-top: 5px;
		margin-top: 10px;
		margin-right: 5px;
	}
	.marcado {
		background: #cfcfcf;
		color: #ffffff;
	}
`;
const Botoes = styled.div`
	display: flex;
	justify-content: end;
	margin-top: 20px;
	button {
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 15.976px;
		line-height: 20px;
		text-align: center;
		color: #ffffff;
		border-radius: 4.63636px;
		background: #52b6ff;
		border: none;
		width: 84px;
		height: 35px;
		margin-left: 10px;
	}
	button:first-child {
		background-color: #fff;
		color: #52b6ff;
	}
	button:hover {
		cursor: pointer;
	}
`;
export default Main;
