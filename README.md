**# Uso de Mocks y Stubs en Pruebas Unitarias**

## **Creación del Proyecto**

Para comenzar, debemos configurar un nuevo proyecto en Node.js:

1. **Inicializar un proyecto Node.js**
   ```sh
   mkdir prueba-mocks && cd prueba-mocks
   npm init -y
   ```
   Esto creará un archivo `package.json` con la configuración básica del proyecto.

2. **Instalar dependencias necesarias**
   ```sh
   npm install chai sinon node-fetch mocha
   ```
   - `chai`: Framework de aserciones.
   - `sinon`: Para mocks y stubs.
   - `node-fetch`: Para simular `fetch` en Node.js.
   - `mocha`: Para ejecutar pruebas unitarias.

3. **Configurar el script de pruebas en `package.json`**
   Modificar la sección `scripts` en `package.json`:
   ```json
   "scripts": {
     "test": "mocha"
   }
   ```

---

## **Definiciones**

### **Mocks y Stubs**
En pruebas unitarias, los *mocks* y *stubs* son herramientas utilizadas para simular dependencias externas y facilitar la prueba de una unidad de código sin interactuar con servicios reales.

- **Stub:** Es un objeto con una implementación predefinida que devuelve respuestas fijas. Se usa para simular respuestas de funciones sin lógica compleja.
- **Mock:** Es un objeto que puede registrar interacciones y comportamientos específicos, permitiendo verificar cómo una unidad de código interactúa con él.

### **Herramientas Populares**
- **Java:** Mockito (para crear mocks y stubs de clases y métodos).
- **JavaScript:** Sinon.js (para mockear funciones, objetos y módulos).
- **Python:** unittest.mock (para simular dependencias en pruebas unitarias).

---

## **Implementación**

A continuación, se presenta una función en JavaScript que realiza una solicitud HTTP a una API externa utilizando `fetch`.

```javascript
export async function getUserData(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    return response.json();
}
```

---

## **Pruebas Unitarias con Mocks**

Las siguientes pruebas unitarias utilizan `sinon.js` para simular respuestas de la API.

```javascript
import { assert } from 'chai';
import sinon from 'sinon';
import fetch from 'node-fetch';
import { getUserData } from '../src/api.js';

describe('getUserData', () => {
    let fetchStub;
    
    beforeEach(() => {
        fetchStub = sinon.stub(global, 'fetch');
    });

    afterEach(() => {
        fetchStub.restore();
    });

    it('debe devolver datos de usuario cuando la API responde con 200', async () => {
        const mockResponse = {
            json: async () => ({ id: 1, name: 'Juan Perez' }),
            ok: true
        };
        fetchStub.resolves(mockResponse);

        const userData = await getUserData(1);
        assert.deepEqual(userData, { id: 1, name: 'Juan Perez' });
    });

    it('debe lanzar un error cuando la API responde con 404', async () => {
        const mockResponse = { ok: false, status: 404 };
        fetchStub.resolves(mockResponse);

        try {
            await getUserData(1);
        } catch (error) {
            assert.equal(error.message, 'Error: 404');
        }
    });
});
```

---

## **Documentación**

### **README**

```markdown
# Uso de Mocks y Stubs en Pruebas Unitarias

Este proyecto demuestra el uso de mocks y stubs para pruebas unitarias en JavaScript utilizando `sinon.js`.

## **Instalación**

### **Requisitos Previos**
- Node.js instalado
- npm instalado

### **Pasos para Instalar Dependencias**
```sh
npm install
```

## **Ejecución de Pruebas**

Ejecuta el siguiente comando para correr las pruebas unitarias:
```sh
npm test
```

## **Descripción del Proyecto**

- La función `getUserData(userId)` obtiene datos de usuario de una API externa.
- Se utilizan pruebas unitarias con `sinon.js` para simular respuestas de la API sin realizar solicitudes reales.
- Se prueban escenarios donde la API devuelve una respuesta exitosa (HTTP 200) y una respuesta de error (HTTP 404).

## **Estructura del Proyecto**

```
prueba-mocks/
│── src/
│   ├── api.js      # Función que hace la solicitud HTTP
│── test/
│   ├── api.test.js # Pruebas unitarias con mocks
│── package.json
│── node_modules/
│── README.md
```
