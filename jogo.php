<?php   
    if(isset($_POST['categoriaJogo'])) {
        include 'conexao.php';

        $categoria = $_POST["categoriaJogo"];
    
        try {
            $query = 'SELECT palavra, dica FROM cruzada WHERE categoria = "'.$categoria.'"';
            $stmt = $conn->query($query);
    
            echo '<script>window.onload=function(){var palavras=[];var dicas=[];';

            while($row = $stmt->fetch(PDO::FETCH_ASSOC))
                echo 'palavras.push("'.$row["palavra"].'");dicas.push("'.$row["dica"].'");';
            
            echo 'montaTabuleiro(palavras, dicas);}</script>';
        }
        catch(PDOException $e) {
        };

        $conn = null;
    }
?>