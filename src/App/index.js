import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Home from "../Home";
import Habitos from "../Habitos";
import Hoje from "../Hoje";
import Historico from "../Historico";
import Cadastro from "../Cadastro";
import UserContext from "./Contexto";

function App() {
	const [porcentagem, setPorcentagem] = useState("");
	return (
		<UserContext.Provider value={{ porcentagem, setPorcentagem }}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/habitos' element={<Habitos />} />
					<Route path='/hoje' element={<Hoje />} />
					<Route path='/historico' element={<Historico />} />
					<Route path='/cadastro' element={<Cadastro />} />
				</Routes>
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
