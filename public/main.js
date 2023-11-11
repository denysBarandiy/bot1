let shopList = [];


let db = [
    {
        id: '0',
        name: 'Яблуко',
        price: 30
    },
    {
        id: '1',
        name: 'Груша',
        price: 40
    },
    {
        id: '2',
        name: 'Персик',
        price: 45
    },
    {
        id: '3',
        name: 'Банан',
        price: 38
    },
    {
        id: '4',
        name: 'Апельсин',
        price: 60
    }
    
];

for (let el of db) {
    $('.goodsContainer').append(`
    <div class="element">
        <img src="${el.pic}" class='cardPng' alt="2">
        <h3 class="cardTxt">${el.name}</h3>
        <div class="flexC">
           <p class="price">${el.price}</p>
           <button class="buyBtn" id="${el.name}">Buy</button>
        </div>
    </div>
    `);

    
}
$('.buyBtn').click(function (e) {
        shopList.push(e.target.id);
        $('#cartLength').text(shopList.length);
        console.log(shopList)
        cartPush(e.target.id)
        trgId = e.target.Id
    })
function cartPush(target){
    $('.cartList').empty();
    for(let el of shopList){
        $('.cartList').append(`
    <div class="listIt">
        <p class="itName"></p>
        <button class="removeBtn"></button>
     </div>
        `)
    }
    
}

// $('.buyBtn').click(function (e) {
//     shopList.push(e.target.id);
//     $('#cartLength').text(shopList.length);
//     console.log(shopList)
//     cartPush(e.target.id)
//     trgId = e.target.Id
//     alert(trgId)
// })

$('#send').click(function () {
    let data = shopList;
    if (data.length > 0) {
        axios.post('http://localhost:3000/submit', data)
            .then(res => {
                console.log(`Дані відправлено: ${res.data}`);
            })
            .then(() => {
                shopList = [];
                $('#cartLength').text(shopList.length);
                alert('Замовлення відправлено');
            })
            .catch(err => {
                console.log(err);
            })

    } else {
        alert('Корзина пуста');
    }
})