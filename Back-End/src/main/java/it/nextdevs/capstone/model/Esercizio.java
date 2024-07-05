package it.nextdevs.capstone.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "esercizi")
public class Esercizio {
    @Id
    @GeneratedValue
    private int id;
    private int numberOfReps;
    private int numberOfSets;
    private int usedWeight;
    private int RestBetweenSets;
    @ManyToOne
    @JoinColumn (name = "user_id")
    @JsonIgnore
    private User user;
    private String esercizioId;
}

