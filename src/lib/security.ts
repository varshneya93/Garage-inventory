// Input sanitization
export function sanitizeInput(input: string): string {
  // Remove potentially dangerous characters
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/data:text\/html/gi, '') // Remove data URLs
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/\0/g, '') // Remove null bytes
    .trim();
}

export function sanitizeHtml(html: string): string {
  // Basic HTML sanitization - in production, use a library like DOMPurify
  // This is a simplified version for server-side use
  
  // Remove script tags and their content
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove event handlers
  html = html.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
  html = html.replace(/on\w+\s*=\s*[^\s>]*/gi, '');
  
  // Remove javascript: and data: protocols
  html = html.replace(/javascript:/gi, '');
  html = html.replace(/data:text\/html/gi, '');
  
  // Remove iframe, object, embed tags
  html = html.replace(/<(iframe|object|embed)[^>]*>.*?<\/\1>/gi, '');
  
  return html;
}

// Sanitize object recursively
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = {} as T;
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key as keyof T] = sanitizeInput(value) as any;
    } else if (Array.isArray(value)) {
      sanitized[key as keyof T] = value.map(item => 
        typeof item === 'string' ? sanitizeInput(item) : 
        typeof item === 'object' && item !== null ? sanitizeObject(item) : item
      ) as any;
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key as keyof T] = sanitizeObject(value) as any;
    } else {
      sanitized[key as keyof T] = value;
    }
  }
  
  return sanitized;
}

// Path traversal prevention
export function sanitizePath(path: string): string {
  // Remove path traversal attempts
  return path
    .replace(/\.\./g, '')
    .replace(/[\/\\]{2,}/g, '/')
    .replace(/^[\/\\]/, '')
    .trim();
}

// CSRF Token generation and validation
const CSRF_TOKEN_LENGTH = 32;
const csrfTokens = new Map<string, { token: string; expires: number }>();

// Cleanup expired tokens periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of csrfTokens.entries()) {
    if (now > value.expires) {
      csrfTokens.delete(key);
    }
  }
}, 5 * 60 * 1000); // Every 5 minutes

export function generateCsrfToken(sessionId: string): string {
  const token = Array.from(crypto.getRandomValues(new Uint8Array(CSRF_TOKEN_LENGTH)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  const expires = Date.now() + 60 * 60 * 1000; // 1 hour
  csrfTokens.set(sessionId, { token, expires });

  return token;
}

export function validateCsrfToken(sessionId: string, token: string): boolean {
  const stored = csrfTokens.get(sessionId);
  if (!stored) return false;
  if (Date.now() > stored.expires) {
    csrfTokens.delete(sessionId);
    return false;
  }
  
  // Use constant-time comparison to prevent timing attacks
  if (stored.token.length !== token.length) return false;
  
  let result = 0;
  for (let i = 0; i < stored.token.length; i++) {
    result |= stored.token.charCodeAt(i) ^ token.charCodeAt(i);
  }
  
  return result === 0;
}

// CSRF middleware helper
export function getCsrfTokenFromRequest(request: any): string | null {
  // Check header first
  const headerToken = request.headers.get('x-csrf-token');
  if (headerToken) return headerToken;
  
  // Check body
  if (request.body && typeof request.body === 'object' && '_csrf' in request.body) {
    return request.body._csrf;
  }
  
  return null;
}

// File upload security
export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function validateFileUpload(
  file: File,
  options?: {
    allowedTypes?: string[];
    maxSize?: number;
  }
): FileValidationResult {
  const allowedTypes = options?.allowedTypes || ALLOWED_IMAGE_TYPES;
  const maxSize = options?.maxSize || MAX_FILE_SIZE;

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`,
    };
  }

  // Check file size
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size ${(file.size / 1024 / 1024).toFixed(2)}MB exceeds maximum allowed size of ${(maxSize / 1024 / 1024).toFixed(2)}MB`,
    };
  }

  // Check file extension matches MIME type
  const extension = file.name.split('.').pop()?.toLowerCase();
  const mimeTypeExtensions: Record<string, string[]> = {
    'image/jpeg': ['jpg', 'jpeg'],
    'image/png': ['png'],
    'image/webp': ['webp'],
    'image/gif': ['gif'],
    'image/svg+xml': ['svg'],
    'application/pdf': ['pdf'],
  };

  const expectedExtensions = mimeTypeExtensions[file.type];
  if (expectedExtensions && extension && !expectedExtensions.includes(extension)) {
    return {
      valid: false,
      error: 'File extension does not match file type',
    };
  }

  return { valid: true };
}

export async function scanFileForMalware(file: File): Promise<{ safe: boolean; reason?: string }> {
  // In production, integrate with a malware scanning service like ClamAV or VirusTotal
  // For now, perform comprehensive basic checks
  
  // Check for suspicious file names
  const suspiciousPatterns = ['.exe', '.bat', '.cmd', '.sh', '.ps1', '.vbs', '.js', '.jar', '.app', '.deb', '.rpm'];
  const fileName = file.name.toLowerCase();
  
  for (const pattern of suspiciousPatterns) {
    if (fileName.endsWith(pattern)) {
      return { safe: false, reason: `Executable file type not allowed: ${pattern}` };
    }
  }

  // Check for double extensions (e.g., image.jpg.exe)
  const parts = fileName.split('.');
  if (parts.length > 2) {
    for (let i = 0; i < parts.length - 1; i++) {
      if (suspiciousPatterns.some(p => `.${parts[i]}` === p)) {
        return { safe: false, reason: 'Double extension detected' };
      }
    }
  }

  // Check file content for suspicious patterns (basic check)
  try {
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    
    // Check for executable signatures
    const signatures = [
      { name: 'PE (Windows Executable)', bytes: [0x4D, 0x5A] }, // MZ
      { name: 'ELF (Linux Executable)', bytes: [0x7F, 0x45, 0x4C, 0x46] }, // .ELF
      { name: 'Mach-O (macOS Executable)', bytes: [0xFE, 0xED, 0xFA, 0xCE] },
    ];

    for (const sig of signatures) {
      if (bytes.length >= sig.bytes.length) {
        let match = true;
        for (let i = 0; i < sig.bytes.length; i++) {
          if (bytes[i] !== sig.bytes[i]) {
            match = false;
            break;
          }
        }
        if (match) {
          return { safe: false, reason: `Executable signature detected: ${sig.name}` };
        }
      }
    }

    // For text-based files, check content
    if (file.type.startsWith('text/') || file.type.includes('svg')) {
      const text = new TextDecoder().decode(bytes);
      const suspiciousContent = [
        '<script',
        'javascript:',
        'eval(',
        'exec(',
        'system(',
        'shell_exec',
        'passthru',
        'base64_decode',
        'gzinflate',
        'str_rot13',
      ];
      
      const lowerText = text.toLowerCase();
      for (const pattern of suspiciousContent) {
        if (lowerText.includes(pattern)) {
          return { safe: false, reason: `Suspicious content detected: ${pattern}` };
        }
      }
    }
  } catch (error) {
    // If we can't read the file, treat it as suspicious
    return { safe: false, reason: 'Unable to scan file content' };
  }

  return { safe: true };
}

// Enhanced file validation with metadata stripping
export async function processUploadedFile(file: File): Promise<{
  success: boolean;
  processedFile?: Blob;
  error?: string;
}> {
  // Validate file
  const validation = validateFileUpload(file);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  // Scan for malware
  const scanResult = await scanFileForMalware(file);
  if (!scanResult.safe) {
    return { success: false, error: scanResult.reason || 'File failed security scan' };
  }

  // For images, we should strip metadata in production
  // This would require a library like sharp or jimp
  // For now, return the original file
  return { success: true, processedFile: file };
}

// SQL Injection prevention (Prisma handles this, but good to have validation)
export function validateSqlInput(input: string): boolean {
  const sqlKeywords = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'CREATE', 'ALTER', 'EXEC', 'UNION'];
  const upperInput = input.toUpperCase();
  
  for (const keyword of sqlKeywords) {
    if (upperInput.includes(keyword)) {
      return false;
    }
  }
  
  return true;
}

// XSS Prevention
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Security headers
export function getSecurityHeaders(): Record<string, string> {
  return {
    'X-DNS-Prefetch-Control': 'on',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  };
}

// Content Security Policy
export function getContentSecurityPolicy(): string {
  const policies = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://plausible.io",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.github.com https://api.twitter.com",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
  ];
  return policies.join('; ');
}

// Request validation
export function validateRequest(request: any): { valid: boolean; error?: string } {
  // Check for required headers
  const contentType = request.headers.get('content-type');
  if (request.method === 'POST' || request.method === 'PUT') {
    if (!contentType) {
      return { valid: false, error: 'Content-Type header is required' };
    }
  }

  // Check for suspicious user agents
  const userAgent = request.headers.get('user-agent');
  if (!userAgent || userAgent.length < 10) {
    return { valid: false, error: 'Invalid user agent' };
  }

  return { valid: true };
}

// Password strength validation
export function validatePasswordStrength(password: string): { valid: boolean; error?: string } {
  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters long' };
  }

  if (!/[a-z]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one lowercase letter' };
  }

  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one uppercase letter' };
  }

  if (!/[0-9]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one number' };
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one special character' };
  }

  return { valid: true };
}
