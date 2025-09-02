document.addEventListener("DOMContentLoaded", () => {
  const emailButton = document.getElementById("email-btn");

  // Se o botão não existir na página, interrompe o script.
  if (!emailButton) {
    return;
  }

  const emailAddress = "cieec.jaru@ifro.edu.br";
  const originalContent = emailButton.innerHTML;
  let isOriginalContent = true;

  // Função para verificar se o dispositivo é móvel
  const isMobile = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent.toLowerCase()
    );
  };

  emailButton.addEventListener("click", (event) => {
    // Se NÃO for um dispositivo móvel, executa a lógica de copiar.
    if (!isMobile()) {
      // Previne o comportamento padrão do link (abrir o cliente de e-mail).
      event.preventDefault();

      // Só executa a cópia se o conteúdo for o original (evita múltiplos cliques).
      if (!isOriginalContent) {
        return;
      }

      navigator.clipboard
        .writeText(emailAddress)
        .then(() => {
          // Sucesso ao copiar: mostra a mensagem de confirmação.
          isOriginalContent = false;
          emailButton.innerHTML =
            '<span>E-mail copiado! <i class="fa-solid fa-check"></i></span>';

          // Agenda a restauração do conteúdo original após 2 segundos.
          setTimeout(() => {
            emailButton.innerHTML = originalContent;
            isOriginalContent = true;
          }, 2000);
        })
        .catch((err) => {
          // Falha ao copiar: loga o erro e informa o usuário (opcional).
          console.error(
            "Falha ao copiar o e-mail para a área de transferência: ",
            err
          );
          isOriginalContent = false;
          emailButton.innerHTML = "<span>Falha ao copiar</span>";

          setTimeout(() => {
            emailButton.innerHTML = originalContent;
            isOriginalContent = true;
          }, 2000);
        });
    }
    // Se FOR um dispositivo móvel, o script não faz nada e deixa o link 'mailto:' funcionar normalmente.
  });
});
