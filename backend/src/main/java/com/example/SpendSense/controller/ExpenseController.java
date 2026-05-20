package com.example.SpendSense.controller;

import com.example.SpendSense.dto.ExpenseRequest;
import com.example.SpendSense.entity.Expense;
import com.example.SpendSense.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping("{userId}")
    public Expense addExpense(@RequestBody ExpenseRequest request,
                              @PathVariable Long userId){
        return expenseService.addExpense(request, userId);
    }

    @GetMapping("/{userId}")
    public List<Expense>getExpense(@PathVariable Long userId){
        return expenseService.getAllExpenses(userId);
    }

}
