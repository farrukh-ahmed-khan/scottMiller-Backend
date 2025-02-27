# Simple Node.js App Deployment on AWS EC2

## Step 1: Install Node.js and NPM using NVM

1. Install Node Version Manager (NVM) by running the following command:

    ```sh
    sudo su -
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
    ```

2. Activate NVM:

    ```sh
    . ~/.nvm/nvm.sh
    ```

3. Use NVM to install the latest version of Node.js:

    ```sh
    nvm install node
    ```

4. Verify that Node.js and npm are installed correctly:

    ```sh
    node -v
    npm -v
    ```

---

## Step 2: Install Git and Clone Repository from GitHub

1. Install Git by running:

    ```sh
    sudo apt-get update -y
    sudo apt-get install git -y
    ```
    or
   ```sh
    sudo yum update
    sudo yum install git
    ```

3. Verify that Git is installed:

    ```sh
    git --version
    ```

4. Clone the GitHub repository:

    ```sh
    git clone https://github.com/yeshwanthlm/nodejs-on-ec2.git
    ```

5. Navigate into the project directory and install dependencies:

    ```sh
    cd nodejs-on-ec2
    npm install
    ```

---

## Step 3: Start the Application

To start the application, run the following command:

```sh
npm start
```

The app should now be running and serving "A Monk in Cloud" on the specified port.

---

### Notes:
- Ensure your security group in AWS allows inbound traffic on the port the application is running on (e.g., **8000**).
- If needed, modify your `server.js` to listen on `0.0.0.0` instead of `localhost`.
- Use **PM2** to keep the application running in the background:

    ```sh
    npm install -g pm2
    pm2 start app.js
    pm2 startup
    ```

---

### Troubleshooting:
- If you cannot access the app, check firewall settings:
    ```sh
    sudo ufw allow 8000/tcp
    sudo ufw reload
    ```
- Verify if the app is running on the correct port:
    ```sh
    netstat -tulnp | grep 8000
    ```

