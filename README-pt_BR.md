<img src="./public/images/Title.png" align="center"/>

<details>
  <summary>
    <h2>Índice</h2>
  </summary>

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Layout](#layout)
- [Técnologias](#técnologias)
- [Variáveis de ambiente](#variáveis-de-ambiente)
  - [Atenção!!! ⚠️](#atenção-️)
  - [Mongo Atlas](#mongo-atlas)
  - [Nodemailer](#nodemailer)
  - [Google passport](#google-passport)
  - [Facebook passport](#facebook-passport)
  - [Cloudinary](#cloudinary)
- [Como rodar o projeto](#como-rodar-o-projeto)
- [Licença](#licença)
</details>

## Sobre o projeto

Este projeto é uma página web inspirada no design do site da Tesla, porém dedicada ao icônico carro Quadra Turbo-R V-Tech do jogo Cyberpunk 2077. O objetivo é proporcionar uma experiência visual e informativa aos fãs do jogo, destacando as características e a estética futurista do veículo.

Você pode ver uma demonstração [aqui](https://quadra-steel.vercel.app/).

## Funcionalidades

- Design Responsivo: O site é totalmente responsivo, garantindo uma boa experiência de navegação em dispositivos móveis, tablets e desktops.

- Animações Dinâmicas: Uso de animações para destacar as características do carro e criar uma experiência de navegação envolvente.

- Galeria de Imagens: Uma seção dedicada com imagens de alta qualidade do Quadra Turbo-R V-Tech.

- Especificações Técnicas: Informações detalhadas sobre as especificações do carro, incluindo desempenho, design e tecnologia.

- História do Veículo: Uma breve história do Quadra Turbo-R V-Tech no universo de Cyberpunk 2077.

- Formulário de Contato: Um formulário para os usuários entrarem em contato ou se inscreverem para atualizações.

- Login Social a partir de contas do Google ou Facebook.

- CRUD de ordens de pedidos, novo pedido, atualizar pedido, listar pedidos e deletar pedido.

- CRUD para perfil de usuário, criar novo perfil de usuário, ver perfil de usuário e deletar perfil de usuário.

## Layout

O projeto foi desenvolvido a partir do layuot criado no Figma e pode ser acessado através [aqui](https://www.figma.com/design/qQQ72CCzmAzdAfCMIjM8gZ/QUADRA?node-id=2009-2&t=CpjsCNhvsjwsOSCI-1).

## Técnologias

- [x] Figma
- [x] HTML 5
- [x] CSS 3
- [x] Javascript
- [x] Bootstrap
- [x] NodeJS
- [x] Express
- [x] Handlebars
- [x] MongoDB
- [x] Git
- [x] Github
- [x] Vercel
- [x] Google Services
- [x] Meta Services
- [x] Cloudinary

## Variáveis de ambiente

### Atenção!!! ⚠️

Dependendo de quando estiver vendo este projeto o modo de acesso para conseguir as váriaveis de ambiente podem ter mudado em cada serviço.

### Mongo Atlas

O projeto utiliza como banco de dados o [MongoDB](https://www.mongodb.com/), e o [Mongo Atlas](https://www.mongodb.com/en-us/cloud/atlas/register) como servidor de banco de dados, será necessário utilizar configurarmos a URL deste ambiente para que nossos dados sejam devidamente armazenados e acessados.

### Nodemailer

Para o serviço de e-mail é necessário um serviço e host(Ex: 'Gmail', 'smtp.gmail.com'), para este caso o user e password pode ser obtidos através de sua conta do [Google](https://www.google.com/intl/pt-BR/account/about/), caso utilize outros serviços como Outlook consulte a documentação oficioal para saber como obter seus dados.

### Google passport

Para utilizar o método de autenticação do Google passport é necessário obter seu Client ID e Client Secret através de um projeto criado no [Console Google Cloud](https://console.cloud.google.com/).

### Facebook passport

Para utilizar o método de autenticação do Facebook passport é necessário obter seu APP ID e APP Secret através de um aplicativo criado no [Developers Facebook](https://developers.facebook.com/).

### Cloudinary

O upload de arquivos de imagem ocorre através do serviço do [Cloudinary](https://cloudinary.com/), onde nossos arquivos ficam armazenados e podem ser acessados, para utilizar o serviço precisamos configuras as credenciais NAME, KEY e SECRET.

## Como rodar o projeto

Para rodar este projeto você pode realizar o download ou fazer um fork para sua conta do github e executar o comando git clone.

```shell
git clone https://github.com/<user>/Quadra.git
```

Após acesse o diretório Quadra e instale as dependências do projeto, as dependências podem ser encontradas através do arquivo `package.json`, uma ves instaladas o projeto pode ser rodado em modo desenvolvimento.

```shell
cd Quadra

npm install

npm run dev
```

Acesse a URL: `http://localhost:3000`

## Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENÇA](https://github.com/jefersonsilva01/Quadra/blob/main/LICENSE) para mais detalhes.
