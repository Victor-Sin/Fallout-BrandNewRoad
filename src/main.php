<?php

/**
 * Renvoie la somme des éléments donnés en paramètres
 * @param int ...$elts
 * @return int
 */
function somme(int ...$elts):int {
$somme = 0;
foreach ($elts as $elt) {
    $somme += intval($elt);
}
return $somme;
}


function help(): string {
    return "Version 1.0 du script main.php";
}

printf("Bonjour monde !".PHP_EOL);

printf ("Somme de 2 3 4 = %d\n", somme(2,3,4));