package com.example.SpendSense.dto;


import lombok.Data;

@Data
public class ExpenseRequest {

    private String title;
    private Double amount;
    private String category;
}
