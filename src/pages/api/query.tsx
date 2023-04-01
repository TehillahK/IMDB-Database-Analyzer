import { type NextApiRequest, type NextApiResponse } from "next";
import { ConnectionPool } from 'mssql';

const config = {
    user: 'sa',
    password: 'Khumbolane99',
    server: 'localhost',
    database: 'imdb',
    options: {
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
        loginTimeout: 60 // Increase the login timeout to 60 seconds
    }
};


const query = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const pool = await new ConnectionPool(config).connect();
        const result = await pool.request().query('SELECT TOP 20 * FROM Title');
        res.status(200).json(result.recordset);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
};

export default query;