package com.example.auction.repository.category;

import com.example.auction.model.category.Category;
import com.example.auction.model.dto.stats.CategoryStatsView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query(value = "SELECT * FROM category_stats", nativeQuery = true)
    List<CategoryStatsView> findAllCategoryStats();
}
