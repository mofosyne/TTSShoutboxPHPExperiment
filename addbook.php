<?php

$message	= $_POST["message"];
$name		= $_POST["name"];
$storeLimit = 100;

 if ($message != '') 
 {
  $message = str_replace ("\n","<br>",$message);
  $message = strip_tags ($message, '<br>');

  $newRow = '<div class="shoutBoxEntry">'.
				'<div class="message">'. ($message) . '</div>'.
				'<div class="info">'.
					'<div class="date">'. date('d.m.Y H:i') .'</div> - <div class="name">'. strip_tags ($name) .'</div>'.
				'</div>'.
			'</div>';
  	      
  $oldRows = join ('', file ('shoutbox.txt') );
  
  // save max of 100 lines
  $oldRows = preg_split ('/$\R?^/m', $oldRows);
  $oldRows = array_slice($oldRows, 0, $storeLimit); 
  $oldRows = implode("\r\n", $oldRows); 

  // save file
  $fileName = fopen ('shoutbox.txt', 'w');
  fputs ($fileName, $newRow . chr(13) . chr(10) . $oldRows);
  fclose ($fileName);
 }
 
 include ("readbook.php");
 include ("lastupdated.php");
?>
