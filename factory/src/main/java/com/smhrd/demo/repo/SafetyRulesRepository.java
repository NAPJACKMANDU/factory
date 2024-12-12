package com.smhrd.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smhrd.demo.model.SafetyRulesModel;

@Repository
public interface SafetyRulesRepository extends JpaRepository<SafetyRulesModel, Long>{

	
	
}
