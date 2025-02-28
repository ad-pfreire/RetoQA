// Descripción: Prueba automatizada del flujo de compra en Demoblaze.

// Comenzamos definiendo una suite de pruebas con describe().
describe('Flujo de compra en Demoblaze', () => {
    // Definimos el caso de prueba dentro de it().
    it('Debería agregar dos productos al carrito y completar la compra exitosamente', () => {
      
      // 1. Visitar la página principal de Demoblaze.
      // cy.visit() navega a la URL especificada y carga la página web en el navegador de prueba.
      cy.visit('https://www.demoblaze.com');
      
      // 2. Seleccionar la categoría "Laptops" (o cualquier otra) para buscar un producto.
      // cy.contains() busca un elemento que contenga el texto dado ("Laptops") y luego .click() simula un clic en ese elemento.
      cy.contains('Laptops').click();
      
      // 3. Elegir un producto de la lista de Laptops.
      // Buscamos por el nombre del producto y hacemos clic para ir a la página de detalles del producto.
      cy.contains('Sony vaio i5').click();  // Seleccionamos, por ejemplo, la laptop "Sony vaio i5".
      
      // 4. Agregar el primer producto al carrito.
      // Antes de hacer clic en "Add to cart", preparamos un listener para la alerta de confirmación.
      cy.on('window:alert', (str) => {
        // Esta función se ejecutará cuando aparezca una alerta (window.alert).
        // Comprobamos que el texto de la alerta sea "Product added." que confirma que se añadió al carrito.
        expect(str).to.equal('Product added.');
      });
      // Ahora, hacemos clic en el botón "Add to cart".
      // cy.contains('Add to cart') encuentra el botón por su texto y click() lo pulsa.
      cy.contains('Add to cart').click();
      
      // 5. Volver a la página de inicio o categoría para agregar un segundo producto.
      // Podríamos navegar a otra categoría o al inicio. En este caso, volvemos al home.
      cy.get('a.nav-link').contains('Home').click(); // Hacemos clic en "Home" para regresar a la página principal.
      
      // 6. Seleccionar la categoría "Phones" para agregar un teléfono como segundo producto.
      cy.contains('Phones').click();
      // Elegir un teléfono de la lista, por ejemplo "Samsung galaxy s6".
      cy.contains('Samsung galaxy s6').click();
      
      // 7. Agregar el segundo producto al carrito.
      // De nuevo escuchamos la alerta de confirmación por buena práctica.
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Product added.');
      });
      cy.contains('Add to cart').click();
      
      // 8. Abrir el carrito de compras para visualizar los productos agregados.
      // Hacemos clic en el enlace "Cart" del menú para ir a la página del carrito.
      cy.contains('Cart').click();
      
      // 9. Verificar que los dos productos están en el carrito.
      // Usamos cy.get() para obtener el elemento que contiene la lista del carrito (tbody de la tabla).
      // Luego usamos .should() con 'contain' para comprobar que dentro del carrito aparecen los nombres de los productos agregados.
      cy.get('#tbodyid').should('contain', 'Sony vaio i5');
      cy.get('#tbodyid').should('contain', 'Samsung galaxy s6');
      
      // 10. Iniciar el proceso de compra haciendo clic en "Place Order".
      // Esto abre el formulario de compra en un modal emergente.
      cy.contains('Place Order').click();
      
      // 11. Rellenar el formulario de compra con los datos requeridos.
      // Utilizamos cy.get() con selectores de los campos (por id) y cy.type() para ingresar texto en cada campo.
      cy.get('#name').type('Juan Perez');          // Campo Nombre
      cy.get('#country').type('Ecuador');          // Campo País
      cy.get('#city').type('Quito');               // Campo Ciudad
      cy.get('#card').type('4111 1111 1111 1111'); // Campo Tarjeta de crédito (ejemplo de Visa)
      cy.get('#month').type('12');                // Campo Mes (ej: 12 para Diciembre)
      cy.get('#year').type('2025');               // Campo Año (ej: 2025)
      
      // 12. Finalizar la compra haciendo clic en el botón "Purchase".
      cy.contains('Purchase').click();
      
      // 13. Verificar que la compra se completó exitosamente.
      // Después de hacer click en Purchase, aparece un cuadro de confirmación con el mensaje de éxito.
      // Comprobamos que el mensaje de agradecimiento esté visible en la pantalla.
      cy.contains('Thank you for your purchase!').should('be.visible');
      
      // (Opcional) Obtener y mostrar información de confirmación (ID de orden, monto, etc.) desde el mensaje.
      cy.get('.sweet-alert').then(($modal) => {
        const confirmationText = $modal.text();
        cy.log('Mensaje de confirmación: ' + confirmationText); 
        // Podemos incluir aserciones adicionales, por ejemplo, validar que el nombre y tarjeta ingresados estén en el mensaje.
        expect(confirmationText).to.include('Juan Perez');
        expect(confirmationText).to.include('4111 1111 1111 1111');
      });
      
      // 14. Cerrar el mensaje de confirmación haciendo clic en "OK".
      cy.contains('OK').click();
      
      // 15. (Opcional) Verificar que al cerrar el mensaje regresa al carrito vacío o a la página principal.
      cy.url().should('include', 'index.html'); // La URL debería contener 'index.html' indicando que estamos de vuelta a la página principal.
    });
  });


  