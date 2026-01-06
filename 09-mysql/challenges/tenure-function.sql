DELIMITER $$

CREATE FUNCTION GetTenureCategory(hire_date DATE)
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
    DECLARE years_worked INT;

    SET years_worked = TIMESTAMPDIFF(YEAR, hire_date, CURDATE());

    RETURN
        CASE
            WHEN years_worked > 5 THEN 'Veteran'
            WHEN years_worked BETWEEN 2 AND 5 THEN 'Experienced'
            ELSE 'New Hire'
        END;
END$$

DELIMITER ;

SELECT
    name,
    hire_date,
    GetTenureCategory(hire_date) AS tenure_category
FROM employees;