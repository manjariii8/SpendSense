package com.spendsense.dto;

import java.time.LocalDate;

public class DailyExpense {

    private LocalDate date;
    private Double amount;

    public DailyExpense(
            LocalDate date,
            Double amount
    ) {
        this.date = date;
        this.amount = amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public Double getAmount() {
        return amount;
    }
}