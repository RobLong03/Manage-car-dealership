// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const multer = require('multer');
// const { Pool } = require('pg');



// const app = express();
// const port = 7143;

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'TelephoneCompanyDB',
//   password: 'password',
//   port: 5432,
// });
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// pool.connect((err, client) => {
//   if (err) {
//     return console.error('Errore di connessione al database:', err);
//   }
//   console.log('Connessione al database avvenuta con successo');
//   client.release();
// });

// app.get('/all', async (req, res) => {
//   try {
//     const result = await pool.query(`SELECT * FROM "Phone"`)
//     res.json(result.rows)
//   } catch (error) {
//     console.error('Errore nella query allPhone', error)
//   }
// })
// app.get('/costumers', async (req, res) => {
//   try {
//     const result = await pool.query(`SELECT * FROM customers`)
//     res.json(result.rows)
//   } catch (error) {
//     console.error('Errore nella query costumers', error)
//   }
// })
// app.get('/auth/:nameuser/:password/:authorization', async (req, res) => {
//   const { nameuser, password, authorization } = req.params;

//   try {
//     const query = {
//       text: `SELECT EXISTS (
//                 SELECT * FROM public."Usersadmin"
//                 WHERE nameuser = $1
//                   AND password = $2
//                   AND autorization = $3
//             ) AS exists`,
//       values: [nameuser, password, authorization],
//     };

//     const result = await pool.query(query);
//     const exists = result.rows[0].exists;

//     res.json({ exists: exists });
//   } catch (error) {
//     console.error('Error executing query:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// app.get('/costumers/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const query = {
//       text: `SELECT * FROM customers WHERE id=$1`,
//       values: [id],
//     };

//     const result = await pool.query(query);
//     res.json(result.rows)
//   } catch (error) {
//     console.error('Error executing query:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.post('/add/customer',async (req,res)=>{
//   const { name, surname, email, password, vat, city } = req.body;
//   try {

//     const query=`INSERT INTO customers(nome,cognome,email,password,partitaiva,citta)VALUES($1,$2,$3,$4,$5,$6)`
//     const values=[name,surname,email,password,vat,city];

//      await pool.query(query, values);
//     res.json({ success: true, message: 'Dati inseriti con successo nel database.' });
//   } catch (error) {
//     console.error('Error executing query:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// })


// app.delete('/delete/customer/:id',async(req,res)=>{
//   const {id}=req.params;

//   try {
//   const query=`DELETE FROM customers WHERE id=$1`
//     const values=[id]

//    await pool.query(query,values)
//     res.status(200).json({ success: true,message:"OK customers , delete"});

//   } catch (error) {
//     console.log(error)
//     res.status(500).json("Problems on delete customer id ")
//   }

// })


// app.put('/modify/customer',async (req,res)=>{
//   const {id,name,surname,email,password,vat,city}=req.body;
//   try {
//     const query=`UPDATE customers SET nome=$2,cognome=$3,email=$4,password=$5,partitaiva=$6,citta=$7  WHERE id = $1; `
//     const values=[id,name,surname,email,password,vat,city];
//     const result=await pool.query(query,values);

//       res.status(200).json(result.rows);
//   } catch (error) {
//     console.log(error)
//     res.status(500).json("Problems on modify customer id ")
//   }
// })
// app.listen(port, () => {
//   console.log(`Server in ascolto sulla porta ${port}`);
// });


require('dotenv').config({ path: './config.env' });
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('dotenv').config()
app.use(express.json());

const supabaseUrl = process.env.DB_URL;
const supabaseKey = process.env.DB_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

console.log(supabaseUrl, supabaseKey);

app.get('/auth/:nameuser/:password/:authorization', async (req, res) => {
  const { nameuser, password, authorization } = req.params;

  try {
    const { data, error } = await supabase
      .from('Usersadmin')
      .select('*')
      .eq('nameuser', nameuser)
      .eq('password', password)
      .eq('autorization', authorization);

    if (error) {
      throw error;
    }

    const exists = data.length > 0;
    res.json({ exists });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/costumers', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('Customers')
      .select('*')

    if (error) {
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/costumers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from("Customers")
      .select("*")
      .eq("id", id)

    res.status(200).json(data);
  } catch (error) {
    console.error(`Error executing query  costumers:id:`,id, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
app.delete('/delete/customer/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from("Customers")
      .select("*")
      .eq("id", id)

    res.status(200).json({success: true,message:"OK customers , delete"});
  } catch (error) {
    console.error(`Error executing query  costumers:id:`,id, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.post('/add/customer', async (req, res) => {
  const { id,name, surname, email, password, vat, city } = req.body;
  try {
    const { data, error } = await supabase
      .from('Customers')
      .insert([
        { id:id,nome: name, cognome: surname, email, password, partitaiva: vat, citta: city }
      ]);

    if (error) {
      throw error;
    }

    res.json({ success: true, message: 'Dati inseriti con successo nel database.' });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get("/countcust",async (req,res)=>{
  // const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from("Customers")
      .select('id')
      .order('id', { ascending: false })
      .limit(1);


    res.status(200).json(data[0].id);
  } catch (error) {
    console.error(`Error executing query  costumers:id:`,id, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

})

app.put('/modify/customer', async (req, res) => {
  const { id, name, surname, email, password, vat, city } = req.body;

  try {

    const { data, error } = await supabase
      .from('Customers')
      .update({
        nome: name,
        cognome: surname,
        email: email,
        password: password,
        partitaiva: vat,
        citta: city
      })
      .match({ id: id });

    if (error) {
      console.error('Error updating customer:', error.message);
      return res.status(500).json({ error: 'Failed to update customer' });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error('Error updating customer:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get("/cars",async(req,res)=>{

  try {

    const {data,error}=await supabase
    .from("Cars")
    .select("*")

    if (error) {
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

// app.put('/modify/customer',async (req,res)=>{
//   const {id,name,surname,email,password,vat,city}=req.body;
//   try {
//     const query=`UPDATE customers SET nome=$2,cognome=$3,email=$4,password=$5,partitaiva=$6,citta=$7  WHERE id = $1; `
//     const values=[id,name,surname,email,password,vat,city];
//     const result=await pool.query(query,values);

//       res.status(200).json(result.rows);
//   } catch (error) {
//     console.log(error)
//     res.status(500).json("Problems on modify customer id ")
//   }
// })




app.listen(7143, () => {
  console.log('> Ready on http://localhost:7143');
});
