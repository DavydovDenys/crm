// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import * as bootstrap from "bootstrap"

let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))  
let popoverList = popoverTriggerList.map(function (popoverTriggerEl) {  
  return new bootstrap.Popover(popoverTriggerEl)  
})

console.log('Hello! from application.js')

// --- Логика для автоматического скрытия флеш-сообщений с прогресс-баром ---
// function setupFlashMessages() {
//   const flashMessages = document.querySelectorAll('.flash-message');
//   const duration = 50000; // Продолжительность отображения сообщения в миллисекундах (5 секунд)
//   const fadeOutDuration = 500; // Продолжительность анимации исчезновения (0.5 секунды), должна совпадать с CSS transition

//   flashMessages.forEach(message => {
//     const progressBar = message.querySelector('.progress-bar');
//     let autoCloseTimeoutId; // ID таймера для автоматического исчезновения
//     let progressBarAnimationStart; // Время начала анимации прогресс-бара
//     let timeRemaining; // Оставшееся время до исчезновения

//     // Инициализация
//     if (progressBar) {
//       // Устанавливаем CSS переменную для длительности анимации прогресс-бара
//       progressBar.style.setProperty('--flash-duration', `${duration}ms`);

//       // Запуск анимации и таймера
//       startAutoClose();

//       // Добавляем обработчики наведения курсора
//       message.addEventListener('mouseenter', pauseAutoClose);
//       message.addEventListener('mouseleave', resumeAutoClose);

//     } else {
//       console.warn('Progress bar element not found for a flash message. Auto-close will still work.');
//       // Если прогресс-бара нет, запускаем только таймер исчезновения
//       autoCloseTimeoutId = setTimeout(() => {
//         message.classList.add('fade');
//         message.classList.remove('show');
//         setTimeout(() => message.remove(), fadeOutDuration);
//       }, duration);
//     }

//     // Обработчик события закрытия алерта Bootstrap (клик на крестик)
//     message.addEventListener('closed.bs.alert', function () {
//       console.log('Message closed by user or Bootstrap event. Clearing auto-close timer.');
//       if (autoCloseTimeoutId) {
//         clearTimeout(autoCloseTimeoutId); // Останавливаем автоматическое исчезновение
//       }
//       // При закрытии алерт удаляется сам, но для уверенности можно явно вызвать remove()
//       // setTimeout(() => message.remove(), fadeOutDuration); // Даем время для fade-out
//     });

//     // --- Функции управления таймерами ---

//     function startAutoClose() {
//       // Устанавливаем начальную ширину прогресс-бара
//       if (progressBar) {
//         progressBar.style.width = '100%';
//         progressBar.style.animationPlayState = 'running'; // Убедимся, что анимация идет
//         progressBarAnimationStart = performance.now(); // Записываем время начала анимации
//       }

//       // Устанавливаем таймер для автоматического исчезновения сообщения
//       autoCloseTimeoutId = setTimeout(() => {
//         message.classList.add('fade');
//         message.classList.remove('show');
//         setTimeout(() => {
//           message.remove();
//           console.log('Message removed by auto-close.');
//         }, fadeOutDuration);
//       }, duration);

//       console.log('Auto-close started.');
//     }

//     function pauseAutoClose() {
//       if (autoCloseTimeoutId) {
//         clearTimeout(autoCloseTimeoutId); // Останавливаем таймер исчезновения
//         console.log('Auto-close paused.');

//         if (progressBar) {
//           // Вычисляем, сколько времени прошло с начала анимации
//           const elapsed = performance.now() - progressBarAnimationStart;
//           // Вычисляем оставшееся время
//           timeRemaining = duration - elapsed;
//           // Устанавливаем CSS переменную для текущей ширины прогресс-бара,
//           // чтобы она "застыла" на месте.
//           const currentWidth = progressBar.offsetWidth / message.offsetWidth * 100;
//           progressBar.style.setProperty('--flash-progress-width', `${currentWidth}%`);
//           progressBar.style.animationPlayState = 'paused'; // Ставим анимацию на паузу
//           console.log(`Progress bar paused at ${currentWidth.toFixed(2)}% width, ${timeRemaining.toFixed(0)}ms remaining.`);
//         }
//       }
//     }

//     function resumeAutoClose() {
//       if (timeRemaining > 0) {
//         console.log(`Auto-close resumed. Resuming in ${timeRemaining.toFixed(0)}ms.`);
//         // Возобновляем таймер исчезновения с оставшимся временем
//         autoCloseTimeoutId = setTimeout(() => {
//           message.classList.add('fade');
//           message.classList.remove('show');
//           setTimeout(() => {
//             message.remove();
//             console.log('Message removed by auto-close after resume.');
//           }, fadeOutDuration);
//         }, timeRemaining);

//         if (progressBar) {
//           // Возобновляем анимацию прогресс-бара
//           // Мы должны пересчитать длительность для возобновления анимации от текущей точки
//           progressBar.style.transitionDuration = `${timeRemaining}ms`;
//           progressBar.style.width = '0%'; // Продолжаем анимацию до 0%
//           progressBar.style.animationPlayState = 'running'; // Возобновляем анимацию
//           progressBarAnimationStart = performance.now(); // Обновляем время начала
//         }
//         timeRemaining = 0; // Сбрасываем оставшееся время
//       }
//     }
//   });

//   // flashMessages.forEach(message => {
//   //   const progressBar = message.querySelector('.progress-bar');

//   //   if (progressBar) {
//   //     console.log('Setting up progress bar for message.');
//   //     // Устанавливаем длительность анимации для прогресс-бара
//   //     progressBar.style.transitionDuration = `${duration}ms`;

//   //     // Запускаем анимацию прогресс-бара: уменьшаем ширину от 100% до 0%.
//   //     // Небольшая задержка (50мс) нужна, чтобы браузер успел отрисовать
//   //     // элемент с 100% шириной, прежде чем начнет анимировать его до 0%.
//   //     setTimeout(() => {
//   //       progressBar.style.width = '0%';
//   //       console.log('Progress bar animation started.');
//   //     }, 50);

//   //     // Таймер для исчезновения самого флеш-сообщения
//   //     setTimeout(() => {
//   //       console.log('Starting fade out for message.');
//   //       // Добавляем класс 'fade' и удаляем 'show' для Bootstrap-анимации исчезновения
//   //       message.classList.add('fade');
//   //       message.classList.remove('show');
//   //       // Полностью удаляем сообщение из DOM после завершения анимации исчезновения
//   //       setTimeout(() => {
//   //         message.remove();
//   //         console.log('Message removed from DOM.');
//   //       }, fadeOutDuration);
//   //     }, duration);
//   //   } else {
//   //     console.warn('Progress bar element not found for a flash message. Check HTML structure.');
//   //     // Если прогресс-бара нет, сообщение все равно исчезнет, но без анимации бара
//   //     setTimeout(() => {
//   //       message.classList.add('fade');
//   //       message.classList.remove('show');
//   //       setTimeout(() => {
//   //         message.remove();
//   //       }, fadeOutDuration);
//   //     }, duration);
//   //   }
//   // });
// }

// function setupFlashMessages() {
//   const flashMessages = document.querySelectorAll('.flash-message');
//   const duration = 5000;
//   const fadeOutDuration = 500;

//   console.log(`Found ${flashMessages.length} flash messages.`);

//   flashMessages.forEach(message => {
//     const progressBar = message.querySelector('.progress-bar');
//     let autoCloseTimeoutId = null; // Инициализируем null, чтобы явно видеть его состояние
//     let progressBarAnimationStart;
//     let timeRemaining;

//     // --- Функции управления таймерами (вынесены для ясности) ---

//     function startAutoClose() {
//       if (progressBar) {
//         progressBar.style.width = '100%';
//         progressBar.style.animationPlayState = 'running';
//         progressBarAnimationStart = performance.now();
//       }

//       console.log('Starting new auto-close timer...');
//       autoCloseTimeoutId = setTimeout(() => {
//         console.log('--- AUTO-CLOSE TIMER FIRED! ---'); // <--- ВАЖНЫЙ ЛОГ
//         message.classList.add('fade');
//         message.classList.remove('show');
//         setTimeout(() => {
//           message.remove();
//           console.log('Message removed by auto-close.');
//         }, fadeOutDuration);
//       }, duration);
//       console.log('Timer ID on start:', autoCloseTimeoutId); // <--- ВАЖНЫЙ ЛОГ
//     }

//     function pauseAutoClose() {
//       if (autoCloseTimeoutId !== null) { // Проверяем, что таймер вообще был установлен
//         console.log('Attempting to clear timer with ID:', autoCloseTimeoutId); // <--- ВАЖНЫЙ ЛОГ
//         clearTimeout(autoCloseTimeoutId);
//         autoCloseTimeoutId = null; // Сбросим ID, чтобы не пытаться очистить его снова
//         console.log('Auto-close paused. Timer ID after clear:', autoCloseTimeoutId); // <--- ВАЖНЫЙ ЛОГ

//         if (progressBar) {
//           const elapsed = performance.now() - progressBarAnimationStart;
//           timeRemaining = duration - elapsed;
//           const currentWidth = progressBar.offsetWidth / message.offsetWidth * 100;
//           progressBar.style.setProperty('--flash-progress-width', `${currentWidth}%`);
//           progressBar.style.animationPlayState = 'paused';
//           console.log(`Progress bar paused at ${currentWidth.toFixed(2)}% width, ${timeRemaining.toFixed(0)}ms remaining.`);
//         }
//       } else {
//           console.warn('Tried to pause auto-close, but autoCloseTimeoutId was null. Timer might not have started yet.');
//       }
//     }

//     function resumeAutoClose() {
//       if (timeRemaining > 0) {
//         console.log(`Auto-close resumed. Resuming in ${timeRemaining.toFixed(0)}ms.`);
//         console.log('Starting new auto-close timer after resume...');
//         autoCloseTimeoutId = setTimeout(() => {
//           console.log('--- AUTO-CLOSE TIMER FIRED (RESUMED)! ---'); // <--- ВАЖНЫЙ ЛОГ
//           message.classList.add('fade');
//           message.classList.remove('show');
//           setTimeout(() => {
//             message.remove();
//             console.log('Message removed by auto-close after resume.');
//           }, fadeOutDuration);
//         }, timeRemaining);
//         console.log('Timer ID on resume:', autoCloseTimeoutId); // <--- ВАЖНЫЙ ЛОГ

//         if (progressBar) {
//           progressBar.style.transitionDuration = `${timeRemaining}ms`;
//           progressBar.style.width = '0%';
//           progressBar.style.animationPlayState = 'running';
//           progressBarAnimationStart = performance.now(); // Обновляем время начала
//         }
//         timeRemaining = 0; // Сбрасываем оставшееся время
//       } else {
//         console.warn('Tried to resume auto-close, but timeRemaining was 0 or less. Timer might not have been paused correctly.');
//       }
//     }

//     // --- Основная логика инициализации сообщения ---
//     if (progressBar) {
//       progressBar.style.setProperty('--flash-duration', `${duration}ms`);
//       startAutoClose(); // Запускаем первый раз

//       message.addEventListener('mouseenter', pauseAutoClose);
//       message.addEventListener('mouseleave', resumeAutoClose);

//     } else {
//       console.warn('Progress bar element not found for a flash message. Auto-close will still work.');
//       autoCloseTimeoutId = setTimeout(() => {
//         message.classList.add('fade');
//         message.classList.remove('show');
//         setTimeout(() => message.remove(), fadeOutDuration);
//       }, duration);
//     }

//     message.addEventListener('closed.bs.alert', function () {
//       console.log('Message closed by user or Bootstrap event. Clearing auto-close timer.');
//       if (autoCloseTimeoutId !== null) {
//         clearTimeout(autoCloseTimeoutId);
//         autoCloseTimeoutId = null;
//       }
//       // message.remove(); // Bootstrap сам удалит элемент при закрытии
//     });
//   });
// }

// function setupFlashMessages() {
//   const flashMessages = document.querySelectorAll('.flash-message');
//   const duration = 5000; // Продолжительность отображения сообщения в миллисекундах (5 секунд)
//   const fadeOutDuration = 500; // Продолжительность анимации исчезновения (0.5 секунды)

//   console.log(`Found ${flashMessages.length} flash messages.`);

//   flashMessages.forEach(message => {
//     const progressBar = message.querySelector('.progress-bar');
//     let autoCloseTimeoutId = null; // ID таймера для автоматического исчезновения
//     let progressBarAnimationStart = 0; // Время начала анимации прогресс-бара
//     let timeRemaining = duration; // Оставшееся время до исчезновения, изначально полная длительность

//     // --- Функции управления таймерами ---

//     function startProgressBarAnimation(currentDuration) {
//       if (!progressBar) return;

//       // Сбрасываем transition, чтобы ширина сразу установилась, если нужно
//       progressBar.style.transitionDuration = '0s';
//       progressBar.style.width = '100%';

//       // Используем requestAnimationFrame для гарантии, что браузер перерисовал элемент
//       // перед тем, как мы запустим анимацию.
//       requestAnimationFrame(() => {
//         requestAnimationFrame(() => { // Вложенный rAF для надежности
//           progressBar.style.transitionDuration = `${currentDuration}ms`;
//           progressBar.style.width = '0%';
//           progressBarAnimationStart = performance.now();
//           console.log(`Progress bar animation started for ${currentDuration}ms.`);
//         });
//       });
//     }

//     function startAutoClose(initial = true) {
//       if (initial) {
//         timeRemaining = duration; // Сбрасываем на полную длительность при первом запуске
//       }

//       startProgressBarAnimation(timeRemaining);

//       console.log('Starting new auto-close timer with duration:', timeRemaining);
//       autoCloseTimeoutId = setTimeout(() => {
//         console.log('--- AUTO-CLOSE TIMER FIRED! ---');
//         message.classList.add('fade');
//         message.classList.remove('show');
//         setTimeout(() => {
//           message.remove();
//           console.log('Message removed by auto-close.');
//         }, fadeOutDuration);
//       }, timeRemaining); // Таймер будет работать на оставшееся время
//       console.log('Timer ID on start:', autoCloseTimeoutId);
//     }

//     function pauseAutoClose() {
//       if (autoCloseTimeoutId !== null) {
//         clearTimeout(autoCloseTimeoutId);
//         autoCloseTimeoutId = null;
//         console.log('Auto-close paused.');

//         if (progressBar) {
//           // Вычисляем, сколько времени прошло с начала анимации
//           const elapsed = performance.now() - progressBarAnimationStart;
//           // Вычисляем оставшееся время
//           timeRemaining = Math.max(0, duration - elapsed); // Гарантируем, что не будет отрицательным

//           // Останавливаем анимацию прогресс-бара, устанавливая его ширину
//           // и сбрасывая transitionDuration на 0s.
//           const currentWidth = progressBar.offsetWidth / message.offsetWidth * 100;
//           progressBar.style.transitionDuration = '0s'; // Сброс transition
//           progressBar.style.width = `${currentWidth}%`; // Установка текущей ширины
//           console.log(`Progress bar paused at ${currentWidth.toFixed(2)}% width, ${timeRemaining.toFixed(0)}ms remaining.`);
//         }
//       } else {
//           console.warn('Tried to pause auto-close, but autoCloseTimeoutId was null.');
//       }
//     }

//     function resumeAutoClose() {
//       if (timeRemaining > 0) {
//         console.log(`Auto-close resumed. Resuming in ${timeRemaining.toFixed(0)}ms.`);
//         startAutoClose(false); // Запускаем анимацию и таймер с оставшимся временем
//       } else {
//         console.warn('Tried to resume auto-close, but timeRemaining was 0 or less. Message might have already expired.');
//         // Если сообщение уже должно было исчезнуть, запускаем немедленное исчезновение
//         message.classList.add('fade');
//         message.classList.remove('show');
//         setTimeout(() => message.remove(), fadeOutDuration);
//       }
//     }

//     // --- Основная логика инициализации сообщения ---
//     if (progressBar) {
//       startAutoClose(); // Запускаем при инициализации сообщения

//       message.addEventListener('mouseenter', pauseAutoClose);
//       message.addEventListener('mouseleave', resumeAutoClose);

//     } else {
//       console.warn('Progress bar element not found for a flash message. Auto-close will still work.');
//       autoCloseTimeoutId = setTimeout(() => {
//         message.classList.add('fade');
//         message.classList.remove('show');
//         setTimeout(() => message.remove(), fadeOutDuration);
//       }, duration);
//     }

//     message.addEventListener('closed.bs.alert', function () {
//       console.log('Message closed by user or Bootstrap event. Clearing auto-close timer.');
//       if (autoCloseTimeoutId !== null) {
//         clearTimeout(autoCloseTimeoutId);
//         autoCloseTimeoutId = null;
//       }
//       // Дополнительно, если прогресс-бар был в процессе анимации, можно остановить его
//       if (progressBar) {
//         progressBar.style.transitionDuration = '0s';
//         progressBar.style.width = '0%';
//       }
//     });
//   });
// }

function setupFlashMessages() {
  const flashMessages = document.querySelectorAll('.flash-message');
  const duration = 5000; // Продолжительность отображения сообщения в миллисекундах (5 секунд)
  const fadeOutDuration = 500; // Продолжительность анимации исчезновения (0.5 секунды)

  console.log(`Found ${flashMessages.length} flash messages.`);

  flashMessages.forEach(message => {
    const progressBar = message.querySelector('.progress-bar');
    let autoCloseTimeoutId = null;
    let progressBarAnimationStartTime = 0; // Время, когда анимация прогресс-бара началась (или возобновилась)
    let totalElapsedTime = 0; // Общее время, прошедшее с начала анимации (учитывая паузы)
    let isPaused = false;

    // --- Функции управления таймерами ---

    function startProgressBarAnimation(remainingTime) {
      if (!progressBar) return;

      // Устанавливаем текущую ширину прогресс-бара,
      // если это не первый запуск (totalElapsedTime > 0),
      // или 100%, если первый
      const startWidth = 100 - (totalElapsedTime / duration) * 100;

      progressBar.style.transitionDuration = '0s'; // Мгновенный сброс transition
      progressBar.style.width = `${startWidth}%`; // Установка начальной ширины для анимации

      // Запускаем анимацию через requestAnimationFrame для корректной перерисовки
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { // Вложенный rAF для надежности
          progressBar.style.transitionDuration = `${remainingTime}ms`; // Анимируем за оставшееся время
          progressBar.style.width = '0%'; // Конечная ширина
          progressBarAnimationStartTime = performance.now(); // Обновляем время старта анимации
          isPaused = false;
          console.log(`Progress bar animation started from ${startWidth.toFixed(2)}% for ${remainingTime}ms.`);
        });
      });
    }

    function startAutoClose() {
      // Запускаем анимацию прогресс-бара на оставшееся время
      startProgressBarAnimation(duration - totalElapsedTime);

      // Запускаем таймер для автоматического исчезновения сообщения
      autoCloseTimeoutId = setTimeout(() => {
        console.log('--- AUTO-CLOSE TIMER FIRED! ---');
        message.classList.add('fade');
        message.classList.remove('show');
        setTimeout(() => {
          message.remove();
          console.log('Message removed by auto-close.');
        }, fadeOutDuration);
      }, duration - totalElapsedTime); // Таймер сработает через оставшееся время

      console.log('Auto-close timer set with ID:', autoCloseTimeoutId, 'for', (duration - totalElapsedTime), 'ms');
    }

    function pauseAutoClose() {
      if (isPaused) return; // Уже на паузе

      if (autoCloseTimeoutId !== null) {
        clearTimeout(autoCloseTimeoutId);
        autoCloseTimeoutId = null;
        isPaused = true;
        console.log('Auto-close paused.');

        if (progressBar) {
          // Обновляем общее прошедшее время
          totalElapsedTime += (performance.now() - progressBarAnimationStartTime);
          const currentWidth = progressBar.offsetWidth / message.offsetWidth * 100;

          progressBar.style.transitionDuration = '0s'; // Мгновенная остановка
          progressBar.style.width = `${currentWidth}%`; // Застываем на текущей ширине

          console.log(`Progress bar paused at ${currentWidth.toFixed(2)}% width.`);
          console.log(`Total elapsed time: ${totalElapsedTime.toFixed(0)}ms, Remaining: ${(duration - totalElapsedTime).toFixed(0)}ms`);
        }
      }
    }

    function resumeAutoClose() {
      if (!isPaused || (duration - totalElapsedTime <= 0)) { // Если не на паузе или уже истекло
        console.warn('Tried to resume auto-close, but not paused or already expired.');
        if (duration - totalElapsedTime <= 0) {
            // Если время истекло, сразу запускаем исчезновение
            message.classList.add('fade');
            message.classList.remove('show');
            setTimeout(() => message.remove(), fadeOutDuration);
        }
        return;
      }

      console.log('Auto-close resumed.');
      startAutoClose(); // Запускаем заново с обновленным totalElapsedTime
    }

    // --- Основная логика инициализации сообщения ---
    // Инициализация при первом появлении
    startAutoClose();

    message.addEventListener('mouseenter', pauseAutoClose);
    message.addEventListener('mouseleave', resumeAutoClose);

    message.addEventListener('closed.bs.alert', function () {
      console.log('Message closed by user or Bootstrap event. Clearing timers.');
      if (autoCloseTimeoutId !== null) {
        clearTimeout(autoCloseTimeoutId);
        autoCloseTimeoutId = null;
      }
      if (progressBar) {
        progressBar.style.transitionDuration = '0s';
        progressBar.style.width = '0%'; // Сбрасываем прогресс-бар
      }
      totalElapsedTime = 0; // Сбрасываем для чистоты
      isPaused = false;
    });
  });
}

// Запускаем инициализацию при загрузке страницы и при Turbo-навигации
document.addEventListener('turbo:load', function() {
  setupFlashMessages();
  // console.log('Turbo:load event triggered.');
  // setupFlashMessages(); // Инициализация логики флеш-сообщений
});
