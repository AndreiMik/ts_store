<?php
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
?>

<?php require_once  'blocks/top.php';  ?>

<div id="container">

  <div id="strip-top"></div>

  <?php require_once  'blocks/header.php';  ?>

  <?php require_once  'blocks/menu.php';  ?>

  <?php require_once  'blocks/main.php';  ?>

  <?php require_once  'blocks/footer.php';  ?>


</div>
<!-- <script src="js.js"></script> -->
<script src="js/cart.js"></script>
</body>

</html>