const inputForm = document.querySelector('.form');
const outputInfo = document.querySelector('.result');

inputForm.addEventListener('submit', async event => {
  event.preventDefault();
  const inputIp = event.target.input.value.trim();

  if (checkValidIP(inputIp)) {
    const requestData = await fetchData(inputIp);
    renderData(requestData);
    event.target.reset();
  } else {
    window.alert('wrong ip');
  }
});

async function fetchData(ip) {
  const url = `https://vercel-api-proxy-six-fawn.vercel.app/api/proxy?q=${ip}`;
  const response = await fetch(url);
  const jsonResponse = await response.json();
  console.log(jsonResponse);
  return jsonResponse;
}

function renderData({ ip, hostname, loc, org, region, city, country }) {
  const html = `
    <li class="result-item"><span class="result-name">ip address:</span> ${ip}</li> 
    <li class="result-item"><span class="result-name">hostname:</span> ${hostname}</li> 
    <li class="result-item"><span class="result-name">company:</span> ${org}</li> 
    <li class="result-item"><span class="result-name">region:</span> ${region}</li> 
    <li class="result-item"><span class="result-name">city:</span> ${city}</li> 
    <li class="result-item"><span class="result-name">country:</span> ${country}</li> 
    <li class="result-item"><span class="result-name">location:</span> ${loc}</li>`;
  outputInfo.innerHTML = html;
}

function checkValidIP(ip) {
  const arrIP = ip.split('.');
  if (arrIP.length !== 4) return false;

  for (const num of arrIP) {
    if (!/^\d+$/.test(num)) return false; // содержит только цифры
    const intNum = Number(num);
    if (intNum < 0 || intNum > 255) return false;
  }

  return true;
}
