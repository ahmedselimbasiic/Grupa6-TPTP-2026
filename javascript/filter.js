(function () { // Selektujemo sve dugmiće, kartice, naslove semestara i gridove
  const buttons = document.querySelectorAll('.pred-filter-btn');
  const cards = document.querySelectorAll('.pred-card');
  const semTitles = document.querySelectorAll('.sem-title');
  const grids = document.querySelectorAll('.pred-grid');

  function filterCards(category) { // Prikaži ili sakrij kartice na osnovu kategorije
    cards.forEach(function (card) { // Ako je kategorija "sve" ili se poklapa sa karticom, prikaži je, inače sakrij
      if (category === 'sve' || card.dataset.category === category) { 
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });

    // Sakrij naslov semestra i grid ako nema vidljivih kartica u njemu
    grids.forEach(function (grid, i) { // Provjeri koliko kartica nije sakriveno u ovom gridu
      var visible = grid.querySelectorAll('.pred-card:not(.hidden)').length;
      if (visible === 0) { // Ako nema vidljivih kartica, sakrij grid i naslov semestra
        grid.classList.add('sem-hidden');
        if (semTitles[i]) semTitles[i].classList.add('sem-hidden');
      } else { // Inače, prikaži grid i naslov semestra
        grid.classList.remove('sem-hidden');
        if (semTitles[i]) semTitles[i].classList.remove('sem-hidden');
      }
    });
  }

  buttons.forEach(function (btn) { // Dodaj event listener na svaki dugmić
    btn.addEventListener('click', function () { // Ukloni "active" klasu sa svih dugmića, dodaj je samo na kliknuti dugmić i filtriraj kartice
      buttons.forEach(function (b) { b.classList.remove('active'); }); // Ukloni "active" klasu sa svih dugmića
      btn.classList.add('active'); // Filtriraj kartice na osnovu data-filter atributa dugmića 
      filterCards(btn.dataset.filter);
    });
  });
})();