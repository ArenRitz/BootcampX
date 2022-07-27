


const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
const values = [`%${cohortName}%`];

const queryString = `
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort, count(assistance_requests.*) AS total_assistances
FROM assistance_requests
JOIN teachers ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
GROUP BY teachers.name, cohorts.name
ORDER BY teachers.name;
`;




pool.query(queryString, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.teacher} assisted in the ${user.cohort} cohort`);
  })
}).catch(err => console.error('query error', err.stack));