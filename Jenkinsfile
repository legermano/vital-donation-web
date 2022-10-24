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
        stage('Depoy') {
            when {
                branch 'master'
            }
            steps {
                sshagent(credentials: ['vm-univates-key']) {
                    sh 'ssh -o StrictHostKeyChecking=no -l univates 177.44.248.85 \'cd projects/vital-donation-web && ./deploy.sh\''
                }
            }
        }
        post {
            always {
                emailext body: "${DEFAULT_CONTENT}",
                recipientProviders: "${DEFAULT_RECIPIENTS}",
                subject: "${DEFAULT_SUBJECT}"
            }
        }
    }
}