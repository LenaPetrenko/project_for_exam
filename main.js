let areas = {
    centr: ["Арбат", "Басманный район", "Замоскворечье", "Красносельский район", "Мещанский район", "Пресненский район", "Таганский район", "Тверской район", "Хамовники", "Якиманка"],
    north: ["Аэропорт", "Беговой", "Бескудниковский район", "Войковский район", "Восточное Дегунино", "Головинский район","Дмитровский район","Западное Дегунино","Коптево","Левобережный","Молжаниновский район","Савёловский район","Сокол","Тимирязевский район","Ховрино","Хорошёвский район"],
    westnorth: ["Алексеевский район", "Алтуфьевский район","Бабушкинский район","Бибирево","Бутырский район","Лианозово","Лосиноостровский район","Марфино","Марьина роща","Останкинский район","Отрадное","Ростокино","Свиблово","Северный","Северное Медведково","Южное Медведково","Ярославский район"],
    southwest: ["Выхино-Жулебино", "Капотня","Кузьминки","Лефортово","Люблино","Марьино","Некрасовка","Нижегородский район","Печатники","Рязанский район","Текстильщики","Южнопортовый район"],
    south: ["Бирюлёво Восточное", "Бирюлёво Западное","Братеево","Даниловский район","Донской район","Зябликово","Москворечье-Сабурово","Нагатино-Садовники","Нагатинский Затон","Нагорный район","Орехово-Борисово Северное","Орехово-Борисово Южное","Царицыно","Чертаново Северное","Чертаново Центральное","Чертаново Южное"],
    eastsouth: ["Академический районг", "Гагаринский район","Зюзино","Коньково","Котловка","Ломоносовский район","Обручевский район","Северное Бутово","Тёплый Стан","Черёмушки","Южное Бутово","Ясенево"],
    east: ["Внуково", "Дорогомилово","Крылатское","Кунцево","Можайский район","Ново-Переделкино","Очаково-Матвеевское","Проспект Вернадского","Раменки","Солнцево","Тропарёво-Никулино","Филёвский Парк","Фили-Давыдково"],
    west: ["Богородское", "Вешняки","Восточный","Восточное Измайлово","Гольяново","Ивановское","Измайлово","Косино-Ухтомский","Метрогородок","Новогиреево","Новокосино","Перово","Преображенское","Северное Измайлово","Соколиная Гора","Сокольники"],
    eastnorth: ["Куркино", "Митино","Покровское-Стрешнево","Северное Тушино","Строгино","Хорошёво-Мнёвники","Щукино","Южное Тушино"],
    zelenogradsky: ["Матушкино", "Савёлки","Старое Крюково","Силино","Крюково"],
    anything: ["Любой","Арбат", "Басманный район", "Замоскворечье", "Красносельский район", "Мещанский район", "Пресненский район", "Таганский район", "Тверской район", "Хамовники", "Якиманка", "Аэропорт", "Беговой", "Бескудниковский район", "Войковский район", "Восточное Дегунино", "Головинский район","Дмитровский район","Западное Дегунино","Коптево","Левобережный","Молжаниновский район","Савёловский район","Сокол","Тимирязевский район","Ховрино","Хорошёвский район" ,"Алексеевский район", "Алтуфьевский район","Бабушкинский район","Бибирево","Бутырский район","Лианозово","Лосиноостровский район","Марфино","Марьина роща","Останкинский район","Отрадное","Ростокино","Свиблово","Северный","Северное Медведково","Южное Медведково","Ярославский район", 
    "Выхино-Жулебино", "Капотня","Кузьминки","Лефортово","Люблино","Марьино","Некрасовка","Нижегородский район","Печатники","Рязанский район","Текстильщики","Южнопортовый район", 
    "Бирюлёво Восточное", "Бирюлёво Западное","Братеево","Даниловский район","Донской район","Зябликово","Москворечье-Сабурово","Нагатино-Садовники","Нагатинский Затон","Нагорный район","Орехово-Борисово Северное","Орехово-Борисово Южное","Царицыно","Чертаново Северное","Чертаново Центральное","Чертаново Южное", "Академический районг", "Гагаринский район","Зюзино","Коньково","Котловка","Ломоносовский район","Обручевский район","Северное Бутово","Тёплый Стан","Черёмушки","Южное Бутово","Ясенево", 
    "Внуково", "Дорогомилово","Крылатское","Кунцево","Можайский район","Ново-Переделкино","Очаково-Матвеевское","Проспект Вернадского","Раменки","Солнцево","Тропарёво-Никулино","Филёвский Парк","Фили-Давыдково", 
    "Богородское", "Вешняки","Восточный","Восточное Измайлово","Гольяново","Ивановское","Измайлово","Косино-Ухтомский","Метрогородок","Новогиреево","Новокосино","Перово","Преображенское","Северное Измайлово","Соколиная Гора","Сокольники", "Куркино", "Митино","Покровское-Стрешнево","Северное Тушино","Строгино","Хорошёво-Мнёвники","Щукино","Южное Тушино", "Матушкино", "Савёлки","Старое Крюково","Силино","Крюково"]
   
                                                                                                                      
  };
 let District = document.getElementById("District");
 let area = document.querySelector("#area");
  window.onload = selectDistrict;
  District.onchange = selectDistrict;
 
  
  function selectDistrict(ev){
    area.innerHTML = "";
  let c = this.value || "centr", o;
    for(let i = 0; i < areas[c].length; i++){
      o = new Option(areas[c][i],i,false,false);
      area.add(o);
    };
  }
  