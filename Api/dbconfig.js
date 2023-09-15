import 'dotenv/config';

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        trustServerCertificate: true,
        trustedConnection: true
    }
}

export default config;

/*USE [master]
GO
CREATE LOGIN [micaMijiTommy] WITH PASSWORD=N'micaMijiTommy', DEFAULT_DATABASE=[BD], CHECK_EXPIRATION=OFF,
CHECK_POLICY=OFF
GO

USE [BD]
GO
CREATE USER [micaMijiTommy] FOR LOGIN [micaMijiTommy]
GO
USE [BD]
GO
ALTER ROLE [db_owner] ADD MEMBER [micaMijiTommy]
GO*/