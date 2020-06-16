import { getRepository } from 'typeorm';
import request from 'supertest';
import Users from '../../src/entity/Users';
import { hashPassword } from '../../src/util';
import connectionDB, { closeDatabaseConn } from '../../src/database/database';
import app from '../../src/app';
