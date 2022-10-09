<!-- header.php -->

<header>
  <div id="banner-left">
    <img src="img/log2.png" alt="logo">
    <p>The Store</p>

    <!-- desktop cart -->
    <div id="cart">
      <img id="cart_img" src="img/cart_icon.png" alt="">
      
      <p id="p_cart"> <span id="span_count">Your cart is empty
         
        </span> <strong id="strong_sum">
          <?php
          if ($counter != 0) {
            echo "&euro;", number_format($sum, 2);
          }
          ?>
        </strong></p>

      <!--cart list does not appear when hovered if cart is empty  -->
      
        <div id="cart_content_div">
          <ul id="cart_list_ul">
            <?php
            /* displaying cart list */
            foreach ($cart_products as $list_item) :
            ?>
              <li>
                <table id="cart_table">
                  <tr>
                    <td style="position: relative; width: 50px; " rowspan="2"><img class="cart_product_img" src="img/<?php echo $list_item['name']; ?>.jpg" alt=""></td>
                    <td><?php echo $list_item['name']; ?></td>
                    <form action='functions/delete_product.php' method='post'>
                      <td rowspan="2" style="position: relative; width: 40px;"><button name='deleted_element_id' value="<?php echo $list_item['id']; ?>" class="btn_del" type="submit"><img class="cart_product_delete_img" src="img/delete.png" alt=""></button></td>
                    </form>
                  </tr>
                  <tr>
                    <!-- merged cell объединенная ячейка -->
                    <!-- <td>One</td> -->
                    <td><?php echo $list_item['pcs']; ?>
                      x&euro;
                      <?php
                      if ($list_item['offer'] == 0) {
                        echo $product['price'];
                      } else {
                        echo $list_item['offer'];
                      }
                      ?></td>
                    <!-- <td>three</td> -->
                  </tr>
                </table>
              </li>
            <?php endforeach; ?>
          </ul>
          <form action="">
            <button onclick="" class="cart_button">GO TO CHECKOUT</button>
          </form>
        </div>
      
      <!--cart list does not appear when hovered if cart is empty  -->

    </div>
  </div>

  <!-- mobile cart -->
  <!-- блок с корзиной ставим отдельно от меню, чтобы его не захватывал hover  -->
  <div id="cart_mob" style="margin-right: 60px;"> <img src="img/cart_icon.png" style="left: 5px;" alt="cart">

    <!-- список товаров в корзине -->
    <div id="cart_mob-list"
     
       style="display: block;">    
    
      
   
      <ul id="cart_list_ul_m">

       
      </ul>
    

    <form action="functions/get_cart.php">

      <button  disabled  class="cart_button_mob">GO TO CHECKOUT</button>

    </form>
    </div>

    <!--cart list does not appear when hovered if cart is empty  -->
  </div>
</header>