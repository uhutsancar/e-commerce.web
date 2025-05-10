import { inject, Injectable, PLATFORM_ID, REQUEST } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { parse, serialize, SerializeOptions } from 'cookie';

@Injectable({ providedIn: 'root' })
export class CookieService {
  #platform = inject(PLATFORM_ID);
  #document = inject(DOCUMENT);
  #request = inject(REQUEST);

  get(name: string): string | undefined {
    if (isPlatformBrowser(this.#platform)) {
      const cookies = parse(this.#document.cookie);
      return cookies[name];
    }

    const cookies = parse(this.#request?.headers.get('cookie') ?? '');
    return cookies[name];
  }

  set(name: string, value: string, options: SerializeOptions = {}) {
    if (isPlatformBrowser(this.#platform)) {
      this.#document.cookie = serialize(name, value, options);
    }
  }

  remove(name: string) {
    this.set(name, '', { expires: new Date(0) });
  }
}