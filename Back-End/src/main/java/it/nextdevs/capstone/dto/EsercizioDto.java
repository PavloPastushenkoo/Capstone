package it.nextdevs.capstone.dto;

import lombok.Data;

@Data
public class EsercizioDto {
    private int numberOfReps;
    private int numberOfSets;
    private int usedWeight;
    private int RestBetweenSets;
    private int userId;
    private String esercizioId;
}
