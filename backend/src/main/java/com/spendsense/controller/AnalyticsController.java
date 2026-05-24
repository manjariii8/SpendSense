package com.spendsense.controller;

import com.spendsense.entity.Expense;
import com.spendsense.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/expenses")
@RequiredArgsConstructor
public class AnalyticsController {

    private final ExpenseRepository expenseRepository;

    @GetMapping("/analytics")
    public Map<String, Object> getAnalytics(
            Authentication authentication
    ) {

        Map<String, Object> response = new HashMap<>();

        if (authentication == null) {
            response.put("monthlyTotal", 0);
            response.put("categoryWise", new ArrayList<>());
            response.put("dailySpend", new ArrayList<>());
            return response;
        }

        Long userId =
                ((com.spendsense.entity.User)
                        authentication.getPrincipal())
                        .getId();

        List<Expense> expenses =
                expenseRepository.findByUserId(userId);

        // MONTHLY TOTAL
        double monthlyTotal =
                expenses.stream()
                        .mapToDouble(Expense::getAmount)
                        .sum();

        // CATEGORY WISE
        Map<String, Double> categoryMap =
                expenses.stream()
                        .collect(Collectors.groupingBy(
                                Expense::getCategory,
                                Collectors.summingDouble(
                                        Expense::getAmount
                                )
                        ));

        List<Map<String, Object>> categoryWise =
                new ArrayList<>();

        for (Map.Entry<String, Double> entry :
                categoryMap.entrySet()) {

            Map<String, Object> item =
                    new HashMap<>();

            item.put("category", entry.getKey());
            item.put("amount", entry.getValue());

            categoryWise.add(item);
        }

        // DAILY SPEND
        Map<LocalDate, Double> dailyMap =
                expenses.stream()
                        .filter(e -> e.getDate() != null)
                        .collect(Collectors.groupingBy(
                                Expense::getDate,
                                Collectors.summingDouble(
                                        Expense::getAmount
                                )
                        ));

        List<Map<String, Object>> dailySpend =
                new ArrayList<>();

        for (Map.Entry<LocalDate, Double> entry :
                dailyMap.entrySet()) {

            Map<String, Object> item =
                    new HashMap<>();

            item.put("date",
                    entry.getKey().toString());

            item.put("amount",
                    entry.getValue());

            dailySpend.add(item);
        }

        response.put("monthlyTotal", monthlyTotal);
        response.put("categoryWise", categoryWise);
        response.put("dailySpend", dailySpend);

        return response;
    }
}