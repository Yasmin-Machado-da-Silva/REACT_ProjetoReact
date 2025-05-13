
	import axios from "axios";

	const apiPorta = "5063";

	// apiLocal recebe o endereço da API
	const apiLocal = `http://localhost:${apiPorta}/api`;

	// Criação da instância do Axios com baseURL
	const api = axios.create({ 
	    baseURL: apiLocal
	});

	export default api;

