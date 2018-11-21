<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<?php
    $palavra = strtoupper($_POST["palavra"]);
    $dica = $_POST["dica"];
    $categoria = $_POST["novaCategoria"];

    if ($categoria == "")
        $categoria = $_POST["categoria"];
        
    include 'conexao.php';
    
    try {
        $query = "INSERT INTO cruzada VALUES (" . "'" . $palavra . "','" . $dica . "','" . $categoria . "')";
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