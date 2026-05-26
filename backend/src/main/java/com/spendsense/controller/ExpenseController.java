package com.spendsense.controller;

import com.spendsense.dto.CategoryExpense;
import com.spendsense.dto.DailyExpense;
import com.spendsense.dto.ExpenseRequest;
import com.spendsense.entity.Expense;
import com.spendsense.entity.User;
import com.spendsense.repository.ExpenseRepository;
import com.spendsense.repository.UserRepository;
import com.spendsense.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;
    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;


    @PostMapping("/{userId}")
    public Expense addExpense(@PathVariable Long userId,
                              @RequestBody Expense expense) {

        User user = userRepository.findById(userId).orElseThrow();

        expense.setUser(user);

        return expenseRepository.save(expense);
    }


    @GetMapping("/{userId}")
    public List<Expense> getExpenses(@PathVariable Long userId) {

        return expenseRepository.findByUserId(userId);
    }


    @GetMapping("/category-wise")
    public List<CategoryExpense> getCategoryWiseExpenses(
            @AuthenticationPrincipal User user
    ) {
        return expenseService.getCategoryWiseExpenses(user.getId());
    }


    @GetMapping("/monthly-total")
    public Double getMonthlyTotal(
            @AuthenticationPrincipal User user
    ) {
        return expenseService.getMonthlyTotal(user.getId());
    }

    @GetMapping("/daily")
    public List<DailyExpense> getDailyExpenses(
            @AuthenticationPrincipal User user
    ) {
        return expenseService.getDailyExpenses(user.getId());
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable Long id) {

        expenseRepository.deleteById(id);

        return ResponseEntity.ok("Expense deleted successfully");
    }
}