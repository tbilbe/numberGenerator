  const endpoint = './file.json';
  const system = [];

  fetch(endpoint) //returns a promise call .then on it
    .then(blob => blob.json()) // the data blob has a json method returns another promise call .then on this as well.
    .then(data => system.push(...data)); // spread into the array so it does not nest

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function systemMatches(systemToMatch, system) {
    return system.filter(drawing => {
      // here we need to find out if the search matches a drawing title
      const regexp = new RegExp(systemToMatch, 'gi');
      return drawing.Drawing_Title.match(regexp) || drawing.System_Type.match(regexp);
    })
  }

  function displayMatchSystem() {
    const matchArray = systemMatches(this.value, system);
  // console.log(matchArray);
  const html = matchArray.map(drawing => {
    const regex = new RegExp(this.value, 'gi');
    const drawTitle = drawing.Drawing_Title.replace(regex, `<span class='hl'>${this.value}</span>`);
    const sysType = drawing.System_Type.replace(regex, `<span class='hl'>${this.value}</span>`);
    // const drawNum = drawing.System_Type.replace(regex, `<span class='hl'>${this.value}</span>`);
    return `
      <li>
        <span class='title'>${drawTitle}</span>
        <span class='drawNum'>${drawing.Drawing_Number}</span>
    `
  }).join('');
  suggestions.innerHTML = html;
}

// ////////////////////////////////////////////////////////////////////////
// form submit and create drawing number
const button = document.querySelector("#numGenerator");
button.addEventListener('click', (e)=>{
  // variables
  const systemNum = document.querySelector("#system").value;
  const floor = document.querySelector("#floor").value;
  const serviceNum = document.querySelector("#service").value;
  const zone = document.querySelector("#zone").value;


  document.getElementById('result').innerHTML = '<div class="message resultOut">'+systemNum+floor+serviceNum+zone+'<br></div>';
  }); 

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatchSystem);
searchInput.addEventListener('keyup', displayMatchSystem);

