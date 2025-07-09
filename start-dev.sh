#!/bin/bash

# Kill any existing node server processes
pkill -f "node server.js" 2>/dev/null

# Clear the log file
> dev.log

# Start the dev server in the background with nohup
echo "Starting dev server..."
nohup npm run dev > dev.log 2>&1 &

# Wait for server to start
sleep 3

# Check if server started successfully
if ps aux | grep "node server.js" | grep -v grep > /dev/null; then
    echo "✅ Dev server started successfully!"
    echo "🌐 Server running at: http://localhost:3000"
    echo "📝 Logs available at: dev.log"
    echo ""
    echo "To stop the server, run: pkill -f 'node server.js'"
else
    echo "❌ Failed to start dev server. Check dev.log for errors."
    tail -20 dev.log
fi