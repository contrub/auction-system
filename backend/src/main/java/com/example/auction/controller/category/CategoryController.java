package com.example.auction.controller.category;

import com.example.auction.exception.auth.AuthValidationException;
import com.example.auction.exception.resource.ResourceNotFoundException;
import com.example.auction.model.category.Category;
import com.example.auction.model.dto.stats.CategoryStatsView;
import com.example.auction.repository.category.CategoryRepository;
import com.example.auction.service.validation.category.CategoryValidationService;
import com.example.auction.service.validation.base.ValidationResult;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CategoryController {
    private final CategoryRepository categoryRepository;
    private final CategoryValidationService categoryValidationService;

    public CategoryController(CategoryRepository categoryRepository,
                              CategoryValidationService categoryValidationService) {
        this.categoryRepository = categoryRepository;
        this.categoryValidationService = categoryValidationService;
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getCategories() {
        List<Category> categories = categoryRepository.findAll();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<Category> getCategory(@PathVariable Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category"));
        return ResponseEntity.ok(category);
    }

    @GetMapping("/categories/stats")
    public ResponseEntity<List<CategoryStatsView>> getCategoriesStats() {
        List<CategoryStatsView> categoryStats = categoryRepository.findAllCategoryStats();
        return ResponseEntity.ok(categoryStats);
    }

    @PostMapping("/categories")
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        ValidationResult validationResult = categoryValidationService.validateCategory(category);
        if (!validationResult.isValid())
            throw new AuthValidationException(validationResult.getMessage());

        categoryRepository.save(category);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category categoryDetails) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category"));

        ValidationResult validationResult = categoryValidationService.validateCategory(categoryDetails);
        if (!validationResult.isValid())
            throw new AuthValidationException(validationResult.getMessage());

        BeanUtils.copyProperties(categoryDetails, category, "id");
        Category updatedCategory = categoryRepository.save(category);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteCategory(@PathVariable Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category"));
        categoryRepository.delete(category);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return new ResponseEntity<>(response , HttpStatus.OK);
    }
}
