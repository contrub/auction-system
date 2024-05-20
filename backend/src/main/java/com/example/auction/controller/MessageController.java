package com.example.auction.controller;

import com.example.auction.exception.ResourceNotFoundException;
import com.example.auction.model.Message;
import com.example.auction.model.User;
import com.example.auction.repository.MessageRepository;
import com.example.auction.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class MessageController {
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    public MessageController(MessageRepository messageRepository,UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/messages")
    public ResponseEntity<List<Message>> getMessages() {
        List<Message> messages = messageRepository.findAll();
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/messages/{id}")
    public ResponseEntity<Message> getMessageById(@PathVariable Long id) {
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message"));
        return ResponseEntity.ok(message);
    }

    @PostMapping("/messages")
    public ResponseEntity<Message> createMessage(@RequestBody Message message) {
        User userFrom = userRepository.findById(message.getUser_from().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User-sender"));
        User userTo = userRepository.findById(message.getUser_to().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User-receiver"));
        message.setUser_from(userFrom);
        message.setUser_to(userTo);
        messageRepository.save(message);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PutMapping("/messages/{id}")
    public ResponseEntity<Message> updateMessage(@PathVariable Long id, @RequestBody Message messageDetails) {
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message"));
        User userFrom = userRepository.findById(messageDetails.getUser_from().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User-sender"));
        User userTo = userRepository.findById(messageDetails.getUser_to().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User-receiver"));
        message.setUser_from(userFrom);
        message.setUser_to(userTo);
        message.setTopic(messageDetails.getTopic());
        message.setBody(messageDetails.getBody());
        Message updatedMessage = messageRepository.save(message);
        return ResponseEntity.ok(updatedMessage);
    }

    @DeleteMapping("/messages/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteMessage(@PathVariable Long id) {
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message"));
        messageRepository.delete(message);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
