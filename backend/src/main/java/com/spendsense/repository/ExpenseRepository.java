package com.spendsense.repository;

import com.spendsense.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByUserId(Long userId);




    @Query("""
SELECT e.category, SUM(e.amount)
FROM Expense e
WHERE e.user.id = :userId
GROUP BY e.category
""")
    List<Object[]> getCategoryWiseExpenses(Long userId);

    @Query("""
SELECT SUM(e.amount)
FROM Expense e
WHERE MONTH(e.date)=MONTH(CURRENT_DATE)
AND YEAR(e.date)=YEAR(CURRENT_DATE)
AND e.user.id=:userId
""")
    Double getMonthlyTotal(Long userId);

    @Query("""
SELECT e.date, SUM(e.amount)
FROM Expense e
WHERE e.user.id = :userId
GROUP BY e.date
ORDER BY e.date
""")
    List<Object[]> getDailyExpenses(Long userId);

}
