pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                echo 'Clonando el repositorio...'
                git branch: 'main', url: 'https://github.com/brandonrosales70/Aplicacion.git'
            }
        }
    }
    post {
        always {
            echo 'Finalizando el pipeline.'
        }
        success {
            echo 'Pipeline completado exitosamente.'
        }
        failure {
            echo 'Error en el pipeline.'
        }
    }
}
