document.addEventListener('DOMContentLoaded', function() {
    const statusElement = document.getElementById('status');
    const itemsList = document.getElementById('items-list');
    const fetchButton = document.getElementById('fetch-button');
    
    // URL del backend 
    const apiUrl = process.env.BACKEND_URL || 'http://localhost:8000';
    
    // Comprobar la conexión con el backend
    checkBackendConnection();
    
    // Evento para el botón de obtener datos
    fetchButton.addEventListener('click', fetchItems);
    
    // Función para comprobar la conexión con el backend
    function checkBackendConnection() {
        fetch(`${apiUrl}/`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('No se pudo conectar con el backend');
            })
            .then(data => {
                statusElement.textContent = `Conectado: ${data.message}`;
                statusElement.classList.add('success');
                
                // Cargar datos automáticamente después de conectar
                fetchItems();
            })
            .catch(error => {
                statusElement.textContent = `Error: ${error.message}`;
                statusElement.classList.add('error');
                console.error('Error de conexión:', error);
            });
    }
    
    // Función para obtener los items desde la API
    function fetchItems() {
        itemsList.innerHTML = '<li>Cargando...</li>';
        
        fetch(`${apiUrl}/api/items`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Error al obtener los items');
            })
            .then(items => {
                itemsList.innerHTML = '';
                
                if (items.length === 0) {
                    itemsList.innerHTML = '<li>No hay elementos disponibles</li>';
                    return;
                }
                
                items.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <strong>${item.name}</strong>
                        <p>${item.description}</p>
                    `;
                    itemsList.appendChild(li);
                });
            })
            .catch(error => {
                itemsList.innerHTML = `<li class="error">Error: ${error.message}</li>`;
                console.error('Error al cargar los items:', error);
            });
    }
});