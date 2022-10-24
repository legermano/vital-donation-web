pipeline {
    agent any

    stages {
        stage('Type check') {
            agent {
                docker {
                    image 'node:lts-alpine'
                }
            }
            steps {
                sh 'npm install'
                sh 'npm run type-check'
            }
        }
        stage('Build only') {
            agent {
                docker {
                    image 'node:lts-alpine'
                }
            }
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Test production build') {
            agent {
                label 'linux'
            }
            steps {
                sh '''
                    docker version
                    docker info
                    docker compose version
                '''
            }
        }
    }
}