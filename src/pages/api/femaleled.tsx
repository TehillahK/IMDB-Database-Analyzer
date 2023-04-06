import { type NextApiRequest, type NextApiResponse } from "next";
import { ConnectionPool } from "mssql";

const config = {
  user: "alik2",
  password: "7896685",
  server: "uranium.cs.umanitoba.ca",
  database: "cs3380",
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
    loginTimeout: 60, // Increase the login timeout to 60 seconds
  },
};

const query = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const pool = await new ConnectionPool(config).connect();
    const result = await pool.request().query(
      `
      SELECT  Top 20
      t.name AS titleName, 
      TitleType.type,
      COUNT(CASE WHEN a.gender = 'F' THEN 1 END) AS fCount,
      COUNT(CASE WHEN a.gender = 'M' THEN 1 END) AS mCount,
      AVG(r.averageRating ) AS rating,
      COUNT(r.averageRating ) AS numVotes
      FROM 
      title t
      JOIN CastMember cm ON t.ID = cm.titleID
      JOIN actor a ON cm.actorID = a.ID
      JOIN ratings r ON t.ID = r.ID
      JOIN  types ty on ty.ID = t.ID
      JOIN TitleType on TitleType.ID  = ty.type
      WHERE 
      a.gender IN ('F', 'M') AND r.averageRating  >= 8
      GROUP BY 
      t.ID,TitleType.type, t.name
      HAVING 
      COUNT(CASE WHEN a.gender = 'F' THEN 1 END) > COUNT(CASE WHEN a.gender = 'M' THEN 1 END)
      ORDER BY 
      numVotes DESC
  
        `
    );
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default query;
