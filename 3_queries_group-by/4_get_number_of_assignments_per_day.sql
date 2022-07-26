SELECT day, count(*) as total_assignments 
FROM assignments
GROUP BY day
HAVING count(*) >= 10 -- Only return if there are more then 10 assignments on that day.
ORDER BY day;