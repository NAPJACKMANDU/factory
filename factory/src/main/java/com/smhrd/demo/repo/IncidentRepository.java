package com.smhrd.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smhrd.demo.model.IncidentModel;

@Repository
public interface IncidentRepository  extends JpaRepository<IncidentModel, Long>{

	boolean existsByClipIdx(Long clipIdx);

	
	
}
