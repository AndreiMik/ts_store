"use strict";
var choosed_product_id = [];
let choosed_product_id_old = get_choosed_product_id_FromLocalstorage();
if (choosed_product_id_old.length != 0) {
    for (let id of choosed_product_id_old) {
        choosed_product_id.push(id);
    }
}
const products = [
    { id: '1', name: 'belt', price: 50, offer: 0 },
    { id: '2', name: 'hat', price: 50, offer: 25 },
    { id: '3', name: 'scarf', price: 50, offer: 0 },
    { id: '4', name: 'bag', price: 50, offer: 0 },
];
var tab1 = document.getElementById("tab1");
var tab2 = document.getElementById("tab2");
var row = tab1.insertRow();
var row_m1 = tab2.insertRow();
var row_m2 = tab2.insertRow();
for (let i = 0; i < products.length; i++) {
    var cell = row.insertCell();
    if (products[i].offer == 0) {
        cell.innerHTML = "<img src='img/" + products[i].name + ".jpg'alt=''><br>"
            + products[i].name + "<br>&euro;" + products[i].price.toFixed(2) +
            "&euro;" +
            "<br>";
    }
    else {
        cell.innerHTML = "<img src='img/" + products[i].name + ".jpg'alt=''><br>"
            + products[i].name + "<br><del>&euro;" + products[i].price.toFixed(2) +
            "</del><span style='color: red;'>&euro;" + products[i].offer.toFixed(2) +
            "<br>";
    }
    let button = createAddButton(products[i].id);
    cell.appendChild(button);
    button.onclick = function () {
        let strID = button.id;
        if (strID == null) {
            return;
        }
        let id = +strID;
        if (id == null) {
            alert("null");
            return;
        }
        choosed_product_id.push(id);
        fillData(id);
        fillCart();
    };
}
let counter = 0;
for (let i = 0; i < products.length; i++) {
    let button_m = createAddButton(products[i].id);
    counter++;
    if (counter < 3) {
        var cell_m = row_m1.insertCell();
        if (products[i].offer == 0) {
            cell_m.innerHTML = "<img src='img/" + products[i].name + ".jpg' alt=''><br>" + products[i].name +
                "<br>&euro;" + products[i].price.toFixed(2) +
                "<br>";
        }
        else {
            cell_m.innerHTML = "<img src='img/" + products[i].name + ".jpg' alt=''><br>" + products[i].name +
                "<br><del>&euro;" + products[i].price.toFixed(2) +
                "</del><span style='color: red;'> &euro;" + products[i].offer.toFixed(2) +
                "</span><br>";
        }
        cell_m.appendChild(button_m);
    }
    if (counter < 5 && counter > 2) {
        var cell_m = row_m2.insertCell();
        if (products[i].offer == 0) {
            cell_m.innerHTML = "<img src='img/" + products[i].name + ".jpg' alt=''><br>" + products[i].name +
                "<br>&euro;" + products[i].price.toFixed(2) +
                "<br>";
        }
        else {
            cell_m.innerHTML = "<img src='img/" + products[i].name + ".jpg' alt=''><br>" + products[i].name +
                "<br><del>&euro;" + products[i].price.toFixed(2) +
                "</del><span style='color: red;'> &euro;" + products[i].offer.toFixed(2) +
                "</span><br>";
        }
        cell_m.appendChild(button_m);
    }
    button_m.onclick = function () {
        let strID = button_m.id;
        if (strID == null) {
            return;
        }
        let id = +strID;
        if (id == null) {
            alert("null");
            return;
        }
        choosed_product_id.push(id);
        if (choosed_product_id.length != 0) {
            let div_cart_m = document.getElementById("cart_mob-list");
            div_cart_m.style.display = "block";
        }
        fillData(id);
        fillCart();
    };
}
fillCart();
function createAddButton(id) {
    let button = document.createElement("button");
    button.textContent = "Add to cart";
    button.setAttribute("id", id);
    button.setAttribute("class", "store_button");
    return button;
}
function getOrderDataFromLocalstorage() {
    const Order_Data_JSON = localStorage.getItem("Order_Data");
    if (Order_Data_JSON == null)
        return [];
    return JSON.parse(Order_Data_JSON);
}
function get_choosed_product_id_FromLocalstorage() {
    const choosed_product_id_JSON = localStorage.getItem("choosed_product_id");
    if (choosed_product_id_JSON == null)
        return [];
    return JSON.parse(choosed_product_id_JSON);
}
function fillData(id) {
    var choosed_product_id_filtered = [];
    var count_id = [];
    for (let id of choosed_product_id) {
        if (count_id[id] === undefined) {
            count_id[id] = 1;
            if (!choosed_product_id_filtered.includes(id)) {
                choosed_product_id_filtered.push(id);
            }
        }
        else {
            count_id[id]++;
        }
    }
    var choosed_products = [];
    for (let id of choosed_product_id_filtered) {
        let product_price;
        if (products[id - 1].offer != 0) {
            product_price = products[id - 1].offer;
        }
        else {
            product_price = products[id - 1].price;
        }
        choosed_products.push({
            "id": id, "name": products[id - 1]["name"],
            "price": product_price, "count": count_id[id],
            "offer": products[id - 1]["offer"]
        });
    }
    let total_price = 0;
    let product;
    for (product of choosed_products) {
        let calculated_price = 0;
        calculated_price = product.price * product.count;
        total_price = total_price + calculated_price;
    }
    var Order_Data = {
        products: choosed_products,
        price: total_price,
        amount: choosed_product_id.length
    };
    localStorage.setItem("choosed_product_id", JSON.stringify(choosed_product_id));
    localStorage.setItem("Order_Data", JSON.stringify(Order_Data));
    let Order_Data_saved = getOrderDataFromLocalstorage();
    return Order_Data_saved;
}
function fillCart() {
    var Order_Data = getOrderDataFromLocalstorage();
    if (Order_Data.products.length == 0) {
        var span_count = document.getElementById("span_count");
        span_count.innerHTML = "Your cart is empty";
        var strong_sum = document.getElementById("strong_sum");
        strong_sum.innerHTML = "";
        return;
    }
    var cart_amount = document.getElementById("span_count");
    cart_amount.innerHTML = Order_Data.amount.toString() + " item(s) in your cart";
    var cart_price = document.getElementById("strong_sum");
    cart_price.innerHTML = "&euro;" + Order_Data.price.toFixed(2).toString();
    let div_cart = document.getElementById("cart_content_div");
    let div_cart_m = document.getElementById("cart_mob-list");
    let ul_cart = document.getElementById("cart_list_ul");
    let ul_cart_m = document.getElementById("cart_list_ul_m");
    div_cart.appendChild(ul_cart);
    div_cart_m.appendChild(ul_cart_m);
    function deleteChilds() {
        while (ul_cart.lastElementChild) {
            ul_cart.removeChild(ul_cart.lastElementChild);
        }
        while (ul_cart_m.lastElementChild) {
            ul_cart_m.removeChild(ul_cart_m.lastElementChild);
        }
    }
    deleteChilds();
    for (let i = 0; i < Order_Data.products.length; i++) {
        let li_cart = document.createElement("li");
        let li_cart_m = document.createElement("li");
        ul_cart.appendChild(li_cart);
        ul_cart_m.appendChild(li_cart_m);
        let table_li = document.createElement("table");
        let table_li_m = document.createElement("table");
        li_cart.appendChild(table_li);
        li_cart_m.appendChild(table_li_m);
        table_li.setAttribute("id", "cart_table");
        table_li_m.setAttribute("id", "cart_table_m");
        let tr_1 = table_li.insertRow();
        let tr_1_m = table_li_m.insertRow();
        let td_1_1 = tr_1.insertCell();
        let td_1_1_m = tr_1_m.insertCell();
        td_1_1.style.position = 'relative';
        td_1_1_m.style.position = 'relative';
        td_1_1.style.width = '50px';
        td_1_1_m.style.width = '50px';
        td_1_1.rowSpan = 2;
        td_1_1_m.rowSpan = 2;
        td_1_1.innerHTML = '<img class="cart_product_img" src="img/' + Order_Data.products[i].name + '.jpg" alt="">';
        td_1_1_m.innerHTML = '<img class="cart_product_img" src="img/' + Order_Data.products[i].name + '.jpg" alt="">';
        let td_1_2 = tr_1.insertCell();
        let td_1_2_m = tr_1_m.insertCell();
        td_1_2.innerHTML = Order_Data.products[i].name;
        td_1_2_m.innerHTML = Order_Data.products[i].name;
        let td_1_3 = tr_1.insertCell();
        let td_1_3_m = tr_1_m.insertCell();
        td_1_3.rowSpan = 2;
        td_1_3_m.rowSpan = 2;
        td_1_3.style.position = 'relative';
        td_1_3_m.style.position = 'relative';
        td_1_3.style.width = '40px';
        td_1_3_m.style.width = '40px';
        function createDeleteButton() {
            let button = document.createElement("button");
            button.name = 'deleted_element_id';
            button.id = Order_Data.products[i].id.toString();
            button.setAttribute("class", "btn_del");
            return button;
        }
        let img = document.createElement("img");
        let img_m = document.createElement("img");
        img.setAttribute("class", "cart_product_delete_img");
        img_m.setAttribute("class", "cart_product_delete_img");
        img.src = "img/delete.png";
        img_m.src = "img/delete.png";
        img.alt = "";
        img_m.alt = "";
        let deleteButton = createDeleteButton();
        let deleteButton_m = createDeleteButton();
        deleteButton.appendChild(img);
        deleteButton_m.appendChild(img_m);
        td_1_3.appendChild(deleteButton);
        td_1_3_m.appendChild(deleteButton_m);
        let tr_2 = table_li.insertRow();
        let tr_2_m = table_li_m.insertRow();
        let td_2_1 = tr_2.insertCell();
        let td_2_1_m = tr_2_m.insertCell();
        td_2_1.innerHTML = Order_Data.products[i].count.toString() + "x" +
            Order_Data.products[i].price + "=&euro;" +
            (Order_Data.products[i].price * Order_Data.products[i].count);
        td_2_1_m.innerHTML = Order_Data.products[i].count.toString() + "x" +
            Order_Data.products[i].price + "=&euro;" +
            (Order_Data.products[i].price * Order_Data.products[i].count);
        deleteButton.onclick = function () {
            let idSTR = deleteButton.id;
            let id = +idSTR;
            choosed_product_id.splice(choosed_product_id.indexOf(id), 1);
            deleteChilds();
            fillData(id);
            Order_Data = getOrderDataFromLocalstorage();
            var cart_amount = document.getElementById("span_count");
            cart_amount.innerHTML = Order_Data.amount.toString() + " item(s) in your cart";
            var cart_price = document.getElementById("strong_sum");
            cart_price.innerHTML = "&euro;" + Order_Data.price.toFixed(2).toString();
            let div_cart = document.getElementById("cart_content_div");
            if (Order_Data.products.length > 0) {
            }
            let ul_cart = document.getElementById("cart_list_ul");
            div_cart.appendChild(ul_cart);
            fillCart();
            if (Order_Data.products.length == 0) {
                div_cart.style.display = "none";
            }
        };
        deleteButton_m.onclick = function () {
            let idSTR = deleteButton_m.id;
            let id = +idSTR;
            choosed_product_id.splice(choosed_product_id.indexOf(id), 1);
            deleteChilds();
            fillData(id);
            Order_Data = getOrderDataFromLocalstorage();
            var cart_amount = document.getElementById("span_count");
            cart_amount.innerHTML = Order_Data.amount.toString() + " item(s) in your cart";
            var cart_price = document.getElementById("strong_sum");
            cart_price.innerHTML = "&euro;" + Order_Data.price.toFixed(2).toString();
            let div_cart_m = document.getElementById("cart_mob-list");
            if (Order_Data.products.length != 0) {
                div_cart_m.style.display = "block";
            }
            let ul_cart_m = document.getElementById("cart_list_ul_m");
            div_cart_m.appendChild(ul_cart_m);
            fillCart();
            if (Order_Data.products.length == 0) {
                div_cart_m.style.display = "none";
            }
        };
    }
}
var input_envelope = document.getElementById("envelope_input");
var button_subscribe = document.getElementById("subscribe_btn");
var img_verification_failed = document.getElementById("verification_failed_img");
var p_verification = document.getElementById("p_verification");
button_subscribe.onclick = function () {
    emailValidate();
};
function emailValidate() {
    var email_text = input_envelope.value;
    var regex = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/;
    if (regex.test(email_text) == true && email_text !== '') {
        p_verification.setAttribute("class", "verification_ok_p");
        p_verification.innerHTML = "Subscription successful.";
        img_verification_failed.setAttribute("src", "img/ok_icon.png");
    }
    else {
        p_verification.setAttribute("class", "verification_failed_p");
        p_verification.innerHTML = "Email verification failed..";
        img_verification_failed.setAttribute("src", "img/exclamation_icon.png");
    }
}
