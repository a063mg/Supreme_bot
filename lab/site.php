<?php
$a = fopen('test.csv', 'r');


while (($data = fgetcsv($a, 1000, ";")) !== FALSE) {
$num = count($data);
echo '1'.$data[0]."\n";
echo '2'.$data[1]."\n";
}
// foreach(file('test.csv') as $line) {
//    echo $line."\n";
// }
?>