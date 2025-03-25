// This file can be used to extend the Express types if needed
// For example, you can add custom properties to the Request interface

import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      // Add your custom properties here if needed
      // For example: userId?: string;
    }
  }
} 