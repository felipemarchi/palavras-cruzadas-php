<script src="js/palavras-cruzadas.js"></script>
<?php   
    function configuraJogo() {
        include 'conexao.php';

        $categoria = $_POST["categoriaJogo"];
        $palavras = array();
        $dicas = array();
    
        try {
            $query = 'SELECT palavra, dica FROM cruzada WHERE categoria = "'.$categoria.'"';
            $stmt = $conn->query($query);
    
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                array_push($palavras, $row["palavra"]);
                array_push($dicas, $row["dica"]);
            }
        }
        catch(PDOException $e) {
        };

        $conn = null;
        
        echo '<script>window.onload = function() {
                montaTabuleiro()
              }</script>';
    }
    
    if(isset($_POST['categoriaJogo'])){
        configuraJogo();  
    }
?>