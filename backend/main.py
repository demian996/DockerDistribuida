from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="API Backend")

# Configuración de CORS para permitir peticiones desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especificar el origen exacto
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Bienvenido a la API de FastAPI"}

@app.get("/api/items")
async def get_items():
    # Ejemplo de datos para la API
    items = [
        {"id": 1, "name": "Item 1", "description": "Descripción del item 1"},
        {"id": 2, "name": "Item 2", "description": "Descripción del item 2"},
        {"id": 3, "name": "Item 3", "description": "Descripción del item 3"}
    ]
    return items