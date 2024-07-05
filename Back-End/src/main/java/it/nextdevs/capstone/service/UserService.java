package it.nextdevs.capstone.service;

import com.cloudinary.Cloudinary;
import it.nextdevs.capstone.dto.UserDataDto;
import it.nextdevs.capstone.dto.UserDto;
import it.nextdevs.capstone.enums.TipoUtente;
import it.nextdevs.capstone.exceptions.BadRequestException;
import it.nextdevs.capstone.exceptions.NotFoundException;
import it.nextdevs.capstone.model.User;
import it.nextdevs.capstone.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private JavaMailSenderImpl javaMailSender;


    public Integer saveUser(UserDto userDto) {
        if (getUserByEmail(userDto.getEmail()).isEmpty()) {
            User user = new User();
            user.setNome(userDto.getNome());
            user.setCognome(userDto.getCognome());
            user.setEmail(userDto.getEmail());
            user.setTipoUtente(TipoUtente.USER);
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));

            // Aggiungi i nuovi campi
            user.setEta(userDto.getEta());
            user.setPeso(userDto.getPeso());
            user.setDataDiNascita(userDto.getDataDiNascita());
            user.setGenere(userDto.getGenere());

            userRepository.save(user);
//            sendMailRegistrazione(userDto.getEmail());

            return user.getIdUtente();
        } else {
            throw new BadRequestException("L'utente con email " + userDto.getEmail() + " già esistente");
        }
    }

    public Page<User> getAllUsers(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return userRepository.findAll(pageable);
    }

    public String deleteUser(int id) {
        Optional<User> userOptional = getUserById(id);

        if (userOptional.isPresent()) {
            userRepository.delete(userOptional.get());
            return "User with id:" + id + " correctly deleted";
        } else {
            throw new NotFoundException("User with id:" + id + " not found");
        }
    }

    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    @Transactional
    public User updateUser(int id, UserDto userDto) {
        Optional<User> userOptional = getUserById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setNome(userDto.getNome());
            user.setCognome(userDto.getCognome());
            user.setEmail(userDto.getEmail());
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));

            // Aggiorna i nuovi campi
            user.setEta(userDto.getEta());
            user.setPeso(userDto.getPeso());
            user.setDataDiNascita(userDto.getDataDiNascita());
            user.setGenere(userDto.getGenere());

            return userRepository.save(user);
        } else {
            throw new NotFoundException("User with id:" + id + " not found");
        }
    }

    public UserDataDto patchUser(Integer id, UserDto userDto) {
        Optional<User> userOptional = getUserById(id);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (userDto.getPassword() != null) {
                user.setPassword(passwordEncoder.encode(userDto.getPassword()));
            }
            if (userDto.getNome() != null) {
                user.setNome(userDto.getNome());
            }
            if (userDto.getCognome() != null) {
                user.setCognome(userDto.getCognome());
            }
            if (userDto.getEmail() != null) {
                user.setEmail(userDto.getEmail());
            }
            if (userDto.getAvatar() != null) {
                user.setAvatar(userDto.getAvatar());
            }

            // Aggiorna i nuovi campi
            if (userDto.getEta() > 0) {
                user.setEta(userDto.getEta());
            }
            if (userDto.getPeso() > 0) {
                user.setPeso(userDto.getPeso());
            }
            if (userDto.getDataDiNascita() != null) {
                user.setDataDiNascita(userDto.getDataDiNascita());
            }
            if (userDto.getGenere() != null) {
                user.setGenere(userDto.getGenere());
            }

            userRepository.save(user);
            UserDataDto userDataDto = new UserDataDto();
            userDataDto.setNome(user.getNome());
            userDataDto.setCognome(user.getCognome());
            userDataDto.setAvatar(user.getAvatar());
            userDataDto.setEmail(user.getEmail());
            userDataDto.setUsername(user.getUsername());
            userDataDto.setIdUtente(user.getIdUtente());
            userDataDto.setTipoUtente(user.getTipoUtente());
            return userDataDto;
        } else {
            throw new NotFoundException("Utente con id " + id + " non trovato");
        }
    }

    public User patchAvatarUser(Integer id, MultipartFile avatar) throws IOException {
        Optional<User> userOptional = getUserById(id);

        if (userOptional.isPresent()) {
            String url = (String) cloudinary.uploader().upload(avatar.getBytes(), Collections.emptyMap()).get("url");
            User user = userOptional.get();
            user.setAvatar(url);
            return userRepository.save(user);
        } else {
            throw new NotFoundException("Utente con id " + id + " non trovato");
        }
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    private void sendMailRegistrazione(String email) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Registrazione Utente");
        message.setText("Registrazione Utente avvenuta con successo");

        javaMailSender.send(message);
    }
}
