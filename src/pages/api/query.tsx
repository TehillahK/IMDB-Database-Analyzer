import { type NextApiRequest, type NextApiResponse } from "next";
import { ConnectionPool } from 'mssql';

const config = {
  user: 'alik2',
  password: '7896685',
  server: 'uranium.cs.umanitoba.ca',
  database: 'cs3380',
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
        const result = await pool.request().query('SELECT TOP 20 * FROM TvEpisode');
        res.status(200).json(result.recordset);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
};

export default query;