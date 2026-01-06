DELIMITER $$

CREATE PROCEDURE AdjustDepartmentSalary(
    IN dept VARCHAR(50),
    IN percent DECIMAL(5,2),
    OUT affected_count INT
)
BEGIN
    -- Safety check: do nothing if percentage is negative or zero
    IF percent <= 0 THEN
        SET affected_count = 0;
    ELSE
        -- Update salary using primary key (safe update mode friendly)
        UPDATE employees
        SET salary = salary + (salary * percent / 100)
        WHERE id IN (
            SELECT id FROM (
                SELECT id
                FROM employees
                WHERE department = dept
            ) AS temp_ids
        );

        -- Store number of affected rows
        SET affected_count = ROW_COUNT();
    END IF;
END$$

DELIMITER ;
