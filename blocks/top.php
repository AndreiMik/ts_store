<!-- top.php -->
<!DOCTYPE html>
<html lang="fi">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" type="text/css" href="css/try-store.css">
  <link rel="stylesheet" type="text/css" media="" href="css/try-store-media-320.css">
  <script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
  <script src="js/script.js" defer></script>
  <title>Store</title>
</head>

<body>

  <?php
  /* getting all store products */  
  require_once(__DIR__.'/../functions/functions.php');

  /* this file prepairs data to display in the cart */  
  require_once(__DIR__.'/../functions/cart_list.php');
  ?>