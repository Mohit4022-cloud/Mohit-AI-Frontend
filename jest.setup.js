// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock the Request object for Next.js API routes
global.Request = class Request {
  constructor(url, init) {
    // Store properties that NextRequest will need
    this._url = url;
    this._method = init?.method || 'GET';
    this._headers = new Map();
    if (init?.headers) {
      Object.entries(init.headers).forEach(([key, value]) => {
        this._headers.set(key, value);
      });
    }
    this._body = init?.body;
    
    // Define read-only properties
    Object.defineProperty(this, 'url', {
      get: () => this._url,
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(this, 'method', {
      get: () => this._method,
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(this, 'headers', {
      get: () => this._headers,
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(this, 'body', {
      get: () => this._body,
      enumerable: true,
      configurable: true
    });
  }
  
  json() {
    return Promise.resolve(JSON.parse(this._body));
  }
  
  text() {
    return Promise.resolve(this._body);
  }
};

// Mock Response object
global.Response = class Response {
  constructor(body, init) {
    this.body = body;
    this.status = init?.status || 200;
    this.statusText = init?.statusText || 'OK';
    const headers = new Map();
    if (init?.headers) {
      Object.entries(init.headers).forEach(([key, value]) => {
        headers.set(key.toLowerCase(), value);
      });
    }
    this.headers = {
      get: (name) => headers.get(name.toLowerCase()),
      set: (name, value) => headers.set(name.toLowerCase(), value),
      has: (name) => headers.has(name.toLowerCase()),
      delete: (name) => headers.delete(name.toLowerCase()),
      entries: () => headers.entries(),
      forEach: (callback) => headers.forEach(callback),
      keys: () => headers.keys(),
      values: () => headers.values(),
    };
  }
  
  json() {
    return Promise.resolve(
      typeof this.body === 'string' ? JSON.parse(this.body) : this.body
    );
  }
  
  text() {
    return Promise.resolve(
      typeof this.body === 'string' ? this.body : JSON.stringify(this.body)
    );
  }
  
  ok() {
    return this.status >= 200 && this.status < 300;
  }
};

// Mock Headers
global.Headers = class Headers extends Map {
  get(name) {
    return super.get(name.toLowerCase());
  }
  
  set(name, value) {
    return super.set(name.toLowerCase(), value);
  }
};

// Mock crypto for Node.js environment
if (!global.crypto) {
  const crypto = require('crypto');
  global.crypto = {
    getRandomValues: (arr) => crypto.randomBytes(arr.length),
    subtle: {
      digest: async (algorithm, data) => {
        const hash = crypto.createHash(algorithm.replace('-', '').toLowerCase());
        hash.update(data);
        return hash.digest();
      },
    },
  };
}

// Mock NextRequest
jest.mock('next/server', () => ({
  NextRequest: class NextRequest extends global.Request {
    constructor(input, init) {
      super(input, init);
      // Add any NextRequest-specific properties here
      this.nextUrl = new URL(typeof input === 'string' ? input : input.url);
      this.cookies = {
        get: (name) => ({ value: this._headers.get(`cookie`)?.split('; ').find(c => c.startsWith(name + '='))?.split('=')[1] }),
        set: jest.fn(),
        delete: jest.fn(),
      };
      // Define headers as a getter to override the parent class
      Object.defineProperty(this, 'headers', {
        get: () => ({
          get: (name) => {
            // Handle case-insensitive header names
            const lowerName = name.toLowerCase();
            for (const [key, value] of this._headers.entries()) {
              if (key.toLowerCase() === lowerName) {
                return value;
              }
            }
            return null;
          },
          set: (name, value) => this._headers.set(name.toLowerCase(), value),
          has: (name) => this._headers.has(name.toLowerCase()),
          delete: (name) => this._headers.delete(name.toLowerCase()),
          entries: () => this._headers.entries(),
          forEach: (callback) => this._headers.forEach(callback),
          keys: () => this._headers.keys(),
          values: () => this._headers.values(),
        }),
        enumerable: true,
        configurable: true
      });
    }
  },
  NextResponse: class NextResponse extends global.Response {
    constructor(body, init) {
      super(body, init);
    }
    
    static json(body, init) {
      return new this(JSON.stringify(body), {
        ...init,
        headers: {
          'content-type': 'application/json',
          ...(init?.headers || {}),
        },
      });
    }
    
    static next() {
      return new this(null, { status: 200 });
    }
    
    static redirect(url) {
      return new this(null, {
        status: 302,
        headers: { Location: url.toString() },
      });
    }
  },
}));

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    }
  },
  useSearchParams() {
    return {
      get: jest.fn(),
    }
  },
  usePathname() {
    return '/'
  },
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Suppress console errors in tests
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

// Global test utilities
global.mockNextResponse = (body, init) => {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...(init?.headers || {}),
    },
  })
}