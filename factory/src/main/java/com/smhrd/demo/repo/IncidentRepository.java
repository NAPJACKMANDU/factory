package com.smhrd.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.smhrd.demo.model.IncidentModel;

@Repository
public interface IncidentRepository extends JpaRepository<IncidentModel, Long>{

	boolean existsByClipIdx(Long clipIdx);

	IncidentModel findByClipIdx(Long clipIdx);

	@Query("SELECT i.incidentPath FROM IncidentModel i WHERE i.incidentIdx = :incidentIdx")
    String findIncidentPathById(@Param("incidentIdx") Long incidentIdx);


	
	
}
