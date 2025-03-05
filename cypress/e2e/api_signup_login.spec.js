
// cypress/e2e/api_signup_login.spec.js
// Pruebas de API para DemoBlaze: Signup y Login
// Este script realiza las siguientes pruebas:
// 1. Registrar un nuevo usuario (Signup exitoso)
// 2. Intentar registrar un usuario ya existente (Signup fallido)
// 3. Iniciar sesión con credenciales correctas (Login exitoso)
// 4. Iniciar sesión con credenciales incorrectas (Login fallido)

describe('Pruebas API DemoBlaze - Signup y Login', () => {
    // Generamos un username único para evitar conflictos con registros anteriores
    const username = `user_${Date.now()}`;
    const password = "Password123!";
  
    // --- PRUEBA 1: Signup exitoso (nuevo usuario) ---
    it('Debería registrar un nuevo usuario exitosamente', () => {
      cy.request({
        method: 'POST',
        // Usamos la URL completa para el endpoint de signup
        url: 'https://api.demoblaze.com/signup',
        // Enviamos el payload con username y password
        body: {
          username: username,
          password: password
        },
        // Evitamos que Cypress falle automáticamente si el status no es 2xx
        failOnStatusCode: false
      }).then((response) => {
        // Verificamos que la respuesta HTTP sea 200 (OK)
        expect(response.status).to.eq(200);
        // Imprimimos la respuesta en el log para capturar la salida
        cy.log('Respuesta Signup (nuevo usuario): ' + JSON.stringify(response.body));
        // Comprobamos que la respuesta no contenga un mensaje de error indicando usuario existente
        expect(response.body).to.not.include("already exist");
      });
    });
  
    // --- PRUEBA 2: Signup fallido (usuario ya existente) ---
    it('Debería evitar registrar un usuario ya existente', () => {
      // Reutilizamos el mismo usuario creado en la prueba anterior
      cy.request({
        method: 'POST',
        url: 'https://api.demoblaze.com/signup',
        body: {
          username: username,
          password: password
        },
        failOnStatusCode: false
      }).then((response) => {
        // Se espera que la API indique que el usuario ya existe, generalmente con un mensaje de error
        expect(response.status).to.eq(200);
        cy.log('Respuesta Signup (usuario existente): ' + JSON.stringify(response.body));
        // Validamos que la respuesta contenga la frase "already exist"
        expect(response.body.errorMessage).to.include("already exist");
      });
    });
  
    // --- PRUEBA 3: Login exitoso (credenciales correctas) ---
    it('Debería iniciar sesión con credenciales correctas', () => {
      cy.request({
        method: 'POST',
        url: 'https://api.demoblaze.com/login',
        body: {
          username: username,
          password: password
        },
        failOnStatusCode: false
      }).then((response) => {
        // Verificamos la respuesta HTTP
        expect(response.status).to.eq(200);
        cy.log('Respuesta Login (correcto): ' + JSON.stringify(response.body));
        // En un login exitoso, se espera que la respuesta incluya "Auth_token"
        expect(response.body).to.include("Auth_token");
      });
    });
  
    // --- PRUEBA 4: Login fallido (credenciales incorrectas) ---
    it('Debería fallar el inicio de sesión con credenciales incorrectas', () => {
      cy.request({
        method: 'POST',
        url: 'https://api.demoblaze.com/login',
        body: {
          username: username,
          // Enviamos una contraseña incorrecta para simular el fallo
          password: 'ContraseñaErronea123'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        cy.log('Respuesta Login (incorrecto): ' + JSON.stringify(response.body));
        // Para un login fallido, no se debe recibir un token de autenticación,
        // por lo que esperamos que la respuesta NO contenga "Auth_token"
        expect(response.body.errorMessage).to.not.include("Auth_token");
      });
    });
  });
  
  