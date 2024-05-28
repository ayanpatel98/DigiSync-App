FROM node:16.17.1-alpine
# Set the working directory
WORKDIR /app

# copy the contents to the dest
COPY . .

# Install dependencies
RUN npm install --production

RUN npm run build

# Expose the port your app runs on (e.g., 3000)
EXPOSE 3000

# Serve the static build
CMD ["npx", "serve", "build"]