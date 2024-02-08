# bpay

bitnovo technical test

## Start

1. Duplicate the `.env.template` and rename it to `.env` and fill the variables with the correct values.
2. `pnpm i`
3. `pnpm start`

---

## Requirements

> Si bien la consigna fue inicialmente concebida para ReactJS (web), simplemente hacer uso de React Native en lugar de ReactJS.

El desarrollo consiste en crear una pasarela de pago con criptodivisas. Esta se va a realizar en un entorno de testnet. Toda la documentación de los endpoints y los contratos de las criptodivisas de testnet la podemos encontrar [aquí](https://payments.pre-bnvo.com/redoc/).

En el Header de los endpoints tendrá que pasarle el Identificador (X-Device-Id) que te hayamos proporcionado por email para poder crear pagos.

Debe regirse estrictamente por el desarrollo de [Figma](<https://www.figma.com/file/R7CKXgNdJHvz6CNrIx2RYl/Prueba-Tecnica-(Frontend-Web)?type=design&mode=design&t=SCamql1N2FXAi4r4-0>). Utilizar react.js con hooks, y nextjs pages router.

El desarrollo principal consiste en una pantalla para crear el pago y otra para realizar el pago. La información sobre cada pantalla la tenemos a continuación:

1. Crear pago y selección de moneda

El Merchant deberá poder crear un pago añadiendo el importe, concepto y criptodivisa.
Para crear el pago se hará uso del endpoint `POST orders` y para listar las criptodivisas disponibles se hará con el endpoint `GET currencies`.

Los 3 campos mencionados anteriormente deberán introducirse en una misma pantalla y las criptodivisas que se podrán seleccionar para crear el pago variarán en función del importe del pago. Hay que controlar el importe máximo y mínimo de cada moneda.

2. Pasarela de pago QR

Una vez el pago esté creado debemos mostrar todos los datos del resumen del pago y la información para que el Cliente pueda realizarlo. Todos estos datos los podemos obtener haciendo uso del endpoint `GET orders/info`.

Importante: la pasarela de pago debe refrescarse en tiempo real, es decir, si se recibe un pago la pantalla se debe refrescar de forma automática. Al crear un pago, se crea un websocket el cual se puede escuchar para recibir notificaciones de cambio de estado.
Ejemplo de websocket:

`const socket = new WebSocket('wss://payments.pre-bnvo.com/ws/<identifier>');`

Simplemente habría que añadir en cada caso el identifier que devuelve el endpoint al crear un pago.

Hay que tener en cuenta que los pagos tienen un tiempo de expiración y que debe llevarnos a una pantalla KO si caduca (estado “EX” o “OC”). En cambio, si el pago se realiza correctamente (estado “CO” o “AC”), nos llevará a una pantalla OK.

Opcional: Se valorará muy positivamente la opción de añadir mediante Web3 alguna wallet, como puede ser METAMASK.

Para realizar pagos puede utilizar esta web de [XRP](https://test.xrptoolkit.com/connect-wallet) o la aplicación de test de [BTC](https://play.google.com/store/apps/details?id=de.schildbach.wallet_test&hl=en&gl=US). Si lo ve conveniente puede utilizar el endpoint `GET orders` para comprobar los pagos que ha creado.
