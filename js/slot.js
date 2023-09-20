const slotNames = [
  ['stef', 'cas', 'twan', 'jelle', 'lex', 'stef', 'cas', 'twan', 'jelle', 'lex', 'stef', 'cas', 'twan', 'jelle', 'lex']
];

const slotTasks = [
  ['doe een backflip', 'lik een neger', 'neuk een neger', 'bef een neger', 'doe een backflip', 'lik een neger', 'neuk een neger', 'bef een neger', 'doe een backflip', 'lik een neger', 'neuk een neger', 'bef een neger', 'doe een backflip', 'lik een neger', 'neuk een neger', 'bef een neger'],
];

function createSymbolElement(symbol) {
  const div = document.createElement('div');
  div.classList.add('symbol');
  div.textContent = symbol;
  return div;
}

function spin() {
  spinSlot1();
  spinSlot2();

  if (spun) {
    rotateHandleImage();
  }
}

function rotateHandleImage(){
  const handle = document.querySelector('.handle-image');
  handle.classList.add('rotate');
  setTimeout(function(){
    handle.classList.remove('rotate');
  }, 1000);
}

let spun = false;
function spinSlot1() {
  if (spun) {
    reset();
  }
  const slots = document.querySelectorAll('.slot1');
  let completedSlots = 0;

  slots.forEach((slot, index) => {
    const symbols = slot.querySelector('.symbols1');
    const symbolHeight = symbols.querySelector('.symbol')?.clientHeight;
    const symbolCount = symbols.childElementCount;

    symbols.innerHTML = '';

    symbols.appendChild(createSymbolElement('Gast'));

    for (let i = 0; i < 3; i++) {
      slotNames[index].forEach(symbol => {
        symbols.appendChild(createSymbolElement(symbol));
      });
    }

    const totalDistance = symbolCount * symbolHeight;
    const randomOffset = -Math.floor(Math.random() * (symbolCount - 1) + 1) * symbolHeight;
    symbols.style.top = `${randomOffset}px`;

    symbols.addEventListener('transitionend', () => {
      completedSlots++;
      if (completedSlots === slots.length) {
        logDisplayedSymbols();
      }
    }, { once: true });
  });
}

function spinSlot2() {
  if (spun) {
    reset();
  }
  const slots = document.querySelectorAll('.slot2');
  let completedSlots = 0;

  slots.forEach((slot, index) => {
    const symbols = slot.querySelector('.symbols2');
    const symbolHeight = symbols.querySelector('.symbol')?.clientHeight;
    const symbolCount = symbols.childElementCount;

    symbols.innerHTML = '';

    symbols.appendChild(createSymbolElement('Opdracht'));

    for (let i = 0; i < 3; i++) {
      slotTasks[index].forEach(symbol => {
        symbols.appendChild(createSymbolElement(symbol));
      });
    }

    const totalDistance = symbolCount * symbolHeight;
    const randomOffset = -Math.floor(Math.random() * (symbolCount - 1) + 1) * symbolHeight;
    symbols.style.top = `${randomOffset}px`;

    symbols.addEventListener('transitionend', () => {
      completedSlots++;
      if (completedSlots === slots.length) {
        logDisplayedSymbols();
      }
    }, { once: true });
  });

  spun = true;
}

function reset() {
  const slots = document.querySelectorAll('.slot');

  slots.forEach(slot => {
    const symbols = slot.querySelector('.symbols');
    symbols.style.transition = 'none';
    symbols.style.top = '0';
    symbols.offsetHeight;
    symbols.style.transition = '';
  });
}

function logDisplayedSymbols() {
  const slots = document.querySelectorAll('.slot');
  const displayedSymbols = [];

  slots.forEach((slot, index) => {
    const symbols = slot.querySelector('.symbols');
    const symbolIndex = Math.floor(Math.abs(parseInt(symbols.style.top, 10)) / slot.clientHeight) % slotNames[index].length;
    const displayedSymbol = slotNames[index][symbolIndex];
    displayedSymbols.push(displayedSymbol);
  });

  console.log(displayedSymbols);
}

spin();