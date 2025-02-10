# Use the official Node.js slim image
FROM node:18.20.6-slim

# Set environment variables
ENV TZ=Africa/Cairo
ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies and clean up apt cache to reduce image size
RUN apt update -y && \
    apt upgrade -y && \
    apt install -y xdg-utils && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*

# Copy application files
COPY . ./

# Expose the port the app runs on
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev", "--host"]