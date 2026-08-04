# Validação complementar de rolagem e reveals

- Combinações: **51**
- Casos com elementos ainda pendentes após percorrer toda a página: **0**
- Casos com elementos de reveal ainda invisíveis após percorrer toda a página: **0**
- Erros de navegação: **0**
- Modal fecha com Escape: **sim**
- Foco entra e retorna corretamente no modal: **sim**

Esta verificação corrige a limitação de uma captura full-page feita sem rolagem: elementos controlados por `IntersectionObserver` só devem ser classificados como presos quando continuam pendentes depois de a página ser realmente percorrida.

[Dados completos](scroll-validation.json)
