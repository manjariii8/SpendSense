package com.spendsense.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class AnalyticsResponse {

    private Double monthlyTotal;

    private List<CategoryExpense> categoryWise;

    private List<DailyExpense> dailySpend;
}