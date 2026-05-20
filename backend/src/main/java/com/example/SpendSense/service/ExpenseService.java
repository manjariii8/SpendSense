package com.example.SpendSense.service;


import com.example.SpendSense.dto.ExpenseRequest;
import com.example.SpendSense.entity.Expense;
import com.example.SpendSense.entity.User;
import com.example.SpendSense.repository.ExpenseRepository;
import com.example.SpendSense.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
}
