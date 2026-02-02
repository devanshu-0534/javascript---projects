const table_list = document.querySelector(".table_body");
const URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"

async function getData() {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    allCoins = data;          
    renderData(allCoins);    
  } catch (error) {
    console.error("Problem in fetching Data", error);
  }
}

getData();


function renderData(reqData) {
  table_list.innerHTML = ""; 

  reqData.forEach((coin) => {
    let price_change_24h = coin.price_change_24h.toFixed(2);
    let symbolUpperCase = coin.symbol.toUpperCase();

    let table_rows = document.createElement("tr");

    table_rows.innerHTML = `
      <td>
        <div class="coin-image">
          <img src="${coin.image}" style="width:45px;height:45px"/>
          <div class="coin-name">${coin.name}</div>
        </div>
      </td>
      <td>${symbolUpperCase}</td>
      <td>${coin.current_price}</td>
      <td>${coin.total_volume}</td>
      <td class="percentage_change">${price_change_24h}</td>
      <td>${coin.market_cap}</td>
    `;

    const td = table_rows.querySelector(".percentage_change");
    td.style.color = price_change_24h < 0 ? "red" : "green";

    table_list.appendChild(table_rows);
  });
}


//Searching
function searchCoin(searchInput) {
  const filteredData = allCoins.filter((coin) =>
    coin.name.toLowerCase().includes(searchInput.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchInput.toLowerCase())
  );

  renderData(filteredData);
}


document.getElementById("search_bar").addEventListener("keyup", (e) => {
  searchCoin(e.target.value);
});



//Sorting

function MarketCap() {
  const sortbyMarketCap = [...allCoins].sort(
    (a, b) => b.market_cap - a.market_cap 
  );
  renderData(sortbyMarketCap);
}

function Percentage(){
    const sortByPercentage = [...allCoins].sort(
        (a, b) => b.price_change_24h - a.price_change_24h
    );
    renderData(sortByPercentage);
}
