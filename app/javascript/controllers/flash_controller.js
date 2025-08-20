import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="flash"
export default class extends Controller {
  initialize() {
    this.loadTurbo()
    console.log('from flash controller')
  }
  
  setupFlashMessages() {
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

  loadTurbo() {
    document.addEventListener('turbo:load', function() {
      setupFlashMessages();
      // console.log('Turbo:load event triggered.');
      // setupFlashMessages(); // Инициализация логики флеш-сообщений
    });
  }
}
