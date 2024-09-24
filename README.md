# Creze - Caso técnico

## Tabla de contenido

1. [Descripción del proyecto](#descripción-del-proyecto)
2. [Tecnologías y herramientas utilizadas](#tecnologías-y-herramientas-utilizadas)
3. [Instrucciones de instalación](#instrucciones-de-instalación)

---

## Descripción del proyecto

La aplicación en React implementa un sistema de autenticación multifactor (MFA) robusto para asegurar el acceso de los usuarios. Durante el registro, los usuarios proporcionan su correo electrónico y contraseña, y luego se les presenta un código QR que deben escanear con una aplicación de autenticación como Google Authenticator.

Una vez completada la configuración de MFA, se les muestra un conjunto de 10 códigos de recuperación únicos, que pueden usar en caso de perder el acceso a su método de autenticación principal. Esto les permite deshabilitar temporalmente la MFA y acceder a sus cuentas solo con su correo electrónico y contraseña. La interfaz es amigable y permite a los usuarios gestionar fácilmente la activación y desactivación de la MFA, garantizando un equilibrio entre seguridad y conveniencia.
Es necesario añadir un segundo factor de autenticación utilizando **Time-Based One-Time Passwords (TOTP)**, compatible con aplicaciones como **Google Authenticator** o **Authy**.


## Tecnologías y herramientas utilizadas

- **Entorno de ejecución:** Node 18.X
- **Lenguaje de programación:** JavaScript
- **Librerías de desarrollo:** React 18.X, React Router, Axios, qrcode.react, Yup
- **Herramientas AWS:** S3
- **Control de versiones:** Git

## Instrucciones de Instalación

1. **Clonar el repositorio:**

    ```bash
    git clone https://github.com/naranjochuy/creze_frontend.git
    cd creze_frontend
    ```
2. **Instalación de dependencias:**
   Asegúrate de cambiar el valor correcto, la variable se encuentra en el archivo `./src/services/Api.js` para trabajar en ambiente local.
   Establece `baseURL` en `http://localhost/api/`.
3. **Instalación de dependencias:**

    Asegúrate de tener **Node 18.X** y/o **yarn** instalados. Luego, ejecuta:

    ```bash
    npm i
    ```
   
    Si ya tienes **yarn** instalado y prefieres utilizarlo, también puedes ejecutar:

    ```bash
    yarn
    ```

4. **Ejecutar la aplicación:**

    para correr la aplicación ejecuta:

    ```bash
    npm run dev
    ```
   
    o

    ```bash
    yarn dev
    ```
