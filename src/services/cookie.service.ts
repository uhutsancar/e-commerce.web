import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { parse, serialize, SerializeOptions } from 'cookie';

interface SecureSerializeOptions extends SerializeOptions {
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

@Injectable({ providedIn: 'root' })
export class CookieService {
  #platform = inject(PLATFORM_ID);
  #document = inject(DOCUMENT);

  private validateCookie(name: string, value: string): void {
    if (!name || typeof name !== 'string' || name.trim() === '') {
      throw new Error('Cookie name must be a non-empty string');
    }
    if (value == null) {
      throw new Error('Cookie value must not be null or undefined');
    }

    if (/[;=,\s]/.test(name)) {
      throw new Error(
        'Cookie name cannot contain semicolons, commas, or whitespace'
      );
    }
  }

  get(name: string): string | undefined {
    if (!name || typeof name !== 'string') {
      return undefined;
    }

    try {
      if (isPlatformBrowser(this.#platform)) {
        const cookies = parse(this.#document?.cookie || '');
        return cookies[name];
      }
    } catch (error) {
      console.error('Error reading cookie:', error);
    }

    return undefined;
  }

  set(name: string, value: string, options: SecureSerializeOptions = {}): void {
    try {
      this.validateCookie(name, value);

      const secureOptions: SecureSerializeOptions = {
        path: '/', // Cookie'nin tüm sayfalarda geçerli olması için
        secure: true, // Sadece HTTPS üzerinden gönderilsin
        httpOnly: false,
        sameSite: 'strict', // CSRF saldırılarına karşı korunma
        ...options,
      };

      const serialized = serialize(name, value, secureOptions);

      if (isPlatformBrowser(this.#platform)) {
        this.#document.cookie = serialized;
      }
    } catch (error) {
      console.error('Error setting cookie:', error);
    }
  }

  remove(name: string): void {
    try {
      this.validateCookie(name, '');
      this.set(name, '', {
        expires: new Date(0),
        maxAge: 0,
        path: '/',
        sameSite: 'strict',
        secure: true,
        httpOnly: false,
      });
    } catch (error) {
      console.error('Error removing cookie:', error);
    }
  }
}


