let cohortInput = process.argv[2];
let limitInput = process.argv[3];

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});


pool.query(`
SELECT students.id AS id, students.name AS name, cohorts.name AS cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name like '%${cohortInput}%'
LIMIT ${limitInput || 5};
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`);
  })
}).catch(err => console.error('query error', err.stack));