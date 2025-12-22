from fastapi import FastAPI #async and very fast web framework
from fastapi.middleware.cors import CORSMiddleware #middleware to handle CORS issues as frontend and backend are on different ports
from app.api.analyze import router as analyze_router

#this is the main entry point for the FastAPI application

app = FastAPI(title="Bias Mirror API") #create FastAPI instance with title

# CORS (required for Vite on 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health") #quick health check endpoint,test with /api/health
def health():
    return {"status": "ok"}


app.include_router(analyze_router, prefix="/api") #include all the routes from the analyze router with /api prefix