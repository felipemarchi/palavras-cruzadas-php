function btnNovoJogo() {
    var form1 = document.getElementById("form-cadastro")
    var form2 = document.getElementById("form-jogo")

    form1.setAttribute("class","d-none")
    form2.removeAttribute("class")
}

// Pegar do banco e montar vetores
var p1 = "alfredo"
var p2 = "cléofas"
var p3 = "felipe"
var p4 = "pedro"
var p5 = "vinícius"
var palavras = [p5,p3,p4,p2,p1]
var d1 = "alfredo"
var d2 = "cléofas"
var d3 = "felipe"
var d4 = "pedro"
var d5 = "vinícius"
var dicas = [d5,d3,d4,d2,d1]
var mapaPalavras = []

function jogoTeste() {

    // MAPEAR CADA PALAVRA DO VETOR
    // mapaPalvras[i] da palavras[i] = [coordenadaX, coordenadaY, direção]
    // direção (0 = vertical, 1 = horizontal)
    var x, y, direcao
    var i, j, combina
    var isolarPalavra = false
    for (i=0; i<palavras.length; i++){
        
        // Define direção intercadalada para as palavras
        direcao = i%2

        // 1. Mapeamento da primeira palavra - centralizar
        if (i == 0) {
            x = 5
            y = parseInt((12 - palavras[i].length) / 2)
            combina = true
        }
        
        // 2. Mapeamento geral - cruzar com palavra anterior
        // Se não der, cruzar com palavra anterior...
        else {
            var anterior = 1
            var cont1, cont2
            var letra1, letra2
            var testarComOutraPalavra = false

            // Enquanto não conseguir cruzar
            do {      

            if (testarComOutraPalavra) {
                // Inverte direção e troca a palavra de comparação
                direcao == 0 ? direcao = 1 : direcao = 0
                anterior++
            } testarComOutraPalavra = false

            // Impede estouro de vetor e ativa o último recurso
            if (i-anterior >= 0) {

            // Percorre palavra de comparação         
            cont1 = 0
            combina = false
            while (!combina && cont1 < palavras[i-anterior].length) {

                letra1 = palavras[i-anterior][cont1]

                // Percorre palavra a ser cruzada
                cont2 = 0
                while (!combina && cont2 < palavras[i].length) {

                    letra2 = palavras[i][cont2]

                    // Mapear somente se:
                    // (i) combinar letra
                    if (letra1 == letra2) {                        
                        var xPalavraMatch = mapaPalavras[i-anterior][0]
                        var yPalavraMatch = mapaPalavras[i-anterior][1]
                        if (direcao == 0) {
                            // (ii) a palavra couber no espaço vertical
                            if (yPalavraMatch - cont2 >= 0 && yPalavraMatch + palavras[i].length - 1 - cont2 <= 11) {
                                combina = true
                                x = xPalavraMatch + cont1
                                y = yPalavraMatch - cont2
                                
                                // (iii) não interferir em outras palavras
                                // Para cada palavra já mapeada, ver condições de interferência e não combinar, se for o caso
                                var xComp, yComp, dComp
                                for (j=0; j<mapaPalavras.length; j++) {
                                    xComp = mapaPalavras[j][0]
                                    yComp = mapaPalavras[j][1]
                                    dComp = mapaPalavras[j][2]

                                    if ((dComp == 1
                                            && xComp + palavras[j].length >= x
                                            && y + palavras[i].length >= yComp
                                            && xComp <= x
                                            && (yComp >= y || yComp == y - 1)
                                            && palavras[j][(x - xComp)] != palavras[i][yComp - y]) ||
                                        (dComp == 0
                                            && (xComp == x
                                            || xComp == x + 1
                                            || xComp == x - 1)))

                                            combina = false
                                }
                            }
                        }
                        else {
                            // (ii) a palavra couber no espaço horizontal
                            if (xPalavraMatch - cont2 >= 0 && xPalavraMatch + palavras[i].length - 1 - cont2 <= 11) {
                                combina = true
                                x = xPalavraMatch - cont2
                                y = yPalavraMatch + cont1
                                
                                // (iii) não interferir em outras palavras
                                // Para cada palavra já mapeada, ver condições de interferência e não combinar, se for o caso
                                var xComp, yComp, dComp
                                for (j=0; j<mapaPalavras.length; j++) {
                                    xComp = mapaPalavras[j][0]
                                    yComp = mapaPalavras[j][1]
                                    dComp = mapaPalavras[j][2]

                                    if ((dComp == 0
                                            && yComp + palavras[j].length >= y
                                            && x + palavras[i].length >= xComp
                                            && yComp <= y
                                            && (xComp >= x || xComp == x - 1)
                                            && palavras[j][(y - yComp)] != palavras[i][xComp - x]) ||
                                        (dComp == 1
                                            && (yComp == y
                                            || yComp == y + 1
                                            || yComp == y - 1)))
                                            
                                            combina = false
                                }
                            }
                        }
                    }
                    cont2++ // Incremento do laço
                } // Looping palavra a ser cruzada
                cont1++ // Incremento do laço
            } // Looping palavra de comparação
            
            // Se não cruzou com a palavra comparada, tentar com outra
            if(!combina) testarComOutraPalavra = true
            
            // Impede estouro de vetor e ativa o último recurso
            } else {isolarPalavra = true}

            } while (testarComOutraPalavra && !isolarPalavra)
        }

        // 3. Último recurso - isolar
        // Lógica de verificação semelhante ao mapeamento geral
        if (isolarPalavra) {
            var k, l
            for (j=0; j<12; j++){
                for (k=0; k<12; k++){
                    x = j
                    y = k
                    direcao = i%2
                    if (direcao == 0) {
                        if (y + palavras[i].length - 1 <= 11) {
                            combina = true
                            var xComp, yComp, dComp
                            for (l=0; l<mapaPalavras.length; l++) {
                                xComp = mapaPalavras[l][0]
                                yComp = mapaPalavras[l][1]
                                dComp = mapaPalavras[l][2]

                                if ((dComp == 1
                                        && xComp + palavras[l].length >= x
                                        && y + palavras[i].length >= yComp
                                        && xComp <= x
                                        && (yComp >= y || yComp == y - 1)
                                        && palavras[l][(x - xComp)] != palavras[i][yComp - y]) ||
                                    (dComp == 0
                                        && (xComp == x
                                        || xComp == x + 1
                                        || xComp == x - 1)) ||
                                    (dComp == 1 && xComp == x + 1 ))

                                        combina = false
                            }
                        }
                    } else {
                        if (x + palavras[i].length - 1 <= 11) {
                            combina = true
                            var xComp, yComp, dComp
                            for (l=0; l<mapaPalavras.length; l++) {
                                xComp = mapaPalavras[l][0]
                                yComp = mapaPalavras[l][1]
                                dComp = mapaPalavras[l][2]

                                if ((dComp == 0
                                        && yComp + palavras[l].length >= y
                                        && x + palavras[i].length >= xComp
                                        && yComp <= y
                                        && (xComp >= x || xComp == x - 1)
                                        && palavras[l][(y - yComp)] != palavras[i][xComp - x]) ||
                                    (dComp == 1
                                        && (yComp == y
                                        || yComp == y + 1
                                        || yComp == y - 1)) ||
                                    (dComp == 0 && yComp == y + 1))
                                        
                                        combina = false
                            }
                        }
                    }
                    if (combina) break
                }
                if (combina) break
            }
            isolarPalavra = false
        }

        // Palavra mapeada!
        // Salvar o mapeamento ou excluir palavra da lista
        if (combina) {
            mapaPalavras[i] = [x,y,direcao]
        } else {
            palavras.splice(i,1)
        }

    } // Mapear próxima palavra da lista...


    // EXIBIR CÉLULAS MAPEADAS COM DICAS
    var celula
    for (i=0; i<palavras.length; i++){
        x = mapaPalavras[i][0]
        y = mapaPalavras[i][1]
        direcao = mapaPalavras[i][2]
        celula = y*12 + (x + 1)

        document.getElementById("c"+celula).setAttribute("class","celula dica")
        document.getElementById("c"+celula).setAttribute("data-original-title",dicas[i])

        for (j=0; j<palavras[i].length; j++){
            if (j != 0)
                direcao == 0 ? celula += 12 : celula += 1

            document.getElementById("c"+celula).removeAttribute("disabled")
        }
    }
}