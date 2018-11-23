<?php
    include 'conexao.php';

    try {
        $query = "SELECT DISTINCT categoria FROM cruzada";
        $stmt = $conn->query($query);
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            echo "<option value='".$row["categoria"]."'>".$row["categoria"]."</option>";
        }            
    }
    catch(PDOException $e) {
    }
    
    $conn = null;
?>