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
    }
    post {
        always {
            emailext body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
            recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
            subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}",
            to: "lucas.germano@universo.univates,jordan.finatto@universo.univates.br,jonatan.birck@universo.univates.br"
        }
    }
}
