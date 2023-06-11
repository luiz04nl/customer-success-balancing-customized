# Customer Success Balancing Customized

## Versão do Nodejs utilizada

Para essa versão utilizei node 20.3 qualquer versão LTS posterior deve não apresentar problemas.
Para os usuários de vscode como IDE adicionei a pasta .devcontainer que permite a inicilização de todo ambiente via docker.
O arquivo .devcontainer/alpine.debug.Dockerfile permite similar o mesmo container de outras formas.

## Instação de pacotes de dependências:

```bash
yarn
```

## Iniciar testes

```bash
yarn clean
yarn test
```

## Iniciar testes incluindo o relatório de cobertura em html

```bash
yarn clean
yarn test:coverage
```

A geração do coverage pode de alguma forma interferir no resultado dos testes de performance, mas o relatório final emitido na pasta coverage/index.html apresenta os resultados no formato html.

## Caso deseje transpilar o projeto para javascript e rodar os tests em seguida sobre o código transpilado

```bash
yarn clean
yarn build
node_modules/.bin/jest dist/test
```
