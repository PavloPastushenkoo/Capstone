package it.nextdevs.capstone.service;

import it.nextdevs.capstone.dto.EsercizioDto;
import it.nextdevs.capstone.exceptions.NotFoundException;
import it.nextdevs.capstone.model.Esercizio;
import it.nextdevs.capstone.model.User;
import it.nextdevs.capstone.repository.EsercizioRepository;
import it.nextdevs.capstone.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EsercizioService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EsercizioRepository esercizioRepository;
    public Integer saveEsercizio(EsercizioDto esercizioDto){
        Optional<User>userOptional = userRepository.findById(esercizioDto.getUserId());
        if(userOptional.isPresent()){
            User user = userOptional.get();
            Esercizio esercizio = new Esercizio();
            esercizio.setUser(user);
            esercizio.setNumberOfReps(esercizioDto.getNumberOfReps());
            esercizio.setNumberOfSets(esercizioDto.getNumberOfSets());
            esercizio.setRestBetweenSets(esercizioDto.getRestBetweenSets());
            esercizio.setUsedWeight(esercizioDto.getUsedWeight());
            esercizio.setEsercizioId(esercizioDto.getEsercizioId());
            return esercizioRepository.save(esercizio).getId();
        }else{
            throw new NotFoundException("User not found");
        }
    }

    public List<Esercizio> getEserciziByUser(int userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            List<Esercizio> esercizi = esercizioRepository.findByUser_IdUtente(userId);
            return esercizi;
        } else {
            throw new NotFoundException("User not found");
        }
    }

}
