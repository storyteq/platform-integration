import { forEach, omit } from 'lodash-es';
import { getFrameUrl } from '../get-frame-url';
import { OneOf } from '../interfaces/one-of.interface';

export class BaseFrameController<T extends Array<string>> {
  private _url: URL;
  private _eventListeners: Array<{ event: string; cb: (data: unknown) => void }> = [];
  private _readyForToken = false;
  private _jwtToken: string;
  private _frame: HTMLIFrameElement;

  private _readyForTokenCb = () => {
    this._readyForToken = true;

    if (this._jwtToken) {
      this.setJwtToken(this._jwtToken);
      this._jwtToken = '';
    }
  };

  constructor(
    public readonly spawnElement: string,
    public readonly authToken: string | false,
    uri: string,
    config: string,
    public readonly availableEvents: T,
    extraSearchParams: Record<string, string> = {}
  ) {
    this._url = new URL(uri, getFrameUrl());

    const searchParams: Record<string, string> = {
      no_navigation: 'true',
      config: config,
      ...extraSearchParams,
    };

    if (authToken) {
      searchParams.auth_token = authToken;
    } else {
      searchParams.auth_via_message = '';

      this._eventListeners.push({ event: 'ready_for_token', cb: this._readyForTokenCb });
    }

    forEach(searchParams, (value: string, key: string) => {
      this._url.searchParams.set(key, value);
    });

    this._init();
  }

  private _init(): void {
    if (!['interactive', 'complete'].includes(document.readyState)) {
      document.addEventListener('readystatechange', () => {
        if (['interactive', 'complete'].includes(document.readyState)) this._spawn();
      });
    } else this._spawn();
  }

  private _spawn(): void {
    const iframe: HTMLIFrameElement = document.createElement('iframe');

    iframe.src = this._url.toString();
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.position = 'absolute';
    iframe.style.border = 'none';

    const spawnElement: HTMLElement = document.querySelector(this.spawnElement);

    if (!spawnElement) {
      console.error(`[Storyteq platform integration] Failed to find target element ${this.spawnElement}`);
    }

    spawnElement.style.position = 'relative';
    spawnElement.appendChild(iframe);

    this._frame = iframe;

    this._initiatePageListeners();
  }

  private _receiveMessage = (e: MessageEvent) => {
    if (e.origin === this._url.origin) {
      try {
        const messagePayload = JSON.parse(e.data);

        this._eventListeners.forEach(({ event, cb }) => {
          const eventPayload = omit(messagePayload, ['event']);

          if (event === messagePayload.event) cb(eventPayload);
        });
      } catch (error) {
        console.error('[Storyteq platform integration] Failed to parse incoming frame message;', e.data);
      }
    }
  };

  private _initiatePageListeners(): void {
    window.addEventListener('message', this._receiveMessage, false);
  }

  public on(event: OneOf<T>, cb: (data: unknown) => void): this {
    if (!this.availableEvents.includes(event)) {
      console.error(`[Storyteq platform integration] Trying to listen to unsupported event "${event}"`);
    }

    this._eventListeners.push({
      event,
      cb,
    });

    return this;
  }

  public sendMessage(message: any): this {
    this._frame.contentWindow.postMessage(message, { targetOrigin: this._url.origin });

    return this;
  }

  public setJwtToken(token: string): this {
    if (!this._readyForToken) {
      this._jwtToken = token;
    } else {
      this.sendMessage({ type: 'JWT_TOKEN', token });
    }

    return this;
  }

  public destroy(): void {
    if (!this._frame) {
      return;
    }

    window.removeEventListener('message', this._receiveMessage);

    this._eventListeners = [];

    try {
      this._frame.parentElement.removeChild(this._frame);
    } catch (error) {}
  }
}
