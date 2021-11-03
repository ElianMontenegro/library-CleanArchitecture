import express, { Express } from 'express'

import { config as dotenv } from 'dotenv'
const app : Express = express() 

dotenv()
export default app;