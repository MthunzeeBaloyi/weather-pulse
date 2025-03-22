#!/bin/bash

# Define colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print header
echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}   Starting WeatherPulse Application   ${NC}"
echo -e "${BLUE}=======================================${NC}"

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check if tmux is installed
if ! command_exists tmux; then
  echo "tmux is not installed. Installing..."
  sudo apt-get update && sudo apt-get install -y tmux
fi

# Kill any existing tmux session with the same name
tmux kill-session -t weatherpulse 2>/dev/null

# Create a new tmux session
tmux new-session -d -s weatherpulse

# Window 1: Backend (Node.js)
echo -e "${GREEN}Starting Backend (Node.js) server...${NC}"
tmux send-keys -t weatherpulse "cd $(pwd)/backend && npm run dev" C-m

# Window 2: Python Service
echo -e "${GREEN}Starting Python service...${NC}"
tmux split-window -h -t weatherpulse
tmux send-keys -t weatherpulse "cd $(pwd)/python-service && source venv/bin/activate && python3 app.py" C-m

# Window 3: Frontend (React)
echo -e "${GREEN}Starting Frontend (React) application...${NC}"
tmux split-window -v -t weatherpulse
tmux send-keys -t weatherpulse "cd $(pwd)/frontend && npm run dev" C-m

# Select the first pane
tmux select-pane -t 0

# Attach to the tmux session
echo -e "${GREEN}All services started in tmux session 'weatherpulse'${NC}"
echo -e "${BLUE}Press Ctrl+B then D to detach from the session without stopping the services${NC}"
echo -e "${BLUE}Use 'tmux attach -t weatherpulse' to reattach to the session later${NC}"
echo -e "${BLUE}Use 'tmux kill-session -t weatherpulse' to stop all services${NC}"

tmux attach -t weatherpulse
EOF

# Make the script executable
chmod +x run.sh
