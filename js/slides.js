/*
 * Данные презентации. Слайд кейса = объект type: 'case' со своей темой.
 * Движок (js/deck.js) строит все слайды по единой структуре.
 * Факты (facts) берутся только из /workspace/portfolio/projects.md — источник указан в комментарии.
 */
window.DECK = {
  title: 'Павел Анцибор. Портфолио',
  glimpses: ['problemomer', 'calculator', 'partner', 'eslavia-site', 'sfera', 'orbita', 'crm'],
  slides: [
    {
      type: 'cover', id: 'cover',
      theme: { bgA: '#f0f2ef', bgB: '#e5e9e5', bgC: '#dde3de', ink: '#0f1d18', muted: '#4f5e58', accent: '#01644f', band: '#0f1d18',
               chrome: '#0f1d18', chromeBg: 'rgba(240,242,239,.82)' },
      name: ['Павел', 'Анцибор'],
      sub: 'Делаю сайты и онлайн-сервисы для бизнеса. Здесь семь проектов, которые уже работают',
      hint: 'Листайте стрелками, кликом или свайпом',
      columns: [
        ['problemomer', 'eslavia-site', 'crm', 'calculator'],
        ['partner', 'sfera', 'orbita', 'eslavia-app'],
        ['calculator', 'crm', 'problemomer', 'sfera']
      ]
    },
    {
      type: 'case', id: 'problemomer',
      theme: { bgA: '#0f6b55', bgB: '#05382b', bgC: '#03241c', ink: '#ffffff', muted: '#b9d8cb', accent: '#2fd07f', band: '#8be6c6',
               chrome: '#e3f3ec', chromeBg: 'rgba(3,36,28,.55)', screenBg: '#f4f7f6',
               fontTitle: "'Geometria'", fontText: "'Geometria'", titleWeight: 800 },
      logo: { src: 'assets/img/logo-multiframe.png', alt: 'MultiFrame', height: 44 },
      title: ['Проблемомер', 'MultiFrame'],
      what: 'Онлайн-тест: насколько тише станет комната после звукоизоляции потолка',
      rows: [
        ['Задача', 'Выбирая натяжной потолок, о шуме сверху почти не думают. А эффект звукоизоляции до монтажа не увидеть'],
        ['Решение', 'Семь простых вопросов о комнате. В ответ «на сколько процентов тише» и звук «до» и «после»'],
        ['Результат', 'Клиент сам слышит разницу и с PDF-отчётом идёт в калькулятор или на консультацию']
      ],
      who: 'Для покупателей натяжных потолков, без регистрации',
      url: 'stp-multiframe.ru/problemomer',                // projects.md, стр. 98
      device: {
        laptop: { video: 'assets/video/problemomer.mp4', poster: 'assets/video/problemomer.jpg', label: 'Проблемомер на компьютере' },
        phone:  { video: 'assets/video/problemomer-phone.mp4', poster: 'assets/video/problemomer-phone.jpg', label: 'Проблемомер на телефоне' }
      }
    },
    {
      type: 'case', id: 'calculator', decor: 'grid',
      theme: { bgA: '#ffffff', bgB: '#f4f7f6', bgC: '#e8eeeb', ink: '#111111', muted: '#4f5b62', accent: '#01644f', band: '#01644f',
               chrome: '#111111', chromeBg: 'rgba(255,255,255,.8)', screenBg: '#f4f7f6',
               fontTitle: "'Manrope'", fontText: "'Manrope'", titleWeight: 800, frame: 'light' },
      logo: { src: 'assets/img/logo-multiframe-green.png', alt: 'MultiFrame', height: 44 },
      title: ['Калькулятор', 'MultiFrame'],
      what: 'Онлайн-калькулятор: сколько панелей MultiFrame нужно на потолок или стены и как их уложить',
      rows: [
        ['Задача', 'Посчитать панели вручную для комнаты сложной формы, с окнами и дверями, долго и легко ошибиться'],
        ['Решение', 'Мастер из пяти шагов: форма комнаты, высота, окна и двери. Схема укладки с подрезками строится сама'],
        ['Результат', 'Число панелей, смета и схема в PDF за один заход. Расчётом можно поделиться ссылкой']
      ],
      who: 'Для клиентов и партнёров StP',
      url: 'stp-multiframe.ru/calc',                                       // projects.md, стр. 15
      device: { laptop: { video: 'assets/video/calculator.mp4', poster: 'assets/video/calculator.jpg', label: 'Калькулятор MultiFrame' } }
    },
    {
      type: 'case', id: 'partner',
      theme: { bgA: '#01644f', bgB: '#032e25', bgC: '#021f19', ink: '#ffffff', muted: '#b7d6cb', accent: '#8be6c6', band: '#8be6c6',
               chrome: '#d8efe6', chromeBg: 'rgba(2,31,25,.55)', screenBg: '#f4f7f6',
               fontTitle: "'Geometria'", fontText: "'Geometria'", titleWeight: 800 },
      logo: { src: 'assets/img/logo-multiframe.png', alt: 'MultiFrame', height: 44 },
      title: ['Кабинет партнёра', 'MultiFrame'],
      what: 'Рабочий кабинет для компаний, которые продают и монтируют MultiFrame',
      rows: [
        ['Задача', 'Владелец, менеджер, замерщик и монтажник работают с одним проектом, а StP видит всю сеть'],
        ['Решение', 'Свой экран для каждой роли. В проекте комнаты, Проблемомер, калькулятор и календарь замеров'],
        ['Результат', 'Смета и КП собираются автоматически. Есть обучение с тренажёром и воронка продаж']
      ],
      who: 'Для партнёров StP и их команд',
      url: 'partner.stp-multiframe.ru/cabinet',                             // projects.md, стр. 14
      device: { laptop: { video: 'assets/video/partner.mp4', poster: 'assets/video/partner.jpg', label: 'Кабинет партнёра, демо-данные' } }
    },
    {
      type: 'case', id: 'eslavia',
      theme: { bgA: '#fffcfa', bgB: '#f8efeb', bgC: '#efe3de', ink: '#3d2f2c', muted: '#7a6662', accent: '#60413d', band: '#60413d',
               chrome: '#3d2f2c', chromeBg: 'rgba(255,252,250,.82)', screenBg: '#faf8f6',
               fontTitle: "'Cormorant Garamond'", fontText: "'Manrope'", titleWeight: 500, titleSize: 150, titleTracking: '-0.02em', frame: 'light' },
      logo: { src: 'assets/img/logo-eslavia.svg', alt: 'Эславия', height: 52 },
      title: ['Эславия'],
      what: 'Сайт-каталог женского трикотажа для оптовых и розничных покупателей',
      rows: [
        ['Задача', 'Покупателю нужно быстро найти модели своего размера и понять цену'],
        ['Решение', 'Каталог на 98 моделей с фильтрами по категориям и размерам, удобный и с телефона'],
        ['Результат', 'Розничные цены видны сразу, оптовый прайс по запросу, заказ прямо из карточки модели']
      ],
      who: 'Самовывоз: Иваново и Кохма',
      url: 'eslavia.ru',                                   // projects.md, стр. 137
      device: {
        laptop: { video: 'assets/video/eslavia-site.mp4', poster: 'assets/video/eslavia-site.jpg', label: 'Сайт eslavia.ru' },
        phone:  { video: 'assets/video/eslavia-app.mp4', poster: 'assets/video/eslavia-app.jpg', label: 'Каталог на телефоне' }
      }
    },
    {
      type: 'case', id: 'sfera', decor: 'tape',
      tape: ['контент', 'продакшн', 'трафик', 'спецпроекты', 'стратегия'],   // слова с ленты на smmsfera.ru
      theme: { bgA: '#c22b36', bgB: '#8a1b23', bgC: '#4a0d12', ink: '#ffffff', muted: '#f3c9cc', accent: '#ffdc7e', band: '#ffdc7e',
               chrome: '#fff1f1', chromeBg: 'rgba(74,13,18,.55)', screenBg: '#f4efe9',
               fontTitle: "'Unbounded'", fontText: "'Inter'", titleWeight: 800, titleSize: 116, titleTracking: '-0.03em' },
      logo: { src: 'assets/img/logo-sfera.webp', alt: 'СММ Сфера', height: 92 },
      title: ['СММ Сфера'],
      what: 'Сайт агентства, которое ведёт соцсети бизнеса',
      rows: [
        ['Задача', 'По сайту должно быть сразу понятно, что агентство делает, сколько это стоит и как оставить заявку'],
        ['Решение', 'Яркий сайт в духе «секретных операций»: услуги, цены, кейсы и форма заявки'],
        ['Результат', 'Сайт работает на своём домене с сентября 2026, заявки приходят агентству на почту']
      ],
      who: 'ВКонтакте, Telegram, съёмка, таргет, отчёты',
      url: 'smmsfera.ru',                                                  // projects.md, стр. 175
      device: { laptop: { video: 'assets/video/sfera.mp4', poster: 'assets/video/sfera.jpg', label: 'Сайт smmsfera.ru' } }
    },
    {
      type: 'case', id: 'orbita', decor: 'tape', tapeRows: 1,
      tape: ['контент в систему', 'аудиторию в клиентов'],   // лента на smmorbita.ru, projects.md стр. 228
      theme: { bgA: '#1f2a3d', bgB: '#161a21', bgC: '#121212', ink: '#f4f4eb', muted: '#b4b4ad', accent: '#f4d970', band: '#5395e9',
               chrome: '#f4f4eb', chromeBg: 'rgba(20,20,20,.6)', screenBg: '#141414',
               fontTitle: "'Unbounded'", fontText: "'Inter'", titleWeight: 800, titleSize: 116, titleTracking: '-0.03em', tape1: '#f4d970', tapeInk1: '#141414' },
      logo: { src: 'assets/img/logo-orbita.webp', alt: 'СММ Школа', height: 100 },
      title: ['СММ Орбита'],
      what: 'Закрытая онлайн-школа агентства: уроки и материалы для учеников',
      rows: [
        ['Задача', 'Ученикам нужен один вход ко всем урокам. Преподавателю нужно решать, кто какие уроки видит'],
        ['Решение', 'Кабинет ученика: презентация, лекция, видео и методичка к уроку. Кабинет преподавателя с ролями'],
        ['Результат', 'Материалы открываются только по личному входу. Учеников и уроки преподаватель добавляет сам']
      ],
      who: 'Для учеников и преподавателей школы',
      url: 'smmorbita.ru',                                 // projects.md, стр. 206
      device: { laptop: { video: 'assets/video/orbita.mp4', poster: 'assets/video/orbita.jpg', label: 'Урок в СММ Школе' } }
    },
    {
      type: 'case', id: 'crm',
      theme: { bgA: '#ffffff', bgB: '#f5f6f5', bgC: '#e6ebe7', ink: '#23332f', muted: '#59635e', accent: '#204f42', band: '#133e35',
               chrome: '#23332f', chromeBg: 'rgba(255,255,255,.8)', screenBg: '#f5f6f5',
               fontTitle: "'Onest'", fontText: "'Onest'", titleWeight: 700, titleSize: 124, frame: 'light' },
      logo: { src: 'assets/img/icon-crm-192.png', alt: '', height: 56, text: 'СММ CRM' },
      title: ['CRM СММ'],
      what: 'Рабочая платформа агентства: проекты, контент-план, задачи и команда в одном месте',
      rows: [
        ['Задача', 'Публикации для многих клиентов нужно планировать и согласовывать, ничего не упуская'],
        ['Решение', 'Контент-план по месяцам, неделям и дням, два согласования, задачи, аналитика и роли команды'],
        ['Результат', 'Правка после проверки сама сбрасывает согласование, и непроверенный текст не уходит в работу']
      ],
      who: 'Для владельца, руководителей и SMM-специалистов',
      url: 'crm-smmsfera.ru',                              // projects.md, стр. 238
      device: { laptop: { video: 'assets/video/crm.mp4', poster: 'assets/video/crm.jpg', label: 'Контент-план в CRM' } }
    },
    {
      type: 'contacts', id: 'contacts',
      theme: { bgA: '#16302a', bgB: '#0f1f1b', bgC: '#0a1512', ink: '#f0f2ef', muted: '#a9bab3', accent: '#8be6c6', band: '#f0f2ef',
               chrome: '#f0f2ef', chromeBg: 'rgba(10,21,18,.6)' },
      title: 'Контакты',
      name: 'Павел Анцибор',
      rows: [
        { label: 'Телефон', value: '+7 910 997-33-01', href: 'tel:+79109973301' },
        { label: 'Почта', value: 'Pavel_antsibor@vk.com', href: 'mailto:Pavel_antsibor@vk.com' },
        { label: 'Город', value: 'Иваново' }
      ],
      columns: [
        ['crm', 'orbita', 'partner', 'eslavia-site'],
        ['sfera', 'calculator', 'problemomer', 'crm'],
        ['eslavia-app', 'partner', 'sfera', 'orbita']
      ]
    }
  ]
};
