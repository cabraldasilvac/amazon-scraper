// backend/test.ts

import axios from "axios";

// URL do seu endpoint de scraping
const SCRAPE_URL = "http://localhost:3000/api/scrape";

// Palavra-chave para o teste
const TEST_KEYWORD = "smartphone";

// Função auxiliar para criar um delay
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function runSmokeTest() {
  console.log(
    `\nIniciando o teste de smoke para a palavra-chave: "${TEST_KEYWORD}"...`,
  );

  try {
    // Adiciona um delay de 2 segundos para evitar bloqueios
    console.log("Aguardando 2 segundos antes de enviar a requisição...");
    await delay(2000);

    // Faz a requisição para o seu endpoint de scraping
    const response = await axios.get(`${SCRAPE_URL}?keyword=${TEST_KEYWORD}`);

    // Verifica se a resposta foi bem-sucedida (código 200)
    if (response.status !== 200) {
      console.error(`❌ Falha na requisição. Status: ${response.status}`);
      return false;
    }

    const data = response.data;

    // Verifica se o JSON retornado contém um array de produtos
    if (!data.products || !Array.isArray(data.products)) {
      console.error('❌ Resposta JSON inválida: "products" não é um array.');
      return false;
    }

    // Verifica se o array de produtos não está vazio
    if (data.products.length === 0) {
      console.error(
        "❌ Teste falhou: Nenhum produto encontrado. A lógica de scraping pode estar quebrada.",
      );
      return false;
    }

    // Se tudo der certo, o teste passa
    console.log(
      `✅ Teste de smoke bem-sucedido! ${data.products.length} produtos foram encontrados.`,
    );
    return true;
  } catch (error: any) {
    console.error("❌ Erro inesperado ao executar o teste:", error.message);
    return false;
  }
}

// Executa o teste e mostra o resultado final
runSmokeTest().then((result) => {
  console.log(
    `\nResultado final do teste de smoke: ${result ? "SUCESSO" : "FALHA"}`,
  );
  process.exit(result ? 0 : 1);
});
