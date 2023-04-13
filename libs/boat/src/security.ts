import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

export class SecurityInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const res = context.switchToHttp().getResponse();
    res.header('Cache-Control', 'no-store');
    res.header(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains',
    );
    res.header('Content-Security-Policy', 'default-src self');
    res.header('X-Frame-Options', 'SAMEORIGIN');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Referrer-Policy', 'origin-when-cross-origin');
    res.header('Permissions-Policy', 'fullscreen=(self)');
    return next.handle();
  }
}
