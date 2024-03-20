//Scrivo una funzione che mi dia un numero di goal tra 0 e 5
function generateRandomGoals() {
  let max = 5;
  let min = 0;
  return parseInt(Math.random() * (max - min) + min)
}

//Dichiaro i punteggi delle partite
const winScore = 3;
const tieScore = 1;

//Genero un array di stringhe con i nomi delle squadre che voglio generare
const teamsNames = ['Inter', 'Milan', 'Juventus', 'Bologna', 'Roma', 'Atalanta', 'Napoli', 'Fiorentina', 'Lazio', 'Monza', 'Torino', 'Genoa', 'Lecce', 'Udinese', 'Verona', 'Cagliari', 'Empoli', 'Frosinone', 'Sassuolo', 'Salernitana']

//Creo l'array vuoto da popolare
let teams = [];

//Ciclo l'array per generare oggetti e pusharli in un array
//Accedo ad un elemento dell'array
teamsNames.forEach( (currentElement) => {
  //Creo un oggetto che abbia come nome dell'oggetto la stringa dell'array e come valore della proprieta' name quella stessa stringa, poi genero gli altri valori con le funzioni
  const teamObject = {
    name: currentElement,
    score: 0,
    wins: 0,
    ties: 0,
    losses: 0,
    goalsScored: 0,
    goalsTaken: 0,
    get goalsDifference() {
      return this.goalsScored - this.goalsTaken
    }
    }
    //Pusho l'oggetto creato nell'array di oggetti
  teams.push(teamObject);
});

//Devo far giocare ogni squadra con ogni altra squadra due volte ma non chi ha gia' giocato
let gamesTotal = 0;

//Creo un ciclo dove una squadra gioca una volta (andata) contro ogni squadra che viene dopo di essa nell'array, tranne l'ultima
for (let i = 0; i < teams.length - 1; i++) {
  //Genero la squadra in casa e la squadra fuori casa
  let homeTeam = teams[i];
  let gamesPlayedByTeam = 0;
  //Creo un ciclo dove ogni squadra gioca contro le successive
  for (let i2 = i; i2 < teams.length - 1; i2++) {
      let awayTeam = teams[i2 +1];
      //Assegno un numero di goal casuali ad entrambe le squadre
      const homeTeamGoals = generateRandomGoals();
      const awayTeamGoals = generateRandomGoals();
      //Aumento i goal fatti
      homeTeam.goalsScored += homeTeamGoals;
      awayTeam.goalsScored += awayTeamGoals;
      //Aumento i goal subiti
      homeTeam.goalsTaken += awayTeamGoals;
      awayTeam.goalsTaken += homeTeamGoals
      //Assegno i punteggi di vittoria
      if (homeTeamGoals > awayTeamGoals) {
        homeTeam.wins++;
        homeTeam.score += winScore;
        awayTeam.losses++;
      } else if (homeTeamGoals < awayTeamGoals) {
        homeTeam.losses++;
        awayTeam.score += winScore;
        awayTeam.wins++;
      } else {
        homeTeam.ties++;
        homeTeam.score += tieScore;
        awayTeam.ties++;
        awayTeam.score += tieScore;
      }
      gamesPlayedByTeam++
      gamesTotal++
      console.log(`${gamesTotal}) Squadra: La partita di andata ${homeTeam.name} - ${awayTeam.name} finisce ${homeTeamGoals} - ${awayTeamGoals}`);
  }
}

//Creo un ciclo dove una squadra gioca una volta (ritorno) contro ogni squadra che viene dopo di essa nell'array, tranne l'ultima
for (let i = 0; i < teams.length - 1; i++) {
  //Genero la squadra in casa e la squadra fuori casa
  let homeTeam = teams[i];
  let gamesPlayedByTeam = 0;
  //Creo un ciclo dove ogni squadra gioca contro le successive
  for (let i2 = i; i2 < teams.length - 1; i2++) {
      let awayTeam = teams[i2 +1];
      //Assegno un numero di goal casuali ad entrambe le squadre
      const homeTeamGoals = generateRandomGoals();
      const awayTeamGoals = generateRandomGoals();
      //Aumento i goal fatti
      homeTeam.goalsScored += homeTeamGoals;
      awayTeam.goalsScored += awayTeamGoals;
      //Aumento i goal subiti
      homeTeam.goalsTaken += awayTeamGoals;
      awayTeam.goalsTaken += homeTeamGoals
      //Assegno i punteggi di vittoria
      if (homeTeamGoals > awayTeamGoals) {
        homeTeam.wins++;
        homeTeam.score += winScore;
        awayTeam.losses++;
      } else if (homeTeamGoals < awayTeamGoals) {
        homeTeam.losses++;
        awayTeam.score += winScore;
        awayTeam.wins++;
      } else {
        homeTeam.ties++;
        homeTeam.score += tieScore;
        awayTeam.ties++;
        awayTeam.score += tieScore;
      }
      gamesPlayedByTeam++
      gamesTotal++
      console.log(`${gamesTotal}) Squadra: La partita di ritorno ${awayTeam.name} - ${homeTeam.name} finisce ${awayTeamGoals} - ${homeTeamGoals}`);
  }
}

//Stampare in pagina oltre che in console
//Dichiaro il container dove inserire il contenuto generato
const containerDomElement = document.querySelector(`.container`);

//Genero la tabella dove inserire le varie righe
const tableElement = document.createElement(`table`);
tableElement.className = `table table-striped text-center w-auto mx-auto mt-5`

//Genero la riga degli header e la appendo alla tabella generata prima
const tableHeader = document.createElement('thead');
tableHeader.innerHTML = `
  <tr>
    <th scope="col" class="px-3">Posizione</th>
    <th scope="col" class="px-3">Squadra</th>
    <th scope="col" class="px-3">Punti</th>
    <th scope="col" class="px-3">Vittorie</th>
    <th scope="col" class="px-3">Pareggi</th>
    <th scope="col" class="px-3">Sconfitte</th>
    <th scope="col" class="px-3">Gol Fatti</th>
    <th scope="col" class="px-3">Gol Subiti</th>
    <th scope="col" class="px-3">Differenza Reti</th>
  </tr>
`;
tableElement.append(tableHeader);

//Metto in ordine l'array per punteggio
/* teams.sort( (a, b) => b.score - a.score); */

//Metto in ordine l'array per punteggio o in caso di pareggio per differenza reti
teams.sort( (a, b) => {
  if (b.score > a.score) {
    return 1;
  } else if (b.score < a.score) {
    return -1;
  }
  if (b.goalsDifference > a.goalsDifference) {
    return 1;
  } else if (b.goalsDifference < a.goalsDifference) {
    return -1;
  } else return 0;
});

//Creo l'elemento tbody
const tableBody = document.createElement('tbody')

//Ciclo l'array di oggetti e riempio la tabella
teams.forEach( (currentElement, i) => {
  const currentElementRow = document.createElement(`tr`);
  currentElementRow.innerHTML = `
    <th scope="row">${i +1}</td>
    <td>${currentElement.name}</td>
    <th>${currentElement.score}</td>
    <td>${currentElement.wins}</td>
    <td>${currentElement.ties}</td>
    <td>${currentElement.losses}</td>
    <td>${currentElement.goalsScored}</td>
    <td>${currentElement.goalsTaken}</td>
    <td>${currentElement.goalsDifference}</td>
  `;
  tableBody.append(currentElementRow);
});

tableElement.append(tableBody);

//Appendo la tabella al container
containerDomElement.append(tableElement)