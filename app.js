const monsterCard = document.querySelector('.monster_card');
const monsterApp = document.querySelector('.monster_app');
const monsterName = document.querySelector('.monster_name');
const monsterNumber = document.querySelector('.monster_number');
const monsterImage = document.querySelector('.monster_image');
const ctx = document.getElementById('my_chart');

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');

const fetchMonsters = async(monster) => {
    const APIResponse = await fetch(`API/api/v2/monster/${monster}`);
    data = await APIResponse.json();
    return data;
};

const renderMonster = async(monster) => {
    const data = await fetchMonsters(monster);

    var SheetList = monsterApp.className.split(' ');

    monsterApp.classList.remove(SheetList[1]);
    monsterApp.classList.add(data.types['0']['type']['name']);
    monsterName.innerHTML = data.name;
    monsterNumber.innerHTML = data.id;
    monsterImage.src = data['sprites']['front_default'];
    monsterImage.alt = "Image of " + data.name;
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    renderMonster(input.value);
    updateChart(input.value);
    input.value = '';
});

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['hp', 'attack', 'defense', 'sp-attack', 'sp-defense', 'speed'],
      datasets: [{
        label: 'stats',
        data: [45, 49, 49, 
               65, 65, 45],
        borderWidth: 1,
        backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(60, 179, 113)',
        'rgb(238, 130, 238)',
        'rgb(255, 165, 0)',
        ],
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRation: true,
      indexAxis: 'y',
      scales: {
        x: {
          min: 0,
          max: 255,
        }
      },
      plugins: {
        legend: {
            display: false,
        },
      },
    }
  });

const updateChart = async(monster) => {
    const monsterStats = await fetchMonsters(monster);

    myChart.data.datasets[0].data = [monsterStats.stats['0']['base_stat'], monsterStats.stats['1']['base_stat'], monsterStats.stats['2']['base_stat'], 
    monsterStats.stats['3']['base_stat'], monsterStats.stats['4']['base_stat'], monsterStats.stats['5']['base_stat']];

    myChart.update();
};
