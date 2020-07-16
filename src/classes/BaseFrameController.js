import omit from 'lodash.omit';
import queryString from 'query-string';

class BaseFrameController {
  constructor(spawnElement, authToken, uri, config) {
    this.spawnElement = spawnElement;
    const queryParams = queryString.stringify({ no_navigation: true, config });
    this.url = `https://platform.storyteq.com/?auth_token=${authToken}/#${uri}?${queryParams}`;
    this._init();
    this.eventListeners = [];
  }

  _init() {
    if (!['interactive', 'complete'].includes(document.readyState)) {
      document.addEventListener('readystatechange', () => {
        if (['interactive', 'complete'].includes(document.readyState)) this._spawn();
      });
    } else this._spawn();
  }

  _spawn() {
    const iframe = document.createElement('iframe');
    iframe.src = this.url;
    iframe.frameBorder = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.position = 'absolute';

    const spawnElement = document.querySelector(this.spawnElement);
    if (!spawnElement) console.error(`[Storyteq platform integration] Failed to find target element ${this.spawnElement}`);
    spawnElement.style.position = 'relative';
    spawnElement.appendChild(iframe);

    this.frame = iframe;
    this._initiatePageListeners();
  }

  _initiatePageListeners() {
    const receiveMessage = (e) => {
      if (e.origin !== 'https://platform.storyteq.com') return;
      try {
        const messagePayload = JSON.parse(e.data);
        this.eventListeners
          .forEach(({ event, cb }) => {
            const eventPayload = omit(messagePayload, ['event']);
            if (event === messagePayload.event) cb(eventPayload);
          });
      } catch (error) {
        console.error('[Storyteq platform integration] Failed to parse incoming frame message;', e.data);
      }
    };
    window.addEventListener('message', receiveMessage, false);
  }

  on(event, cb) {
    if (!this.availableEvents.includes(event)) console.error(`[Storyteq platform integration] Trying to listen to unsupported event "${event}"`);
    this.eventListeners.push({
      event,
      cb,
    });
    return this;
  }

  destroy() {
    if (!this.frame) return;
    this.eventListeners = [];
    try {
      this.frame.parentElement.removeChild(this.frame);
    } catch (error) {}
  }
}

export default BaseFrameController;