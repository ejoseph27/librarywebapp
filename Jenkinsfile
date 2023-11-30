pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                // Checkout your source code from the repository
                checkout scm
            }
        }
        
        stage('Build and Test Frontend') {

            tools {
                nodejs 'NodeJS' // Use the Node.js tool configured in Jenkins
            }
            steps {
                sh 'env'
                dir('frontend') {
                    // Change to frontend directory
                    // Add commands to build your Angular app
                    // Print NodeJS and npm versions for debugging
                    sh 'pwd'
                    sh ' echo PATH'
                    // Install Angular CLI globally
                    sh 'npm install -g @angular/cli@16.2.9'
                    // Install dependencies including @angular-devkit/build-angular
                    //sh 'npm install --save @angular-devkit/build-angular@16.2.9'
                    // Update npm
                    //sh 'npm install -g npm@latest'
                    // Clear npm cache
                    //sh 'npm cache clean -f'
                    sh 'npm install'
                    sh 'ls node_modules'
                    sh ' echo NodeModules'

            
                    // Build Angular app
                    sh 'ng build --verbose'
                }
            }
        }
        
        stage('Build and Test Backend') {
            steps {
                dir('backend') {
                    // Change to backend directory
                    // Add commands to build your Node.js app and run tests
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }
        
        stage('Docker Compose Up') {
            steps {
                // Run Docker Compose to build and start containers
                sh 'docker-compose up -d --build'
            }
        }
        
    }
    
    post {
        success {
            // Actions to perform when the build is successful
            // For example, clean up or notify someone
            echo 'Build and test successful!'
        }
        failure {
            // Actions to perform when the build fails
            // For example, notify someone or take corrective action
            echo 'Build and test failed!'
        }
    }
}