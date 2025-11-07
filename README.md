# flotector

HOW TO RUN (DEVELOPERS ONLY)

For first time:
1. Install backend packages
    - 'cd backend' to go to backend folder
    - 'python -m venv .venv' to create virtual environment
    - '.venv/Scripts/activate' to activate virtual environment
    - 'pip install -r requirements.txt' to install (This takes a while)

2. Create file under backend named ".env" and input API keys

3. Install frontend packages
    - 'cd ..' to go to root folder
    - 'cd frontend' to go to frontend folder
    - 'npm install' to install

Run web app
1. Open Split Terminal to run Backend and Frontend simultaneously 

2. Run backend
    - 'cd backend'
    - '.venv/Scripts/activate' (if .venv is not yet activated)
    - 'python run.py'
    - Ctrl + C to quit

3. Run frontend
    - 'cd frontend'
    - 'npm run dev'
    - Ctrl + Click on the local server link
    - Ctrl + C to quit