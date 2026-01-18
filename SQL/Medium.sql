SELECT DISTINCT YEAR(birth_date) AS birth_year
FROM patients
ORDER BY birth_year

SELECT * 
FROM patients
GROUP BY first_name 
HAVING COUNT(*) = 1

SELECT patientid, first_name
FROM patients
WHERE first_name LIKE 's____%s'

SELECT first_name
FROM patients
ORDER BY LEN(first_name), first_name

SELECT
    SELECT COUNT(*) AS male_count 
    FROM patients
    WHERE gender='M',
    SELECT COUNT(*) AS female_count
    FROM patients
    WHERE gender='F'


SELECT patientid
FROM addmissions
GROUP BY patientid, diagnosis
HAVING COUNT(*) > 1

SELECT city, COUNT(*) AS count
FROM patients
GROUP BY city
ORDER BY count DESC, city ASC


SELECT first_name, last_name, 'Patient' AS role
FROM patients
UNION ALL
SELECT first_name, last_name, 'Doctor' AS role
FROM doctors
