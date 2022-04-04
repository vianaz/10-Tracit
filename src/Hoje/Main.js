import styled from "styled-components";
import dayjs from "dayjs";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import * as updateLocale from "dayjs/plugin/updateLocale";

import UserContext from "../App/Contexto";
import "../../node_modules/dayjs/locale/pt-br";

function Main() {
	// Coisas do Dayjs
	dayjs.extend(updateLocale);
	dayjs.updateLocale("pt-br", {
		weekdays: [
			"Domingo",
			"Segunda",
			"Terça",
			"Quarta",
			"Quinta",
			"Sexta",
			"Sábado",
		],
	});
	const day = dayjs().locale("pt-br").format("dddd, DD/MM");

	// States importantes
	const [habitos, setHabitos] = useState([]);
	const [recarregar, setRecarregar] = useState(false);
	const { setPorcentagem } = useContext(UserContext);
	// Declarações Axios
	const dadosLogin = JSON.parse(localStorage.getItem("dadosLogin"));
	const token = {
		headers: {
			Authorization: `Bearer ${dadosLogin.token}`,
		},
	};
	const URL =
		"https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";

	useEffect(() => {
		const promise = axios.get(URL, token);
		promise.then((response) => {
			setHabitos(response.data);
			calcularPorcentagem(response.data.length, response.data);
		});
	}, [recarregar]);

	function BoxHabito({ dadosHabito }) {
		const [selecionado, setSelecionado] = useState(dadosHabito.done);
		return (
			<CardHabito selecionado={selecionado}>
				<div className='conteiner'>
					<div className='titulo'>
						<p className='titulo-habito'>{dadosHabito.name}</p>
						<span className='subtitulo-habito'>
							<p>{`Sequência atual: ${dadosHabito.currentSequence} dias`}</p>
							<p>{`Seu recorde: ${dadosHabito.highestSequence} dias`}</p>
						</span>
					</div>
					<ion-icon
						name='checkbox'
						id={dadosHabito.id}
						onClick={(e) => {
							enviarDoneAPI(e.target.id, selecionado);
						}}></ion-icon>
				</div>
			</CardHabito>
		);
	}
	function enviarDoneAPI(id, done) {
		if (done) {
			const promise = axios.post(
				`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,
				{},
				token,
			);
			promise.then((response) => {
				setRecarregar(!recarregar);
			});
		} else {
			const promise = axios.post(
				`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,
				{},
				token,
			);
			promise.then((response) => {
				setRecarregar(!recarregar);
			});
		}
	}
	function calcularPorcentagem(tamanho, dados) {
		let numFeitos = 0;
		dados.forEach((element) => {
			if (element.done) {
				numFeitos++;
			}
		});
		const arredondar = parseFloat(numFeitos / tamanho).toFixed(2) * 100;
		setPorcentagem(arredondar);
	}
	return (
		<Conteudo>
			<DiaTitulo>
				<p>{day}</p>
				<p>Nenhum hábito concluído ainda</p>
			</DiaTitulo>
			{habitos.map((element, index) => {
				return <BoxHabito key={`Box ${index}`} dadosHabito={element} />;
			})}
		</Conteudo>
	);
}

const Conteudo = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #e5e5e5;
	height: 100%;
	min-height: 100vh;
	width: 100vw;
	padding-top: 70px;
	padding-bottom: 100px;
`;
const DiaTitulo = styled.div`
	width: 340px;
	margin-top: 30px;
	margin-bottom: 20px;
	p:first-child {
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 22.976px;
		line-height: 29px;
		color: #126ba5;
	}
	p:last-child {
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 17.976px;
		line-height: 22px;

		color: #bababa;
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
	.conteiner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 310px;
		margin-top: 15px;
	}
	.titulo-habito {
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 19.976px;
		line-height: 25px;
		color: #666666;
		margin-bottom: 10px;
	}
	.subtitulo-habito {
		font-family: "Lexend Deca";
		font-style: normal;
		font-weight: 400;
		font-size: 12.976px;
		line-height: 16px;

		color: #666666;
	}
	ion-icon {
		font-size: 60px;
		color: ${(props) => (props.selecionado ? "#8FC549" : "#E7E7E7")};
	}
	ion-icon:hover {
		cursor: pointer;
	}
`;

export default Main;
