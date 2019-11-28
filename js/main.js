const startingDate = new Date(2019, 10, 15);

var startViewDate = new Date();

const people = {
    "Калюжна Надія": {'index': 1, 'my': 1},
    "Кононенко Ольга": {'index': 2, 'my': 3},
    "Косик Оксана": {'index': 3, 'my': 5},
    "Вірста Галина": {'index': 4, 'my': 7},
    "Вірста Ольга": {'index': 5, 'my': 9},
    "Ковдрин Тетяна": {'index': 6, 'my': 11},
    'Піговський Юрій': {'index': 7, 'my': 13},
    "Кушплер Богдан": {'index': 8, 'my': 15},
    "Тишківська Галина": {'index': 9, 'my': 17},
    "Міненко Наталія": {'index': 10, 'my': 19},
    "Гордійчук Оксана": {'index': 11, 'my': 1},
    "Плитус Ганна": {'index': 12, 'my': 3},
    "Кукурудз Оксана": {'index': 13, 'my': 5},
    "Пенцко Надія": {'index': 14, 'my': 7},
    "Попович Галинка": {'index': 15, 'my': 9},
    "Підвишенна Тетяна": {'index': 16, 'my': 11},
    "Семенець Артем": {'index': 17, 'my': 13},
    "Семенець Оксана": {'index': 18, 'my': 15},
    "Питлюк Олександра": {'index': 19, 'my': 17},
    "Юрків Віктор": {'index': 20, 'my': 19}
}

function isPsaltyrDay(currentDate) {
    return currentDate.getDay() == 1 || 
    currentDate.getDay() == 3 ||
    currentDate.getDay() == 5;
}

function katyzmaIndex() {
    var katyzma = 0;
    if (startViewDate.getTime() > startingDate.getTime()) {
        var currentDate = nextDay(startingDate);
        while(currentDate.getTime() <= startViewDate.getTime()) {
            if (isPsaltyrDay(currentDate)) {
                katyzma=(katyzma+1) % 20; 
            }
            currentDate = nextDay(currentDate);
        }
    } else if (startViewDate.getTime() < startingDate.getTime()) {
        var currentDate = startingDate;
        while(currentDate.getTime() >= startViewDate.getTime()) {
            if (isPsaltyrDay(currentDate)) {
                katyzma=(katyzma-1) % 20;
                if (katyzma < 0) {
                    katyzma = 20 + katyzma;
                }
            }
            currentDate = addDays(currentDate, -1);
        }
    }
    return katyzma;
}

function back() {
    startViewDate = addDays(startViewDate, -15);
    show();
}

function forth() {
    startViewDate = addDays(startViewDate, 15);
    show();
}

function init() {
    show();
    document.getElementById('back').onclick = back;
    document.getElementById('forth').onclick = forth;
}

function show() {
    const table = document.getElementById('table');
    var content = '<tr><td>Особа</td>';
    const endViewDate = addDays(startViewDate, 30);
    var currentDate = startViewDate;
    while (currentDate.getTime() <= endViewDate.getTime()) {
        content += '<td>' + formatDate(currentDate) + '</td>';
        currentDate = nextDay(currentDate);
    }
    content += '</tr>';
    cachedKatyzmaIndex = katyzmaIndex();
    for (person in people) {
        content += '<tr><td>' + person + "</td>";
        var currentDate = startViewDate;
        var katyzma = (cachedKatyzmaIndex + people[person].index-1) % 20;
        while (currentDate.getTime() <= endViewDate.getTime()) {
            if (isPsaltyrDay(currentDate)) {
                katyzma=(katyzma+1) % 20;
                if (katyzma == people[person].my-1) {
                    content += "<td bgcolor='yellow'>";
                } else {
                    content += '<td>';
                }
                content += (katyzma+1) + '</td>';
            } else {
                content += '<td>x</td>'
            }
            currentDate = nextDay(currentDate);
        }
        content += '</tr>';
    }
    table.innerHTML = content;
}

function nextDay(currentDate) {
    return addDays(currentDate, 1);
}

function addDays(currentDate, days) {
    return new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + days
        );
}

function formatDate(date) {
    const monthNames = [
      "січня", "лютого", "березня",
      "квітня", "травня", "червня", "липня",
      "серпня", "вересня", "жовтня",
      "листопада", "грудня"
    ];
  
    const weekDays = [
        "НД", 'ПН', "ВТ", "СР", "ЧТ", "ПТ", "СБ"
    ]

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year + 
        ' (' + weekDays[date.getDay()] + ')';
  }
