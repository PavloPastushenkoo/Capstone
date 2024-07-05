package it.nextdevs.capstone.controller;

import it.nextdevs.capstone.dto.EsercizioDto;
import it.nextdevs.capstone.model.Esercizio;
import it.nextdevs.capstone.service.EsercizioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EsercizioController {
    @Autowired
    private EsercizioService esercizioService;
    @PostMapping("/esercizi")
    public Integer saveEsercizio(@RequestBody @Validated EsercizioDto esercizioDto, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new RuntimeException("Errori nella validazione dei dati: "+bindingResult.getAllErrors().stream().map(err-> err.getDefaultMessage()).reduce((a,b)->a+", "+b).get());
        }
        return esercizioService.saveEsercizio(esercizioDto);
    }

    @GetMapping("/esercizi/user/{userId}")
    public List<Esercizio> getEserciziByUser(@PathVariable int userId) {
        return esercizioService.getEserciziByUser(userId);
    }

}
