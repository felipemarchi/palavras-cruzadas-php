<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<?php
    $palavra = strtoupper($_POST["palavra"]);
    $dica = $_POST["dica"];

    //Separa em dois blocos try-catch para pegar o erro de conexão ou execução da query
    try {
        $conn = new PDO("mysql:host=mysqlinstance.c3yy9bhtywfb.sa-east-1.rds.amazonaws.com;port=3306;dbname=webdb", "sa", "password");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $e) {
        echo '<script>window.onload = function() {
                swal({
                    title: "Falha na conexão!",
                    text: "Não foi possível estabelecer uma conexão com o banco de dados",
                    icon: "error",
                    closeOnEsc: false,
                    closeOnClickOutside: false
                })
                .then((value) => {
                    window.location.href = "/";
                });
            }</script>'; 
    }
    
    try {
        $query = "INSERT INTO cruzada VALUES (" . "'" . $palavra . "','" . $dica . "')";
        $conn->exec($query);
        echo '<script>window.onload = function() {
                swal({
                    title: "Sucesso na inserção!",
                    text: "Uma nova palavra foi inserida no banco de dados",
                    icon: "success",
                    closeOnEsc: false,
                    closeOnClickOutside: false
                })
                .then((value) => {
                    window.location.href = "/";
                });
            }</script>';    
    }
    catch(PDOException $e) {
        echo '<script>window.onload = function() {
                swal({
                    title: "Falha na inserção!",
                    text: "Você tentou inserir uma palavra já existente no banco de dados",
                    icon: "error",
                    closeOnEsc: false,
                    closeOnClickOutside: false
                })
                .then((value) => {
                    window.location.href = "/";
                });
            }</script>';
    }	
?>