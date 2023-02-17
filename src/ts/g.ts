/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

function summarizeJumpLenghts(jumpings: number[]): number {
  return jumpings.reduce((previousJump: number, currentJump: number) => {
    return previousJump + currentJump;
  });
}

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

class Student {
  constructor(
    public name: string,
    public handedInOnTime: boolean,
    public passed: boolean
  ) {}
}

const STUDENT_NAME = 'Sebastian';

function checkSebastianGrades(student: Student): string {
  if (
    student.name == STUDENT_NAME &&
    student.passed == true &&
    student.handedInOnTime == true
  ) {
    return 'VG';
  }
  return 'IG';
}

/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */
class MeasureData {
  constructor(public city: string, public when: Date, public temp: number) {}
}

const DAYS_IN_WEEK = 7;
const WEEK_IN_MS = 604800000;
const CITY = 'Stockholm';

function getWeeklyTemperature(temperature: MeasureData[]) {
  let sumOfTemperatures = 0;

  for (let i = 0; i < temperature.length; i++) {
    if (
      temperature[i].city === CITY &&
      temperature[i].when.getTime() > Date.now() - WEEK_IN_MS
    ) {
      sumOfTemperatures += temperature[i].temp;
    }
  }
  calculateAverageTemp(sumOfTemperatures);
}

function calculateAverageTemp(sumOfTemperatures: number) {
  return sumOfTemperatures / DAYS_IN_WEEK;
}

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */
class Product {
  constructor(
    public name: string,
    public price: number,
    public image: string
  ) {}
}

function renderProductToHtml(product: Product[]) {
  let container = document.createElement('div');
  document.body.appendChild(container);

  for (let i = 0; i < product.length; i++) {
    renderNameElement(product, i, container);
    renderPriceElement(product, i, container);
    renderImgElement(product, i, container);
  }
}

function renderImgElement(
  product: Product[],
  i: number,
  container: HTMLDivElement
) {
  let imgValue = document.createElement('img');
  imgValue.innerHTML = product[i].image;
  container.appendChild(imgValue);
}

function renderPriceElement(
  product: Product[],
  i: number,
  container: HTMLDivElement
) {
  let priceValue = document.createElement('strong');
  priceValue.innerHTML = product[i].price.toString();
  container.appendChild(priceValue);
}

function renderNameElement(
  product: Product[],
  i: number,
  container: HTMLDivElement
) {
  let nameValue = document.createElement('h4');
  nameValue.innerHTML = product[i].name;
  container.appendChild(nameValue);
}

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */

function renderStudentsToHtml(students: Student[]) {
  let listOfStudents;
  let container = document.createElement('li');
  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  container.appendChild(checkbox);

  for (let i = 0; i < students.length; i++) {
    if (students[i].handedInOnTime == true) {
      checkbox.checked = true;
      listOfStudents = document.querySelector('ul#passedstudents');
    } else {
      checkbox.checked = false;
      listOfStudents = document.querySelector('ul#failedstudents');
    }
    listOfStudents?.appendChild(container);
  }
}

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */
const texts: string[] = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'];

function joinTexts(texts: string[]) {
  return texts.join(' ');
}

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/
class UserData {
  constructor(
    public name: string,
    public birthday: Date,
    public email: string,
    public password: string
  ) {}
}

const REQ_AGE = 20;
const DENIED = 'Du är under 20 år';

function validateAge(userData: UserData) {
  let ageDiff = Date.now() - userData.birthday.getFullYear();
  let ageDate = new Date(ageDiff);
  let userAge = Math.abs(
    ageDate.getUTCFullYear() - userData.birthday.getFullYear()
  );

  if (userAge >= REQ_AGE) {
    createUser(userData);
  }
  return DENIED;
}

function createUser(userData: UserData) {}
