import { forEach, omit } from 'lodash-es';
import { getFrameUrl } from '../get-frame-url';
import { OneOf } from '../interfaces/one-of.interface';

export class BaseFrameController<T extends Array<string>> {
  public url: URL;
  public eventListeners: Array<{ event: OneOf<T>; cb: (data: unknown) => void }> = [];
  private frame: HTMLIFrameElement;

  constructor(
    public readonly spawnElement: string,
    public readonly authToken: string,
    uri: string,
    config: string,
    public readonly availableEvents: T,
    extraSearchParams: Record<string, string> = {}
  ) {
    this.url = new URL(uri, getFrameUrl());

    const searchParams = {
      auth_token: authToken,
      no_navigation: 'true',
      config: config,
      ...extraSearchParams,
    };

    forEach(searchParams, (value: string, key: string) => {
      this.url.searchParams.set(key, value);
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

    iframe.src = this.url.toString();
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.position = 'absolute';

    const spawnElement: HTMLElement = document.querySelector(this.spawnElement);

    if (!spawnElement) {
      console.error(`[Storyteq platform integration] Failed to find target element ${this.spawnElement}`);
    }

    spawnElement.style.position = 'relative';
    spawnElement.appendChild(iframe);

    this.frame = iframe;

    this._initiatePageListeners();
  }

  private _initiatePageListeners(): void {
    const receiveMessage = (e: MessageEvent) => {
      try {
        const messagePayload = JSON.parse(e.data);
        this.eventListeners.forEach(({ event, cb }) => {
          const eventPayload = omit(messagePayload, ['event']);
          if (event === messagePayload.event) cb(eventPayload);
        });
      } catch (error) {
        console.error('[Storyteq platform integration] Failed to parse incoming frame message;', e.data);
      }
    };

    window.addEventListener('message', receiveMessage, false);
  }

  public on(event: OneOf<T>, cb: (data: unknown) => void): this {
    if (!this.availableEvents.includes(event)) {
      console.error(`[Storyteq platform integration] Trying to listen to unsupported event "${event}"`);
    }

    this.eventListeners.push({
      event,
      cb,
    });

    return this;
  }

  public destroy(): void {
    if (!this.frame) {
      return;
    }

    this.eventListeners = [];

    try {
      this.frame.parentElement.removeChild(this.frame);
    } catch (error) {}
  }
}
