# Push Notifications Server

Backend de práctica creado con NestJS, TypeScript y `expo-server-sdk` para enviar notificaciones push a dispositivos registrados en Expo. Complementa el cliente móvil `push-app`.

## Qué aprendí

- Crear una API con NestJS y organizar la lógica de envío en un servicio.
- Recibir Expo Push Tokens mediante una solicitud HTTP.
- Validar que los valores tengan formato de Expo Push Token.
- Enviar notificaciones con `expo-server-sdk`, dividiendo los mensajes en lotes.
- Pasar datos adicionales en el payload para que el cliente pueda reaccionar al tocar una notificación.

## Endpoint

`POST /api/send-notification`

El cuerpo espera un arreglo de tokens:

```json
{
  "to": [
    "ExponentPushToken[tu-token-de-prueba]"
  ]
}
```

Ejemplo local con `curl`:

```bash
curl -X POST http://localhost:3000/api/send-notification \
  -H "Content-Type: application/json" \
  -d "{\"to\":[\"ExponentPushToken[tu-token-de-prueba]\"]}"
```

El servidor envía un título y cuerpo de prueba, junto con `data.chatId`, que el cliente puede usar para navegar a una pantalla de chat. El endpoint responde cuando el envío a Expo termina; eso no garantiza que el dispositivo haya recibido o mostrado la notificación.

## Requisitos

- Node.js.
- pnpm.
- Un Expo Push Token válido de un dispositivo configurado para recibir notificaciones.

## Instalación y ejecución

```bash
pnpm install
pnpm run start:dev
```

El servidor escucha en el puerto `3000` por defecto. Puedes cambiarlo definiendo la variable de entorno `PORT`.

## Pruebas y compilación

```bash
pnpm run test
pnpm run test:e2e
pnpm run lint
pnpm run build
```

## Alcance y seguridad

Este servidor es una demostración educativa: el endpoint no tiene autenticación y acepta tokens enviados por quien pueda acceder a él. No lo despliegues públicamente sin agregar autenticación, validación de entrada y límites de uso. No guardes ni publiques tokens de dispositivos o credenciales privadas.

La configuración de NestJS Observe contiene valores de ejemplo (`YOUR_APP_KEY` y `YOUR_APP_SECRET`); reemplázalos mediante una configuración segura o quita esa integración antes de desplegar.
