import 'reflect-metadata';
import express from 'express';
import employeeRouter from './src/routes/employeeroutes';
import departmentRouter from './src/routes/departmentroutes';
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
const PORT = 8200;
server.use('/api/employees', employeeRouter);
server.use('/api/departments', departmentRouter);
server.get('/', (req, res) => res.send('Express + TypeScript Server'));
server.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
