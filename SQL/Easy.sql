UPDATE patients
SET allergies = "NKA"
WHERE allergies IS NULL


SELECT CONCAT (first_name, ' ', last_name) AS full_name
FROM patients

SELECT patients.first_name, patients.last_name, province_names.province_name
FROM patients
JOIN province_names
ON patients.patientid = province_names.patientid

SELECT COUNT(*)
FROM patients
WHERE YEAR(birth_date) = '2010'

SELECT first_name 
FROM patients
WHERE height = (SELECT MAX(height) FROM patients)

