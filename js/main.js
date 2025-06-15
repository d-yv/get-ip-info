const inputForm = document.querySelector('.form');
const outputInfo = document.querySelector('.result');
const TOKEN = '1043e80672fba9';

inputForm.addEventListener('submit', async event => {
  event.preventDefault();
  const inputIp = `${event.target.input.value}/`;
  const requestData = await fetchData(inputIp, TOKEN);

  renderData(requestData);

  event.target.reset();
});

async function fetchData(ip, TOKEN) {
  const request = await fetch(`https://ipinfo.io/${ip}json?token=${TOKEN}`);
  const jsonResponse = await request.json();
  console.log(jsonResponse);

  return jsonResponse;
}

function renderData({ ip, hostname, loc, org, region, city, country }) {
  const html = `<li class="result-item"><span class = "result-name">ip address: </span>${ip}</li> 
          <li class="result-item"><span class = "result-name">hostname: </span>${hostname}</li> 
          <li class="result-item"><span class = "result-name">company: </span>${org}</li> 
          <li class="result-item"><span class = "result-name">region: </span>${region}</li> 
          <li class="result-item"><span class = "result-name">city: </span>${city}</li> 
          <li class="result-item"><span class = "result-name">country: </span>${country}</li> 
          <li class="result-item"><span class = "result-name">location: </span>${loc}</li>`;
  outputInfo.innerHTML = html;
}
