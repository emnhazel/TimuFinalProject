# TimusFinalProject

# Getting started

## Installation

Clone the repository

    git clone https://github.com/emnhazel/Timus-Final-Project
    

Switch to the repo folder

    cd api
    
Install dependencies
    
    npm install
    
----------

## Database

The database is PostgreSQL

import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class PostgresService {
  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: '',
      host: '',
      database: '',
      password: '',
      port: 5432,
    });
    this.pool.connect();
  }
----------


## NPM scripts

- `npm run start` - Start application
- `npm run start:watch` - Start application in watch mode

----------


## Start application

- `npm start`
- Test api with `http://localhost:3001` in your browser

----------

# Authentication
 
This applications uses JSON Web Token (JWT) to handle authentication. The token is passed with each request using the `Authorization` header with `Token` scheme. The JWT authentication middleware handles the validation and authentication of the token. Please check the following sources to learn more about JWT.

----------
 
# Vuejs

Switch to the repo folder

    cd ui
    
Install dependencies
    
    npm install

    - `npm run dev` - Start application
