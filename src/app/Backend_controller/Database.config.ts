// export const config = {
//     server: 'localhost', // e.g., localhost
//     database: 'QA_Testing_Application',
//     options: {
//       trustedConnection: true, // Enables Windows Authentication
//       encrypt: true, // Use encryption if required
//       trustServerCertificate: true, // Use if SQL Server is using self-signed certificates
//     },
//   };


// (async () => {
//     try {
//         // make sure that any items are correctly URL encoded in the connection string
//         await sql.connect('Server=localhost,1433;Database=database;User Id=username;Password=password;Encrypt=true')
//         const result = await sql.query`select * from mytable where id = ${value}`
//         console.dir(result)
//     } catch (err) {
//         // ... error checks
//     }
// })()