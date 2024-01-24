import * as admin from 'firebase-admin';
import { HttpException, HttpStatus } from '@nestjs/common';

export const createEmployee = async (email: string, password: string) => {
  try {
    const user = await admin.auth().createUser({
      email: email,
      password: password,
    });
    return user;
  } catch (error) {
    throw new HttpException(error.errorInfo, HttpStatus.NOT_ACCEPTABLE);
  }
};

export const deleteEmployee = async (userId: string) => {
  try {
    return await admin.auth().deleteUser(userId);
  } catch (error) {
    throw new HttpException(error.errorInfo, HttpStatus.NOT_ACCEPTABLE);
  }
};
