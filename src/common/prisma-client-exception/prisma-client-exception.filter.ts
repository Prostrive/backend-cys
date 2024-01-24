//src/prisma-client-exception.filter.ts

import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');
    let status: HttpStatus;

    switch (exception.code) {
      case 'P1000':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P1001':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P1012':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P1017':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2000':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2001':
        status = HttpStatus.NOT_FOUND;
        break;
      case 'P2002':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2003':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2004':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
      case 'P2005':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2006':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2007':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2008':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2009':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2010':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
      case 'P2011':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2012':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2013':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2014':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2015':
        status = HttpStatus.NOT_FOUND;
        break;
      case 'P2016':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2017':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2018':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2019':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2020':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2021':
        status = HttpStatus.NOT_FOUND;
        break;
      case 'P2022':
        status = HttpStatus.NOT_FOUND;
        break;
      case 'P2023':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
      case 'P2024':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
      case 'P2025':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2026':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2027':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
      case 'P2028':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
      case 'P2030':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2031':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
      case 'P2033':
        status = HttpStatus.BAD_REQUEST;
        break;
      case 'P2034':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
    }
    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
