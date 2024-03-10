# Weather Forecast
![image](https://github.com/JulioC090/weather-forecast/assets/64113858/99e25add-b03c-452d-aa76-b212cb4d9116)

Um website que oferece informações em tempo real sobre o clima em qualquer cidade do mundo. Utilizando a API da OpenWeather, que disponibiliza dados precisos sobre a temperatura atual e uma previsão detalhada do tempo para os próximos dias.

Demo: https://julioc090.github.io/weather-forecast/

## 📕 Sumário
- [🚀 Começando](#🚀-começando)
  - [📋 Pré-requisitos](#📋-pré-requisitos)
  - [🔧 Instalação](#🔧-instalação)
- [🕹️ Funcionalidades](#🕹️-funcionalidades)
- [🛠️ Tecnologias](#🛠️-tecnologias)
- [📄 Licença](#📄-licença)

## 🚀 Começando

### 📋 Pré-requisitos
Antes de começar, certifique-se de ter os seguintes itens:
- [Git](https://git-scm.com/) (opcional, mas recomendado para clonar o repositório);
- [Node.js](https://nodejs.org/en);
- [Chave API da OpenWeather](https://openweathermap.org/);

### 🔧 Instalação
1. Baixe ou clone o repositório

```bash
git clone https://github.com/JulioC090/weather-forecast.git
```

2. Baixe as dependências

```bash
npm install
```

3. Coloque a chave API da OpenWeather no campo `VITE_WEATHER_APP_KEY` em `example.env`
```env
VITE_WEATHER_APP_KEY="{apikey}"
```

4. Renomeie `example.env` para `.env`
```bash
mv example.env .env
```

5. Execute o projeto

```bash
npm run dev
```

6. Acesse `http://localhost:5173/`

## 🕹️ Funcionalidades
- Buscar cidades pelo nome
- Exibir o clima atual
- Exibir a previsão do tempo
- Exibir a qualidade do ar
- Exibir o horário do nascer e pôr do sol
- Armazenar a última cidade pesquisada

## 🛠️ Tecnologias
- Vite
- React
- Typescript
- CSS3

## 📄 Licença
Este projeto é licenciado sob a licença MIT.
