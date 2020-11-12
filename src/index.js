// класс таймера обратного отсчета
import './style.css';

const day = document.querySelector('[data-value="days"]');
const hour = document.querySelector('[data-value="hours"]');
const min = document.querySelector('[data-value="mins"]');
const sec = document.querySelector('[data-value="secs"]');

class CountdownTimer {
  constructor({ targetDate } = {}) {
    this.targetDate = targetDate;
    this.start();
    this.intervalId = null;
  }
  // запускає таймер
  start() {
    this.setTimer();
    this.intervalId = setInterval(() => {
      this.setTimer();
    }, 1000);
  }
  // встановлення дати
  setTimer() {
    const currentTime = Date.now();
    const deltaTime = this.targetDate - currentTime;
    this.getTimeComponents(deltaTime);

    // запобігає відємним значенням інтервалу
    if (deltaTime <= 0) {
      clearInterval(this.intervalId);
      this.start;
      this.init();
      return;
    }
  }

  init() {
    const time = this.getTimeComponents(0);
    this.updateTimerFace(time);
  }
  // обновлення інтерфейсу
  updateTimerFace(days, hours, mins, secs) {
    day.textContent = `${days}`;
    hour.textContent = `${hours}`;
    min.textContent = `${mins}`;
    sec.textContent = `${secs}`;
  }
  // трансформування години з додаванням "0" через "pad"
  getTimeComponents(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    this.updateTimerFace(days, hours, mins, secs);
  }
  // встановлення числа, нижній реєстр і добавлення 0 якщо число менше 10
  pad(value) {
    return String(value).padStart(2, '0');
  }
}
// targetDate - встановленння цільової дати
const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date(2021, 3, 3, 10, 0, 0, 0),
});
