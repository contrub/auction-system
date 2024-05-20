package com.example.auction.controller;

import com.example.auction.exception.ResourceNotFoundException;
import com.example.auction.model.Block;
import com.example.auction.model.User;
import com.example.auction.repository.BlockRepository;
import com.example.auction.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class BlockController {
    private final BlockRepository blockRepository;
    private final UserRepository userRepository;

    public BlockController(BlockRepository blockRepository, UserRepository userRepository) {
        this.blockRepository = blockRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/blocks")
    public ResponseEntity<List<Block>> getBlocks() {
        List<Block> blocks = blockRepository.findAll();
        return ResponseEntity.ok(blocks);
    }

    @GetMapping("/blocks/{id}")
    public ResponseEntity<Block> getBlock(@PathVariable Long id) {
        Block block = blockRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Block"));
        return ResponseEntity.ok(block);
    }

    @PostMapping("/blocks")
    public ResponseEntity<Block> createBlock(@RequestBody Block block) {
        User blockingUser = userRepository.findById(block.getBlocking_user().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User-blocking"));
        User blockedUser = userRepository.findById(block.getBlocked_user().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User-blocked"));
        block.setBlocking_user(blockingUser);
        block.setBlocked_user(blockedUser);
        blockRepository.save(block);
        return new ResponseEntity<>(block, HttpStatus.OK);
    }

    @PutMapping("/blocks/{id}")
    public ResponseEntity<Block> updateBlock(@PathVariable Long id, @RequestBody Block blockDetails) {
        Block block = blockRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Block"));
        User blockingUser = userRepository.findById(blockDetails.getBlocking_user().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User-blocking"));
        User blockedUser = userRepository.findById(blockDetails.getBlocked_user().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User-blocked"));
        block.setBlocking_user(blockingUser);
        block.setBlocked_user(blockedUser);
        block.setReason(blockDetails.getReason());
        block.setExpiration_time(blockDetails.getExpiration_time());
        Block updatedBlock = blockRepository.save(block);
        return ResponseEntity.ok(updatedBlock);
    }

    @DeleteMapping("/blocks/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteBlock(@PathVariable Long id) {
        Block block = blockRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Block"));
        blockRepository.delete(block);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
