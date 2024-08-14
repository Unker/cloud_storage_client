Cloud Storage Client
===============

This is the client-side application for "Cloud Storage". The application allows users to view, upload, send, and rename files.

***Contents:***

- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Server Setup](#server-setup)
    - [Cloning the Project](#cloning-the-project)
    - [Setting Environment Variables](#setting-environment-variables)
  - [Running the Project with Docker Compose (recommended)](#run-with-docker)
  - [Manual Project Launch](#manual-project-launch)
- [Testing](#testing)
- [To Do](#to-do)

# Technologies <a name="technologies"></a>

The frontend is implemented in `TypeScript` using:
- Development environment setup tools [Vite](https://vitejs.dev/)
- Library [React](https://react.dev/)
- CSS framework [Tailwind](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/en/main)

# Getting Started <a name="getting-started"></a>

### Server Setup <a name="server-setup"></a>

#### 1. <ins>Cloning the Project:</ins> <a name="cloning-the-project"></a>
   ```bash
   git clone https://github.com/Unker/cloud_storage_client.git
   cd cloud_storage_client
   ```
   
#### 2. <ins>Setting Environment Variables:</ins> <a name="setting-environment-variables"></a>
1. Create a .env file and open it for editing:
   ```bash
   touch .env
   nano .env
   ```

1. Populate the .env file with the following content:
   + If the server will be run via Docker
   ```
   VITE_SERVER_URL='http://109.71.245.96/api'
   ```
   + If the server will be run manually
   ```
   VITE_SERVER_URL='http://109.71.245.96:8000'
   ```
***Replace `109.71.245.96` with your backend address***


### Running the Project with Docker Compose <a name="run-with-docker"></a>
1. [Install Docker](https://docs.docker.com/engine/install/ubuntu/)
1. Start the container build system:
   ```bash
   docker compose up -d --build
   ```

1. Check that the container is running:
   ```bash
   docker ps
   ```

1. The `cloud_storage_server-frontend` image should be active.


### Manual Project Launch <a name="manual-project-launch"></a>
1. Install dependencies:
   ```bash 
   npm install
   ```
   For developers, install additional dependencies:
   ```bash 
   npm run prepare
   ```
1. Start the project:
   + For development mode:
      ```bash 
      npm run dev
      ```

   + For production mode:
      ```bash 
      npm run build
      npm run preview
      ```


## Testing <a name="testing"></a>

todo

## To Do <a name="to-do"></a>

- Write tests
- Set up CI/CD