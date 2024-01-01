import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
// import { CORS_ORIGIN } from '../constants';
import { SWAGGER_OPTIONS } from '../config/swagger';
import limiter from './rate_limiter.middleware';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';
import { MESSAGES, SENTRY_DSN, STATUS_CODES } from '../constants';

function PreMiddleware(app: express.Application) {
  // Set up middleware functions for Express app

  // Initialize sentry app monitoring
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({
        tracing: true,
      }),
      // enable Express.js middleware tracing
      new Sentry.Integrations.Express({
        app,
      }),
      new ProfilingIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  });

  // The request handler must be the first middleware on the app
  app.use(Sentry.Handlers.requestHandler());

  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());

  // intentional sentry test error
  app.get('/debug-sentry', function mainHandler(req: Request, res: Response) {
    throw new Error('My first Sentry error!');
  });

  // Handle 404 errors
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({
      status_code: STATUS_CODES.FAILURE,
      message: MESSAGES.ROUTE_NOT_FOUND,
      success: false,
    });
  });

  // The error handler must be registered before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler());

  // Optional fallthrough error handler
  app.use(function onError(
    err: Error,
    req: Request,
    res: Response | any,
    next: NextFunction
  ) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    return res.end(res.sentry + '\n');
  });

  // Enable the option to trust the proxy to obtain the real IP address
  // app.set('trust proxy', true);

  // Configure Cross-Origin Resource Sharing (CORS) middleware
  // By default, allow all origins, credentials, and more
  // Replace with a specific configuration if necessary
  app.use(cors());

  // Parse incoming JSON requests with a size limit of 10MB
  app.use(express.json({ limit: '10mb' }));

  // Parse incoming URL-encoded requests with extended data and a size limit of 10MB
  app.use(
    express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 })
  );

  // Enable HTTP request logging using Morgan
  // Options include: 'combined', 'common', 'dev', 'tiny', 'combined' logs more details
  app.use(morgan('dev'));

  // Enhance security with helmet middleware
  app.use(helmet());

  // Apply rate limiting middleware to limit the number of requests
  app.use(limiter);

  app.use(cookieParser());

  // Set up Swagger API documentation
  const swaggerSpec = swaggerJSDoc(SWAGGER_OPTIONS);

  // Expose the Swagger documentation at the '/docs' route
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  return app;
}

export default PreMiddleware;
