export const handleErrors = (error) => {
  let response = {
    success: false,
    message: 'Sistema indisponível no momento. Tente novamente mais tarde.',
  };

  if (error?.response?.data?.messages) {
    for (let i = 0; i < error.response.data.messages.length; i++) {
      const errorMessage = error.response.data.messages[i];
      // Verificar se a mensagem de erro é relacionada a autenticação
      if (errorMessage.includes('autenticação') || errorMessage.includes('login')) {
        response.message = 'Usuário ou senha incorretos.';
        // Retornar a resposta personalizada para erro de autenticação
        return response;
      }
      // Caso contrário, atribuir a mensagem de erro padrão
      response.message = errorMessage;
    }
  }

  return response;
};
