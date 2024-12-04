package com.smhrd.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smhrd.demo.model.ClipModel;

@Repository
public interface ClipRepository extends JpaRepository <ClipModel, Long > {
	

}
