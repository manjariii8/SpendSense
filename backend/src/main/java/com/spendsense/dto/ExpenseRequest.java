package com.spendsense.dto;


import lombok.Data;

@Data
public class ExpenseRequest {

    private String title;
    private Double amount;
    private String category;
}
