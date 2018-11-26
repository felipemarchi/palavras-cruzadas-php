<?php
    try {
        $conn = new PDO("mysql:host=mydbinstance.custksmrwqt0.us-east-2.rds.amazonaws.com;port=3306;dbname=webdb", "sa", "password");
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
?>