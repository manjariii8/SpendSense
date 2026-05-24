package com.spendsense.service;


import com.spendsense.dto.CategoryExpense;
import com.spendsense.dto.DailyExpense;
import com.spendsense.dto.ExpenseRequest;
import com.spendsense.entity.Expense;
import com.spendsense.entity.User;
import com.spendsense.repository.ExpenseRepository;
import com.spendsense.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {
    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    public Expense addExpense(ExpenseRequest request, Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Expense expense = new Expense();

        expense.setTitle(request.getTitle());
        expense.setAmount(request.getAmount());
        expense.setCategory(request.getCategory());
        expense.setDate(LocalDate.now());
        expense.setUser(user);

        return expenseRepository.save(expense);
    }

    public List<Expense> getAllExpenses(Long userId) {
        return expenseRepository.findByUserId(userId);

    }

    public List<CategoryExpense> getCategoryWiseExpenses(Long userId) {

        List<Object[]> result =
                expenseRepository.getCategoryWiseExpenses(userId);

        List<CategoryExpense> data = new ArrayList<>();

        for(Object[] row : result) {

            data.add(
                    new CategoryExpense(
                            (String) row[0],
                            (Double) row[1]
                    )
            );
        }

        return data;
    }
    public Double getMonthlyTotal(Long userId) {
        Double total = expenseRepository.getMonthlyTotal(userId);

        return total != null ? total : 0;
    }
    public List<DailyExpense> getDailyExpenses(
            Long userId
    ) {

        List<Object[]> result =
                expenseRepository.getDailyExpenses(userId);

        List<DailyExpense> data =
                new ArrayList<>();

        for(Object[] row : result) {

            data.add(
                    new DailyExpense(
                            (LocalDate) row[0],
                            (Double) row[1]
                    )
            );
        }

        return data;
    }
}
