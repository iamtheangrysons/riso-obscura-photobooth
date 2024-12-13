document.addEventListener('DOMContentLoaded', (event) => {
  const firstColorDropdown = document.getElementById('firstColorDropdown');
  firstColor = firstColorDropdown.value;
  firstColorDropdown.addEventListener('change', (event) => {
    firstColor = event.target.value;
  });
});

document.addEventListener('DOMContentLoaded', (event) => {
  const secondColorDropdown = document.getElementById('secondColorDropdown');
  secondColor = secondColorDropdown.value;
  secondColorDropdown.addEventListener('change', (event) => {
    secondColor = event.target.value;
  });
});

document.addEventListener('DOMContentLoaded', (event) => {
  const thirdColorDropdown = document.getElementById('thirdColorDropdown');
  thirdColor = thirdColorDropdown.value;
  thirdColorDropdown.addEventListener('change', (event) => {
    thirdColor = event.target.value;
  });
});
